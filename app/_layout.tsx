import { Stack } from "expo-router";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "@/utils/OscuroClaroContext";
SplashScreen.preventAutoHideAsync();
import { useTheme } from "@/utils/OscuroClaroContext";
import { Colors } from "@/constants/Colors";

export default function RootLayout() {
  const { theme } = useTheme();
  const backgroundColor =
    theme === "dark" ? Colors.light.background : Colors.dark.background;
  const color = theme === "dark" ? Colors.light.text : Colors.dark.text;

  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
  
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    // El Theme Provider es el que se encarga de cambiar el tema de la aplicación
    <ThemeProvider>
      <Stack
	  	screenOptions={{
				headerStyle: {
					backgroundColor,
				},
				headerTitleStyle: {
					color,
				}
		}}
	  >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="entrenamiento"
          options={{
            title: "",
            presentation: "modal",
            headerTintColor: "white",
            gestureEnabled: true,
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
