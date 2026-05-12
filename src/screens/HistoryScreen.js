import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionHeader from '../components/SectionHeader';
import { historyItems } from '../styles/mockData';
import { colors, getPalette, radius, shadows, spacing } from '../styles/theme';

export default function HistoryScreen({ darkMode }) {
  const insets = useSafeAreaInsets();
  const palette = getPalette(darkMode);

  const onUndo = () => {
    Alert.alert('되돌리시겠습니까?', '', [
      { text: '아니요', style: 'cancel' },
      {
        text: '예',
        onPress: () => {
          Alert.alert('성공적으로 완료되었습니다');
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: palette.background }]}
      contentContainerStyle={[styles.content, { paddingTop: spacing.lg + insets.top * 0.45 + 5 }]}
    >
      <Text style={[styles.pageTitle, { color: palette.text }]}>히스토리</Text>
      <Text style={[styles.pageSubtitle, { color: palette.textMuted }]}>과거 정리 기록 (더미 데이터)</Text>

      <View style={[styles.wrapperCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <SectionHeader
          title="리스트"
          rightLabel={`${historyItems.length}건`}
          titleColor={palette.text}
          rightLabelColor={palette.point}
        />
        {historyItems.map((item) => (
          <View
            key={item.id}
            style={[
              styles.historyCard,
              { backgroundColor: darkMode ? '#151c27' : '#fffef8', borderColor: palette.border },
            ]}
          >
            <Text style={[styles.historyDate, { color: palette.textMuted }]}>{item.date}</Text>
            <Text style={[styles.historySummary, { color: palette.text }]}>{item.summary}</Text>
            <Text style={[styles.historyMeta, { color: palette.textMuted }]}>
              변경 {item.changedCount}개 · 확보 공간 {item.freedSpace}
            </Text>
            <Pressable
              style={[styles.undoButton, { backgroundColor: palette.main, borderColor: darkMode ? palette.border : '#f5dc6b' }]}
              onPress={onUndo}
            >
              <Text style={[styles.undoText, { color: palette.text }]}>되돌리기</Text>
            </Pressable>
          </View>
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
  wrapperCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    padding: spacing.md,
    ...shadows.card,
  },
  historyCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    backgroundColor: '#fffef8',
  },
  historyDate: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 3,
  },
  historySummary: {
    color: colors.text,
    fontWeight: '700',
    marginBottom: 3,
  },
  historyMeta: {
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  undoButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    backgroundColor: colors.main,
    borderWidth: 1,
    borderColor: '#f5dc6b',
  },
  undoText: {
    fontWeight: '700',
    color: colors.text,
    fontSize: 12,
  },
});
