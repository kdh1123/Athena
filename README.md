# Athena (Expo UI Prototype)

Athena는 AI 기반 파일 관리 앱을 목표로 하는 모바일 서비스의 **프론트엔드 UI/화면 구조 프로토타입**입니다.

## 구현 범위

- React Native (Expo) 기반 화면 구조
- React Navigation 기반 화면 이동
- 더미 데이터 기반 UI 렌더링
- 공통 재사용 컴포넌트 분리
- 플로팅 AI 챗봇 버튼 + 모달 UI

## 제외 범위

- 백엔드 연동
- AI 로직 구현
- 실제 파일 접근/처리

## 폴더 구조

```text
src/
  components/
    ChatModal.js
    FileCard.js
    FloatingChatButton.js
    SectionHeader.js
    StorageBar.js
    TagItem.js
  navigation/
    AppNavigator.js
  screens/
    AnalysisScreen.js
    FileScreen.js
    HistoryScreen.js
    HomeScreen.js
    SettingsScreen.js
  styles/
    mockData.js
    theme.js
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
- File: 시뮬레이션 결과, 카테고리/태그/정렬/필터 UI
- Analysis: 저장 용량 분석, AI 추천 문구(더미), 개선 제안
- Settings: 사용자 정보, 정렬/알림/모드 토글 UI, 히스토리 이동
- History: 기록 리스트, 되돌리기 버튼(UI)
