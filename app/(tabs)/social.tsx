import { Text, View, StyleSheet } from "react-native";
import { useColorSchemeListener } from "@/utils/colorSchemeListener"; // Importar el hook
import Colors from "../../constants/Colors";

export default function Social() {
	// Usar el hook para obtener el esquema de color dinámico
    const colorScheme = useColorSchemeListener();

    return (
        <View style={}>
            <Text style={{ fontSize: 50 }}>Blank</Text>
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
});
