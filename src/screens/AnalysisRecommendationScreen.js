import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionHeader from '../components/SectionHeader';
import { analysisRecommendations } from '../styles/mockData';
import { getPalette, radius, shadows, spacing } from '../styles/theme';

export default function AnalysisRecommendationScreen({ route }) {
  const insets = useSafeAreaInsets();
  const darkMode = route?.params?.darkMode ?? false;
  const palette = getPalette(darkMode);

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: palette.background }]}
      contentContainerStyle={[styles.content, { paddingTop: spacing.lg + insets.top * 0.45 + 5 }]}
    >
      <Text style={[styles.pageTitle, { color: palette.text }]}>개선 제안 전체</Text>
      <Text style={[styles.pageSubtitle, { color: palette.textMuted }]}>AI가 제안한 정리 항목을 확인하고 채택하세요.</Text>

      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}> 
        <SectionHeader title="전체 제안" rightLabel={`${analysisRecommendations.length}개`} />
        {analysisRecommendations.length === 0 ? (
          <Text style={[styles.emptyText, { color: palette.success }]}>사용자님의 파일은 정말 깨끗해요!</Text>
        ) : (
          analysisRecommendations.map((item) => (
            <View key={item.id} style={[styles.row, { backgroundColor: darkMode ? '#151c27' : '#fffef9', borderColor: palette.border }]}> 
              <View style={styles.rowTextWrap}>
                <Text style={[styles.rowTitle, { color: palette.text }]}>{item.title}</Text>
                <Text style={[styles.rowDesc, { color: palette.textMuted }]}>{item.description}</Text>
              </View>
              <Pressable style={[styles.applyButton, { backgroundColor: palette.point }]}>
                <Text style={styles.applyButtonText}>채택하기</Text>
              </Pressable>
            </View>
          ))
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTextWrap: {
    flex: 1,
    marginRight: spacing.sm,
  },
  rowTitle: {
    fontWeight: '700',
    marginBottom: 2,
  },
  rowDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
  applyButton: {
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '700',
    paddingVertical: spacing.sm,
  },
});