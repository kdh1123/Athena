import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPalette, radius, shadows, spacing } from '../styles/theme';

const sortCandidates = ['최근순', '용량순', '이름순'];
const priorityCandidates = ['최신 파일 우선', '중요 태그 우선', '대용량 우선'];

export default function SortPreferenceScreen({ darkMode }) {
  const insets = useSafeAreaInsets();
  const palette = getPalette(darkMode);
  const [sortBy, setSortBy] = useState('최근순');
  const [priority, setPriority] = useState('최신 파일 우선');

  return (
    <ScrollView style={[styles.screen, { backgroundColor: palette.background }]} contentContainerStyle={[styles.content, { paddingTop: spacing.lg + insets.top * 0.45 + 5 }]}> 
      <Text style={[styles.pageTitle, { color: palette.text }]}>정렬 기준</Text>
      <Text style={[styles.pageSubtitle, { color: palette.textMuted }]}>정렬과 우선순위 처리 기준을 설정하세요.</Text>

      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}> 
        <Text style={[styles.groupTitle, { color: palette.text }]}>정렬 기준 변경</Text>
        <View style={styles.wrap}>
          {sortCandidates.map((item) => (
            <Pressable
              key={item}
              onPress={() => setSortBy(item)}
              style={[
                styles.chip,
                { borderColor: palette.border, backgroundColor: palette.card },
                sortBy === item && [styles.activeChip, { backgroundColor: palette.main, borderColor: palette.main }],
              ]}
            >
              <Text style={[styles.chipLabel, { color: palette.textMuted }, sortBy === item && [styles.activeChipLabel, { color: palette.text }]]}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={[styles.groupTitle, { color: palette.text }]}>우선순위 처리 기준 변경</Text>
        <View style={styles.wrap}>
          {priorityCandidates.map((item) => (
            <Pressable
              key={item}
              onPress={() => setPriority(item)}
              style={[
                styles.chip,
                { borderColor: palette.border, backgroundColor: palette.card },
                priority === item && [styles.activeChip, { backgroundColor: palette.main, borderColor: palette.main }],
              ]}
            >
              <Text style={[styles.chipLabel, { color: palette.textMuted }, priority === item && [styles.activeChipLabel, { color: palette.text }]]}>{item}</Text>
            </Pressable>
          ))}
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
    padding: spacing.md,
    ...shadows.card,
  },
  groupTitle: {
    fontWeight: '700',
    marginBottom: spacing.xs,
    marginTop: spacing.xs,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.xl,
    borderWidth: 1,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  activeChip: {
  },
  chipLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  activeChipLabel: {
  },
});