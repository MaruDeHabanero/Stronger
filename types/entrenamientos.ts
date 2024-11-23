// types.ts
export interface Set {
	numeroSerie: number;
	repeticiones?: number;
	peso?: number;
	hecho?: boolean
}

export interface Exercise {
	idEjercicio: number,
	nombre: string;
	numeroSeries?: number;
	orden?: number,
	nota?: string;
	series?: Set[],
	sufijo?: string //Sufijo de la métrica del ejercicio
}

export interface ExerciseExplanation {
    idEjercicio: number,
    nombre: string,
    descripcion: string,
    idGrupoMuscular: number,
	muscleGroup?: MuscleGroup,
	pasos?: string
}

export interface MuscleGroup{
	idGrupoMuscular: number,
	nombre: string
}

export interface Routine {
	idRutina: number,
	nombre: string;
	ultimaVezRealizado: string;
	ejercicios?: Exercise[];
}
 