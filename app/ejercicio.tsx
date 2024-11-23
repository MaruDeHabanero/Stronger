import { Text, View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";

export default function notFound() {
    return (
		<Text>
			404
		</Text>
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
    button: {
        borderRadius: 5,
        fontSize: 20,
        textDecorationLine: "underline",
        color: "black",
    },
});
