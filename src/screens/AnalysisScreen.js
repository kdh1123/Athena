import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import SectionHeader from '../components/SectionHeader';
import { createAutomaticAnalysis } from '../services/aiService';
import { useFileLibrary } from '../context/FileLibraryContext';
import { colors, getPalette, radius, shadows, spacing } from '../styles/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function DonutChart({ usage, revealProgress, darkMode }) {
  const size = 210;
  const strokeWidth = 46;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const palette = getPalette(darkMode);
  const animatedDashOffset = revealProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

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
          strokeDashoffset={animatedDashOffset}
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
  const { files, usage, analysisRecommendations } = useFileLibrary();
  const revealProgress = useRef(new Animated.Value(0)).current;
  const previewRecommendations = analysisRecommendations.slice(0, 4);
  const [aiAnalysis, setAiAnalysis] = useState(() => createAutomaticAnalysis(files));
  const [isRefreshing, setIsRefreshing] = useState(false);

  const runAutomaticAnalysis = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setAiAnalysis(createAutomaticAnalysis(files));
      setIsRefreshing(false);
    }, 360);
  }, [files]);

  useEffect(() => {
    setAiAnalysis(createAutomaticAnalysis(files));
  }, [files]);

  useFocusEffect(
    useCallback(() => {
      revealProgress.setValue(0);
      Animated.timing(revealProgress, {
        toValue: 1,
        duration: 900,
        useNativeDriver: false,
      }).start();

      return () => {};
    }, [revealProgress])
  );

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: palette.background }]}
      contentContainerStyle={[styles.content, { paddingTop: Math.max(spacing.md, insets.top + spacing.xs) }]}
    >
      <Text style={[styles.pageTitle, { color: palette.text }]}>파일 분석</Text>
      <Text style={[styles.pageSubtitle, { color: palette.textMuted }]}>기기 상태 기반 인사이트</Text>

      <View style={[styles.heroCard, { backgroundColor: darkMode ? '#1a212d' : '#f1f4f8', borderColor: palette.border }]}> 
        <View style={styles.heroHead}>
          <Text style={[styles.heroTitle, { color: palette.point }]}>AI 자동 분석</Text>
          <View style={[styles.statusBadge, { backgroundColor: palette.main }]}>
            <Text style={[styles.statusText, { color: palette.text }]}>{aiAnalysis.status}</Text>
          </View>
        </View>
        <Text style={[styles.heroBody, { color: palette.text }]}>
          {aiAnalysis.summary}
        </Text>
        <Pressable style={[styles.analysisButton, { backgroundColor: palette.point }]} onPress={runAutomaticAnalysis}>
          <Text style={styles.analysisButtonText}>{isRefreshing ? '분석 중' : '다시 분석'}</Text>
        </Pressable>
      </View>

      <View style={[styles.sectionCard, { backgroundColor: palette.card, borderColor: palette.border }]}> 
        <SectionHeader title="용량 분포" titleColor={palette.text} />
        <DonutChart usage={usage} revealProgress={revealProgress} darkMode={darkMode} />
      </View>

      <View style={[styles.sectionCard, { backgroundColor: palette.card, borderColor: palette.border }]}> 
        <SectionHeader
          title="개선 제안"
          rightLabel="모두 보기"
          onPressRight={() => navigation.navigate('AnalysisRecommendation', { darkMode })}
          titleColor={palette.text}
          rightLabelColor={palette.point}
        />
        {aiAnalysis.recommendations.map((item) => (
          <View key={item} style={[styles.aiTipRow, { borderBottomColor: palette.border }]}>
            <Text style={[styles.aiTipText, { color: palette.text }]}>{item}</Text>
          </View>
        ))}

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
    paddingBottom: 82,
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
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  heroHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  statusBadge: {
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  heroBody: {
    lineHeight: 21,
  },
  analysisButton: {
    alignSelf: 'flex-start',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginTop: spacing.sm,
  },
  analysisButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
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
  aiTipRow: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: spacing.xs,
  },
  aiTipText: {
    fontSize: 13,
    lineHeight: 19,
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
