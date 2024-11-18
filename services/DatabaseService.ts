import * as SQLite from 'expo-sqlite';
import * as queries from './DatabaseQueries';

// Ruta al archivo SQL
const sqlScript = `
PRAGMA foreign_keys = OFF;
DROP TABLE IF EXISTS CatMetrica;
DROP TABLE IF EXISTS CatGrupoMuscular;
DROP TABLE IF EXISTS Ejercicio;
DROP TABLE IF EXISTS Rutina;
DROP TABLE IF EXISTS RutinaEjercicio;
DROP TABLE IF EXISTS Sesion;
DROP TABLE IF EXISTS SesionEjercicio;
DROP TABLE IF EXISTS SesionEjercicioSerie;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS CatMetrica(
    IDMetrica INTEGER PRIMARY KEY,
    Nombre TEXT,
    Sufijo TEXT
); INSERT OR IGNORE INTO CatMetrica (IDMetrica, Nombre, Sufijo) VALUES
(1, 'Peso en Libras', 'lb'),
(2, 'Peso en Kilogramos', 'kg');

CREATE TABLE IF NOT EXISTS CatGrupoMuscular(
  IDGrupoMuscular INTEGER PRIMARY KEY,
  Nombre TEXT
); INSERT OR IGNORE INTO CatGrupoMuscular (IDGrupoMuscular, Nombre) VALUES
(1, 'Pectorales'),
(2, 'Hombros'),
(3, 'Espalda'),
(4, 'Bíceps'),
(5, 'Tríceps'),
(6, 'Cuádriceps'),
(7, 'Isquiotibiales'),
(8, 'Glúteos'),
(9, 'Pantorrillas'),
(10, 'Abdominales');

CREATE TABLE IF NOT EXISTS Ejercicio(
  IDEjercicio INTEGER PRIMARY KEY,
  Nombre TEXT,
  Descripcion TEXT,
  IDGrupoMuscular INTEGER,
  FOREIGN KEY (IDGrupoMuscular) REFERENCES CatGrupoMuscular(IDGrupoMuscular)
);
-- Insertar los registros sin la columna 'Categoria'
INSERT OR IGNORE INTO Ejercicio (IDEjercicio, Nombre, Descripcion, IDGrupoMuscular) VALUES
(1, 'Press de Banca', 'Ejercicio de empuje que trabaja el pecho, realizado en una banca plana con barra o mancuernas.', 1),
(2, 'Fondos en Paralelas', 'Ejercicio de empuje que involucra los pectorales, usando paralelas o barras para bajar y subir el cuerpo.', 1),
(3, 'Press Militar', 'Ejercicio de empuje para trabajar los hombros, realizado con barra o mancuernas desde los hombros hacia arriba.', 2),
(4, 'Elevaciones Laterales', 'Ejercicio para trabajar el deltoides lateral, realizado con mancuernas o cables elevando los brazos hacia los lados.', 2),
(5, 'Dominadas', 'Ejercicio de tracción que trabaja la espalda, utilizando el propio peso corporal para levantarse de una barra horizontal.', 3),
(6, 'Remo con Barra', 'Ejercicio de tracción para la espalda, realizado con barra, tirando hacia el abdomen mientras se mantiene la espalda recta.', 3),
(7, 'Curl de Bíceps con Barra', 'Ejercicio para trabajar los bíceps, realizando flexión del codo con barra.', 4),
(8, 'Curl Martillo', 'Ejercicio para los bíceps y los músculos braquiales, realizado con mancuernas en posición neutra.', 4),
(9, 'Press de Tríceps en Polea Alta', 'Ejercicio de extensión de codo para trabajar los tríceps, utilizando polea alta y cuerda o barra.', 5),
(10, 'Rompecráneos', 'Ejercicio que trabaja los tríceps, utilizando barra o mancuernas para bajar la carga detrás de la cabeza y extender los codos.', 5),
(11, 'Sentadillas con Barra', 'Ejercicio para los cuádriceps, glúteos y core, realizado bajando el cuerpo en cuclillas con barra sobre los hombros.', 6),
(12, 'Prensa de Piernas', 'Ejercicio de empuje para trabajar los cuádriceps, usando una máquina para empujar una plataforma con los pies.', 6),
(13, 'Peso Muerto', 'Ejercicio que trabaja los isquiotibiales, espalda baja y glúteos, levantando una barra desde el suelo hasta la altura de las caderas.', 7),
(14, 'Curl Femoral', 'Ejercicio para trabajar los isquiotibiales, realizado en una máquina de curl femoral, donde las piernas se flexionan en la rodilla.', 7),
(15, 'Hip Thrust', 'Ejercicio para los glúteos, realizado elevando una barra con la cadera desde el suelo mientras los hombros están apoyados en un banco.', 8),
(16, 'Sentadilla Búlgara', 'Ejercicio unilateral para los glúteos y cuádriceps, realizado con una pierna elevada en un banco mientras se baja el cuerpo.', 8),
(17, 'Elevación de Talones de Pie', 'Ejercicio para trabajar las pantorrillas, levantando el talón mientras se mantiene el cuerpo recto.', 9),
(18, 'Elevación de Talones Sentado', 'Ejercicio para las pantorrillas, realizado en una máquina de elevación de talones mientras estás sentado.', 9),
(19, 'Crunch', 'Ejercicio abdominal realizado acostado, levantando la parte superior del torso para trabajar los músculos abdominales.', 10),
(20, 'Plancha', 'Ejercicio isométrico que trabaja el core, manteniendo el cuerpo recto sobre los codos y los pies en el suelo.', 10);

CREATE TABLE IF NOT EXISTS Rutina(
  IDRutina INTEGER PRIMARY KEY, 
  Nombre TEXT
); INSERT OR IGNORE INTO Rutina (Nombre) VALUES
('Rutina de Pecho y Tríceps'),
('Rutina de Espalda y Bíceps'),
('Rutina de Piernas y Abdominales');

CREATE TABLE IF NOT EXISTS RutinaEjercicio(
  Orden INTEGER,
  IDRutina INTEGER,
  IDEjercicio INTEGER,
  NumeroSeries INTEGER,
  PRIMARY KEY (Orden, IDRutina, IDEjercicio)
  FOREIGN KEY (IDRutina) REFERENCES Rutina(IDRutina),
  FOREIGN KEY (IDEjercicio) REFERENCES Ejercicio(IDEjercicio)
);
-- Rutina de Pecho y Tríceps
INSERT OR IGNORE INTO RutinaEjercicio (IDRutina, IDEjercicio, NumeroSeries) VALUES
(1, 1, 3),  -- Press de Banca
(1, 2, 3),  -- Fondos en Paralelas
(1, 9, 3),  -- Press de Tríceps en Polea Alta
(1, 10, 3); -- Rompecráneos
-- Rutina de Espalda y Bíceps
INSERT OR IGNORE INTO RutinaEjercicio (IDRutina, IDEjercicio, NumeroSeries) VALUES
(2, 5, 3),  -- Dominadas
(2, 6, 3),  -- Remo con Barra
(2, 7, 3),  -- Curl de Bíceps con Barra
(2, 8, 3);  -- Curl Martillo
-- Rutina de Piernas y Abdominales
INSERT OR IGNORE INTO RutinaEjercicio (IDRutina, IDEjercicio, NumeroSeries) VALUES
(3, 11, 3), -- Sentadillas con Barra
(3, 12, 3), -- Prensa de Piernas
(3, 19, 3), -- Crunch
(3, 20, 3); -- Plancha

CREATE TABLE IF NOT EXISTS Sesion(
  IDSesion INTEGER PRIMARY KEY AUTOINCREMENT,
  FechaInicio TEXT DEFAULT CURRENT_TIMESTAMP,
  FechaFin TEXT,
  IDRutina INTEGER NULL,
  FOREIGN KEY (IDRutina) REFERENCES Rutina(IDRutina)
);

CREATE TABLE IF NOT EXISTS SesionEjercicio(
  Orden INTEGER,
  IDSesion INTEGER,
  IDEjercicio INTEGER,
  IDRutina INTEGER NULL,
  Nota TEXT NULL,
  PRIMARY KEY (Orden, IDSesion, IDEjercicio),
  FOREIGN KEY (IDSesion) REFERENCES Sesion(IDSesion),
  FOREIGN KEY (IDEjercicio) REFERENCES Ejercicio(IDEjercicio)
);

create table if not exists SesionEjercicioSerie(
  Orden INTEGER,
  IDSesion INTEGER,
  IDEjercicio INTEGER,
  NumeroSerie INTEGER,
  Peso REAL,
  Repeticiones INTEGER,
  PRIMARY KEY (Orden, IDSesion, IDEjercicio, NumeroSerie),
  FOREIGN KEY (Orden, IDSesion, IDEjercicio) REFERENCES SesionEjercicio(Orden, IDSesion, IDEjercicio) ON UPDATE CASCADE ON DELETE CASCADE
);`
// Abrir la base de datos
export const db = SQLite.openDatabaseSync("stronger.db");
await db.execAsync(sqlScript);

const closeDatabase = async () => {
    try {
        db.closeAsync();
        console.log("Base de datos inicializada correctamente.");
    } catch (error) {
        console.error("Error inicializando la base de datos:", error);
    }
};


// Exportar el servicio
export const DatabaseService = {
    getRutinas: queries.getRutinas,
    close: closeDatabase,
};



