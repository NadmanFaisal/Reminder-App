import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

/**
 * RootLayout defines the app's navigation structure 
 * using expo-router's Stack. GestureHandlerRootView is 
 * required to enable gesture-based interactions across 
 * screens.
 */
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

        {/* Home screen - disables gestures, hides header, 
        prevents back navigation */}
        <Stack.Screen 
          name="(home)/home" 
          options = {{ 
            title: "Home", 
            headerShown: false, 
            headerBackVisible: false,
            gestureEnabled: false,
          }}
        />

        {/* Settings screen - displays header with custom 
        background color */}
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
