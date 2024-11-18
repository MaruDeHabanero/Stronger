import * as DatabaseService from './DatabaseService'; // Importa la instancia de la base de datos
const db = DatabaseService.db;

export const getRutinas = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.withExclusiveTransactionAsync(async tx => {
      tx.getAllAsync(
        'Select R.*, E.Nombre, RE.NumeroSeries '+
        'from Rutina R JOIN RutinaEjercicio RE ON RE.IDRutina = R.IDRutina JOIN Ejercicio E ON E.IDEjercicio = RE.IDEjercicio;'
      );
    });
  });
};

// export const getAllUsers = async (): Promise<any[]> => {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT * FROM users',
//         [],
//         (_, { rows }) => resolve(rows._array),
//         (_, error) => reject(error)
//       );
//     });
//   });
// };

// Agrega más consultas según sea necesario
