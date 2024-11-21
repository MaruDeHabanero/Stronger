import { db } from './DatabaseService'; // Importa la instancia de la base de datos
import { Exercise, Set, Routine } from "@/types/entrenamientos";

export function obtenerRutinas(): Routine[] {
    //Primero traemos las rutinas
    let rutinas: Routine[] = db.getAllSync(`
        Select R.idRutina, R.nombre,
        (SELECT FechaInicio FROM Sesion S WHERE S.idRutina = R.idRutina ORDER BY S.FechaInicio desc LIMIT 1) as ultimaVezRealizado
        from Rutina R`) as Routine[];

    //Despues le anexamos los ejercicios con su cantidad de series
    rutinas.map(r => {
        r.ejercicios = db.getAllSync(`
            Select e.nombre, numeroSeries, orden from Ejercicio E
            JOIN RutinaEjercicio RE ON RE.idEjercicio = E.idEjercicio and RE.idRutina = ${r.idRutina}`) as Exercise[];
    });
    return rutinas;
};

export function obtenerRutinaDetallada(idRutina: string): Exercise[]{
    //Ahora primero obtenemos los ejercicios según la rutina
    let ejercicios: Exercise [] = db.getAllSync(`
        Select e.nombre, orden, cm.sufijo from RutinaEjercicio re 
        join ejercicio e on e.idEjercicio = re.idEjercicio
        join CatMetrica cm on cm.idMetrica = re.idMetrica
        where re.idRutina = ${idRutina}
        order by re.orden asc`) as Exercise[];

    //Traemos las series desglocadas por ejercicio de los ejercicios de la rutina
    ejercicios.map(e =>{
        e.series = db.getAllSync(`
            -- Generar números del 1 al máximo de numeroSeries en las rutinas
            WITH RECURSIVE Numbers(n) AS (
                SELECT 1
                UNION ALL
                SELECT n + 1
                FROM Numbers
                WHERE n <= (SELECT MAX(numeroSeries) FROM RutinaEjercicio)
            ),

            -- Subconsulta para generar SeriesRutina
            SeriesRutina AS (
                SELECT r.orden, r.idRutina, r.idEjercicio, Numbers.n AS numeroSerie
                FROM RutinaEjercicio r
                CROSS JOIN Numbers
                WHERE 
                    Numbers.n <= r.numeroSeries
                    AND r.idRutina = 1  -- ID de rutina objetivo
                    AND r.idEjercicio = 1  -- ID de ejercicio objetivo
            ),

            -- Subconsulta para obtener la última sesión asociada a la rutina
            UltimaSesion AS (
                SELECT idRutina, idSesion
                FROM Sesion 
                WHERE idRutina = 1  -- ID de rutina objetivo
                ORDER BY fechafin DESC 
                LIMIT 1
            )

            -- Consulta final con LEFT JOIN
            SELECT sr.numeroSerie, ses.repeticiones, ses.peso
            FROM SeriesRutina sr
            LEFT JOIN UltimaSesion us
                ON us.idRutina = sr.idRutina
            LEFT JOIN SesionEjercicio se
                ON se.idEjercicio = sr.idEjercicio
                AND se.orden = sr.orden
                AND se.idSesion = us.idSesion
            LEFT JOIN SesionEjercicioSerie ses
                ON ses.idSesion = se.idSesion
                AND ses.idEjercicio = se.idEjercicio
                AND ses.orden = se.orden
                AND ses.numeroSerie = sr.numeroSerie
            ORDER BY 
                sr.orden, sr.idRutina, sr.idEjercicio, sr.numeroSerie;
            `) as Set[];
    });
    return ejercicios;
}
