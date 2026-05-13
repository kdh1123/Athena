import { parseFileSizeToMB } from '../context/FileLibraryContext';

const AI_PROXY_URL = process.env.EXPO_PUBLIC_AI_PROXY_URL;

function summarizeFiles(files) {
  const largeFiles = files
    .filter((item) => parseFileSizeToMB(item.size) >= 100)
    .sort((a, b) => parseFileSizeToMB(b.size) - parseFileSizeToMB(a.size));
  const workFiles = files.filter((item) => item.tags.includes('업무'));
  const personalFiles = files.filter((item) => item.tags.includes('개인'));

  return {
    largeFiles,
    workFiles,
    personalFiles,
    largestFile: largeFiles[0],
  };
}

function createFilePayload(files) {
  return files.slice(0, 30).map((item) => ({
    name: item.name,
    category: item.category,
    size: item.size,
    modifiedAt: item.modifiedAt,
    tags: item.tags,
  }));
}

function createLocalChatReply(message, files = []) {
  const text = message.trim();
  const summary = summarizeFiles(files);

  if (/(대용량|용량|공간|정리)/.test(text)) {
    const largest = summary.largestFile;
    return [
      '현재 우선 정리 대상은 대용량 파일입니다.',
      largest ? `${largest.name} (${largest.size})부터 확인하면 효과가 가장 큽니다.` : '100MB 이상 파일은 아직 많지 않습니다.',
      '다음 단계로 업무 파일과 개인 파일을 분리해서 보관 기준을 잡는 것을 추천합니다.',
    ].join('\n');
  }

  if (/(사진|이미지|동영상)/.test(text)) {
    return '사진과 영상은 날짜 기준으로 묶고, 30일 이상 열지 않은 항목부터 보관함 이동 후보로 분류하겠습니다.';
  }

  if (/(태그|분류|업무|개인)/.test(text)) {
    return `업무 파일 ${summary.workFiles.length}개, 개인 파일 ${summary.personalFiles.length}개가 보여요. 태그가 없는 파일을 먼저 찾고, 프로젝트명 기준 태그를 추가하는 흐름이 좋습니다.`;
  }

  return '파일 목록을 기준으로 정리 우선순위, 태그 추천, 보관함 이동 후보를 함께 제안할 수 있습니다. “대용량 파일부터 정리해줘”처럼 요청해보세요.';
}

async function requestAiProxy(message, files) {
  if (!AI_PROXY_URL) {
    return null;
  }

  const response = await fetch(AI_PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      files: createFilePayload(files),
    }),
  });

  if (!response.ok) {
    throw new Error(`AI proxy request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.reply || data.text || data.message || null;
}

export async function createChatReply(message, files = []) {
  const text = message.trim();

  try {
    const proxyReply = await requestAiProxy(text, files);

    if (proxyReply) {
      return proxyReply;
    }
  } catch (error) {
    console.warn('AI proxy failed, falling back to local reply', error);
  }

  await new Promise((resolve) => setTimeout(resolve, 320));
  return createLocalChatReply(text, files);
}

export function createAutomaticAnalysis(files = []) {
  const summary = summarizeFiles(files);
  const totalMB = files.reduce((sum, item) => sum + parseFileSizeToMB(item.size), 0);
  const largeMB = summary.largeFiles.reduce((sum, item) => sum + parseFileSizeToMB(item.size), 0);
  const largeRatio = totalMB > 0 ? Math.round((largeMB / totalMB) * 100) : 0;
  const topRecommendations = [
    largeRatio >= 50
      ? '대용량 파일이 전체 사용량의 절반 이상입니다. 클라우드 이동 후보를 먼저 검토하세요.'
      : '파일 용량 분포는 비교적 안정적입니다. 최근 미사용 파일 위주로 정리하세요.',
    `100MB 이상 파일 ${summary.largeFiles.length}개를 우선 점검 대상으로 표시했습니다.`,
    '카테고리와 용량 기준을 함께 적용하면 정리 우선순위를 더 정확하게 잡을 수 있습니다.',
  ];

  return {
    status: largeRatio >= 50 ? '주의 필요' : '양호',
    largeRatio,
    summary: `대용량 파일 비중은 약 ${largeRatio}%이며, ${summary.largeFiles.length}개 파일이 정리 우선순위에 있습니다.`,
    recommendations: topRecommendations,
  };
}
