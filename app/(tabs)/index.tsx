import { Text, View, StyleSheet, FlatList } from "react-native";
import { Link } from "expo-router";
import Colors from "../../constants/Colors";
import { useTheme } from "@/utils/OscuroClaroContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Routine } from "@/types/entrenamientos";
import routinesData from "@/assets/dataPlantilla.json";

export default function Index() {

	// Rutas de las plantillas
	const routines = routinesData.rutinas as Routine[];

	const { theme } = useTheme();
	// Elementos generales para el Dark Mode
	const backgroundColor = theme === "dark" ? Colors.dark.background : Colors.light.background;
	const color = theme === "dark" ? Colors.dark.text : Colors.light.text;

	// Color del borde de la plantilla
	const plantillaBorder = theme === "dark" ? Colors.light.background : Colors.dark.background;

    const renderRoutine = ({ item }: { item: Routine }) => (
		<Link
			href={`/entrenamiento`}
			style={styles.square}
		>
		  <Text>{item.NombreRutina}</Text>
		  <Text>Última vez: {item.UltimaVezRealizado}</Text>
		</Link>
	  );

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={[styles.title, { color }]}>Stronger</Text>
            <Link href="/entrenamiento" style={[styles.button, { color }]}>
                Nuevo Entrenamiento
            </Link>
            <Text style={[styles.subtitle, { color }]}>Plantillas</Text>
            <View style={[styles.plantilla, { borderColor: plantillaBorder }]}>
                <FlatList
                    data={routines}
                    renderItem={renderRoutine}
                    keyExtractor={(item) => item.NombreRutina}
                />
            </View>
            <Link href="/entrenamiento" style={[styles.plusSign]}>
                <AntDesign name="plussquare" size={30} color="tomato" />
            </Link>
        </View>
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
    button: {
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
    plantilla: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
	square: {
		backgroundColor: '#e0e0e0',
		padding: 20,
		borderRadius: 8,
		marginBottom: 12,
		alignItems: 'center',
	  },
});
