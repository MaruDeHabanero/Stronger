import React from "react";
import { View, StyleSheet } from "react-native";
import { Texto } from "@/components/Texto";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { tomatoCustom } from "@/constants/Colors";
import { useTheme } from "@/utils/OscuroClaroContext";

interface HeaderPerfilProps {
	username: string;
	entrenamientosCompletados: number;
	siguiendo: number;
	seguidores: number;
}

const HeaderPerfil: React.FC<HeaderPerfilProps> = ({
	username,
	entrenamientosCompletados,
	siguiendo,
	seguidores,
}) => {
	const { theme } = useTheme();
	return (
		<View style={styles.header}>
			{/* Contenedor para el icono y los textos */}
			<View style={styles.profileRow}>
				<FontAwesome name={theme === "dark" ? "user-circle" : "user-circle-o"} size={70} color={tomatoCustom} />
				<View style={styles.userInfo}>
					<Texto style={styles.username}>{username}</Texto>
					<Texto style={styles.entrenamientos}>
						{entrenamientosCompletados} entrenamientos completados
					</Texto>
				</View>
			</View>
			{/* Estadísticas */}
			<View style={styles.stats}>
				<Texto style={styles.stat}>
					{siguiendo} <Texto style={styles.statLabel}>siguiendo</Texto>
				</Texto>
				<Texto style={styles.stat}>
					{seguidores} <Texto style={styles.statLabel}>seguidores</Texto>
				</Texto>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		alignItems: "flex-start",
		padding: 10,
		marginBottom: 5,
	},
	profileRow: {
		flexDirection: "row", 
		alignItems: "center", 
		marginBottom: 10,
	},
	userInfo: {
		marginLeft: 15, 
		gap: 5, 
	},
	username: {
		fontSize: 24,
		fontWeight: "bold",
	},
	entrenamientos: {
		fontSize: 16,
		color: "gray",
	},
	stats: {
		flexDirection: "row", // Coloca las estadísticas en fila
		marginTop: 10,
	},
	stat: {
		fontSize: 14,
		fontWeight: "bold",
		marginHorizontal: 10,
	},
	statLabel: {
		fontWeight: "normal",
		color: "gray",
	},
});

export default HeaderPerfil;
