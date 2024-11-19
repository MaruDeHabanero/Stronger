import * as SQLite from 'expo-sqlite';
export const db = SQLite.openDatabaseSync('test.db');

export async function createTables(){
  await db.execAsync(`
      CREATE TABLE IF NOT EXISTS CatGrupoMuscular(
        IDGrupoMuscular INTEGER PRIMARY KEY,
        Nombre TEXT
      );
      INSERT INTO CatGrupoMuscular Values(1, 'Test');
      `
    );
}

export async function obtenerGrupoMuscular(){
  return await db.getAllAsync(`
      select * from CatGrupoMuscular;
      `
    );
}
