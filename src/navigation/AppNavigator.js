import { NavigationContainer, DefaultTheme, createNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';

import HomeScreen from '../screens/HomeScreen';
import FileScreen from '../screens/FileScreen';
import AnalysisScreen from '../screens/AnalysisScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import RecommendationListScreen from '../screens/RecommendationListScreen';
import DeviceCapacityScreen from '../screens/DeviceCapacityScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import AIChatScreen from '../screens/AIChatScreen';
import FileListScreen from '../screens/FileListScreen';
import FavoriteListScreen from '../screens/FavoriteListScreen';
import AnalysisRecommendationScreen from '../screens/AnalysisRecommendationScreen';
import SortPreferenceScreen from '../screens/SortPreferenceScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { observeAuthState, signOutCurrentUser } from '../services/authService';
import { FileLibraryProvider } from '../context/FileLibraryContext';
import { getPalette } from '../styles/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

function TabNavigator({ darkMode, onToggleDarkMode, onSignOut }) {
  const palette = getPalette(darkMode);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: palette.point,
        tabBarInactiveTintColor: palette.textMuted,
        tabBarStyle: {
          backgroundColor: palette.card,
          borderTopColor: palette.border,
          height: 66,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ color, size }) => {
          const iconMap = {
            Home: 'home-outline',
            File: 'folder-open-outline',
            AI: 'chatbubble-ellipses-outline',
            Analysis: 'analytics-outline',
            Settings: 'settings-outline',
          };
          return <Ionicons name={iconMap[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" options={{ title: '홈' }}>
        {(props) => <HomeScreen {...props} darkMode={darkMode} />}
      </Tab.Screen>
      <Tab.Screen name="File" options={{ title: '파일' }}>
        {(props) => <FileScreen {...props} darkMode={darkMode} />}
      </Tab.Screen>
      <Tab.Screen name="AI" options={{ title: 'AI' }}>
        {(props) => <AIChatScreen {...props} darkMode={darkMode} />}
      </Tab.Screen>
      <Tab.Screen name="Analysis" options={{ title: '분석' }}>
        {(props) => <AnalysisScreen {...props} darkMode={darkMode} />}
      </Tab.Screen>
      <Tab.Screen name="Settings" options={{ title: '설정' }}>
        {(props) => (
          <SettingsScreen
            {...props}
            darkMode={darkMode}
            onToggleDarkMode={onToggleDarkMode}
            onSignOut={onSignOut}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const palette = getPalette(darkMode);

  const navTheme = useMemo(
    () => ({
      ...DefaultTheme,
      dark: darkMode,
      colors: {
        ...DefaultTheme.colors,
        background: palette.background,
        card: palette.card,
        text: palette.text,
        border: palette.border,
        primary: palette.point,
      },
    }),
    [darkMode, palette.background, palette.border, palette.card, palette.point, palette.text]
  );

  useEffect(() => {
    const unsubscribe = observeAuthState(setCurrentUser);
    return unsubscribe;
  }, []);

  if (currentUser === undefined) {
    return null;
  }

  return (
    <FileLibraryProvider>
    <NavigationContainer ref={navigationRef} theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: palette.card },
          headerTintColor: palette.text,
          headerShadowVisible: false,
          animation: 'slide_from_right',
          headerBackTitleVisible: false,
          headerBackTitle: '',
          headerBackButtonDisplayMode: 'minimal',
        }}
      >
        {currentUser ? (
          <>
            <Stack.Screen name="AthenaTabs" options={{ headerShown: false }}>
              {(props) => (
                <TabNavigator
                  {...props}
                  darkMode={darkMode}
                  onToggleDarkMode={setDarkMode}
                  onSignOut={signOutCurrentUser}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="History" options={{ title: '히스토리', headerBackTitleVisible: false }}>
              {(props) => <HistoryScreen {...props} darkMode={darkMode} />}
            </Stack.Screen>
            <Stack.Screen name="RecommendationList" options={{ title: '추천 정리' }}>
              {(props) => <RecommendationListScreen {...props} darkMode={darkMode} />}
            </Stack.Screen>
            <Stack.Screen name="DeviceCapacity" options={{ title: '기기 용량' }}>
              {(props) => <DeviceCapacityScreen {...props} darkMode={darkMode} />}
            </Stack.Screen>
            <Stack.Screen name="PersonalInfo" options={{ title: '개인정보' }}>
              {(props) => <PersonalInfoScreen {...props} darkMode={darkMode} currentUser={currentUser} />}
            </Stack.Screen>
            <Stack.Screen name="FileList" options={{ title: '파일 목록' }}>
              {(props) => <FileListScreen {...props} darkMode={darkMode} />}
            </Stack.Screen>
            <Stack.Screen name="FavoriteList" options={{ title: '즐겨찾기' }}>
              {(props) => <FavoriteListScreen {...props} darkMode={darkMode} />}
            </Stack.Screen>
            <Stack.Screen name="AnalysisRecommendation" options={{ title: '개선 제안' }}>
              {(props) => <AnalysisRecommendationScreen {...props} darkMode={darkMode} />}
            </Stack.Screen>
            <Stack.Screen name="SortPreference" options={{ title: '정렬 기준' }}>
              {(props) => <SortPreferenceScreen {...props} darkMode={darkMode} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {(props) => <LoginScreen {...props} darkMode={darkMode} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" options={{ headerShown: false }}>
              {(props) => <SignUpScreen {...props} darkMode={darkMode} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </FileLibraryProvider>
  );
}
