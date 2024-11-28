import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, FlatList, TextInput, Alert} from "react-native";
import Checkbox from 'expo-checkbox';
import { Link, useLocalSearchParams } from "expo-router";
import routinesData from "@/assets/dataPlantilla.json";
import { ExerciseExplanation } from "@/types/entrenamientos";
import { useTheme } from "@/utils/OscuroClaroContext";
import { Colors, tomatoCustom } from "../constants/Colors";
import { obtenerEjerciciosExplicados } from "@/services/DatabaseQueries"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as images from "../assets/images/exercisesGifs";
import { Image } from 'expo-image';

// Componentes para el modo oscuro y claro
import { Vista } from "@/components/Vista";
import { Texto } from "@/components/Texto";
import { Boton } from "@/components/Boton";

export default function ExcercisesList() {
    const { theme } = useTheme();
    const colorTexto = theme === "dark" ? Colors.dark.text : Colors.light.text;
	const colorFondo = theme === "dark" ? Colors.dark.background : Colors.light.background;

    const [ejercicios, setEjercicios] = useState<ExerciseExplanation[]>([]);

    // Usamos useEffect para realizar la llamada a la base de datos solo una vez cuando el componente se monta
    useEffect(() => {
        const fetchEjercicios = async () => {
            try {
                const result: ExerciseExplanation[] = await obtenerEjerciciosExplicados();
                setEjercicios(result); // Almacenamos los datos obtenidos
            } catch (error) {
                console.error("Error al obtener los ejercicios:", error);
            }
        };
    
        fetchEjercicios();
    }, []); // El arreglo vacío asegura que el efecto solo se ejecute al montar el componente

    const [contadorOrden, setContadorOrden] = useState(1);
    const handleExercisePress = (index: number) => {
        setEjercicios((prevEjercicios) => {
          const newEjercicios = [...prevEjercicios];
          const tappedExercise = newEjercicios[index];
    
          if (tappedExercise.orden) {
            // Si ya tiene orden, lo removemos
            newEjercicios.forEach((ejercicio) => {
              if (ejercicio.orden && ejercicio.orden > tappedExercise.orden!) {
                ejercicio.orden -= 1;
              }
            });
            tappedExercise.orden = undefined;
            setContadorOrden((prev) => prev - 1);
          } else {
            // Si no tiene orden, lo asignamos
            tappedExercise.orden = contadorOrden;
            setContadorOrden((prev) => prev + 1);
          }
    
          return newEjercicios;
        });
      };

      return (
        
          <Vista style={[styles.container, { backgroundColor: colorFondo }]}>
              <Texto style={styles.routineText}>Selecciona ejercicios para añadirlos</Texto>
              

              <FlatList
                  data={ejercicios}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                      <Boton onPressOut={() => handleExercisePress(index)}>
                          <View style={styles.exerciseContainer}>
                              <Image source={obtenerImagen(item.idEjercicio)} style={styles.gifImage} />
                              <View style={styles.resumenEjercicioContainer}>
                                  <View>
                                      <Texto style={styles.exerciseText}>{item.nombre}</Texto>
                                      <Texto style={styles.exerciseSubText}>{item.muscleGroup?.nombre}</Texto>
                                  </View>
                                  <View style={item.orden ? { display: "flex" }: { display: "none" }}>
                                      <Texto style={styles.burbujaOrden}>{item.orden}</Texto>
                                  </View>
                              </View>
                          </View>
                      </Boton>
                  )}
              />
          </Vista>
      );
    }

const styles = StyleSheet.create({
    container:{ 
        flex: 1, 
        padding:20,
        paddingTop:0,
    },
    exerciseContainer: {
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
    },
    routineText: {
        fontSize: 20,
        marginBottom:15,
    },
    exerciseText: {
        fontSize: 20,
        color: tomatoCustom,
    },
    exerciseSubText: {
    },
    gifImage: {
        width: 70,
        height: 70,
        marginVertical: 5,
    },
    resumenEjercicioContainer:{
        margin:15,
        display:"flex",
        flexDirection:"row",
        flex:1,
        justifyContent:"space-between"
    },
    burbujaOrden:{
        borderRadius: 30,
        padding:3,
        paddingHorizontal:9,
        borderWidth:1,
        color: tomatoCustom,
        borderColor:tomatoCustom,
        fontWeight:"bold"

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

