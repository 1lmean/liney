import '../global.css';
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { colors } from '@/shared/tokens';
import { supabase } from '@/shared/lib/supabase';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const scheme = useColorScheme() ?? 'light';
  const palette = colors[scheme];
  const [authReady, setAuthReady] = useState(false);

  const [fontsLoaded] = useFonts({
    BuheungJuwon: require('../assets/fonts/BuheungJuwon.ttf'),
  });

  useEffect(() => {
    async function ensureAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        const { error } = await supabase.auth.signInAnonymously();
        if (error) console.error('[ensureAuth]', error.message);
      }
      setAuthReady(true);
    }
    ensureAuth();
  }, []);

  useEffect(() => {
    if (fontsLoaded && authReady) SplashScreen.hideAsync();
  }, [fontsLoaded, authReady]);

  if (!fontsLoaded || !authReady) return null;

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
