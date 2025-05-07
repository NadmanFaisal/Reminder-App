import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="props" />
      <Stack.Screen name="usestate" />
    </Stack>
  );
}
