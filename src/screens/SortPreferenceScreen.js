import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, shadows, spacing } from '../styles/theme';

const sortCandidates = ['최근순', '용량순', '이름순'];
const priorityCandidates = ['최신 파일 우선', '중요 태그 우선', '대용량 우선'];

export default function SortPreferenceScreen() {
  const insets = useSafeAreaInsets();
  const [sortBy, setSortBy] = useState('최근순');
  const [priority, setPriority] = useState('최신 파일 우선');

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, { paddingTop: spacing.md + insets.top * 0.25 }]}>
      <Text style={styles.pageTitle}>정렬 기준</Text>
      <Text style={styles.pageSubtitle}>정렬과 우선순위 처리 기준을 설정하세요.</Text>

      <View style={styles.card}>
        <Text style={styles.groupTitle}>정렬 기준 변경</Text>
        <View style={styles.wrap}>
          {sortCandidates.map((item) => (
            <Pressable
              key={item}
              onPress={() => setSortBy(item)}
              style={[styles.chip, sortBy === item && styles.activeChip]}
            >
              <Text style={[styles.chipLabel, sortBy === item && styles.activeChipLabel]}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.groupTitle}>우선순위 처리 기준 변경</Text>
        <View style={styles.wrap}>
          {priorityCandidates.map((item) => (
            <Pressable
              key={item}
              onPress={() => setPriority(item)}
              style={[styles.chip, priority === item && styles.activeChip]}
            >
              <Text style={[styles.chipLabel, priority === item && styles.activeChipLabel]}>{item}</Text>
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
    padding: spacing.md,
    ...shadows.card,
  },
  groupTitle: {
    color: colors.text,
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
    borderColor: colors.border,
    backgroundColor: '#fff',
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  activeChip: {
    backgroundColor: colors.main,
    borderColor: colors.main,
  },
  chipLabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
  },
  activeChipLabel: {
    color: colors.text,
  },
});