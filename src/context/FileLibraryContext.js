import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { appStorage } from '../services/storageService';

const FileLibraryContext = createContext(null);
const STORAGE_KEY = 'athena:file-library:v1';

const categoryMatchers = [
  { category: '이미지', test: (mime, name) => mime.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|heic)$/i.test(name) },
  { category: '동영상', test: (mime, name) => mime.startsWith('video/') || /\.(mp4|mov|avi|mkv|webm)$/i.test(name) },
  { category: '오디오', test: (mime, name) => mime.startsWith('audio/') || /\.(mp3|m4a|wav|aac|flac)$/i.test(name) },
  { category: '문서', test: (mime, name) => /pdf|document|sheet|presentation|text/.test(mime) || /\.(pdf|docx?|xlsx?|pptx?|txt|md|hwp)$/i.test(name) },
  { category: '디자인', test: (_mime, name) => /\.(psd|ai|fig|sketch|xd)$/i.test(name) },
];

export const categoryOptions = ['전체', '문서', '이미지', '동영상', '오디오', '디자인', '기타'];

export function bytesToDisplaySize(bytes = 0) {
  if (!bytes || bytes <= 0) {
    return '크기 정보 없음';
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** unitIndex;
  const decimals = value >= 10 || unitIndex === 0 ? 0 : 1;

  return `${value.toFixed(decimals)}${units[unitIndex]}`;
}

export function parseFileSizeToMB(size) {
  if (typeof size === 'number') {
    return size / 1024 / 1024;
  }

  const match = String(size).trim().match(/^([\d.]+)\s*(B|KB|MB|GB|TB)$/i);

  if (!match) {
    return 0;
  }

  const value = Number(match[1]);
  const unit = match[2].toUpperCase();
  const unitScale = {
    B: 1 / 1024 / 1024,
    KB: 1 / 1024,
    MB: 1,
    GB: 1024,
    TB: 1024 * 1024,
  };

  return value * unitScale[unit];
}

function getCategory(asset) {
  const mime = asset.mimeType || asset.type || '';
  const name = asset.name || asset.fileName || '파일';

  if (asset.mediaType === 'photo') {
    return '이미지';
  }

  if (asset.mediaType === 'video') {
    return '동영상';
  }

  return categoryMatchers.find((matcher) => matcher.test(mime, name))?.category || '기타';
}

function getModifiedDate(asset) {
  const timestamp = asset.lastModified || asset.modificationTime || asset.creationTime || Date.now();
  return new Date(timestamp).toISOString().slice(0, 10);
}

function getTags(asset, category) {
  const tags = [category];
  const sizeMB = parseFileSizeToMB(asset.size || asset.fileSize || 0);

  if (sizeMB >= 100) {
    tags.push('대용량');
  }

  return tags;
}

function normalizeAsset(asset) {
  const category = getCategory(asset);
  const sizeBytes = asset.size || asset.fileSize || 0;
  const name = asset.name || asset.fileName || asset.filename || '이름 없는 파일';
  const uri = asset.uri || `${name}-${Date.now()}`;

  return {
    id: asset.id || `${uri}-${sizeBytes}-${name}`,
    name,
    uri,
    mimeType: asset.mimeType || asset.type || '',
    source: asset.source || 'document-picker',
    assetId: asset.assetId || asset.id || null,
    category,
    size: bytesToDisplaySize(sizeBytes),
    sizeBytes,
    modifiedAt: getModifiedDate(asset),
    tags: getTags({ ...asset, size: sizeBytes }, category),
    favorite: false,
  };
}

function buildRecommendedActions(files) {
  const sortedBySize = [...files].sort((a, b) => b.sizeBytes - a.sizeBytes);
  const largeFiles = sortedBySize.filter((item) => parseFileSizeToMB(item.sizeBytes) >= 100);
  const oldFiles = files.filter((item) => {
    const ageMs = Date.now() - new Date(item.modifiedAt).getTime();
    return ageMs > 1000 * 60 * 60 * 24 * 30;
  });

  return [
    ...largeFiles.slice(0, 6).map((file) => ({
      id: `large-${file.id}`,
      fileId: file.id,
      title: file.name,
      subtitle: `${file.size} · 대용량 파일`,
      color: '#fa8e73',
    })),
    ...oldFiles.slice(0, 4).map((file) => ({
      id: `old-${file.id}`,
      fileId: file.id,
      title: file.name,
      subtitle: `${file.modifiedAt} 이후 미사용 후보`,
      color: '#8aa7c8',
    })),
  ].slice(0, 8);
}

function buildAnalysisRecommendations(files) {
  const recommendations = [];
  const largeCount = files.filter((item) => parseFileSizeToMB(item.sizeBytes) >= 100).length;
  const categories = new Set(files.map((item) => item.category));

  if (largeCount > 0) {
    recommendations.push({
      id: 'large-files',
      title: '대용량 파일 우선 정리',
      description: `100MB 이상 파일 ${largeCount}개를 먼저 검토하면 저장 공간을 빠르게 확보할 수 있습니다.`,
    });
  }

  if (categories.size >= 3) {
    recommendations.push({
      id: 'category-tags',
      title: '카테고리별 태그 정리',
      description: '문서, 이미지, 동영상처럼 유형별 태그를 유지하면 검색과 정리 속도가 좋아집니다.',
    });
  }

  if (files.length === 0) {
    recommendations.push({
      id: 'connect-files',
      title: '파일 연동 시작',
      description: '파일 탭에서 실제 기기 파일을 선택하면 홈과 분석 화면에 바로 반영됩니다.',
    });
  }

  return recommendations;
}

function buildUsage(files) {
  const totalBytes = files.reduce((sum, item) => sum + item.sizeBytes, 0);
  const colorByCategory = {
    이미지: '#fa8e73',
    동영상: '#dca06b',
    문서: '#8aa7c8',
    오디오: '#8ebf9f',
    디자인: '#b192c9',
    기타: '#b5b5b5',
  };

  if (totalBytes <= 0) {
    return [{ label: '연동 파일 없음', percent: 100, color: '#d8dce2', bytes: 0 }];
  }

  const grouped = files.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.sizeBytes;
    return acc;
  }, {});

  return Object.entries(grouped).map(([label, bytes]) => ({
    label,
    bytes,
    percent: Math.max(1, Math.round((bytes / totalBytes) * 100)),
    color: colorByCategory[label] || colorByCategory.기타,
  }));
}

export function FileLibraryProvider({ children }) {
  const [files, setFiles] = useState([]);
  const hasLoadedFiles = useRef(false);

  useEffect(() => {
    let isMounted = true;

    async function loadFiles() {
      try {
        const stored = await appStorage.getItem(STORAGE_KEY);

        if (stored && isMounted) {
          setFiles(JSON.parse(stored));
        }
      } catch (error) {
      } finally {
        hasLoadedFiles.current = true;
      }
    }

    loadFiles();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hasLoadedFiles.current) {
      return;
    }

    appStorage.setItem(STORAGE_KEY, JSON.stringify(files));
  }, [files]);

  const addFilesFromAssets = useCallback((assets) => {
    const normalized = assets.map(normalizeAsset);
    setFiles((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));
      const nextFiles = normalized.filter((item) => !existingIds.has(item.id));
      return [...nextFiles, ...prev];
    });
    return normalized;
  }, []);

  const removeFile = useCallback((fileId) => {
    setFiles((prev) => prev.filter((item) => item.id !== fileId));
  }, []);

  const value = useMemo(() => {
    const totalBytes = files.reduce((sum, item) => sum + item.sizeBytes, 0);

    return {
      files,
      addFilesFromAssets,
      removeFile,
      favorites: files.filter((item) => item.favorite).slice(0, 5),
      recommendedActions: buildRecommendedActions(files),
      analysisRecommendations: buildAnalysisRecommendations(files),
      usage: buildUsage(files),
      totalBytes,
      totalSizeLabel: bytesToDisplaySize(totalBytes),
      recentActivities: files.slice(0, 3).map((item) => ({
        id: `activity-${item.id}`,
        text: `${item.name} 연동됨`,
        time: item.modifiedAt,
      })),
    };
  }, [addFilesFromAssets, files, removeFile]);

  return <FileLibraryContext.Provider value={value}>{children}</FileLibraryContext.Provider>;
}

export function useFileLibrary() {
  const context = useContext(FileLibraryContext);

  if (!context) {
    throw new Error('useFileLibrary must be used inside FileLibraryProvider');
  }

  return context;
}
