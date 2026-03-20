import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionHeader from '../components/SectionHeader';
import { fileItems } from '../styles/mockData';
import { colors, radius, shadows, spacing } from '../styles/theme';

export default function FileListScreen() {
  const insets = useSafeAreaInsets();

  const sortedFiles = useMemo(
    () => [...fileItems].sort((a, b) => new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime()),
    []
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingTop: spacing.lg + insets.top * 0.45 }]}
    >
      <Text style={styles.pageTitle}>파일 목록</Text>
      <Text style={styles.pageSubtitle}>최신순 전체 파일을 확인하세요.</Text>

      <View style={styles.card}>
        <SectionHeader title="전체 파일" rightLabel={`${sortedFiles.length}개`} />
        {sortedFiles.map((item) => (
          <View key={item.id} style={styles.fileRow}>
            <View style={styles.fileHead}>
              <Text style={styles.fileName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.fileSize}>{item.size}</Text>
            </View>
            <Text style={styles.fileMeta}>{item.category} · {item.modifiedAt} · #{item.tags.join(' #')}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
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
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  fileRow: {
    backgroundColor: '#fffef8',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.xs,
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