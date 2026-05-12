import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionHeader from '../components/SectionHeader';
import { useFileLibrary } from '../context/FileLibraryContext';
import { getPalette, radius, shadows, spacing } from '../styles/theme';

export default function RecommendationListScreen({ darkMode }) {
  const insets = useSafeAreaInsets();
  const palette = getPalette(darkMode);
  const { recommendedActions, removeFile } = useFileLibrary();

  const confirmDelete = (action) => {
    Alert.alert('파일 정리', `${action.title} 파일을 정리 목록에서 삭제할까요?`, [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => removeFile(action.fileId),
      },
    ]);
  };

  return (
    <ScrollView style={[styles.screen, { backgroundColor: palette.background }]} contentContainerStyle={[styles.content, { paddingTop: spacing.lg + insets.top * 0.45 + 5 }]}> 
      <Text style={[styles.pageTitle, { color: palette.text }]}>추천 정리 목록</Text>
      <Text style={[styles.pageSubtitle, { color: palette.textMuted }]}>AI가 우선순위 기반으로 정리 대상을 추천합니다.</Text>

      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}> 
        <SectionHeader
          title="전체 추천"
          rightLabel={`${recommendedActions.length}개`}
          titleColor={palette.text}
          rightLabelColor={palette.point}
        />
        {recommendedActions.map((action) => (
          <View key={action.id} style={[styles.item, { borderColor: palette.border, backgroundColor: darkMode ? '#151c27' : '#fffef8' }]}> 
            <View style={[styles.dot, { backgroundColor: action.color }]} />
            <View style={styles.textWrap}>
              <Text style={[styles.itemTitle, { color: palette.text }]}>{action.title}</Text>
              <Text style={[styles.itemSub, { color: palette.textMuted }]}>{action.subtitle}</Text>
            </View>
            <Pressable style={[styles.cleanButton, { backgroundColor: palette.point }]} onPress={() => confirmDelete(action)}>
              <Text style={styles.cleanButtonText}>정리</Text>
            </Pressable>
          </View>
        ))}
        {recommendedActions.length === 0 ? (
          <Text style={[styles.emptyText, { color: palette.textMuted }]}>정리 추천 대상이 없습니다. 파일 탭에서 실제 파일을 연동해주세요.</Text>
        ) : null}
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    marginTop: 6,
    marginRight: spacing.sm,
  },
  textWrap: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: '700',
    fontSize: 14,
  },
  itemSub: {
    marginTop: 3,
    fontSize: 12,
  },
  cleanButton: {
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginLeft: spacing.sm,
  },
  cleanButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },
  emptyText: {
    fontSize: 13,
    fontWeight: '600',
    paddingVertical: spacing.sm,
  },
});
