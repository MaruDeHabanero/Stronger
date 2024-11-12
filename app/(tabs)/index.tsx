import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useColorSchemeListener } from "@/utils/colorSchemeListener"; // Importar el hook
import Colors from "../../constants/Colors";

export default function Index() {
    // Usar el hook para obtener el esquema de color dinámico
    const colorScheme = useColorSchemeListener();

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor:
                        colorScheme === "dark"
                            ? Colors.dark.background
                            : Colors.light.background,
                },
            ]}
        >
            <Text
                style={[
                    styles.text,
                    {
                        color:
                            colorScheme === "dark"
                                ? Colors.dark.text
                                : Colors.light.text,
                    },
                ]}
            >
                Bienvenido a Stronger
            </Text>
            <Link
                href="/social"
                style={[
                    styles.button,
                    {
                        color:
                            colorScheme === "dark"
                                ? Colors.dark.text
                                : Colors.light.text,
                    },
                ]}
            >
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
    },
    button: {
        borderRadius: 5,
        fontSize: 20,
        textDecorationLine: "underline",
    },
});
