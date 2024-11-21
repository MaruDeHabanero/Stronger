import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import Checkbox from 'expo-checkbox';
import { useLocalSearchParams } from "expo-router";
import routinesData from "@/assets/dataPlantilla.json";
import { Exercise, Set } from "@/types/entrenamientos";
import { useTheme } from "@/utils/OscuroClaroContext";
import {Colors, tomatoCustom} from "../constants/Colors";
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
        <Vista style={{ display: "flex", height: "100%", flex: 1 }}>
            <FlatList
                data={ejercicios}
                ListHeaderComponent={<Texto style={[styles.routineText]}>{nombre ?? 'Nuevo entrenamiento vacío'}</Texto>
                }
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
                                                color={checkedStates[uniqueKey] ? tomatoCustom : undefined} // Cambia el fondo cuando está seleccionado

                                                value={checkedStates[uniqueKey] ?? serie.hecho}
                                                onValueChange={() => handleCheckboxChange(exerciseIndex, serieIndex)}
                                            />
                                        </Vista>
                                    )
                                }}
                            />
                            <Texto style={styles.agregarSerieButton}>
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
        width: 50,
        fontSize: 14,
        textAlign: "center",
    },
    columnSerieHeader: {
        width:50,
        fontSize: 16,
        textAlign: "center",
    },
    columnInput: {
        backgroundColor: "#363636",
        opacity: 1,
        textAlign: "center",
        flex: 1,
        borderWidth: 1,
        borderColor: "#363636",
        padding: 8,
        marginHorizontal: 4,
        borderRadius: 15,
        fontSize: 14,
        color: 'white'
    },
    columnInputHeader: {
        flex: 1,
        fontSize: 16,
        textAlign: "center",
        marginHorizontal: 4,
    },
    checkbox: {
        width:30,
        height:30,
        marginHorizontal: 10,
        borderRadius: 8,
        borderColor:'tomato',
        borderWidth: 1.7
    },
    columnCheckboxHeader: {
       width:50,
    },
    agregarSerieButton:{
        textAlign: 'center', 
        marginBottom: 20,
        color: 'tomato'
    }
});

