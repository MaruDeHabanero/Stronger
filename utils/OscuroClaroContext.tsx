import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import { Appearance, StatusBar } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { Colors } from "../constants/Colors";

// Definir el contexto y su tipo
interface ThemeContextType {
	theme: string;
	toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
	theme: "light",
	toggleTheme: () => {},
});

// Definir el tipo de props para el ThemeProvider
interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const [theme, setTheme] = useState(Appearance.getColorScheme() || "light");

	useEffect(() => {
		const subscription = Appearance.addChangeListener(({ colorScheme }) => {
			setTheme(colorScheme || "light");
		});
		return () => subscription.remove();
	}, []);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	useEffect(() => {
		const barStyle = theme === "light" ? "dark-content" : "light-content";
		const backgroundColor =
			theme === "light"
				? Colors.light.background
				: Colors.dark.background;
		const navBarColor =
			theme === "light"
				? Colors.tabsLight.tabBarStyle.backgroundColor
				: Colors.tabsDark.tabBarStyle.backgroundColor;
		StatusBar.setBarStyle(barStyle, true);
		StatusBar.setBackgroundColor(backgroundColor, true);
		NavigationBar.setBackgroundColorAsync(navBarColor);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

// Hook personalizado para acceder al contexto
export const useTheme = () => useContext(ThemeContext);
