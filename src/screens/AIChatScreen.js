import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  FlatList,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPalette, spacing } from '../styles/theme';

const DRAWER_WIDTH = 280;

const seedMessages = [
  {
    id: 'm1',
    role: 'assistant',
    text: '안녕하세요! 파일 정리, 우선순위 추천, 용량 분석을 도와드릴게요.',
  },
];

export default function AIChatScreen({ darkMode }) {
  const insets = useSafeAreaInsets();
  const palette = getPalette(darkMode);
  const surface = darkMode ? '#1a212d' : '#f5eedf';
  const surfaceElevated = darkMode ? '#222c3c' : '#fffdf8';
  const divider = darkMode ? '#313d4e' : '#e8dcc3';
  const assistantStripe = darkMode ? '#93a9cf' : '#b28c64';
  const [messages, setMessages] = useState(seedMessages);
  const [input, setInput] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chatSearch, setChatSearch] = useState('');
  const [chatRooms, setChatRooms] = useState([
    { id: 'room-1', title: '새 정리 계획' },
    { id: 'room-2', title: '사진 정리 상담' },
    { id: 'room-3', title: '다운로드 폴더 점검' },
  ]);

  const drawerX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  const openDrawer = useCallback(() => {
    setDrawerOpen(true);
    Animated.timing(drawerX, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [drawerX]);

  const closeDrawer = useCallback(() => {
    Animated.timing(drawerX, {
      toValue: -DRAWER_WIDTH,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setDrawerOpen(false);
    });
  }, [drawerX]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 16,
        onPanResponderMove: (_, gestureState) => {
          const base = drawerOpen ? 0 : -DRAWER_WIDTH;
          const next = Math.max(-DRAWER_WIDTH, Math.min(0, base + gestureState.dx));
          drawerX.setValue(next);
        },
        onPanResponderRelease: (_, gestureState) => {
          if (!drawerOpen && gestureState.dx > 70) {
            openDrawer();
            return;
          }

          if (drawerOpen && gestureState.dx < -70) {
            closeDrawer();
            return;
          }

          if (drawerOpen) {
            openDrawer();
          } else {
            closeDrawer();
          }
        },
      }),
    [closeDrawer, drawerOpen, drawerX, openDrawer]
  );

  const filteredRooms = useMemo(() => {
    const needle = chatSearch.trim().toLowerCase();
    if (!needle) {
      return chatRooms;
    }
    return chatRooms.filter((room) => room.title.toLowerCase().includes(needle));
  }, [chatRooms, chatSearch]);

  const overlayOpacity = drawerX.interpolate({
    inputRange: [-DRAWER_WIDTH, 0],
    outputRange: [0, 0.24],
    extrapolate: 'clamp',
  });

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
      style={[styles.screen, { backgroundColor: palette.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 52 : 0}
    >
      <View style={[styles.content, { paddingTop: spacing.sm + insets.top * 0.15 }]} {...panResponder.panHandlers}>
        <View style={styles.topRow}>
          <Pressable style={[styles.menuButton, { backgroundColor: surfaceElevated }]} onPress={openDrawer}>
            <Ionicons name="menu" size={18} color={palette.text} />
          </Pressable>
          <View>
            <Text style={[styles.pageTitle, { color: palette.text }]}>AI 채팅</Text>
            <Text style={[styles.pageSubtitle, { color: palette.textMuted }]}>파일 정리와 분석을 대화로 진행하세요.</Text>
          </View>
          </View>

          <Pressable
            style={[styles.focusCard, { backgroundColor: palette.point }]}
            onPress={() => setInput('지금 바로 파일 정리 우선순위를 추천해줘')}
          >
            <Text style={styles.focusEyebrow}>핵심 기능</Text>
            <Text style={styles.focusTitle}>정리 우선순위 빠른 추천</Text>
            <Text style={styles.focusDescription}>분석 없이 바로 시작하려면 탭하세요.</Text>
          </Pressable>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.messageList, { backgroundColor: surfaceElevated, paddingBottom: spacing.sm }]}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <View style={[styles.messageRow, item.role === 'user' ? styles.userRow : styles.aiRow]}>
              {item.role === 'assistant' ? <View style={[styles.aiStripe, { backgroundColor: assistantStripe }]} /> : null}
              <View
                style={[
                  styles.messageBody,
                  item.role === 'user' ? [styles.userMessageBody, { backgroundColor: surface }] : styles.aiMessageBody,
                ]}
              >
                <Text style={[styles.bubbleText, { color: palette.text }]}>{item.text}</Text>
              </View>
            </View>
          )}
        />

        <View style={[styles.inputRow, { backgroundColor: surface, paddingBottom: Math.max(insets.bottom, spacing.xs) }]}> 
          <Pressable style={[styles.attachButton, { backgroundColor: surfaceElevated }]} onPress={onPressAttach}>
            <Ionicons name="attach" size={18} color={palette.text} />
          </Pressable>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="메시지를 입력하세요"
            placeholderTextColor={palette.textMuted}
            style={[styles.input, { color: palette.text }]}
            multiline
          />
          <Pressable style={[styles.sendButton, { backgroundColor: palette.point }, !canSend && styles.sendButtonDisabled]} onPress={onSend}>
            <Ionicons name="arrow-up" size={16} color="#fff" />
          </Pressable>
        </View>

        <Animated.View
          pointerEvents={drawerOpen ? 'auto' : 'none'}
          style={[styles.overlay, { opacity: overlayOpacity }]}
        >
          <Pressable style={styles.overlayTouch} onPress={closeDrawer} />
        </Animated.View>

        <Animated.View
          style={[
            styles.drawer,
            {
              backgroundColor: surfaceElevated,
              paddingTop: insets.top + spacing.sm,
              transform: [{ translateX: drawerX }],
            },
          ]}
        >
          <Pressable
            style={[styles.newChatButton, { backgroundColor: surface }]}
            onPress={() => {
              setChatRooms((prev) => [{ id: `room-${Date.now()}`, title: '새 채팅' }, ...prev]);
              closeDrawer();
            }}
          >
            <Ionicons name="add" size={18} color={palette.text} />
            <Text style={styles.newChatText}>새 채팅</Text>
          </Pressable>

          <TextInput
            value={chatSearch}
            onChangeText={setChatSearch}
            placeholder="검색하기"
            placeholderTextColor={palette.textMuted}
            style={[styles.searchInput, { backgroundColor: surface, color: palette.text }]}
          />

          <View style={styles.roomList}>
            {filteredRooms.map((room) => (
              <Pressable key={room.id} style={[styles.roomItem, { borderBottomColor: divider }]} onPress={closeDrawer}>
                <Text style={[styles.roomTitle, { color: palette.text }]} numberOfLines={1}>{room.title}</Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  menuButton: {
    width: 36,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
  },
  pageSubtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  focusCard: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 10,
    marginBottom: spacing.md,
  },
  focusEyebrow: {
    color: '#fff5f2',
    fontSize: 11,
    letterSpacing: 0.4,
    marginBottom: 4,
    fontWeight: '600',
  },
  focusTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
  focusDescription: {
    color: '#fff8f6',
    fontSize: 13,
    marginTop: 6,
  },
  messageList: {
    flexGrow: 1,
    borderRadius: 10,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.sm,
  },
  messageRow: {
    marginBottom: spacing.md,
    flexDirection: 'row',
    maxWidth: '88%',
  },
  aiRow: {
    alignSelf: 'flex-start',
  },
  userRow: {
    alignSelf: 'flex-end',
    marginBottom: spacing.sm,
  },
  aiStripe: {
    width: 3,
    borderRadius: 2,
    marginRight: spacing.sm,
  },
  messageBody: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  aiMessageBody: {
    paddingLeft: 0,
  },
  userMessageBody: {
    borderRadius: 9,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  bubbleText: {
    lineHeight: 21,
    fontSize: 15,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: spacing.xs,
    paddingHorizontal: spacing.xs,
    borderRadius: 10,
  },
  attachButton: {
    width: 36,
    height: 38,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.xs,
  },
  input: {
    flex: 1,
    minHeight: 38,
    maxHeight: 84,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs + 1,
  },
  sendButton: {
    width: 36,
    height: 38,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.xs,
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: 20,
  },
  overlayTouch: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    paddingHorizontal: spacing.sm,
    zIndex: 30,
  },
  newChatButton: {
    borderRadius: 8,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: 8,
    marginBottom: spacing.sm,
  },
  newChatText: {
    color: '#1f1a16',
    fontWeight: '700',
    fontSize: 14,
  },
  searchInput: {
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    fontSize: 14,
  },
  roomList: {
    marginTop: spacing.sm,
  },
  roomItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  roomTitle: {
    fontWeight: '500',
    fontSize: 15,
  },
});