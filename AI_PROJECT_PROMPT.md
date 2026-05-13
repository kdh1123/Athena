# Athena 후속 작업 프롬프트

이 프로젝트는 Expo React Native 기반의 AI 파일 관리 앱 프로토타입이다. 다음 AI 또는 개발자는 아래 상태와 규칙을 지키며 이어서 작업한다.

## 현재 진행 상태

- 홈/파일/AI/분석/설정 탭 구조가 `src/navigation/AppNavigator.js`에 구현되어 있다.
- 화면 공통 색상, 간격, 라운드, 그림자는 `src/styles/theme.js`에서 관리한다.
- 실제 선택 파일 메타데이터와 추천/분석 파생 데이터는 `src/context/FileLibraryContext.js`에서 관리한다.
- AI 채팅 화면은 `src/screens/AIChatScreen.js`이며, 채팅방 드로어, 파일/사진 첨부 UI, 빠른 프롬프트, 메시지 입력 UI가 있다.
- AI 자동 분석 화면은 `src/screens/AnalysisScreen.js`이며, `src/services/aiService.js`의 `createAutomaticAnalysis()`를 사용한다.
- Firebase Auth는 이메일/비밀번호 로그인, 회원가입, 비밀번호 재설정, AsyncStorage persistence까지 연결되어 있다.
- AI 채팅은 `EXPO_PUBLIC_AI_PROXY_URL`이 있으면 프록시를 호출하고, 없거나 실패하면 로컬 분석 응답으로 폴백한다.

## 다음 작업 우선순위

1. Firestore에 사용자별 설정, 채팅방 목록, 채팅 메시지, 분석 히스토리를 저장한다.
2. `EXPO_PUBLIC_AI_PROXY_URL`에 연결할 Firebase Cloud Functions 또는 별도 서버를 만든다.
3. 실제 AI 호출은 클라이언트에서 직접 API 키를 쓰지 말고 Firebase Cloud Functions 또는 별도 서버에서 처리한다.
4. 파일 접근/정리 기능은 모바일 OS 권한과 Expo 한계를 지키며, 먼저 “분석/추천/시뮬레이션” 중심으로 확장한다.

## 코드 작성 규칙

- 기존 구조를 유지한다. 화면은 `src/screens`, 재사용 UI는 `src/components`, 도메인 로직은 `src/services`에 둔다.
- 화면 컴포넌트 안에서 API 응답 문구를 직접 만들지 않는다. AI/Firebase 관련 로직은 서비스 함수로 분리한다.
- 색상 값을 화면 파일에 무분별하게 추가하지 않는다. 반복되는 색상은 `theme.js`에 반영한다.
- 텍스트 스타일은 과한 굵기와 큰 제목을 피하고, iOS/Android 기본 시스템 폰트에서 자연스럽게 보이는 크기를 사용한다.
- 사용자 데이터는 반드시 `uid` 기준으로 분리한다.
- 실제 삭제/이동 기능은 바로 실행하지 않고, 먼저 미리보기와 되돌리기 가능한 히스토리를 만든다.
- API 키, Firebase 설정의 민감값, OpenAI 키는 코드에 하드코딩하지 않는다.

## Firebase 권장 구조

```text
users/{uid}
  profile
  settings

users/{uid}/chatRooms/{roomId}
  title
  createdAt
  updatedAt

users/{uid}/chatRooms/{roomId}/messages/{messageId}
  role
  text
  createdAt

users/{uid}/analysisRuns/{runId}
  status
  summary
  recommendations
  createdAt
```

## 실제 AI 연동 방향

- `src/services/aiService.js`의 함수 시그니처를 유지하고 내부 구현만 교체한다.
- `createChatReply(message, files)`는 `EXPO_PUBLIC_AI_PROXY_URL` 프록시를 호출한다.
- `createAutomaticAnalysis(files)`는 가능하면 클라이언트에서 요약 가능한 통계만 만들고, 자연어 추천은 서버에서 생성한다.
- 서버 응답은 화면에 바로 넣기 전에 빈 값, 에러, 지연 상태를 처리한다.

## 검증 명령

```bash
npx expo-doctor
npm run web
```

웹 실행 후 홈/파일/AI/분석/설정 탭이 모두 열리고, AI 채팅 입력/전송과 분석의 다시 분석 버튼이 동작하는지 확인한다.
