# Athena (Expo UI Prototype)

Athena는 AI 기반 파일 관리 앱을 목표로 하는 모바일 서비스의 **프론트엔드 UI/화면 구조 프로토타입**입니다.

## 구현 범위

- React Native (Expo) 기반 화면 구조
- React Navigation 기반 화면 이동
- 더미 데이터 기반 UI 렌더링
- 공통 재사용 컴포넌트 분리
- AI 채팅 탭 UI
- 로컬 더미 데이터 기반 AI 채팅 응답/자동 분석 흐름
- 파일 검색, 태그 생성, 정렬/우선순위 UI
- 라이트/다크 모드 토글
- Firebase 로그인/회원가입 도입 가이드 문서
- 로그인/회원가입 화면 UI

## 제외 범위

- 백엔드 연동
- AI 로직 구현
- 실제 AI API 연동
- 실제 파일 정리/삭제/되돌리기 처리
- 사용자 계정 저장 및 설정 영속화

## 폴더 구조

```text
src/
  components/
    ChatModal.js
    FileCard.js
    FloatingChatButton.js
    LogoMark.js
    SectionHeader.js
    StorageBar.js
    TagItem.js
  navigation/
    AppNavigator.js
  screens/
    AIChatScreen.js
    AnalysisScreen.js
    AnalysisRecommendationScreen.js
    DeviceCapacityScreen.js
    FavoriteListScreen.js
    FileListScreen.js
    FileScreen.js
    HistoryScreen.js
    HomeScreen.js
    LoginScreen.js
    PersonalInfoScreen.js
    RecommendationListScreen.js
    SettingsScreen.js
    SignUpScreen.js
    SortPreferenceScreen.js
  styles/
    mockData.js
    theme.js
  services/
    aiService.js
```

## 실행 방법

```bash
npm install
npm run ios
# 또는
npm run android
# 또는
npm run web
```

## 디자인 토큰

- Main: `#FFF099`
- Point: `#fa8e73`
- Sub: `#c7a58b`

## 핵심 화면

- Home: 검색, 추천 정리, 저장 용량, 최근 활동
- File: 파일 불러오기, 카테고리/태그/정렬/우선순위 UI
- AI: 채팅, 첨부, 채팅방 드로어 UI
- Analysis: 저장 용량 분석, AI 자동 분석(더미), 개선 제안
- Settings: 사용자 정보, 정렬/알림/모드 토글 UI, 히스토리 이동
- History: 기록 리스트, 되돌리기 버튼(UI)

## 후속 작업 문서

- `AI_PROJECT_PROMPT.md`: 다른 AI/개발자가 이어서 작업할 때 사용할 현재 상태, 규칙, 우선순위
- `FIREBASE_SETUP.md`: Firebase Authentication/Firestore 도입 순서와 예시 코드

## 검증

```bash
npx expo-doctor
npx expo export --platform web --output-dir /private/tmp/athena-web-export
npm audit --audit-level=moderate
```

현재 `expo-doctor`는 통과합니다. `npm audit`의 남은 항목은 Expo SDK 54의 Metro/PostCSS 전이 의존성 경고이며, `npm audit fix --force`는 Expo 49로 내리는 breaking change를 제안하므로 적용하지 않습니다.
