import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionHeader from '../components/SectionHeader';
import { recommendedActions } from '../styles/mockData';
import { colors, radius, shadows, spacing } from '../styles/theme';

export default function RecommendationListScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, { paddingTop: spacing.lg + insets.top * 0.45 }]}> 
      <Text style={styles.pageTitle}>추천 정리 목록</Text>
      <Text style={styles.pageSubtitle}>AI가 우선순위 기반으로 정리 대상을 추천합니다.</Text>

      <View style={styles.card}>
        <SectionHeader title="전체 추천" rightLabel={`${recommendedActions.length}개`} />
        {recommendedActions.map((action) => (
          <View key={action.id} style={styles.item}>
            <View style={[styles.dot, { backgroundColor: action.color }]} />
            <View style={styles.textWrap}>
              <Text style={styles.itemTitle}>{action.title}</Text>
              <Text style={styles.itemSub}>{action.subtitle}</Text>
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
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: radius.md,
    backgroundColor: '#fffef8',
    borderWidth: 1,
    borderColor: colors.border,
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
    color: colors.text,
    fontWeight: '700',
    fontSize: 14,
  },
  itemSub: {
    color: colors.textMuted,
    marginTop: 3,
    fontSize: 12,
  },
});