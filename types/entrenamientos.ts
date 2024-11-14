// types.ts
export interface Set {
	numeroSerie: number;
	repeticiones: number;
	peso: number;
}

export interface Exercise {
	ejercicio: string;
	numeroSeries: number;
	nota?: string;
	series?: Set[];
}

export interface Routine {
	idRutina: number,
	NombreRutina: string;
	UltimaVezRealizado: string;
	Ejercicios: Exercise[];
}
 