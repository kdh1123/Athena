import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPalette, radius, shadows, spacing } from '../styles/theme';

export default function SettingsScreen({
  navigation,
  darkMode,
  onToggleDarkMode,
}) {
  const insets = useSafeAreaInsets();
  const palette = getPalette(darkMode);
  const [notifications, setNotifications] = useState(true);

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: palette.background }]}
      contentContainerStyle={[styles.content, { paddingTop: spacing.lg + insets.top * 0.45 + 5 }]}
    >
      <Text style={[styles.pageTitle, { color: palette.text }]}>설정</Text>
      <Text style={[styles.pageSubtitle, { color: palette.textMuted }]}>필요한 항목만 간단하게 관리하세요.</Text>

      <Pressable
        style={[styles.singleLinkCard, { backgroundColor: palette.card, borderColor: palette.border }]}
        onPress={() => navigation.navigate('PersonalInfo')}
      >
        <Text style={[styles.linkTitle, { color: palette.text }]}>개인정보</Text>
        <Ionicons name="chevron-forward" size={18} color={palette.textMuted} />
      </Pressable>

      <Pressable
        style={[styles.singleLinkCard, { backgroundColor: palette.card, borderColor: palette.border }]}
        onPress={() => navigation.navigate('History')}
      >
        <Text style={[styles.linkTitle, { color: palette.text }]}>히스토리</Text>
        <Ionicons name="chevron-forward" size={18} color={palette.textMuted} />
      </Pressable>

      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}> 
        <View style={styles.optionRow}>
          <Text style={[styles.optionLabel, { color: palette.text }]}>알림 설정</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#ddd', true: '#f6c0b2' }}
            thumbColor={notifications ? palette.point : '#fff'}
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={[styles.optionLabel, { color: palette.text }]}>화면 모드</Text>
          <Switch
            value={darkMode}
            onValueChange={onToggleDarkMode}
            trackColor={{ false: '#c3fcf1', true: '#f6c0b2' }}
            thumbColor={darkMode ? palette.point : '#fff'}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingBottom: 110,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
  },
  pageSubtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  singleLinkCard: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.card,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.sm,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    ...shadows.card,
  },
  linkTitle: {
    fontWeight: '700',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  optionLabel: {
    fontWeight: '600',
  },
});
