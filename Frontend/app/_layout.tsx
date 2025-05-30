import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
        headerShown: false,
      }}
      >
        <Stack.Screen
          name="(auth)/login"
          options = {{
            gestureEnabled: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)/signup"
          options = {{
            gestureEnabled: false,
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="(home)/home" 
          options = {{ 
            title: "Home", 
            headerShown: false, 
            headerBackVisible: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="(settings)/settings" 
          options = {{ 
            title: "Settings",
            headerStyle: {
              backgroundColor: '#FFFBDE'
            },
            headerShown: true,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
