// components/ViewComponent.tsx
import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "@/utils/OscuroClaroContext";
import Colors from "@/constants/Colors";

interface ViewComponentProps {
    children: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
}

export const Vista: React.FC<ViewComponentProps> = ({ children, style }) => {
    const { theme } = useTheme();
    const backgroundColor = theme === "dark" ? Colors.dark.background : Colors.light.background;

    return <View style={[{ backgroundColor }, style]}>{children}</View>;
};