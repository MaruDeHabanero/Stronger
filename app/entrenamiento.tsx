import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, FlatList, TextInput, Alert} from "react-native";
import Checkbox from 'expo-checkbox';
import { Link, useLocalSearchParams } from "expo-router";
import routinesData from "@/assets/dataPlantilla.json";
import { Exercise, Set } from "@/types/entrenamientos";
import { useTheme } from "@/utils/OscuroClaroContext";
import { Colors, tomatoCustom } from "../constants/Colors";
import { obtenerRutinaDetallada } from "@/services/DatabaseQueries"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Componentes para el modo oscuro y claro
import { Vista } from "@/components/Vista";
import { Texto } from "@/components/Texto";
import { Boton } from "@/components/Boton";

export default function RoutineDetailScreen() {
    const { theme } = useTheme();
    const colorTexto = theme === "dark" ? Colors.dark.text : Colors.light.text;
	const colorFondo = theme === "dark" ? Colors.dark.background : Colors.light.background;

    const { idRutina, nombre } = useLocalSearchParams();
    let [ejercicios, setEjercicios] = useState<Exercise[]>([]);
    const [iterador, aumentarIterador] = useState<number>(1);

    // Usamos useEffect para realizar la llamada a la base de datos solo una vez cuando el componente se monta
    useEffect(() => {
        const fetchEjercicios = async () => {
            try {
                if(idRutina){
                    const result:Exercise[] = await obtenerRutinaDetallada(idRutina.toString());
                    console.log(result)
                    setEjercicios(result); // Almacenamos los datos obtenidos
                }
            } catch (error) {
                console.error("Error al obtener los ejercicios:", error);
            }
        };
        fetchEjercicios();
    }, [idRutina]);

    const handleInputChange = (exerciseIndex: number, serieIndex: number, field: "peso" | "repeticiones", value: string) => {
        setEjercicios((prev) => {
            const updatedExercises = [...prev];
            const updatedSeries = updatedExercises[exerciseIndex].series ?? [];
            const updatedSerie = { ...updatedSeries[serieIndex], [field]: value ? parseInt(value, 10) : null };
            updatedSeries[serieIndex] = updatedSerie;
            updatedExercises[exerciseIndex].series = updatedSeries;
            return updatedExercises;
        });
    };

    const [checkedStates, setCheckedStates] = useState<{ [key: string]: boolean }>({});
    const handleCheckboxChange = (exerciseIndex: number, serieIndex: number, serie:Set) => {
        const uniqueKey = `${exerciseIndex}-${serieIndex}`;
        if (serie.repeticiones == null) {
            Alert.alert(
                "Error ⚠️", // Título
                "No puedes guardar una serie sin un número de repeticiones.", // Mensaje
                [
                  {
                    text: "OK"
                  }
                ]
              );
            }else{
            setCheckedStates((prev) => ({
                ...prev,
                [uniqueKey]: !prev[uniqueKey], // Toggle the value
            }));
        }
    };

    const agregarSerie = (series: Set[]) => {
        let serie = series.at(-1);
        if(serie){
            serie.numeroSerie += 1;
            series.push(serie);
        }
    }
    const agregarEjercicio = () =>{
            const fetchEjercicios = async () => {
                try {
                    aumentarIterador(iterador+1);
                    console.log(iterador);
                    const result:Exercise[] = await obtenerRutinaDetallada("1");
                    ejercicios.push(result[iterador])
                    setEjercicios(ejercicios); // Almacenamos los datos obtenidos
                } catch (error) {
                    console.error("Error al obtener los ejercicios:", error);
                }
            };
            fetchEjercicios();
    }

    return (
        <Vista style={{ display: "flex", height: "100%", flex: 1, backgroundColor: colorFondo}}>
            <FlatList
                data={ejercicios}
                ListHeaderComponent={
                    <Texto style={[styles.routineText]}>{nombre ?? 'Nuevo entrenamiento vacío'}</Texto>
                }
                ListFooterComponent={
                    <Boton style={styles.agregarEjercicioButton} onPress={() => {agregarEjercicio() }}>
                        Agregar Ejercicio
                    </Boton>
                }
                keyExtractor={(item, index) => index.toString()}    
                renderItem={({ item, index: exerciseIndex }) => (
                    <Vista style={styles.exerciseContainer}>
                        {/* Nombre del ejercicio */}
                        <Link href={`../ejercicio?idEjercicio=${item.idEjercicio}`} style={styles.linkEjercicio}>
                            <Texto style={styles.exerciseText}>{item.nombre}{" "}</Texto>
                            <MaterialIcons  name="info-outline" size={20} color={tomatoCustom} />

                        </Link>

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
                                                style={[styles.columnInput, {textAlign: 'center'}, {backgroundColor: colorFondo, color:colorTexto}]}
                                                multiline
                                                maxLength={4}
                                                keyboardType="numeric"
                                                value={serie.peso?.toString() || ""}
                                                onChangeText={(value) =>
                                                    handleInputChange(exerciseIndex, serieIndex, "peso", value)
                                                }
                                            />
                                            <TextInput
                                                style={[styles.columnInput, {textAlign: 'center'}, {backgroundColor: colorFondo, color:colorTexto}]}
                                                multiline
                                                maxLength={3}
                                                keyboardType="numeric"
                                                value={serie.repeticiones?.toString() || ""}
                                                onChangeText={(value) =>
                                                    handleInputChange(exerciseIndex, serieIndex, "repeticiones", value)
                                                }
                                            />
                                            <Checkbox
                                                style={styles.checkbox}
                                                color={checkedStates[uniqueKey] ? tomatoCustom : undefined} // Cambia el fondo cuando está seleccionado

                                                value={checkedStates[uniqueKey] ?? serie.hecho}
                                                onValueChange={() => handleCheckboxChange(exerciseIndex, serieIndex, serie)}
                                            />
                                        </Vista>
                                    )
                                }}
                            />
                            <Boton style={styles.agregarSerieButton} onPress={() => agregarSerie(item.series! )}>
                                Agregar Serie
                            </Boton>
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
        color: tomatoCustom
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
        opacity: 1,
        flex: 1,
        borderWidth: 1,
        borderColor: "grey",
        padding: 8,
        marginHorizontal: 4,
        borderRadius: 15,
        fontSize: 16,
        color: 'white',
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
        borderColor: tomatoCustom,
        borderWidth: 1.7
    },
    columnCheckboxHeader: {
       width:50,
    },
    agregarSerieButton:{
        textAlign: 'center', 
        margin: 10,
        color: tomatoCustom
    },
    agregarEjercicioButton:{
        textAlign: 'center', 
        margin: 10,
        marginBottom:50,
        color: tomatoCustom
    },
	linkEjercicio :{
        marginTop: 10,
        marginBottom: 15
	}
});

