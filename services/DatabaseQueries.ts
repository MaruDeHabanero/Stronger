import { db } from './DatabaseService'; // Importa la instancia de la base de datos

export function obtenerRutinas(){
    return db.getAllSync("Select * from Rutina");
};  
