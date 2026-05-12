import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LogoMark from '../components/LogoMark';
import { getAuthErrorMessage, signUpWithEmail } from '../services/authService';
import { getPalette, radius, shadows, spacing } from '../styles/theme';

export default function SignUpScreen({ navigation, darkMode }) {
  const insets = useSafeAreaInsets();
  const palette = getPalette(darkMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!name.trim() || !email.trim() || password.length < 6) {
      Alert.alert('입력 확인', '이름, 이메일, 6자리 이상의 비밀번호를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      await signUpWithEmail({ name: name.trim(), email: email.trim(), password });
    } catch (error) {
      Alert.alert('회원가입 실패', getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { backgroundColor: palette.background, paddingTop: insets.top + spacing.lg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.logoWrap}>
        <LogoMark size={92} />
        <Text style={[styles.title, { color: palette.text }]}>계정 만들기</Text>
        <Text style={[styles.subtitle, { color: palette.textMuted }]}>이메일과 비밀번호로 새 계정을 만듭니다.</Text>
      </View>

      <View style={[styles.formCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="이름"
          placeholderTextColor={palette.textMuted}
          style={[styles.input, { borderColor: palette.border, color: palette.text }]}
        />
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
          <Text style={styles.primaryButtonText}>{isSubmitting ? '가입 중' : '회원가입'}</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={[styles.secondaryButtonText, { color: palette.point }]}>로그인으로 돌아가기</Text>
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
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 18,
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
