import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Colors from "../../constants/Colors";
import { useTheme } from '@/utils/OscuroClaroContext';

export default function Index() {
    const { theme } = useTheme();

	const backgroundColor = theme === "dark" ? Colors.dark.background : Colors.light.background;
	const color = theme === "dark" ? Colors.dark.text : Colors.light.text;

    return (
        <View style={[styles.container, {backgroundColor}]}>
            <Text style={[styles.title, {color}]}>Stronger</Text>
            <Link href="/entrenamiento" style={[styles.button, {color}]}>
                Nuevo Entrenamiento
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
		padding: 20,
    },
    title: {
        fontSize: 50,
		fontFamily: 'Poppins_600SemiBold',
    },
    button: {
		padding: 12,
		marginTop: 20,
		textAlign: "center",
		fontSize: 16,
		fontFamily: 'Poppins_400Regular',
		backgroundColor: "tomato",
		borderRadius: 5,
		width: "80%",
		alignSelf: "center",
    },
});
