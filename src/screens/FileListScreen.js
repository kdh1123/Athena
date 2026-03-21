import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionHeader from '../components/SectionHeader';
import { fileItems } from '../styles/mockData';
import { getPalette, radius, shadows, spacing } from '../styles/theme';

export default function FileListScreen({ darkMode }) {
  const insets = useSafeAreaInsets();
  const palette = getPalette(darkMode);

  const sortedFiles = useMemo(
    () => [...fileItems].sort((a, b) => new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime()),
    []
  );

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: palette.background }]}
      contentContainerStyle={[styles.content, { paddingTop: spacing.lg + insets.top * 0.45 + 5 }]}
    >
      <Text style={[styles.pageTitle, { color: palette.text }]}>파일 목록</Text>
      <Text style={[styles.pageSubtitle, { color: palette.textMuted }]}>최신순 전체 파일을 확인하세요.</Text>

      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}> 
        <SectionHeader title="전체 파일" rightLabel={`${sortedFiles.length}개`} />
        {sortedFiles.map((item) => (
          <View key={item.id} style={[styles.fileRow, { borderColor: palette.border, backgroundColor: darkMode ? '#151c27' : '#fffef8' }]}> 
            <View style={styles.fileHead}>
              <Text style={[styles.fileName, { color: palette.text }]} numberOfLines={1}>{item.name}</Text>
              <Text style={[styles.fileSize, { color: palette.point }]}>{item.size}</Text>
            </View>
            <Text style={[styles.fileMeta, { color: palette.textMuted }]}>{item.category} · {item.modifiedAt} · #{item.tags.join(' #')}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
  },
  pageSubtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  card: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  fileRow: {
    borderWidth: 1,
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
    fontWeight: '700',
  },
  fileSize: {
    fontSize: 12,
    fontWeight: '700',
  },
  fileMeta: {
    marginTop: 4,
    fontSize: 12,
  },
});