# Firebase 로그인/회원가입 도입 가이드

Athena는 간단한 서버 기능을 Firebase로 시작하는 것이 적합하다. 로그인/회원가입, 사용자별 채팅 저장, 분석 히스토리 저장까지 한 번에 확장할 수 있기 때문이다.

## 1. Firebase 콘솔 준비

1. Firebase Console에서 새 프로젝트를 만든다.
2. Authentication > Sign-in method에서 Email/Password를 활성화한다.
3. Firestore Database를 생성한다.
4. 웹 앱을 추가하고 Firebase config 값을 확인한다.

## 2. 패키지 설치

```bash
npm install firebase
```

Expo에서 이메일/비밀번호 인증만 쓸 경우 위 패키지로 충분하다.

현재 앱에는 `LoginScreen`과 `SignUpScreen`이 먼저 연결되어 있으며, 아직 Firebase SDK를 직접 호출하지 않는다. Firebase 프로젝트를 만든 뒤 아래 서비스 파일을 추가하고 `AppNavigator.js`의 `setCurrentUser` 호출 부분을 Firebase auth 상태 구독으로 교체하면 된다.

## 3. 파일 구조

```text
src/
  services/
    firebase.js
    authService.js
    chatRepository.js
```

`firebase.js`는 앱 초기화만 담당하고, 화면에서는 직접 Firebase SDK를 호출하지 않는다.

## 4. 예시 코드

```js
// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
```

```js
// src/services/authService.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

export function signUpWithEmail(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signInWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOutCurrentUser() {
  return signOut(auth);
}
```

## 5. 네비게이션 연결 방식

`src/navigation/AppNavigator.js`에서 현재는 임시로 `currentUser` state를 사용한다.

Firebase 연결 후에는 다음 흐름으로 바꾼다.

```js
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, setCurrentUser);
  return unsubscribe;
}, []);
```

`LoginScreen`의 로그인 버튼은 `signInWithEmail(email, password)`를 호출하고, `SignUpScreen`의 회원가입 버튼은 `signUpWithEmail(email, password)`를 호출하도록 변경한다.

## 6. 보안 규칙 초안

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 7. AI API 사용 주의

OpenAI 같은 AI API 키는 Expo 앱에 넣으면 안 된다. Firebase Cloud Functions를 만들고, 앱은 Cloud Function만 호출해야 한다.
