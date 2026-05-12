import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../styles/theme';

export default function StorageBar({ usedGB, totalGB }) {
  const usedRatio = Math.min(usedGB / totalGB, 1);
  const usedPercent = Math.round(usedRatio * 100);
  const usedLabel = usedGB >= 1 ? `${usedGB.toFixed(1)}GB` : `${Math.round(usedGB * 1024)}MB`;

  return (
    <View style={styles.container}>
      <View style={styles.labels}>
        <Text style={styles.title}>저장 용량</Text>
        <Text style={styles.value}>
          {usedLabel} / {totalGB}GB ({usedPercent}%)
        </Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.progress, { width: `${usedPercent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.sm,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '700',
  },
  track: {
    width: '100%',
    height: 12,
    borderRadius: radius.xl,
    backgroundColor: '#f7efe5',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: radius.xl,
    backgroundColor: colors.point,
  },
});
