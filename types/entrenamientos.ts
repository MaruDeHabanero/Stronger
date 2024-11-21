// types.ts
export interface Set {
	numeroSerie: number;
	repeticiones?: number;
	peso?: number;
	hecho?: boolean
}

export interface Exercise {
	nombre: string;
	numeroSeries?: number;
	orden?: number,
	nota?: string;
	series?: Set[],
	sufijo?: string //Sufijo de la métrica del ejercicio
}

export interface Routine {
	idRutina: number,
	nombre: string;
	ultimaVezRealizado: string;
	ejercicios?: Exercise[];
}
 