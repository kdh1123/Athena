import * as DocumentPicker from 'expo-document-picker';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionHeader from '../components/SectionHeader';
import { categoryOptions, fileItems } from '../styles/mockData';
import { getPalette, radius, shadows, spacing } from '../styles/theme';

export default function FileScreen({ navigation, darkMode }) {
  const insets = useSafeAreaInsets();
  const palette = getPalette(darkMode);
  const [selectedTag, setSelectedTag] = useState('전체');
  const [customTags, setCustomTags] = useState([]);
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const tags = [
    '전체',
    ...categoryOptions.filter((item) => item !== '전체'),
    '#업무',
    '#개인',
    '#사진',
    '#대용량',
    ...customTags,
  ];

  const filteredFiles = useMemo(() => {
    const sorted = [...fileItems].sort(
      (a, b) => new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime()
    );

    const filtered = sorted.filter((item) => {
      if (selectedTag === '전체') {
        return true;
      }

      if (selectedTag.startsWith('#')) {
        return item.tags.includes(selectedTag.replace('#', ''));
      }

      return item.category === selectedTag;
    });

    return filtered.slice(0, 5);
  }, [selectedTag]);

  const onImportFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (!result.canceled && result.assets?.length) {
      Alert.alert('파일 선택 완료', `${result.assets[0].name} 파일을 불러왔습니다.`);
    }
  };

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: palette.background }]}
      contentContainerStyle={[styles.content, { paddingTop: spacing.lg + insets.top * 0.45 + 5 }]}
    >
      <Text style={[styles.pageTitle, { color: palette.text }]}>파일</Text>
      <Text style={[styles.pageSubtitle, { color: palette.textMuted }]}>전체 파일을 최신순으로 빠르게 확인하고 태그로 분류하세요.</Text>

      <Pressable style={[styles.uploadBox, { borderColor: palette.border, backgroundColor: darkMode ? '#151c27' : '#fffef8' }]} onPress={onImportFile}>
        <Text style={[styles.uploadTitle, { color: palette.text }]}>파일 불러오기</Text>
        <Text style={[styles.uploadSub, { color: palette.textMuted }]}>탭해서 파일 선택 창을 열 수 있습니다.</Text>
      </Pressable>

      <SectionHeader
        title="태그 분류"
        rightLabel="태그 생성하기"
        onPressRight={() => setShowTagInput((prev) => !prev)}
      />
      {showTagInput ? (
        <View style={styles.tagComposer}>
          <TextInput
            value={tagInput}
            onChangeText={setTagInput}
            placeholder="새 태그 입력 (예: 여행)"
            placeholderTextColor={palette.textMuted}
            style={[styles.tagInput, { borderColor: palette.border, backgroundColor: palette.card, color: palette.text }]}
          />
          <Pressable
            style={[styles.createButton, { backgroundColor: palette.point }]}
            onPress={() => {
              const clean = tagInput.trim();
              if (!clean) {
                return;
              }

              const tag = clean.startsWith('#') ? clean : `#${clean}`;
              if (!tags.includes(tag)) {
                setCustomTags((prev) => [...prev, tag]);
              }
              setSelectedTag(tag);
              setTagInput('');
              setShowTagInput(false);
            }}
          >
            <Text style={styles.createButtonText}>생성</Text>
          </Pressable>
        </View>
      ) : null}
      <View style={styles.rowWrap}>
        {tags.map((tag) => (
          <Pressable
            key={tag}
            onPress={() => setSelectedTag(tag)}
            style={[
              styles.chip,
              { borderColor: palette.border, backgroundColor: palette.card },
              selectedTag === tag && [styles.activeChip, { backgroundColor: palette.main, borderColor: palette.main }],
            ]}
          >
            <Text style={[styles.chipLabel, { color: palette.textMuted }, selectedTag === tag && [styles.activeChipLabel, { color: palette.text }]]}>{tag}</Text>
          </Pressable>
        ))}
      </View>

      <SectionHeader title="파일 목록" rightLabel="모두 보기" onPressRight={() => navigation.navigate('FileList', { darkMode })} />
      {filteredFiles.map((item) => (
        <View key={item.id} style={[styles.fileRow, { borderColor: palette.border, backgroundColor: palette.card }]}> 
          <View style={styles.fileHead}>
            <Text style={[styles.fileName, { color: palette.text }]} numberOfLines={1}>{item.name}</Text>
            <Text style={[styles.fileSize, { color: palette.point }]}>{item.size}</Text>
          </View>
          <Text style={[styles.fileMeta, { color: palette.textMuted }]}>{item.category} · {item.modifiedAt} · #{item.tags.join(' #')}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: 110,
  },
  pageTitle: {
    fontSize: 26,
    color: colors.text,
    fontWeight: '800',
  },
  pageSubtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    color: colors.textMuted,
  },
  uploadBox: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#d8cab5',
    borderRadius: radius.md,
    backgroundColor: '#fffef8',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  uploadTitle: {
    color: colors.text,
    fontWeight: '700',
  },
  uploadSub: {
    color: colors.textMuted,
    marginTop: 3,
    fontSize: 12,
  },
  tagComposer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  tagInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: '#fff',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    color: colors.text,
  },
  createButton: {
    marginLeft: spacing.xs,
    backgroundColor: colors.point,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  chip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#fff',
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  activeChip: {
    backgroundColor: colors.main,
    borderColor: colors.main,
  },
  chipLabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
  },
  activeChipLabel: {
    color: colors.text,
  },
  fileRow: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.xs,
    ...shadows.card,
  },
  fileHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fileName: {
    flex: 1,
    marginRight: spacing.xs,
    color: colors.text,
    fontWeight: '700',
  },
  fileSize: {
    color: colors.point,
    fontSize: 12,
    fontWeight: '700',
  },
  fileMeta: {
    marginTop: 4,
    color: colors.textMuted,
    fontSize: 12,
  },
});
