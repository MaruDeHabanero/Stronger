import { Text, View, StyleSheet, FlatList, Button } from "react-native";
import { Link } from "expo-router";
import Colors from "../../constants/Colors";
import { useTheme } from "@/utils/OscuroClaroContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Routine } from "@/types/entrenamientos";
import routinesData from "@/assets/dataPlantilla.json";
import * as queries from "@/services/DatabaseQueries"

// Componentes para el modo oscuro y claro
import { Vista } from "@/components/Vista";
import { Texto } from "@/components/Texto";

export default function Index() {
    const { theme } = useTheme();

    const plantillaBorder =
        theme === "dark" ? Colors.light.background : Colors.dark.background;

    //const routines = routinesData.rutinas as Routine[];

    const routines = queries.obtenerRutinas();

    const renderRoutine = ({ item }: { item: Routine }) => (
		<Vista style={[styles.square, {borderColor: plantillaBorder}]}>
			<Link href={`/entrenamiento`}>
					<Texto style={[styles.subtitle, {fontSize: 25}]}>
						{item.nombre}{"\n"}
					</Texto>
					<Texto>Última vez: {item.ultimaVezRealizado}{"\n"}</Texto>
					<FlatList
						data={item.ejercicios}
						keyExtractor={(item) => item.nombre}
						renderItem={({ item }) => (
							<Texto style={{color: "gray"}}>
								{item.numeroSeries}x {item.nombre}
							</Texto>
						)}
					/>
			</Link>
		</Vista>
    );

    return (
        <Vista style={styles.container}>
            <Texto style={styles.title}>Stronger</Texto>
            <Link href="/entrenamiento" style={styles.nuevoEntrenamiento}>
                Nuevo Entrenamiento
            </Link>
            <Texto style={styles.subtitle}>Plantillas</Texto>
            <Vista style={styles.plantillaBox}>
                <FlatList
                    data={routines}
                    keyExtractor={(item) => item.nombre}
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
    },
    square: {
        borderRadius: 8,
		borderWidth: 1,
		marginVertical: 5,
		padding: 10,
    },
});
