import { NavigationContainer, DefaultTheme, createNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';

import HomeScreen from '../screens/HomeScreen';
import FileScreen from '../screens/FileScreen';
import AnalysisScreen from '../screens/AnalysisScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import RecommendationListScreen from '../screens/RecommendationListScreen';
import DeviceCapacityScreen from '../screens/DeviceCapacityScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import SortPreferenceScreen from '../screens/SortPreferenceScreen';
import AIChatScreen from '../screens/AIChatScreen';
import FileListScreen from '../screens/FileListScreen';
import FavoriteListScreen from '../screens/FavoriteListScreen';
import AnalysisRecommendationScreen from '../screens/AnalysisRecommendationScreen';
import FloatingChatButton from '../components/FloatingChatButton';
import { getPalette } from '../styles/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

function TabNavigator({ aiButtonEnabled, onToggleAiButton, darkMode, onToggleDarkMode }) {
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
      <Tab.Screen name="Analysis" options={{ title: '분석' }}>
        {(props) => <AnalysisScreen {...props} darkMode={darkMode} />}
      </Tab.Screen>
      <Tab.Screen name="Settings" options={{ title: '설정' }}>
        {(props) => (
          <SettingsScreen
            {...props}
            aiButtonEnabled={aiButtonEnabled}
            onToggleAiButton={onToggleAiButton}
            darkMode={darkMode}
            onToggleDarkMode={onToggleDarkMode}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [aiButtonEnabled, setAiButtonEnabled] = useState(true);
  const [aiButtonDeleteMode, setAiButtonDeleteMode] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

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

  return (
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
        <Stack.Screen name="AthenaTabs" options={{ headerShown: false }}>
          {(props) => (
            <TabNavigator
              {...props}
              aiButtonEnabled={aiButtonEnabled}
              onToggleAiButton={setAiButtonEnabled}
              darkMode={darkMode}
              onToggleDarkMode={setDarkMode}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: '히스토리', headerBackTitleVisible: false }}
        />
        <Stack.Screen name="RecommendationList" options={{ title: '추천 정리' }}>
          {(props) => <RecommendationListScreen {...props} darkMode={darkMode} />}
        </Stack.Screen>
        <Stack.Screen name="DeviceCapacity" options={{ title: '기기 용량' }}>
          {(props) => <DeviceCapacityScreen {...props} darkMode={darkMode} />}
        </Stack.Screen>
        <Stack.Screen name="PersonalInfo" options={{ title: '개인정보' }}>
          {(props) => <PersonalInfoScreen {...props} darkMode={darkMode} />}
        </Stack.Screen>
        <Stack.Screen name="SortPreference" options={{ title: '정렬 기준' }}>
          {(props) => <SortPreferenceScreen {...props} darkMode={darkMode} />}
        </Stack.Screen>
        <Stack.Screen name="AIChat" options={{ title: 'Athena AI' }}>
          {(props) => <AIChatScreen {...props} darkMode={darkMode} />}
        </Stack.Screen>
        <Stack.Screen name="FileList" options={{ title: '파일 목록' }}>
          {(props) => <FileListScreen {...props} darkMode={darkMode} />}
        </Stack.Screen>
        <Stack.Screen name="FavoriteList" options={{ title: '즐겨찾기' }}>
          {(props) => <FavoriteListScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="AnalysisRecommendation" options={{ title: '개선 제안' }}>
          {(props) => <AnalysisRecommendationScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>

      {aiButtonEnabled ? (
        <FloatingChatButton
          onPress={() => {
            if (aiButtonDeleteMode) {
              setAiButtonDeleteMode(false);
              return;
            }
            if (navigationRef.isReady()) {
              navigationRef.navigate('AIChat');
            }
          }}
          onLongPress={() => setAiButtonDeleteMode(true)}
          showDelete={aiButtonDeleteMode}
          onPressDelete={() => {
            setAiButtonDeleteMode(false);
            setAiButtonEnabled(false);
          }}
          darkMode={darkMode}
        />
      ) : null}
    </NavigationContainer>
  );
}
