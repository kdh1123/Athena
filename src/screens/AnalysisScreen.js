import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useMemo, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import SectionHeader from '../components/SectionHeader';
import { analysisRecommendations } from '../styles/mockData';
import { getPalette, radius, shadows, spacing } from '../styles/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function DonutChart({ usage, revealProgress, darkMode }) {
  const size = 210;
  const strokeWidth = 46;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const palette = getPalette(darkMode);

  let offsetSum = 0;

  return (
    <View style={styles.donutWrap}>
      <Svg width={size} height={size}>
        {usage.map((item) => {
          const segmentLength = circumference * (item.percent / 100);
          const dashArray = `${segmentLength} ${circumference - segmentLength}`;
          const currentOffset = offsetSum;
          offsetSum += segmentLength;

          return (
            <Circle
              key={item.label}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={dashArray}
              strokeDashoffset={-currentOffset}
              strokeLinecap="butt"
              transform={`rotate(180 ${center} ${center})`}
            />
          );
        })}

        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={palette.background}
          strokeWidth={strokeWidth + 2}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={Animated.multiply(revealProgress, circumference)}
          transform={`rotate(180 ${center} ${center}) scale(-1 1)`}
        />
      </Svg>

      <View style={styles.donutLegendWrap}>
        {usage.map((item) => (
          <View key={item.label} style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <Text style={[styles.legendText, { color: palette.text }]}>{item.label}</Text>
            <Text style={[styles.legendPercent, { color: palette.textMuted }]}>{item.percent}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function AnalysisScreen({ navigation, darkMode }) {
  const insets = useSafeAreaInsets();
  const palette = getPalette(darkMode);
  const usage = useMemo(
    () => [
      { label: '이미지', percent: 42, color: '#fa8e73' },
      { label: '문서', percent: 18, color: '#c7a58b' },
      { label: '오디오', percent: 11, color: '#8aa7c8' },
      { label: '기타', percent: 29, color: '#8ebf9f' },
    ],
    []
  );
  const revealProgress = useRef(new Animated.Value(0)).current;
  const previewRecommendations = analysisRecommendations.slice(0, 4);

  useEffect(() => {
    revealProgress.setValue(0);
    Animated.timing(revealProgress, {
      toValue: 1,
      duration: 900,
      useNativeDriver: false,
    }).start();
  }, [revealProgress]);

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: palette.background }]}
      contentContainerStyle={[styles.content, { paddingTop: spacing.lg + insets.top * 0.45 + 5 }]}
    >
      <Text style={[styles.pageTitle, { color: palette.text }]}>파일 분석</Text>
      <Text style={[styles.pageSubtitle, { color: palette.textMuted }]}>기기 상태 기반 인사이트</Text>

      <View style={[styles.heroCard, { backgroundColor: darkMode ? '#1a212d' : '#fff4dd', borderColor: darkMode ? palette.border : '#f7dfbf' }]}> 
        <Text style={[styles.heroTitle, { color: palette.point }]}>AI 추천</Text>
        <Text style={[styles.heroBody, { color: palette.text }]}>
          현재 이미지와 대용량 디자인 파일이 저장 공간의 대부분을 차지하고 있어요. 정기 정리 루틴을 적용하면 파일 탐색 속도와 여유 공간이 개선됩니다.
        </Text>
      </View>

      <View style={[styles.sectionCard, { backgroundColor: palette.card, borderColor: palette.border }]}> 
        <SectionHeader title="용량 분포" />
        <DonutChart usage={usage} revealProgress={revealProgress} darkMode={darkMode} />
      </View>

      <View style={[styles.sectionCard, { backgroundColor: palette.card, borderColor: palette.border }]}> 
        <SectionHeader
          title="개선 제안"
          rightLabel="모두 보기"
          onPressRight={() => navigation.navigate('AnalysisRecommendation', { darkMode })}
        />
        {previewRecommendations.length === 0 ? (
          <Text style={[styles.emptyText, { color: palette.success }]}>사용자님의 파일은 정말 깨끗해요!</Text>
        ) : (
          previewRecommendations.map((item) => (
            <View key={item.id} style={[styles.tipCard, { borderColor: palette.border, backgroundColor: darkMode ? '#151c27' : '#fffef9' }]}> 
              <Text style={[styles.tipTitle, { color: palette.text }]}>{item.title}</Text>
              <Text style={[styles.tipDesc, { color: palette.textMuted }]}>{item.description}</Text>
            </View>
          ))
        )}
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
  },
  heroCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  heroTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  heroBody: {
    lineHeight: 21,
  },
  sectionCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.card,
  },
  donutWrap: {
    alignItems: 'center',
  },
  donutLegendWrap: {
    marginTop: spacing.md,
    width: '100%',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  legendDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: spacing.xs,
  },
  legendText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
  },
  legendPercent: {
    fontSize: 12,
    fontWeight: '700',
  },
  tipCard: {
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  tipTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },
  tipDesc: {
    lineHeight: 19,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '700',
    paddingVertical: spacing.sm,
  },
});
