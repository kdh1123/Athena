import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../styles/theme';

export default function SectionHeader({
  title,
  rightLabel,
  onPressTitle,
  onPressRight,
  titleColor,
  rightLabelColor,
}) {
  return (
    <View style={styles.row}>
      {onPressTitle ? (
        <Pressable onPress={onPressTitle} hitSlop={8}>
          <Text style={[styles.title, titleColor ? { color: titleColor } : null]}>{title}</Text>
        </Pressable>
      ) : (
        <Text style={[styles.title, titleColor ? { color: titleColor } : null]}>{title}</Text>
      )}

      {rightLabel ? (
        onPressRight ? (
          <Pressable onPress={onPressRight} hitSlop={8}>
            <Text style={[styles.rightLabel, rightLabelColor ? { color: rightLabelColor } : null]}>{rightLabel}</Text>
          </Pressable>
        ) : (
          <Text style={[styles.rightLabel, rightLabelColor ? { color: rightLabelColor } : null]}>{rightLabel}</Text>
        )
      ) : null}
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
