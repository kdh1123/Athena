import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadows, spacing } from '../styles/theme';

export default function FloatingChatButton({ onPress, onLongPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress} onLongPress={onLongPress} delayLongPress={500}>
      <View style={styles.inner}>
        <Text style={styles.emoji}>AI</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: spacing.lg,
    bottom: 96,
    width: 62,
    height: 62,
    borderRadius: radius.xl,
    backgroundColor: colors.point,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.card,
    zIndex: 20,
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
});
