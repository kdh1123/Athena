import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebase';

export function observeAuthState(onChange) {
  return onAuthStateChanged(auth, onChange);
}

export function signInWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function sendPasswordReset(email) {
  return sendPasswordResetEmail(auth, email);
}

export async function signUpWithEmail({ name, email, password }) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);

  if (name) {
    await updateProfile(credential.user, { displayName: name });
    await credential.user.reload();
  }

  return credential;
}

export function signOutCurrentUser() {
  return signOut(auth);
}

export function getAuthErrorMessage(error) {
  const code = error?.code;

  if (code === 'auth/invalid-email') {
    return '이메일 형식이 올바르지 않습니다.';
  }

  if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
    return '이메일 또는 비밀번호를 다시 확인해주세요.';
  }

  if (code === 'auth/email-already-in-use') {
    return '이미 가입된 이메일입니다.';
  }

  if (code === 'auth/weak-password') {
    return '비밀번호는 6자리 이상이어야 합니다.';
  }

  return '잠시 후 다시 시도해주세요.';
}
