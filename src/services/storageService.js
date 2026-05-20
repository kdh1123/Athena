import AsyncStorage from '@react-native-async-storage/async-storage';

const memoryStore = new Map();

async function tryNativeStorage(action, fallback) {
  try {
    return await action();
  } catch (error) {
    return fallback();
  }
}

export const appStorage = {
  getItem: (key) =>
    tryNativeStorage(
      () => AsyncStorage.getItem(key),
      () => memoryStore.get(key) ?? null
    ),
  setItem: (key, value) =>
    tryNativeStorage(
      () => AsyncStorage.setItem(key, value),
      () => {
        memoryStore.set(key, value);
      }
    ),
  removeItem: (key) =>
    tryNativeStorage(
      () => AsyncStorage.removeItem(key),
      () => {
        memoryStore.delete(key);
      }
    ),
};
