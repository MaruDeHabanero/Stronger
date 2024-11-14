// types.ts
export interface Exercise {
	ejercicio: string;
	numeroSeries: number;
  }
  
  export interface Routine {
	NombreRutina: string;
	UltimaVezRealizado: string;
	Ejercicios: Exercise[];
  }