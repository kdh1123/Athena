import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionHeader from '../components/SectionHeader';
import { categoryOptions, fileItems } from '../styles/mockData';
import { colors, radius, shadows, spacing } from '../styles/theme';

export default function FileScreen() {
  const insets = useSafeAreaInsets();
  const [selectedTag, setSelectedTag] = useState('전체');
  const tags = ['전체', ...categoryOptions.filter((item) => item !== '전체'), '#업무', '#개인', '#사진', '#대용량'];

  const latestFive = useMemo(() => {
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

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingTop: spacing.md + insets.top * 0.25 }]}
    >
      <Text style={styles.pageTitle}>파일</Text>
      <Text style={styles.pageSubtitle}>전체 파일을 최신순으로 빠르게 확인하고 태그로 분류하세요.</Text>

      <SectionHeader title="태그 분류" />
      <View style={styles.rowWrap}>
        {tags.map((tag) => (
          <Pressable
            key={tag}
            onPress={() => setSelectedTag(tag)}
            style={[styles.chip, selectedTag === tag && styles.activeChip]}
          >
            <Text style={[styles.chipLabel, selectedTag === tag && styles.activeChipLabel]}>{tag}</Text>
          </Pressable>
        ))}
      </View>

      <SectionHeader title="최신 파일" rightLabel={`${latestFive.length}개`} />
      {latestFive.map((item) => (
        <View key={item.id} style={styles.fileRow}>
          <View style={styles.fileHead}>
            <Text style={styles.fileName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.fileSize}>{item.size}</Text>
          </View>
          <Text style={styles.fileMeta}>{item.category} · {item.modifiedAt} · #{item.tags.join(' #')}</Text>
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
