import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';

import HomeScreen from '../screens/HomeScreen';
import FileScreen from '../screens/FileScreen';
import AnalysisScreen from '../screens/AnalysisScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import FloatingChatButton from '../components/FloatingChatButton';
import ChatModal from '../components/ChatModal';
import { colors } from '../styles/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.point,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: '#fffef8',
          borderTopColor: '#f2e7d1',
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
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} />
      <Tab.Screen name="File" component={FileScreen} options={{ title: '파일' }} />
      <Tab.Screen name="Analysis" component={AnalysisScreen} options={{ title: '분석' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: '설정' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [chatVisible, setChatVisible] = useState(false);

  const navTheme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: colors.background,
      },
    }),
    []
  );

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#fffef8' },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="AthenaTabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: '히스토리' }} />
      </Stack.Navigator>

      <FloatingChatButton onPress={() => setChatVisible(true)} />
      <ChatModal visible={chatVisible} onClose={() => setChatVisible(false)} />
    </NavigationContainer>
  );
}
