import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionHeader from '../components/SectionHeader';
import { bytesToDisplaySize, useFileLibrary } from '../context/FileLibraryContext';
import { getPalette, radius, shadows, spacing } from '../styles/theme';

const totalGB = 128;

export default function DeviceCapacityScreen({ darkMode }) {
  const insets = useSafeAreaInsets();
  const palette = getPalette(darkMode);
  const { usage, totalBytes, totalSizeLabel } = useFileLibrary();

  return (
    <ScrollView style={[styles.screen, { backgroundColor: palette.background }]} contentContainerStyle={[styles.content, { paddingTop: spacing.lg + insets.top * 0.45 + 5 }]}> 
      <Text style={[styles.pageTitle, { color: palette.text }]}>기기 용량</Text>
      <Text style={[styles.pageSubtitle, { color: palette.textMuted }]}>어디에서 얼마나 차지하는지 한눈에 확인하세요.</Text>

      <View style={[styles.summaryCard, { backgroundColor: darkMode ? '#1a212d' : '#fff4dd', borderColor: darkMode ? palette.border : '#f7dfbf' }]}> 
        <Text style={[styles.summaryLabel, { color: palette.textMuted }]}>총 사용량</Text>
        <Text style={[styles.summaryValue, { color: palette.text }]}>{totalSizeLabel} / {totalGB}GB</Text>
      </View>

      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}> 
        <SectionHeader title="용량 사용처" titleColor={palette.text} />
        {usage.map((item) => {
          const percent = item.percent;
          return (
            <View key={item.label} style={styles.sourceRow}>
              <View style={styles.rowHead}>
                <Text style={[styles.sourceName, { color: palette.text }]}>{item.label}</Text>
                <Text style={[styles.sourceSize, { color: palette.textMuted }]}>{bytesToDisplaySize(item.bytes)} ({totalBytes ? percent : 0}%)</Text>
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
