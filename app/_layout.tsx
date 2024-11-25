import { Stack } from "expo-router";
import {
	Poppins_400Regular,
	Poppins_600SemiBold,
	useFonts,
} from "@expo-google-fonts/poppins";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider, useTheme } from "@/utils/OscuroClaroContext";
import { Colors, tomatoCustom } from "@/constants/Colors";
import { Button } from "react-native";

SplashScreen.preventAutoHideAsync();

function AppLayout() {
	const { theme } = useTheme();
	const backgroundColor =
		theme === "light" ? Colors.light.background : Colors.dark.background;
	const hintColor = theme === "light" ? Colors.dark.background : Colors.light.background;


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
		<>
			<Stack
				screenOptions={{
					headerShadowVisible: false,
					headerStyle: {
						backgroundColor,
					},
					headerTintColor: hintColor,
				}}
			>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="entrenamiento" options={{
					headerTitle: "Entrenamiento", 
					presentation: "modal", 
					gestureEnabled: true,
					animation: "slide_from_bottom",
					gestureDirection: "vertical",
					headerTintColor: 'white',
					// headerTitleStyle: { color: 'white' }, headerRight: () => (
					// 	<Button
					// 		onPress={() => alert('Botón presionado')}
					// 		title="Terminar"
					// 		color={tomatoCustom}
					// 	/>
					// ),
				}} />
				<Stack.Screen name="+not-found" />
				<Stack.Screen name="ejercicio" />
			</Stack>
		</>
	);
}

export default function RootLayout() {
	return (
		<ThemeProvider>
			<AppLayout />
		</ThemeProvider>
	);
}
