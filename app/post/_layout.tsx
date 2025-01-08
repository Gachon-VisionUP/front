import { Stack } from 'expo-router';

export default function PostLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // 모든 하위 화면에서 헤더 숨기기
      }}
    >
      <Stack.Screen name="[id]" options={{ title: '게시물 상세' }} />
    </Stack>
  );
}
