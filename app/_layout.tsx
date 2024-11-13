import { Stack } from "expo-router";
import { Poppins_400Regular, Poppins_600SemiBold, useFonts } from "@expo-google-fonts/poppins";
import {useEffect} from "react";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "@/utils/OscuroClaroContext";
import { useColorSchemeListener } from "@/utils/colorSchemeListener";
import Colors from "@/constants/Colors";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorSchemeListener();

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
		<ThemeProvider>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="entrenamiento" options={{ headerTitle: "Nuevo Entrenamiento", presentation: "modal", headerStyle: {backgroundColor: "tomato"}}}/>
				<Stack.Screen name="+not-found" />
			</Stack>
		</ThemeProvider>
    );
}
