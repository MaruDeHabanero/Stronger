import { Text, View, StyleSheet } from "react-native";
import { useColorSchemeListener } from "@/utils/colorSchemeListener"; // Importar el hook
import Colors from "../../constants/Colors";
import { useTheme } from '@/utils/OscuroClaroContext';

export default function Perfil() {
	const { theme } = useTheme();
	const backgroundColor = theme === "dark" ? Colors.dark.background : Colors.light.background;
	const color = theme === "dark" ? Colors.dark.text : Colors.light.text;

    return (
        <View style={[styles.container, {backgroundColor}]}>
            <Text style={[{color}]}>Error 404. Módulo en desarrollo 👷</Text>
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
