import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, shadows, spacing } from '../styles/theme';

export default function SettingsScreen({
  navigation,
  aiButtonEnabled,
  onToggleAiButton,
  darkMode,
  onToggleDarkMode,
}) {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(true);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingTop: spacing.lg + insets.top * 0.45 }]}
    >
      <Text style={styles.pageTitle}>설정</Text>
      <Text style={styles.pageSubtitle}>필요한 항목만 간단하게 관리하세요.</Text>

      <View style={styles.card}>
        <Pressable style={styles.linkRow} onPress={() => navigation.navigate('PersonalInfo')}>
          <Text style={styles.linkTitle}>개인정보</Text>
          <Text style={styles.linkValue}>변경하기</Text>
        </Pressable>

        <Pressable style={styles.linkRow} onPress={() => navigation.navigate('SortPreference')}>
          <Text style={styles.linkTitle}>정렬 기준</Text>
          <Text style={styles.linkValue}>기준 변경</Text>
        </Pressable>

        <Pressable style={styles.linkRow} onPress={() => navigation.navigate('History')}>
          <Text style={styles.linkTitle}>히스토리</Text>
          <Text style={styles.linkValue}>기록 보기</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>알림 설정</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#ddd', true: '#f6c0b2' }}
            thumbColor={notifications ? colors.point : '#fff'}
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>화면 모드</Text>
          <Switch
            value={darkMode}
            onValueChange={onToggleDarkMode}
            trackColor={{ false: '#c3fcf1', true: '#f6c0b2' }}
            thumbColor={darkMode ? colors.point : '#fff'}
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>AI 아이콘 활성화</Text>
          <Switch
            value={aiButtonEnabled}
            onValueChange={onToggleAiButton}
            trackColor={{ false: '#ddd', true: '#f6c0b2' }}
            thumbColor={aiButtonEnabled ? colors.point : '#fff'}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: 110,
  },
  pageTitle: {
    fontSize: 26,
    color: colors.text,
    fontWeight: '800',
  },
  pageSubtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    color: colors.textMuted,
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.sm,
    marginBottom: spacing.md,
    ...shadows.card,
  },
  linkRow: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    backgroundColor: '#fffef8',
    marginBottom: spacing.xs,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkTitle: {
    color: colors.text,
    fontWeight: '700',
  },
  linkValue: {
    color: colors.point,
    fontSize: 12,
    fontWeight: '700',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  optionLabel: {
    color: colors.text,
    fontWeight: '600',
  },
});
