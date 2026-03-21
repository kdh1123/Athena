import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getPalette, radius, shadows, spacing } from '../styles/theme';

export default function FloatingChatButton({ onPress, onLongPress, showDelete, onPressDelete, darkMode }) {
  const palette = getPalette(darkMode);

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={[styles.button, { backgroundColor: palette.point }]}
        onPress={onPress}
        onLongPress={onLongPress}
        delayLongPress={500}
      >
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
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d0d0d0',
    ...shadows.card,
  },
  deleteText: {
    color: '#7a7a7a',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 13,
  },
});
