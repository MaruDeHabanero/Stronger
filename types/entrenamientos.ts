// types.ts
export interface Set {
	numeroSerie: number;
	repeticiones: number;
	peso: number;
}

export interface Exercise {
	nombre: string;
	numeroSeries: number;
	nota?: string;
	series?: Set[];
}

export interface Routine {
	idRutina: number,
	nombre: string;
	ultimaVezRealizado: string;
	ejercicios?: Exercise[];
}
 