import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionHeader from '../components/SectionHeader';
import { recommendedActions } from '../styles/mockData';
import { getPalette, radius, shadows, spacing } from '../styles/theme';

export default function RecommendationListScreen({ darkMode }) {
  const insets = useSafeAreaInsets();
  const palette = getPalette(darkMode);

  return (
    <ScrollView style={[styles.screen, { backgroundColor: palette.background }]} contentContainerStyle={[styles.content, { paddingTop: spacing.lg + insets.top * 0.45 + 5 }]}> 
      <Text style={[styles.pageTitle, { color: palette.text }]}>추천 정리 목록</Text>
      <Text style={[styles.pageSubtitle, { color: palette.textMuted }]}>AI가 우선순위 기반으로 정리 대상을 추천합니다.</Text>

      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}> 
        <SectionHeader title="전체 추천" rightLabel={`${recommendedActions.length}개`} />
        {recommendedActions.map((action) => (
          <View key={action.id} style={[styles.item, { borderColor: palette.border, backgroundColor: darkMode ? '#151c27' : '#fffef8' }]}> 
            <View style={[styles.dot, { backgroundColor: action.color }]} />
            <View style={styles.textWrap}>
              <Text style={[styles.itemTitle, { color: palette.text }]}>{action.title}</Text>
              <Text style={[styles.itemSub, { color: palette.textMuted }]}>{action.subtitle}</Text>
            </View>
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
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    marginTop: 6,
    marginRight: spacing.sm,
  },
  textWrap: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: '700',
    fontSize: 14,
  },
  itemSub: {
    marginTop: 3,
    fontSize: 12,
  },
});