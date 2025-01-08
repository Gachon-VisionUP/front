import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // 모든 하위 화면에서 상단바 숨기기
      }}
    />
  );
}