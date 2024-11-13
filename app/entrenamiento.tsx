import { Link, router } from 'expo-router';
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { useTheme } from "@/utils/OscuroClaroContext";

export default function Modal() {
	const { theme } = useTheme();
	const backgroundColor = theme === "dark" ? Colors.dark.background : Colors.light.background;
	const color = theme === "dark" ? Colors.dark.text : Colors.light.text;

    return (
        <View style={[styles.container, {backgroundColor}]}>
            <Text style={{color: color}}>ENTRENAMIENTOS MAMEY</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
