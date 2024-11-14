import { Stack, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useColorSchemeListener } from "@/utils/colorSchemeListener";
import Colors from "../../constants/Colors";

export default function TabLayout() {
    const colorScheme = useColorSchemeListener();
    return (
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "tomato",
                    tabBarInactiveTintColor:
                        colorScheme === "dark"
                            ? Colors.tabsDark.tabBarInactiveTintColor
                            : Colors.tabsLight.tabBarInactiveTintColor,
                    headerStyle: {
                        backgroundColor: colorScheme === "dark" ? Colors.dark.background : Colors.light.background,
                    },
                    headerShadowVisible: false,
                    headerTintColor:
                        colorScheme === "dark"
                            ? Colors.dark.tint
                            : Colors.light.tint,
                    tabBarStyle: {
						borderTopWidth: 0,
						backgroundColor:
							colorScheme === "dark"
								? Colors.tabsDark.tabBarStyle.backgroundColor
								: Colors.tabsLight.tabBarStyle.backgroundColor,
					}
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
    );
}
