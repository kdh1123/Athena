import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionHeader from '../components/SectionHeader';
import { colors, radius, shadows, spacing } from '../styles/theme';

const sources = [
  { id: 'src-1', name: '사진', usedGB: 5, color: '#fa8e73' },
  { id: 'src-2', name: '동영상', usedGB: 9, color: '#dca06b' },
  { id: 'src-3', name: '문서', usedGB: 3, color: '#8aa7c8' },
  { id: 'src-4', name: '앱/기타 데이터', usedGB: 79, color: '#8ebf9f' },
];

const totalGB = 128;

export default function DeviceCapacityScreen() {
  const insets = useSafeAreaInsets();
  const usedTotal = sources.reduce((sum, item) => sum + item.usedGB, 0);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, { paddingTop: spacing.md + insets.top * 0.25 }]}>
      <Text style={styles.pageTitle}>기기 용량</Text>
      <Text style={styles.pageSubtitle}>어디에서 얼마나 차지하는지 한눈에 확인하세요.</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>총 사용량</Text>
        <Text style={styles.summaryValue}>{usedTotal}GB / {totalGB}GB</Text>
      </View>

      <View style={styles.card}>
        <SectionHeader title="용량 사용처" />
        {sources.map((item) => {
          const percent = Math.round((item.usedGB / totalGB) * 100);
          return (
            <View key={item.id} style={styles.sourceRow}>
              <View style={styles.rowHead}>
                <Text style={styles.sourceName}>{item.name}</Text>
                <Text style={styles.sourceSize}>{item.usedGB}GB ({percent}%)</Text>
              </View>
              <View style={styles.track}>
                <View style={[styles.fill, { width: `${percent}%`, backgroundColor: item.color }]} />
              </View>
            </View>
          );
        })}
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
  summaryCard: {
    backgroundColor: '#fff4dd',
    borderWidth: 1,
    borderColor: '#f7dfbf',
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.card,
  },
  summaryLabel: {
    color: colors.textMuted,
    fontSize: 12,
  },
  summaryValue: {
    marginTop: 2,
    color: colors.text,
    fontWeight: '800',
    fontSize: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  sourceRow: {
    marginBottom: spacing.sm,
  },
  rowHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sourceName: {
    color: colors.text,
    fontWeight: '600',
  },
  sourceSize: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  track: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#f5ecdd',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
});