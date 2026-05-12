import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionHeader from '../components/SectionHeader';
import { useFileLibrary } from '../context/FileLibraryContext';
import { getPalette, radius, shadows, spacing } from '../styles/theme';

export default function FavoriteListScreen({ darkMode }) {
  const insets = useSafeAreaInsets();
  const palette = getPalette(darkMode);
  const { favorites } = useFileLibrary();

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: palette.background }]}
      contentContainerStyle={[styles.content, { paddingTop: spacing.lg + insets.top * 0.45 + 5 }]}
    >
      <Text style={[styles.pageTitle, { color: palette.text }]}>즐겨찾기</Text>
      <Text style={[styles.pageSubtitle, { color: palette.textMuted }]}>즐겨찾기한 파일 전체 목록입니다.</Text>

      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}> 
        <SectionHeader
          title="전체 즐겨찾기"
          rightLabel={`${favorites.length}개`}
          titleColor={palette.text}
          rightLabelColor={palette.point}
        />
        {favorites.map((item) => (
          <View key={item.id} style={[styles.row, { backgroundColor: darkMode ? '#151c27' : '#fffef8', borderColor: palette.border }]}> 
            <Text style={[styles.rowTitle, { color: palette.text }]} numberOfLines={1}>{item.name}</Text>
            <Text style={[styles.rowMeta, { color: palette.textMuted }]}>{item.category} · {item.size}</Text>
          </View>
        ))}
        {favorites.length === 0 ? (
          <Text style={[styles.emptyText, { color: palette.textMuted }]}>즐겨찾기한 실제 파일이 아직 없습니다.</Text>
        ) : null}
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
  row: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.xs,
  },
  rowTitle: {
    fontWeight: '700',
  },
  rowMeta: {
    fontSize: 12,
    marginTop: 2,
  },
  emptyText: {
    fontSize: 13,
    fontWeight: '600',
    paddingVertical: spacing.sm,
  },
});
