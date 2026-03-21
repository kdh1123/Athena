import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionHeader from '../components/SectionHeader';
import { getPalette, radius, shadows, spacing } from '../styles/theme';

const sources = [
  { id: 'src-1', name: '사진', usedGB: 5, color: '#fa8e73' },
  { id: 'src-2', name: '동영상', usedGB: 9, color: '#dca06b' },
  { id: 'src-3', name: '문서', usedGB: 3, color: '#8aa7c8' },
  { id: 'src-4', name: '앱/기타 데이터', usedGB: 79, color: '#8ebf9f' },
];

const totalGB = 128;

export default function DeviceCapacityScreen({ darkMode }) {
  const insets = useSafeAreaInsets();
  const palette = getPalette(darkMode);
  const usedTotal = sources.reduce((sum, item) => sum + item.usedGB, 0);

  return (
    <ScrollView style={[styles.screen, { backgroundColor: palette.background }]} contentContainerStyle={[styles.content, { paddingTop: spacing.lg + insets.top * 0.45 + 5 }]}> 
      <Text style={[styles.pageTitle, { color: palette.text }]}>기기 용량</Text>
      <Text style={[styles.pageSubtitle, { color: palette.textMuted }]}>어디에서 얼마나 차지하는지 한눈에 확인하세요.</Text>

      <View style={[styles.summaryCard, { backgroundColor: darkMode ? '#1a212d' : '#fff4dd', borderColor: darkMode ? palette.border : '#f7dfbf' }]}> 
        <Text style={[styles.summaryLabel, { color: palette.textMuted }]}>총 사용량</Text>
        <Text style={[styles.summaryValue, { color: palette.text }]}>{usedTotal}GB / {totalGB}GB</Text>
      </View>

      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}> 
        <SectionHeader title="용량 사용처" />
        {sources.map((item) => {
          const percent = Math.round((item.usedGB / totalGB) * 100);
          return (
            <View key={item.id} style={styles.sourceRow}>
              <View style={styles.rowHead}>
                <Text style={[styles.sourceName, { color: palette.text }]}>{item.name}</Text>
                <Text style={[styles.sourceSize, { color: palette.textMuted }]}>{item.usedGB}GB ({percent}%)</Text>
              </View>
              <View style={[styles.track, { backgroundColor: darkMode ? '#2a3343' : '#f5ecdd' }]}>
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
  summaryCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.card,
  },
  summaryLabel: {
    fontSize: 12,
  },
  summaryValue: {
    marginTop: 2,
    fontWeight: '800',
    fontSize: 24,
  },
  card: {
    borderWidth: 1,
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
    fontWeight: '600',
  },
  sourceSize: {
    fontSize: 12,
    fontWeight: '700',
  },
  track: {
    height: 10,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
});