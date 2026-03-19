import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { colors, radius, shadows, spacing } from '../styles/theme';

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>설정</Text>
      <Text style={styles.pageSubtitle}>개인화 옵션 UI</Text>

      <View style={styles.card}>
        <SectionHeader title="사용자 정보" />
        <Text style={styles.userName}>김아테나</Text>
        <Text style={styles.userMeta}>athena.user@example.com</Text>
      </View>

      <View style={styles.card}>
        <SectionHeader title="정렬 기준" />
        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>기본 정렬</Text>
          <Text style={styles.optionValue}>최근순</Text>
        </View>
        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>동일 항목 처리</Text>
          <Text style={styles.optionValue}>최신 파일 우선</Text>
        </View>
      </View>

      <View style={styles.card}>
        <SectionHeader title="알림 설정" />
        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>정리 추천 알림</Text>
          <Switch value={notifications} onValueChange={setNotifications} trackColor={{ false: '#ddd', true: '#f6c0b2' }} thumbColor={notifications ? colors.point : '#fff'} />
        </View>
      </View>

      <View style={styles.card}>
        <SectionHeader title="화면 모드" />
        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>라이트 / 다크 모드</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ false: '#ddd', true: '#f6c0b2' }} thumbColor={darkMode ? colors.point : '#fff'} />
        </View>
        <Text style={styles.note}>현재는 UI 토글만 제공됩니다.</Text>
      </View>

      <Pressable style={styles.historyButton} onPress={() => navigation.navigate('History')}>
        <Text style={styles.historyButtonText}>히스토리 페이지로 이동</Text>
      </Pressable>
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
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.card,
  },
  userName: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  userMeta: {
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  optionLabel: {
    color: colors.text,
    fontWeight: '600',
  },
  optionValue: {
    color: colors.sub,
    fontWeight: '700',
  },
  note: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: spacing.xs,
  },
  historyButton: {
    borderRadius: radius.md,
    backgroundColor: colors.point,
    alignItems: 'center',
    paddingVertical: spacing.md,
    ...shadows.card,
  },
  historyButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
});
