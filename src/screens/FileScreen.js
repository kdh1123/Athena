import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FileCard from '../components/FileCard';
import SectionHeader from '../components/SectionHeader';
import TagItem from '../components/TagItem';
import { categoryOptions, fileItems, filterOptions, sortOptions } from '../styles/mockData';
import { colors, radius, shadows, spacing } from '../styles/theme';

export default function FileScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>파일 정리 결과</Text>
      <Text style={styles.pageSubtitle}>시뮬레이션 기반 UI 화면</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>정리 예상 결과</Text>
        <Text style={styles.summaryValue}>2.28GB 절약 가능</Text>
        <Text style={styles.summarySub}>중복/미사용 파일 243개 감지 (더미 데이터)</Text>
      </View>

      <SectionHeader title="카테고리" />
      <View style={styles.rowWrap}>
        {categoryOptions.map((category, index) => (
          <TagItem key={category} label={category} active={index === 0} />
        ))}
      </View>

      <SectionHeader title="태그 기반 분류" />
      <View style={styles.rowWrap}>
        <TagItem label="#업무" active />
        <TagItem label="#개인" />
        <TagItem label="#사진" />
        <TagItem label="#대용량" />
      </View>

      <SectionHeader title="정렬 옵션" />
      <View style={styles.rowWrap}>
        {sortOptions.map((sortOption, index) => (
          <TagItem key={sortOption} label={sortOption} active={index === 0} />
        ))}
      </View>

      <SectionHeader title="필터" />
      <View style={styles.rowWrap}>
        {filterOptions.map((filter, index) => (
          <TagItem key={filter} label={filter} active={index === 1} />
        ))}
      </View>

      <SectionHeader title="파일 리스트" rightLabel={`${fileItems.length}개`} />
      {fileItems.map((item) => (
        <FileCard key={item.id} item={item} />
      ))}
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
  summaryCard: {
    backgroundColor: colors.main,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#f3dd74',
    ...shadows.card,
  },
  summaryTitle: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 14,
  },
  summaryValue: {
    color: colors.text,
    fontWeight: '900',
    marginTop: spacing.xs,
    fontSize: 26,
  },
  summarySub: {
    color: '#5b5249',
    marginTop: spacing.xs,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
});
