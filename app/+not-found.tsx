import { Text, View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function notFound(){
    return (
		<>
		<Stack.Screen options={{ title: 'Oops!' }} />
			<View style={styles.container}>
				<Text style={{ fontSize: 50 }}>404</Text>
				<Link href="/" style={styles.button}>
					Ir a la página principal
				</Link>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
	button: {
		borderRadius: 5,
		fontSize: 20,
		textDecorationLine: 'underline',
		color: 'black',
	},
});