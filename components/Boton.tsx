// components/BotonComponent.tsx
import Colors from "@/constants/Colors";
import { useTheme } from "@/utils/OscuroClaroContext";
import React from "react";
import { Text, TouchableOpacity, TextStyle, StyleSheet } from "react-native";

interface BotonComponentProps {
    children: React.ReactNode;
    style?: TextStyle | TextStyle[];
    onPress?: () => void; // Propiedad onPress
}

export const Boton: React.FC<BotonComponentProps> = ({ children, style, onPress }) => {
    const { theme } = useTheme();
    const color = theme === "dark" ? Colors.dark.text : Colors.light.text;

    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.default, { color }, style]}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
    },
});
