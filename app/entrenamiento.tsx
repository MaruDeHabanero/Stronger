import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import routinesData from "@/assets/dataPlantilla.json";
import { Exercise } from "@/types/entrenamientos";
import { useTheme } from "@/utils/OscuroClaroContext";

// Componentes para el modo oscuro y claro
import { Vista } from "@/components/Vista";
import { Texto } from "@/components/Texto";


const ejercicios = routinesData.desgloceRutina as Exercise[];

export default function RoutineDetailScreen() {
    const { theme } = useTheme();

    const { NombreRutina } = useLocalSearchParams<{ NombreRutina: string }>();

    if (!ejercicios || ejercicios.length === 0) {
        console.log("No exercises found:", ejercicios);
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Rutina no encontrada!</Text>
            </View>
        );
    }

    return (
		<Vista style={{display: "flex", height: "100%"}}>
			<FlatList
				data={ejercicios}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<Vista style={styles.exerciseContainer}>
						<Texto style={styles.exerciseText}>{item.ejercicio}</Texto>
						<Texto style={styles.noteExcerciseText}>{item.nota}</Texto>

						{/* FlatList anidado para las series de cada ejercicio */}
						<FlatList
							data={item.series}
							keyExtractor={(serie, index) => index.toString()}
							renderItem={({ item: serie }) => (
								<Vista style={styles.seriesContainer}>
									<Texto style={styles.seriesText}>
										Serie {serie.numeroSerie}:{" "}
										{serie.repeticiones} reps, {serie.peso} kg
									</Texto>
								</Vista>
							)}
						/>
					</Vista>
				)}
			/>
		</Vista>
    );
}

const styles = StyleSheet.create({
    exerciseContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderColor: "#ddd",
		margin: 10,
		borderWidth: 1,
		borderRadius: 10,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    errorText: {
        fontSize: 18,
        color: "red",
        textAlign: "center",
    },
    exerciseText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 4,
    },
    noteExcerciseText: {
        fontSize: 16,
        color: "#666",
        marginBottom: 16,
    },
    seriesContainer: {
        paddingVertical: 4,
        paddingLeft: 16,
    },
    seriesText: {
        fontSize: 14,
    },
});
