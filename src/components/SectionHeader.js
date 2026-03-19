import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../styles/theme';

export default function SectionHeader({ title, rightLabel }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {rightLabel ? <Text style={styles.rightLabel}>{rightLabel}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  rightLabel: {
    fontSize: 13,
    color: colors.point,
    fontWeight: '600',
  },
});
