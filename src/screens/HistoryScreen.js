import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import SectionHeader from '../components/SectionHeader';
import { historyItems } from '../styles/mockData';
import { colors, radius, shadows, spacing } from '../styles/theme';

export default function HistoryScreen() {
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
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>히스토리</Text>
      <Text style={styles.pageSubtitle}>과거 정리 기록 (더미 데이터)</Text>

      <View style={styles.wrapperCard}>
        <SectionHeader title="리스트" rightLabel={`${historyItems.length}건`} />
        {historyItems.map((item) => (
          <View key={item.id} style={styles.historyCard}>
            <Text style={styles.historyDate}>{item.date}</Text>
            <Text style={styles.historySummary}>{item.summary}</Text>
            <Text style={styles.historyMeta}>
              변경 {item.changedCount}개 · 확보 공간 {item.freedSpace}
            </Text>
            <Pressable style={styles.undoButton} onPress={onUndo}>
              <Text style={styles.undoText}>되돌리기</Text>
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
