# Athena

Athena는 AI 기반 파일 관리 앱을 목표로 하는 Expo React Native 앱입니다.

## 구현 범위

- React Native (Expo) 기반 화면 구조
- React Navigation 기반 화면 이동
- 공통 재사용 컴포넌트 분리
- Firebase 이메일/비밀번호 로그인, 회원가입, 비밀번호 재설정
- 실제 파일 선택 기반 파일 목록/추천/분석 반영
- 사진/동영상 라이브러리 권한 기반 최근 미디어 연동
- AI 프록시 연동 기반 채팅 응답, 프록시 미설정 시 로컬 분석 응답 폴백
- 파일 검색, 태그 생성, 정렬/우선순위 UI
- 라이트/다크 모드 토글

## 제외 범위

- 모바일 OS 전체 파일 시스템 자동 스캔
- 원본 파일의 직접 삭제/이동
- 클라이언트 앱 내부의 AI API 키 보관

Expo 앱은 보안상 사용자가 선택하지 않은 휴대폰 전체 파일을 마음대로 읽거나 삭제할 수 없습니다. 현재 구현은 `expo-document-picker`로 사용자가 직접 선택한 파일을 연동하고, `expo-media-library` 권한을 통해 최근 사진/동영상 메타데이터를 가져와 AsyncStorage에 보존합니다. 원본 파일 삭제/이동까지 필요하면 플랫폼별 네이티브 구현과 OS 확인 UI가 필요합니다.

## 2단계 네이티브 연동으로 가능한 기능

- 사진/동영상 라이브러리 접근 권한 요청
- 최근 사진/동영상 목록을 실제 미디어 라이브러리에서 가져와 분석에 반영
- 파일명, 유형, 생성/수정일, URI 기반 정리 추천
- Android/iOS 정책이 허용하는 범위 안에서 원본 미디어 삭제 요청 기능 확장
- Android Storage Access Framework 또는 MediaStore 기반 폴더 접근 확장

여전히 불가능하거나 제한적인 기능은 휴대폰 전체 파일 무단 스캔, 사용자가 허용하지 않은 앱 폴더 접근, 확인 없이 원본 파일 삭제입니다.

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
  context/
    FileLibraryContext.js
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
  services/
    aiService.js
    authService.js
    firebase.js
  styles/
    theme.js
```

## 환경 변수

`.env`에 Firebase 설정을 넣습니다. AI 채팅을 실제 모델과 연결하려면 클라이언트에 API 키를 넣지 말고, 별도 서버나 Firebase Cloud Functions URL을 아래 값으로 넣습니다.

```bash
EXPO_PUBLIC_AI_PROXY_URL=https://your-ai-proxy.example.com/chatWithFiles
```

AI 프록시는 `POST` 요청으로 아래 형식을 받으면 됩니다.

```json
{
  "message": "대용량 파일부터 정리해줘",
  "files": [
    {
      "name": "video.mov",
      "category": "동영상",
      "size": "480MB",
      "modifiedAt": "2026-05-13",
      "tags": ["동영상", "대용량"]
    }
  ]
}
```

응답은 `reply`, `text`, `message` 중 하나의 문자열 필드를 반환하면 앱에서 표시합니다.

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
- Analysis: 연동 파일 기반 저장 용량 분석, AI 자동 분석, 개선 제안
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
