import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import Checkbox from 'expo-checkbox';
import { useLocalSearchParams } from "expo-router";
import routinesData from "@/assets/dataPlantilla.json";
import { Exercise, Set } from "@/types/entrenamientos";
import { useTheme } from "@/utils/OscuroClaroContext";
import Colors from "../constants/Colors";
import { obtenerRutinaDetallada } from "@/services/DatabaseQueries"

// Componentes para el modo oscuro y claro
import { Vista } from "@/components/Vista";
import { Texto } from "@/components/Texto";


export default function RoutineDetailScreen() {
    const { idRutina, nombre } = useLocalSearchParams();
    const [ejercicios, setEjercicios] = useState<any>([]);

    // Usamos useEffect para realizar la llamada a la base de datos solo una vez cuando el componente se monta
    useEffect(() => {
        const fetchEjercicios = async () => {
            try {
                const result = await obtenerRutinaDetallada(idRutina.toString());
                setEjercicios(result); // Almacenamos los datos obtenidos
            } catch (error) {
                console.error("Error al obtener los ejercicios:", error);
            }
        };

        fetchEjercicios();
    }, [idRutina]);

    const { theme } = useTheme();
    const colorTexto =
        theme === "dark" ? Colors.dark.text : Colors.light.text;

   

    const [checkedStates, setCheckedStates] = useState<{ [key: string]: boolean }>({});
    const handleCheckboxChange = (exerciseIndex: number, serieIndex: number) => {
        const uniqueKey = `${exerciseIndex}-${serieIndex}`;
        setCheckedStates((prev) => ({
            ...prev,
            [uniqueKey]: !prev[uniqueKey], // Toggle the value
        }));
    };
    

    return (
        <Vista style={{ display: "flex", height: "100%" }}>
            <Texto style={[styles.routineText]}>{nombre ?? 'Nuevo entrenamiento vacío'}</Texto>
            <FlatList
                data={ejercicios}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index: exerciseIndex }) => (
                    <Vista style={styles.exerciseContainer}>
                        {/* Nombre del ejercicio */}
                        <Texto style={styles.exerciseText}>{item.nombre}</Texto>

                        {/* Nota opcional */}
                        {item?.nota && (
                            <Texto style={styles.noteExcerciseText}>
                                {item.nota}
                            </Texto>
                        )}

                        {/* Tabla */}
                        <Vista style={styles.tableContainer}>
                            {/* Encabezado de la tabla */}
                            <Vista style={[styles.row]}>
                                <Texto style={[styles.columnSerieHeader]}>Serie</Texto>
                                <Texto style={styles.columnInputHeader}>Peso ({item.sufijo})</Texto>
                                <Texto style={styles.columnInputHeader}>Repeticiones</Texto>
                                <Texto style={styles.columnCheckboxHeader}> </Texto>
                            </Vista>

                            {/* Filas de la tabla */}
                            <FlatList
                                data={item.series}
                                keyExtractor={(serie, serieIndex) => `${exerciseIndex}-${serieIndex}`}
                                renderItem={({ item: serie, index: serieIndex }) => {
                                    const uniqueKey = `${exerciseIndex}-${serieIndex}`;
                                    return (
                                        <Vista style={styles.row}>
                                            <Texto style={[styles.columnSerie, { color: colorTexto }]}>
                                                {serie.numeroSerie}
                                            </Texto>
                                            <TextInput
                                                style={styles.columnInput}
                                                keyboardType="numeric"
                                                defaultValue={serie.peso?.toString()}
                                            />
                                            <TextInput
                                                style={styles.columnInput}
                                                keyboardType="numeric"
                                                defaultValue={serie.repeticiones?.toString()}
                                            />
                                            <Checkbox
                                                style={styles.checkbox}
                                                value={checkedStates[uniqueKey] ?? serie.hecho}
                                                onValueChange={() => handleCheckboxChange(exerciseIndex, serieIndex)}
                                            />
                                        </Vista>
                                    )
                                }}
                            />
                            <Texto style={{textAlign: 'center', marginBottom: 20}}>
                                Agregar serie
                            </Texto>
                        </Vista>
                    </Vista>
                )}
            />
        </Vista>
    );
}

const styles = StyleSheet.create({
    exerciseContainer: {
        marginHorizontal: 10,
        marginTop: 5,
    },
    routineText: {
        fontSize: 25,
        marginTop: 20,
        marginHorizontal: 10,
    },
    exerciseText: {
        fontSize: 20,
        marginBottom: 2,
    },
    noteExcerciseText: {
        fontSize: 16,
        color: "#666",
        marginBottom: 16,
    },
    tableContainer: {
        paddingVertical: 0,
    },
    tableHeader: {
        paddingVertical: 8,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    
    columnSerie: {
        flex: 0.22,
        fontSize: 14,
        textAlign: "center",
    },
    columnSerieHeader: {
        flex: 0.22,
        fontSize: 14,
        textAlign: "center",
    },
    columnInput: {
        backgroundColor: "lightgray",
        opacity: 0.8,
        textAlign: "center",
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 8,
        marginHorizontal: 4,
        borderRadius: 20,
        fontSize: 14,
    },
    columnInputHeader: {
        flex: 1,
        fontSize: 16,
        textAlign: "center",
        marginHorizontal: 4,
    },
    checkbox: {
        marginHorizontal: 10,
    },
    columnCheckboxHeader: {
        marginHorizontal: 18,

    },
});

