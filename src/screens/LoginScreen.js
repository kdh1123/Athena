import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LogoMark from '../components/LogoMark';
import { getAuthErrorMessage, sendPasswordReset, signInWithEmail } from '../services/authService';
import { getPalette, radius, shadows, spacing } from '../styles/theme';

export default function LoginScreen({ navigation, darkMode }) {
  const insets = useSafeAreaInsets();
  const palette = getPalette(darkMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const emailPattern = /^\S+@\S+$/;

  const submit = async () => {
    if (!email.trim() || password.length < 6) {
      Alert.alert('입력 확인', '이메일과 6자리 이상의 비밀번호를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      await signInWithEmail(email.trim(), password);
    } catch (error) {
      Alert.alert('로그인 실패', getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetPassword = async () => {
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      Alert.alert('이메일 필요', '비밀번호를 재설정할 이메일을 먼저 입력해주세요.');
      return;
    }

    if (!emailPattern.test(cleanEmail)) {
      Alert.alert('입력 확인', '이메일 형식이 올바르지 않습니다.');
      return;
    }

    setIsResetting(true);

    try {
      await sendPasswordReset(cleanEmail);
      Alert.alert('메일 전송 완료', '입력한 이메일로 비밀번호 재설정 링크를 보냈습니다.');
    } catch (error) {
      Alert.alert('메일 전송 실패', getAuthErrorMessage(error));
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { backgroundColor: palette.background, paddingTop: insets.top + spacing.xl }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.logoWrap}>
        <LogoMark size={112} />
        <Text style={[styles.title, { color: palette.text }]}>Athena</Text>
        <Text style={[styles.subtitle, { color: palette.textMuted }]}>AI 파일 관리를 시작하세요.</Text>
      </View>

      <View style={[styles.formCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="이메일"
          placeholderTextColor={palette.textMuted}
          style={[styles.input, { borderColor: palette.border, color: palette.text }]}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="비밀번호"
          placeholderTextColor={palette.textMuted}
          style={[styles.input, { borderColor: palette.border, color: palette.text }]}
        />
        <Pressable
          style={[styles.primaryButton, { backgroundColor: palette.point }, isSubmitting && styles.disabledButton]}
          onPress={submit}
          disabled={isSubmitting}
        >
          <Text style={styles.primaryButtonText}>{isSubmitting ? '로그인 중' : '로그인'}</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('SignUp')}>
          <Text style={[styles.secondaryButtonText, { color: palette.point }]}>회원가입</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={resetPassword} disabled={isResetting}>
          <Text style={[styles.secondaryButtonText, { color: palette.textMuted }]}>
            {isResetting ? '재설정 메일 전송 중' : '비밀번호를 잊으셨나요?'}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginTop: spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    marginTop: spacing.xs,
  },
  formCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  input: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: spacing.sm,
  },
  primaryButton: {
    borderRadius: radius.md,
    alignItems: 'center',
    paddingVertical: 13,
    marginTop: spacing.xs,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 15,
  },
  disabledButton: {
    opacity: 0.65,
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    marginTop: spacing.xs,
  },
  secondaryButtonText: {
    fontWeight: '700',
  },
});
