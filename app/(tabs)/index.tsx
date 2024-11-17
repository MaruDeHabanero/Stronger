import { Text, View, StyleSheet, FlatList } from "react-native";
import { Link } from "expo-router";
import Colors from "../../constants/Colors";
import { useTheme } from "@/utils/OscuroClaroContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Routine } from "@/types/entrenamientos";
import routinesData from "@/assets/dataPlantilla.json";

// Componentes para el modo oscuro y claro
import { Vista } from "@/components/Vista";
import { Texto } from "@/components/Texto";

export default function Index() {
    const { theme } = useTheme();

    const plantillaBorder =
        theme === "dark" ? Colors.light.background : Colors.dark.background;

    const routines = routinesData.rutinas as Routine[];

    const renderRoutine = ({ item }: { item: Routine }) => (
        <Link href={`/entrenamiento`}>
            <Vista style={{borderColor: "white", borderWidth: 1, width: "100%"}}>
                <Texto style={[styles.subtitle, { fontSize: 25, marginTop: 0}]}>
                    {item.NombreRutina}
                </Texto>
                <Texto>Última vez: {item.UltimaVezRealizado}</Texto>
                <FlatList
                    data={item.Ejercicios}
                    keyExtractor={(item) => item.ejercicio}
                    renderItem={({ item }) => (
                        <Texto>
                            {"    "}
                            {item.ejercicio}
                        </Texto>
                    )}
                />
            </Vista>
        </Link>
    );

    return (
        <Vista style={styles.container}>
            <Texto style={styles.title}>Stronger</Texto>
            <Link href="/entrenamiento" style={styles.nuevoEntrenamiento}>
                Nuevo Entrenamiento
            </Link>
            <Texto style={styles.subtitle}>Plantillas</Texto>
            <Vista style={[styles.plantillaBox, { borderColor: plantillaBorder }]}>
                <FlatList
                    data={routines}
                    keyExtractor={(item) => item.NombreRutina}
                    renderItem={renderRoutine}
                />
            </Vista>
            <Link href="/entrenamiento" style={styles.plusSign}>
                <AntDesign name="plussquare" size={30} color="tomato" />
            </Link>
        </Vista>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: 20,
    },
    title: {
        fontSize: 50,
        fontFamily: "Poppins_600SemiBold",
    },
    subtitle: {
        fontSize: 35,
        fontFamily: "Poppins_400Regular",
        marginTop: 20,
    },
    nuevoEntrenamiento: {
        padding: 12,
        marginTop: 20,
        textAlign: "center",
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
        backgroundColor: "tomato",
        borderRadius: 5,
        width: "80%",
        alignSelf: "center",
    },
    plusSign: {
        marginTop: 5,
        alignSelf: "flex-end",
        padding: 10,
    },
    plantillaBox: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    square: {
        backgroundColor: "#e0e0e0",
        padding: 20,
        borderRadius: 8,
        marginTop: 5,
        marginBottom: 5,
        display: "flex",
        flexDirection: "column",
    },
});
