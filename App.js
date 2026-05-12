import { StatusBar } from 'expo-status-bar';
import { Platform, Text, TextInput } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

const appFont = Platform.select({
  ios: 'AppleSDGothicNeo-Regular',
  android: 'sans-serif',
  default: 'system-ui',
});

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = [Text.defaultProps.style, { fontFamily: appFont }];
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.style = [TextInput.defaultProps.style, { fontFamily: appFont }];

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AppNavigator />
    </>
  );
}
