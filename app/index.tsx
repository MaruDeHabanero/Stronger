import { Text, View, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Link } from 'expo-router';

export default function Index() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Bienvenido a Stronger</Text>
				<Link href="/social" style={styles.button}>
					Go to Social
				</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
	},
	text: {
		fontSize: 50,
		color: "black",
	},
	button: {
		borderRadius: 5,
		fontSize: 20,
		textDecorationLine: "underline",
		color: "black",
	}
});
