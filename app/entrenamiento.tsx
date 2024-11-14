import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import routinesData from "@/assets/dataPlantilla.json";
import { Routine, Exercise } from '@/types/entrenamientos';

const routines = routinesData as Routine[];

export default function RoutineDetailScreen() {
  const { NombreRutina } = useLocalSearchParams<{ NombreRutina: string }>();
  const routine = routines.find((r) => r.NombreRutina === NombreRutina);

  if (!routine) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Routine not found</Text>
      </View>
    );
  }

  const renderExercise = ({ item }: { item: Exercise }) => (
    <View style={styles.exercise}>
      <Text style={styles.exerciseText}>{item.ejercicio}</Text>
      <Text style={styles.seriesText}>Series: {item.numeroSeries}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{routine.NombreRutina}</Text>
      <Text style={styles.date}>Última vez realizado: {routine.UltimaVezRealizado}</Text>
      <FlatList
        data={routine.Ejercicios}
        renderItem={renderExercise}
        keyExtractor={(item) => item.ejercicio}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  exercise: {
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  exerciseText: {
    fontSize: 18,
  },
  seriesText: {
    fontSize: 14,
    color: '#888',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
