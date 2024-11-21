import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { tomatoCustom } from "@/constants/Colors";
import { Vista } from "@/components/Vista";
import { Texto } from "@/components/Texto";

import { Post } from "@/types/posts";

import { useTheme } from "@/utils/OscuroClaroContext";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface PublicacionProps extends Post {}

const Publicacion: React.FC<PublicacionProps> = ({
    nombreUsuario,
    tiempoDesde,
    textoPost,
    ejercicio,
    peso,
    unidades,
    repeticiones,
    likes,
    imagen,
}) => {
    const { theme } = useTheme();

    return (
        <Vista style={styles.card}>
            <Vista style={styles.header}>
                <Vista style={styles.userData}>
                    <FontAwesome
                        name={theme === "dark" ? "user-circle" : "user-circle-o"}
                        size={36}
                        color={theme === "dark" ? tomatoCustom : tomatoCustom}
                    />
                    <Texto style={styles.userName}>@{nombreUsuario}</Texto>
                </Vista>
                <Texto style={styles.timeAgo}>{tiempoDesde}</Texto>
            </Vista>

            <Texto style={styles.postText}>{textoPost}</Texto>

            {imagen && (
                <Image
                    source={{ uri: imagen.toString() }}
                    style={styles.postImage}
                />
            )}

            <Vista style={styles.exerciseInfo}>
                <Texto style={styles.exerciseDetails}>
                    {ejercicio}: {peso}
                    {unidades}, {repeticiones} repeticiones
                </Texto>
            </Vista>

            <Vista style={styles.footer}>
				<Vista style={styles.interactionsCounter}>
					<FontAwesome6 name="heart" size={24} color="grey"/>
					<Text style={styles.likes}>{likes}</Text>
				</Vista>
				<Vista style={styles.interactionsCounter}>
					<MaterialIcons name="celebration" size={24} color="grey"/>
					<Text style={styles.likes}>{likes}</Text>
				</Vista>
				<Vista style={styles.interactionsCounter}>
					<FontAwesome name="bookmark" size={24} color="grey"/>
				</Vista>
            </Vista>
        </Vista>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 15,
        borderRadius: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
		alignItems: "center",
        marginBottom: 5,
    },
    userName: {
        fontWeight: "bold",
        fontSize: 16,
    },
    userData: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    timeAgo: {
        color: "gray",
        fontSize: 12,
    },
    postText: {
        marginVertical: 10,
        fontSize: 14,
        lineHeight: 20,
    },
    exerciseInfo: {
        marginVertical: 5,
    },
    exerciseDetails: {
        fontStyle: "italic",
        fontSize: 14,
    },
    footer: {
        paddingTop: 10,
		flexDirection: "row",
		justifyContent: "space-around",
    },
    likes: {
        fontWeight: "bold",
        color: "grey",
    },
    postImage: {
        width: "100%",
        height: 200,
        borderRadius: 5,
        marginVertical: 10,
    },
	centerIcon: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	interactionsCounter : {
		display: "flex", 
		flexDirection: "row", 
		gap: 10, 
		alignItems: "center"
	}
});

export default Publicacion;
