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
import { View, StyleSheet } from "react-native";
import { Vista } from "@/components/Vista";
import { Texto } from "@/components/Texto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
				<Stack.Screen name="entrenamiento" options={({ route, navigation }) => ({
					headerTitle: "Entrenamiento",
					presentation: "modal",
					gestureEnabled: true,
					animation: "slide_from_bottom",
					gestureDirection: "vertical",
					headerTintColor: hintColor,
					headerTitleStyle: { color: hintColor }, header: () => (
						<Vista style={styles.modalContainer}>
							<View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
								<MaterialIcons onPress={() => navigation.goBack()} name="chevron-left" size={30} color={tomatoCustom} />
							</View>
							<Button
								onPress={() => navigation.goBack()}
								title="Terminar entrenamiento"
								color={tomatoCustom}
							/>
						</Vista>

					)

				})} />
				<Stack.Screen name="+not-found" />
				<Stack.Screen name="ejercicios" options={({ route, navigation }) => ({
					headerTitle: "Ejercicios",
					gestureEnabled: true,
					animation: "slide_from_bottom",
					gestureDirection: "vertical",
					headerTintColor: hintColor,
					headerTitleStyle: { color: hintColor }, header: () => (
						<Vista style={styles.modalContainer}>
							<View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
								<MaterialIcons onPress={() => navigation.goBack()} name="chevron-left" size={30} color={tomatoCustom} />
							</View>
							<Button
								onPress={() => navigation.goBack()}
								title="Terminar rutina"
								color={tomatoCustom}
							/>
						</Vista>
					)
				})} />
			</Stack>
		</>
	);
}
const styles = StyleSheet.create({
	modalContainer: {
		display: "flex", 
		flexDirection: "row", 
		justifyContent: "space-between", 
		paddingHorizontal: 12, 
		paddingVertical: 3,
		paddingBottom: 15,
	},
});
export default function RootLayout() {
	return (
		<ThemeProvider>
			<AppLayout />
		</ThemeProvider>
	);
}
