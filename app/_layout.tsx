import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{title: "Stronger 🏋️"}}/>
			<Stack.Screen name="social" options={{title: "Social"}}/>
		</Stack>
	);
}
