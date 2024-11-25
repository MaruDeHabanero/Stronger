import { Text, View, StyleSheet } from "react-native";
import { Image } from 'expo-image';
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ExerciseExplanation } from "@/types/entrenamientos";
import { obtenerExplicacionDeEjercicio } from "@/services/DatabaseQueries";
import { useTheme } from "@/utils/OscuroClaroContext";
import Colors from "@/constants/Colors";
import { Vista } from "@/components/Vista";
import * as images from "../assets/images/exercisesGifs";

export default function notFound() {
    const { idEjercicio } = useLocalSearchParams();
    const [ejercicio, setEjercicios] = useState<ExerciseExplanation>();

    // Usamos useEffect para realizar la llamada a la base de datos solo una vez cuando el componente se monta
    useEffect(() => {
        const fetchEjercicios = async () => {
            try {
                const result:ExerciseExplanation = await obtenerExplicacionDeEjercicio(idEjercicio.toString());
                setEjercicios(result); // Almacenamos los datos obtenidos
            } catch (error) {
                console.error("Error al obtener los ejercicios:", error);
            }
        };

        fetchEjercicios();
    }, [idEjercicio]);
    const { theme } = useTheme();
    const colorTexto =
        theme === "dark" ? Colors.dark.text : Colors.light.text;

    let imagen: any = obtenerImagen(ejercicio?.idEjercicio!);

    return (
        <Vista style={{ display: "flex", height: "100%", flex: 1 }}>
            <View style={styles.modalContainer}>
                <Text style={[styles.modalTitle, { color: colorTexto }]}>
                    {ejercicio?.nombre}
                </Text>
                <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Image
                        source={imagen}
                        style={styles.gifImage}
                    />
                </View>
                <Text style={[styles.modalDescription, { color: colorTexto }]}>
                    {ejercicio?.descripcion}
                </Text>
                <Text style={[styles.modalDescription, { color: colorTexto }]}>
                    Pasos: {'\n\n'}
                    {ejercicio?.pasos}
                </Text>
            </View>
        </Vista>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        margin: 20
    },
    modalTitle: {
        fontSize: 30,
        fontWeight: "bold",
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: "#FF3B30",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    closeButtonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
    },
    postImage: {
        width: "100%",
        height: 200,
        borderRadius: 5,
        marginVertical: 10,
    },
    gifImage: {
        width: 200,
        height: 200,
        marginVertical: 20,
    },
});

function obtenerImagen(idEjercicio: number): any {
    switch (idEjercicio) {
        case 1:
            return images.img1;
        case 2:
            return images.img2;
        case 3:
            return images.img3;
        case 4:
            return images.img4;
        case 5:
            return images.img5;
        case 6:
            return images.img6;
        case 7:
            return images.img7;
        case 8:
            return images.img8;
        case 9:
            return images.img9;
        case 10:
            return images.img10;
        case 11:
            return images.img11;
        case 12:
            return images.img12;
        case 13:
            return images.img13;
        case 14:
            return images.img14;
        case 15:
            return images.img15;
        case 16:
            return images.img16;
        case 17:
            return images.img17;
        case 18:
            return images.img18;
        case 19:
            return images.img19;
        case 20:
            return images.img20;
        default:
            return null;
    }
}
