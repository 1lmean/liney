import '../global.css';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { colors } from '@/shared/tokens';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const scheme = useColorScheme() ?? 'light';
  const palette = colors[scheme];

  const [fontsLoaded] = useFonts({
    BuheungJuwon: require('../assets/fonts/BuheungJuwon.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: palette.bg },
        animation: 'slide_from_right',
      }}
    />
  );
}
