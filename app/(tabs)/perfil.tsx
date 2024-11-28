import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme } from "@/utils/OscuroClaroContext";
import { Colors } from "@/constants/Colors";
import HeaderPerfil from "@/components/Perfil/HeaderPerfil";
import TabsPerfil from "@/components/Perfil/TabsPerfil";
import Feed from "@/components/Social/Feed";
import dataPerfil from "@/assets/dataPerfil.json";
import { Texto } from "@/components/Texto";

const PerfilScreen = () => {
	const { theme } = useTheme();
	const backgroundColor =
		theme === "dark" ? Colors.dark.background : Colors.light.background;

	// Datos del usuario obtenidos del JSON
	const user = {
		username: "@Bass19",
		entrenamientosCompletados: 235,
		siguiendo: 24,
		seguidores: 10,
		posts: dataPerfil.posts, // Aquí asignamos los posts del JSON
	};

	return (
		<FlatList
			data={user.posts}
			keyExtractor={(item) => item.id.toString()}
			ListHeaderComponent={
				<>
					<Texto style={styles.title}>Perfil</Texto>
					<HeaderPerfil
						username={user.username}
						entrenamientosCompletados={
							user.entrenamientosCompletados
						}
						siguiendo={user.siguiendo}
						seguidores={user.seguidores}
					/>
					<TabsPerfil />
				</>
			}
			renderItem={({ item }) => <Feed posts={[item]} />}
			contentContainerStyle={[styles.container, { backgroundColor }]}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	title: {
		fontSize: 50,
		fontFamily: "Poppins_600SemiBold",
	},
});

export default PerfilScreen;
