import { db } from './DatabaseService'; // Importa la instancia de la base de datos
import { Exercise, Routine } from "@/types/entrenamientos";

export function obtenerRutinas(): Routine[] {
    let rutinas: Routine[] = db.getAllSync(`
        Select R.idRutina, R.nombre,
        (SELECT FechaInicio FROM Sesion S WHERE S.idRutina = R.idRutina ORDER BY S.FechaInicio desc LIMIT 1) as ultimaVezRealizado
        from Rutina R`) as Routine[];
    rutinas.map(r => {
        r.ejercicios = db.getAllSync(`
            Select e.nombre, numeroSeries from Ejercicio E
            JOIN RutinaEjercicio RE ON RE.idEjercicio = E.idEjercicio and RE.idRutina = ${r.idRutina}`) as Exercise[];
    });
    return rutinas;
};

// export function obtenerRutinaDetallada(): Exercise[]{
//     let ejercicios: Exercise []
// }
