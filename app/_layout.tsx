import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native'; // BackHandler와 Alert를 가져오기
import 'react-native-reanimated';
import { IconProvider } from '../context/IconContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as Notifications from 'expo-notifications';

// 앱의 리소스 로드가 완료되기 전에 SplashScreen이 자동으로 숨겨지는 것을 방지
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       alert('알림 권한이 거부되었습니다!');
  //     }
  //   })();
  // }, []);

  // 뒤로가기 버튼 차단 처리
  useEffect(() => {
    const backAction = () => {
      Alert.alert('잠시만요!', '이 앱에서는 뒤로가기 버튼이 비활성화되어 있습니다.', [
        { text: '확인', style: 'cancel' },
      ]);
      return true; // 뒤로가기 버튼 동작을 차단
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // 컴포넌트가 언마운트될 때 리스너 정리
  }, []);

  // 폰트 로드가 완료되면 SplashScreen 숨기기
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <IconProvider>
        <Stack
          screenOptions={{
            headerShown: false, // 모든 하위 화면에서 헤더 숨기기
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(admins)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </IconProvider>
    </ThemeProvider>
  );
} 