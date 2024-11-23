import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors, tomatoCustom } from "../../constants/Colors";
import { useTheme } from "@/utils/OscuroClaroContext";

export default function TabLayout() {
	const { theme } = useTheme();
    return (
		<>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: tomatoCustom,
                    tabBarInactiveTintColor:
                        theme === "dark"
                            ? Colors.tabsDark.tabBarInactiveTintColor
                            : Colors.tabsLight.tabBarInactiveTintColor,
                    headerStyle: {
                        backgroundColor: theme === "dark" ? Colors.dark.background : Colors.light.background,
                    },
                    headerShadowVisible: false,
                    headerTintColor:
                        theme === "dark"
                            ? Colors.dark.tint
                            : Colors.light.tint,
                    tabBarStyle: {
						borderTopWidth: 0,
						backgroundColor:
							theme === "dark"
								? Colors.tabsDark.tabBarStyle.backgroundColor
								: Colors.tabsLight.tabBarStyle.backgroundColor,
					},
					gestureEnabled: true,
					gestureDirection: "horizontal",
                }}
            >
                <Tabs.Screen
                    name="perfil"
                    options={{
                        title: "Perfil",
						headerTitle: "",
                        tabBarIcon: ({ color, focused }) =>
                            focused ? (
                                <Ionicons
                                    name="person"
                                    size={24}
                                    color={color}
                                />
                            ) : (
                                <Ionicons
                                    name="person-outline"
                                    size={24}
                                    color={color}
                                />
                            ),
                    }}
                />

                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Entrenamientos",
						headerTitle: "",
                        tabBarIcon: ({ color, focused }) =>
                            focused ? (
                                <MaterialCommunityIcons
                                    name="weight-lifter"
                                    size={24}
                                    color={color}
                                />
                            ) : (
                                <Ionicons
                                    name="body-outline"
                                    size={24}
                                    color={color}
                                />
                            ),
                    }}
                />
                <Tabs.Screen
                    name="social"
                    options={{
                        title: "Social",
						headerTitle: "",
                        tabBarIcon: ({ color, focused }) =>
                            focused ? (
                                <Ionicons
                                    name="people-circle"
                                    size={24}
                                    color={color}
                                />
                            ) : (
                                <Ionicons
                                    name="people-circle-outline"
                                    size={24}
                                    color={color}
                                />
                            ),
                    }}
                />
            </Tabs>
		</>
    );
}
