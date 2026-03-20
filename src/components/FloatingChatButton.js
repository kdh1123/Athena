import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadows, spacing } from '../styles/theme';

export default function FloatingChatButton({ onPress, onLongPress, showDelete, onPressDelete }) {
  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.button} onPress={onPress} onLongPress={onLongPress} delayLongPress={500}>
        <View style={styles.inner}>
          <Text style={styles.emoji}>AI</Text>
        </View>
      </Pressable>

      {showDelete ? (
        <Pressable style={styles.deleteBadge} onPress={onPressDelete} hitSlop={8}>
          <Text style={styles.deleteText}>X</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: spacing.lg,
    bottom: 96,
    width: 62,
    height: 62,
    zIndex: 20,
  },
  button: {
    width: 62,
    height: 62,
    borderRadius: radius.xl,
    backgroundColor: colors.point,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.card,
  },
  inner: {
    width: 54,
    height: 54,
    borderRadius: radius.xl,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    color: '#fff',
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  deleteBadge: {
    position: 'absolute',
    right: -8,
    top: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2f2a24',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    ...shadows.card,
  },
  deleteText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 13,
  },
});
