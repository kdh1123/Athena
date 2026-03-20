import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, shadows, spacing } from '../styles/theme';

const items = [
  { id: 'pi-1', title: '개인정보', value: '김아테나 / athena.user@example.com' },
  { id: 'pi-2', title: '취향 (추후 추가 예정)', value: '미설정' },
  { id: 'pi-3', title: '연동 계정', value: 'Google 1개 연결됨' },
];

export default function PersonalInfoScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, { paddingTop: spacing.lg + insets.top * 0.45 }]}> 
      <Text style={styles.pageTitle}>개인정보</Text>
      <Text style={styles.pageSubtitle}>계정과 취향 설정을 관리합니다.</Text>

      <View style={styles.card}>
        {items.map((item) => (
          <Pressable key={item.id} style={styles.row}>
            <Text style={styles.rowTitle}>{item.title}</Text>
            <Text style={styles.rowValue}>{item.value}</Text>
          </Pressable>
        ))}
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
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
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
    ...shadows.card,
  },
  row: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    marginBottom: spacing.xs,
    backgroundColor: '#fffef8',
  },
  rowTitle: {
    color: colors.text,
    fontWeight: '700',
    marginBottom: 2,
  },
  rowValue: {
    color: colors.textMuted,
    fontSize: 12,
  },
});