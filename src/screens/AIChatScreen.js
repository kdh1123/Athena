import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useMemo, useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, shadows, spacing } from '../styles/theme';

const seedMessages = [
  {
    id: 'm1',
    role: 'assistant',
    text: '안녕하세요! 파일 정리, 우선순위 추천, 용량 분석을 도와드릴게요.',
  },
];

export default function AIChatScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState(seedMessages);
  const [input, setInput] = useState('');

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  const onSend = () => {
    if (!canSend) {
      return;
    }

    const userText = input.trim();
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: 'user', text: userText },
      {
        id: `a-${Date.now()}`,
        role: 'assistant',
        text: '요청을 확인했어요. 파일 우선순위와 정리 제안을 바로 계산해볼게요. (데모 응답)',
      },
    ]);
    setInput('');
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('권한 필요', '사진 첨부를 위해 사진 라이브러리 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length) {
      const picked = result.assets[0];
      setMessages((prev) => [
        ...prev,
        { id: `f-${Date.now()}`, role: 'user', text: `사진 첨부: ${picked.fileName || 'image.jpg'}` },
      ]);
    }
  };

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (!result.canceled && result.assets?.length) {
      setMessages((prev) => [
        ...prev,
        { id: `d-${Date.now()}`, role: 'user', text: `파일 첨부: ${result.assets[0].name}` },
      ]);
    }
  };

  const onPressAttach = () => {
    Alert.alert('첨부 선택', '사진 또는 파일을 첨부할 수 있습니다.', [
      { text: '사진', onPress: pickImage },
      { text: '파일', onPress: pickFile },
      { text: '취소', style: 'cancel' },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={10}
    >
      <View style={[styles.content, { paddingTop: spacing.sm + insets.top * 0.2 }]}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          renderItem={({ item }) => (
            <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.aiBubble]}>
              <Text style={[styles.bubbleText, item.role === 'user' && styles.userBubbleText]}>{item.text}</Text>
            </View>
          )}
        />

        <View style={[styles.inputRow, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
          <Pressable style={styles.attachButton} onPress={onPressAttach}>
            <Ionicons name="attach" size={18} color={colors.text} />
          </Pressable>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="메시지를 입력하세요"
            placeholderTextColor={colors.textMuted}
            style={styles.input}
            multiline
          />
          <Pressable style={[styles.sendButton, !canSend && styles.sendButtonDisabled]} onPress={onSend}>
            <Ionicons name="arrow-up" size={16} color="#fff" />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  messageList: {
    paddingBottom: spacing.sm,
  },
  bubble: {
    maxWidth: '82%',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    marginBottom: spacing.xs,
    ...shadows.card,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff8df',
    borderWidth: 1,
    borderColor: '#f1e4be',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.point,
  },
  bubbleText: {
    color: colors.text,
    lineHeight: 20,
  },
  userBubbleText: {
    color: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: spacing.xs,
  },
  attachButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginRight: spacing.xs,
  },
  input: {
    flex: 1,
    minHeight: 38,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: '#fff',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    color: colors.text,
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.point,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.xs,
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
});