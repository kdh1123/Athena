import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../styles/theme';

export default function TagItem({ label, active }) {
  return (
    <View style={[styles.tag, active && styles.activeTag]}>
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#fff',
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  activeTag: {
    backgroundColor: colors.main,
    borderColor: colors.main,
  },
  label: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
  },
  activeLabel: {
    color: colors.text,
  },
});
