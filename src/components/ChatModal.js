import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, shadows, spacing } from '../styles/theme';

export default function ChatModal({ visible, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.panel} onPress={() => {}}>
          <View style={styles.header}>
            <Text style={styles.title}>Athena AI Assistant</Text>
            <Pressable onPress={onClose}>
              <Text style={styles.close}>닫기</Text>
            </Pressable>
          </View>

          <View style={styles.messageBox}>
            <Text style={styles.botLabel}>AI</Text>
            <Text style={styles.message}>
              안녕하세요! 파일 정리 계획을 도와드릴 준비가 되었어요. (UI 데모)
            </Text>
          </View>

          <TextInput
            editable={false}
            placeholder="메시지 입력 (기능 미구현)"
            placeholderTextColor={colors.textMuted}
            style={styles.input}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  panel: {
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.md,
    paddingBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  close: {
    color: colors.point,
    fontWeight: '700',
  },
  messageBox: {
    backgroundColor: '#fff8df',
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  botLabel: {
    fontSize: 12,
    color: colors.sub,
    marginBottom: spacing.xs,
    fontWeight: '700',
  },
  message: {
    color: colors.text,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#fffcf2',
  },
});
