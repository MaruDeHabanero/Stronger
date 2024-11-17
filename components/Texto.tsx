// components/TextComponent.tsx
import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import { useTheme } from "@/utils/OscuroClaroContext";
import Colors from "@/constants/Colors";

interface TextComponentProps {
    children: React.ReactNode;
    style?: TextStyle | TextStyle[];
}

export const Texto: React.FC<TextComponentProps> = ({ children, style }) => {
    const { theme } = useTheme();
    const color = theme === "dark" ? Colors.dark.text : Colors.light.text;

    return <Text style={[styles.default, { color }, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
    },
});
