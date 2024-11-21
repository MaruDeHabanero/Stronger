import React from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import Checkbox from 'expo-checkbox';
import { useLocalSearchParams } from "expo-router";
import routinesData from "@/assets/dataPlantilla.json";
import { Exercise } from "@/types/entrenamientos";
import { useTheme } from "@/utils/OscuroClaroContext";
import Colors from "../constants/Colors";

// Componentes para el modo oscuro y claro
import { Vista } from "@/components/Vista";
import { Texto } from "@/components/Texto";

const ejercicios = routinesData.desgloceRutina as Exercise[];

export default function RoutineDetailScreen() {
    const { theme } = useTheme();
    const colorTexto =
    theme === "dark" ? Colors.dark.text : Colors.light.text;

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
        <Vista style={{ display: "flex", height: "100%" }}>
            <FlatList
                data={ejercicios}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Vista style={styles.exerciseContainer}>
                        <Texto style={styles.exerciseText}>
                            {item.nombre}
                        </Texto>

                        {/* Si hay una nota, se muestra */}
                        {item?.nota && (
                            <Text style={styles.noteExcerciseText}>
                                {item.nota}
                            </Text>
                        )}

                        {/* FlatList anidado para las series de cada ejercicio */}
                        <FlatList
                            data={item.series}
                            keyExtractor={(serie, index) => index.toString()}
                            renderItem={({ item: serie }) => (
                                <Vista style={styles.seriesContainer}>
                                    <View style={styles.row}>
                                        <Text style={[styles.column, {color: colorTexto}]}>
                                            {serie.numeroSerie}
                                        </Text>
                                        <TextInput
                                            style={[styles.input]}
                                            keyboardType="numeric"
                                            placeholder="Peso (kg)"
                                            defaultValue={serie.peso?.toString()}
                                        />
                                        <TextInput
                                            style={[styles.input]}
                                            keyboardType="numeric"
                                            placeholder="Reps"
                                            defaultValue={serie.repeticiones?.toString()}
                                        />
                                        <Checkbox
                                            style={styles.checkbox}
                                            value={false}
                                            onValueChange={(newValue) =>
                                                console.log(
                                                    `Checkbox Serie ${serie.numeroSerie} toggled: ${newValue}`
                                                )
                                            }
                                        />
                                    </View>
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
        padding: 5,
        paddingBottom: 20,
        borderBottomWidth: 1,
        margin: 10,
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
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    column: {
        flex: 0.2,
        fontSize: 14,
        marginHorizontal: 1
    },
    input: {
        color: 'gray',
        textAlign: 'center',
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 8,
        marginHorizontal: 4,
        borderRadius: 4,
        fontSize: 14,
    },
    checkbox:{
        marginHorizontal:10
    }
});
