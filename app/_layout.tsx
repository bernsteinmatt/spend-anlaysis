// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// // import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
//
// // SplashScreen.preventAutoHideAsync();
//
// export default function RootLayout() {
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });
//
//   useEffect(() => {
//     if (loaded) {
//       // SplashScreen.hideAsync();
//     }
//   }, [loaded]);
//
//   if (!loaded) {
//     return null;
//   }
//
//   return <Stack />;
// }

import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
//
import '../global.css';
//
// export default function App() {
//   return (
//     <>
//       <ScreenContent title="Home" path="App.tsx" />
//       <StatusBar style="auto" />
//     </>
//   );
// }

import 'react-native-url-polyfill/auto';
import { Session } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import Auth from '../components/Auth';
import { supabase } from '../lib/supabase';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  console.log('session', session);
  return (
    <View>
      <Auth />
      {session && session.user && <Text>{session.user.id}</Text>}
    </View>
  );
}

