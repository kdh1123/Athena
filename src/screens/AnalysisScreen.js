import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useMemo, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionHeader from '../components/SectionHeader';
import { analysisRecommendations } from '../styles/mockData';
import { colors, radius, shadows, spacing } from '../styles/theme';

function UsageLine({ label, percent, color, progress }) {
  const animatedWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', `${percent}%`],
  });

  return (
    <View style={styles.usageBlock}>
      <View style={styles.usageHead}>
        <Text style={styles.usageLabel}>{label}</Text>
        <Text style={styles.usagePercent}>{percent}%</Text>
      </View>
      <View style={styles.track}>
        <Animated.View style={[styles.progress, { width: animatedWidth, opacity: progress, backgroundColor: color }]} />
      </View>
    </View>
  );
}

export default function AnalysisScreen() {
  const insets = useSafeAreaInsets();
  const usage = useMemo(
    () => [
      { label: '이미지', percent: 42, color: '#fa8e73' },
      { label: '문서', percent: 18, color: '#c7a58b' },
      { label: '오디오', percent: 11, color: '#8aa7c8' },
      { label: '기타', percent: 29, color: '#8ebf9f' },
    ],
    []
  );
  const progressValues = useRef(usage.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    progressValues.forEach((value) => value.setValue(0));

    const sequence = Animated.stagger(
      140,
      progressValues.map((value) =>
        Animated.timing(value, {
          toValue: 1,
          duration: 520,
          useNativeDriver: false,
        })
      )
    );

    sequence.start();
  }, [progressValues]);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingTop: spacing.lg + insets.top * 0.45 }]}
    >
      <Text style={styles.pageTitle}>저장 용량 분석</Text>
      <Text style={styles.pageSubtitle}>기기 상태 기반 인사이트 (더미)</Text>

      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>AI 추천 문구</Text>
        <Text style={styles.heroBody}>
          현재 이미지와 대용량 디자인 파일이 저장 공간의 대부분을 차지하고 있어요. 정기 정리 루틴을 적용하면 파일 탐색 속도와 여유 공간이 개선됩니다.
        </Text>
      </View>

      <View style={styles.sectionCard}>
        <SectionHeader title="용량 분포" />
        {usage.map((item, index) => (
          <UsageLine
            key={item.label}
            label={item.label}
            percent={item.percent}
            color={item.color}
            progress={progressValues[index]}
          />
        ))}
      </View>

      <View style={styles.sectionCard}>
        <SectionHeader title="개선 제안" />
        {analysisRecommendations.map((item) => (
          <View key={item.id} style={styles.tipCard}>
            <Text style={styles.tipTitle}>{item.title}</Text>
            <Text style={styles.tipDesc}>{item.description}</Text>
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
  heroCard: {
    backgroundColor: '#fff4dd',
    borderWidth: 1,
    borderColor: '#f7dfbf',
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  heroTitle: {
    color: colors.point,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  heroBody: {
    color: colors.text,
    lineHeight: 21,
  },
  sectionCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.card,
  },
  usageBlock: {
    marginBottom: spacing.sm,
  },
  usageHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  usageLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  usagePercent: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  track: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#f5ecdd',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 999,
  },
  tipCard: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    backgroundColor: '#fffef9',
  },
  tipTitle: {
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  tipDesc: {
    color: colors.textMuted,
    lineHeight: 19,
  },
});
