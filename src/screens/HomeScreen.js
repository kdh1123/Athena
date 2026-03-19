import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import SectionHeader from '../components/SectionHeader';
import StorageBar from '../components/StorageBar';
import { recentActivities, recommendedActions } from '../styles/mockData';
import { colors, radius, shadows, spacing } from '../styles/theme';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>Athena</Text>
      <Text style={styles.pageSubtitle}>AI 기반 파일 관리 대시보드</Text>

      <TextInput
        placeholder="파일 이름, 태그, 카테고리 검색"
        placeholderTextColor={colors.textMuted}
        style={styles.searchInput}
      />

      <View style={styles.sectionBlock}>
        <SectionHeader title="추천 정리" rightLabel="모두 보기" />
        {recommendedActions.map((action) => (
          <View key={action.id} style={styles.recommendCard}>
            <View style={[styles.dot, { backgroundColor: action.color }]} />
            <View style={styles.recommendTextWrap}>
              <Text style={styles.recommendTitle}>{action.title}</Text>
              <Text style={styles.recommendSubtitle}>{action.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sectionBlock}>
        <SectionHeader title="기기 저장 현황" />
        <StorageBar usedGB={96} totalGB={128} />
      </View>

      <View style={styles.sectionBlock}>
        <SectionHeader title="최근 활동" />
        {recentActivities.map((activity) => (
          <View key={activity.id} style={styles.activityRow}>
            <Text style={styles.activityText}>{activity.text}</Text>
            <Text style={styles.activityTime}>{activity.time}</Text>
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
    padding: spacing.md,
    paddingBottom: 110,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.text,
  },
  pageSubtitle: {
    marginTop: spacing.xs,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  searchInput: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#fff',
    paddingHorizontal: spacing.md,
    paddingVertical: 13,
  },
  sectionBlock: {
    marginTop: spacing.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  recommendCard: {
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
    borderRadius: 5,
    marginTop: 6,
    marginRight: spacing.sm,
  },
  recommendTextWrap: {
    flex: 1,
  },
  recommendTitle: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 14,
  },
  recommendSubtitle: {
    color: colors.textMuted,
    marginTop: 3,
    fontSize: 12,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  activityText: {
    color: colors.text,
    fontSize: 14,
  },
  activityTime: {
    color: colors.textMuted,
    fontSize: 12,
  },
});
