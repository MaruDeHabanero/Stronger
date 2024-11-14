import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import routinesData from "@/assets/dataPlantilla.json";
import { Exercise } from '@/types/entrenamientos';

const ejercicios = routinesData.desgloceRutina as Exercise[];

export default function RoutineDetailScreen() {
  const { NombreRutina } = useLocalSearchParams<{ NombreRutina: string }>();

  if (!ejercicios || ejercicios.length === 0) {
    console.log('No exercises found:', ejercicios);
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Routine not found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={ejercicios}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.exerciseContainer}>
          <Text style={styles.exerciseText}>{item.ejercicio}</Text>
          <Text style={styles.noteExcerciseText}>{item.nota}</Text>

          {/* FlatList anidado para las series de cada ejercicio */}
          <FlatList
            data={item.series}
            keyExtractor={(serie, index) => index.toString()}
            renderItem={({ item: serie }) => (
              <View style={styles.seriesContainer}>
                <Text style={styles.seriesText}>
                  Serie {serie.numeroSerie}: {serie.repeticiones} reps, {serie.peso} kg
                </Text>
              </View>
            )}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  exerciseContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  exerciseText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  noteExcerciseText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  seriesContainer: {
    paddingVertical: 4,
    paddingLeft: 16,
  },
  seriesText: {
    fontSize: 14,
    color: '#333',
  },
});
