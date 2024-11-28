import { Text, View, StyleSheet, FlatList, Button } from "react-native";
import { Link } from "expo-router";
import {Colors, tomatoCustom} from "../../constants/Colors";
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

 
    //const routines = routinesData.rutinas as Routine[];

    let routines = queries.obtenerRutinas();

    const renderRoutine = ({ item }: { item: Routine }) => (
		<Vista style={[styles.square]}>
			<Link href={`/entrenamiento?idRutina=${item.idRutina}&nombre=${item.nombre}`}>
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
            <View style={styles.botonesNuevoAgrega}>
                <Link href="/entrenamiento" style={styles.nuevoEntrenamiento}>
                    Nuevo Entrenamiento
                </Link>
                <Link href="/ejercicios" style={styles.nuevoEntrenamiento}>
                    Nueva Rutina
                </Link>
            </View>
            <Texto style={styles.subtitle}>Rutinas</Texto>
            <FlatList
                data={routines}
                keyExtractor={(item) => item.nombre}
                renderItem={renderRoutine}
            />
        </Vista>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: 20,
        paddingBottom:0,
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
        borderColor: tomatoCustom,
        margin:10,
		padding: 15,
    },
    botonesNuevoAgrega:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    nuevoEntrenamiento: {
        padding: 15,
        textAlign: "center",
        fontFamily: "Poppins_400Regular",
        backgroundColor: tomatoCustom,
        borderRadius: 20,
        width: "47%",
        alignSelf: "center",
        marginHorizontal: 5,
        color: "white",
        fontWeight:"bold"
    },
});
