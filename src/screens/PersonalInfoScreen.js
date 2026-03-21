import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPalette, radius, shadows, spacing } from '../styles/theme';

const items = [
  { id: 'pi-1', title: '개인정보', value: '김아테나 / athena.user@example.com' },
  { id: 'pi-2', title: '취향 (추후 추가 예정)', value: '미설정' },
  { id: 'pi-3', title: '연동 계정', value: 'Google 1개 연결됨' },
];

export default function PersonalInfoScreen({ darkMode }) {
  const insets = useSafeAreaInsets();
  const palette = getPalette(darkMode);

  return (
    <ScrollView style={[styles.screen, { backgroundColor: palette.background }]} contentContainerStyle={[styles.content, { paddingTop: spacing.lg + insets.top * 0.45 + 5 }]}> 
      <Text style={[styles.pageTitle, { color: palette.text }]}>개인정보</Text>
      <Text style={[styles.pageSubtitle, { color: palette.textMuted }]}>계정과 취향 설정을 관리합니다.</Text>

      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}> 
        {items.map((item) => (
          <Pressable key={item.id} style={[styles.row, { borderColor: palette.border, backgroundColor: darkMode ? '#151c27' : '#fffef8' }]}> 
            <Text style={[styles.rowTitle, { color: palette.text }]}>{item.title}</Text>
            <Text style={[styles.rowValue, { color: palette.textMuted }]}>{item.value}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
  },
  pageSubtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  card: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.sm,
    ...shadows.card,
  },
  row: {
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.sm,
    marginBottom: spacing.xs,
  },
  rowTitle: {
    fontWeight: '700',
    marginBottom: 2,
  },
  rowValue: {
    fontSize: 12,
  },
});