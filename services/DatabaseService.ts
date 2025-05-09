import { Exercise } from '@/types/entrenamientos';
import * as SQLite from 'expo-sqlite';
export const db = SQLite.openDatabaseSync('test.db');

db.execSync(`
  
DROP TABLE IF EXISTS CatMetrica;
DROP TABLE IF EXISTS CatGrupoMuscular;
DROP TABLE IF EXISTS Ejercicio;
DROP TABLE IF EXISTS Rutina;
DROP TABLE IF EXISTS RutinaEjercicio;
DROP TABLE IF EXISTS Sesion;
DROP TABLE IF EXISTS SesionEjercicio;
DROP TABLE IF EXISTS SesionEjercicioSerie;

CREATE TABLE IF NOT EXISTS CatMetrica(
    idMetrica INTEGER PRIMARY KEY,
    nombre TEXT,
    sufijo TEXT
); 
INSERT OR IGNORE INTO CatMetrica (idMetrica, nombre, sufijo) VALUES
(1, 'Peso en Libras', 'lb'),
(2, 'Peso en Kilogramos', 'kg');

CREATE TABLE IF NOT EXISTS CatGrupoMuscular(
    idGrupoMuscular INTEGER PRIMARY KEY,
    nombre TEXT
); 
INSERT OR IGNORE INTO CatGrupoMuscular (idGrupoMuscular, nombre) VALUES
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
    idEjercicio INTEGER PRIMARY KEY,
    nombre TEXT,
    descripcion TEXT,
    pasos TEXT,
    idGrupoMuscular INTEGER,
    FOREIGN KEY (idGrupoMuscular) REFERENCES CatGrupoMuscular(idGrupoMuscular)
);
INSERT OR IGNORE INTO Ejercicio (idEjercicio, nombre, descripcion, pasos, idGrupoMuscular) VALUES
(1, 'Press de Banca', 'Ejercicio de empuje que trabaja el pecho, realizado en una banca plana con barra o mancuernas.', '1. Acuéstate en una banca plana.\n2. Toma la barra con las manos a la altura de los hombros.\n3. Baja la barra hasta el pecho y empuja hacia arriba.', 1),
(2, 'Fondos en Paralelas', 'Ejercicio de empuje que involucra los pectorales, usando paralelas o barras para bajar y subir el cuerpo.', '1. Colócate en las paralelas.\n2. Baja el cuerpo doblando los codos hasta que el pecho esté cerca de las manos.\n3. Empuja hacia arriba hasta extender los codos.', 1),
(3, 'Press Militar', 'Ejercicio de empuje para trabajar los hombros, realizado con barra o mancuernas desde los hombros hacia arriba.', '1. Colócate de pie con la barra a la altura de los hombros.\n2. Empuja la barra hacia arriba hasta que los codos estén extendidos.\n3. Baja la barra controladamente.', 2),
(4, 'Elevaciones Laterales', 'Ejercicio para trabajar el deltoides lateral, realizado con mancuernas o cables elevando los brazos hacia los lados.', '1. Toma una mancuerna en cada mano.\n2. Eleva los brazos hacia los lados hasta que estén paralelos al suelo.\n3. Baja lentamente a la posición inicial.', 2),
(5, 'Dominadas', 'Ejercicio de tracción que trabaja la espalda, utilizando el propio peso corporal para levantarse de una barra horizontal.', '1. Agárrate de la barra con las manos ligeramente más anchas que los hombros.\n2. Tira de tu cuerpo hacia arriba hasta que la barbilla esté por encima de la barra.\n3. Baja lentamente.', 3),
(6, 'Remo con Barra', 'Ejercicio de tracción para la espalda, realizado con barra, tirando hacia el abdomen mientras se mantiene la espalda recta.', '1. Colócate de pie, con las rodillas ligeramente flexionadas.\n2. Agarra la barra con las manos a la altura de los hombros.\n3. Tira de la barra hacia el abdomen mientras mantienes la espalda recta.', 3),
(7, 'Curl de Bíceps con Barra', 'Ejercicio para trabajar los bíceps, realizando flexión del codo con barra.', '1. Toma la barra con las palmas hacia arriba.\n2. Flexiona los codos y lleva la barra hacia los hombros.\n3. Baja la barra controladamente.', 4),
(8, 'Curl Martillo', 'Ejercicio para los bíceps y los músculos braquiales, realizado con mancuernas en posición neutra.', '1. Toma una mancuerna en cada mano, con las palmas hacia adentro.\n2. Flexiona los codos y lleva las mancuernas hacia los hombros.\n3. Baja lentamente.', 4),
(9, 'Press de Tríceps en Polea Alta', 'Ejercicio de extensión de codo para trabajar los tríceps, utilizando polea alta y cuerda o barra.', '1. Colócate frente a la polea alta y agarra la cuerda.\n2. Tira de la cuerda hacia abajo, extendiendo los codos.\n3. Regresa controladamente a la posición inicial.', 5),
(10, 'Rompecráneos', 'Ejercicio que trabaja los tríceps, utilizando barra o mancuernas para bajar la carga detrás de la cabeza y extender los codos.', '1. Acuéstate en una banca plana.\n2. Sostén la barra con los codos flexionados detrás de la cabeza.\n3. Extiende los codos y empuja la barra hacia arriba.', 5),
(11, 'Sentadillas con Barra', 'Ejercicio para los cuádriceps, glúteos y core, realizado bajando el cuerpo en cuclillas con barra sobre los hombros.', '1. Colócate de pie con la barra sobre los hombros.\n2. Baja el cuerpo doblando las rodillas hasta que los muslos estén paralelos al suelo.\n3. Empuja hacia arriba.', 6),
(12, 'Prensa de Piernas', 'Ejercicio de empuje para trabajar los cuádriceps, usando una máquina para empujar una plataforma con los pies.', '1. Siéntate en la máquina de prensa.\n2. Coloca los pies en la plataforma a la altura de los hombros.\n3. Empuja la plataforma hacia arriba hasta extender las piernas.', 6),
(13, 'Peso Muerto', 'Ejercicio que trabaja los isquiotibiales, espalda baja y glúteos, levantando una barra desde el suelo hasta la altura de las caderas.', '1. Colócate de pie con la barra frente a ti.\n2. Flexiona las caderas y las rodillas para agarrar la barra.\n3. Levanta la barra hasta que estés de pie, manteniendo la espalda recta.', 7),
(14, 'Curl Femoral', 'Ejercicio para trabajar los isquiotibiales, realizado en una máquina de curl femoral, donde las piernas se flexionan en la rodilla.', '1. Colócate en la máquina de curl femoral.\n2. Coloca los tobillos debajo de las almohadillas.\n3. Flexiona las rodillas para llevar las almohadillas hacia los glúteos.', 7),
(15, 'Hip Thrust', 'Ejercicio para los glúteos, realizado elevando una barra con la cadera desde el suelo mientras los hombros están apoyados en un banco.', '1. Siéntate en el suelo con la parte superior de la espalda apoyada en un banco.\n2. Coloca la barra sobre las caderas.\n3. Eleva las caderas hasta que el cuerpo forme una línea recta.', 8),
(16, 'Sentadilla Búlgara', 'Ejercicio unilateral para los glúteos y cuádriceps, realizado con una pierna elevada en un banco mientras se baja el cuerpo.', '1. Colócate de espaldas a un banco y coloca un pie sobre él.\n2. Baja el cuerpo flexionando la pierna delantera.\n3. Empuja hacia arriba para regresar a la posición inicial.', 8),
(17, 'Elevación de Talones de Pie', 'Ejercicio para trabajar las pantorrillas, levantando el talón mientras se mantiene el cuerpo recto.', '1. Colócate de pie con los pies a la altura de los hombros.\n2. Eleva los talones para quedar de puntillas.\n3. Baja lentamente.', 9),
(18, 'Elevación de Talones Sentado', 'Ejercicio para las pantorrillas, realizado en una máquina de elevación de talones mientras estás sentado.', '1. Siéntate en la máquina de elevación de talones.\n2. Coloca los pies en la plataforma.\n3. Eleva los talones y aprieta las pantorrillas.\n4. Baja lentamente.', 9),
(19, 'Crunch', 'Ejercicio abdominal realizado acostado, levantando la parte superior del torso para trabajar los músculos abdominales.', '1. Acuéstate boca arriba con las rodillas flexionadas.\n2. Eleva el torso hacia las rodillas.\n3. Baja lentamente.', 10),
(20, 'Plancha', 'Ejercicio isométrico que trabaja el core, manteniendo el cuerpo recto sobre los codos y los pies en el suelo.', '1. Colócate en posición de plancha, con los codos y los pies en el suelo.\n2. Mantén el cuerpo recto.\n3. Aguanta el tiempo indicado.', 10);

CREATE TABLE IF NOT EXISTS Rutina(
    idRutina INTEGER PRIMARY KEY, 
    nombre TEXT
); 
INSERT OR IGNORE INTO Rutina (nombre) VALUES
('Rutina de Pecho y Tríceps'),
('Rutina de Espalda y Bíceps'),
('Rutina de Piernas y Abdominales'),
('Rutina Full Body');

-- Almacena los ejericicios por rutina y cuántas series de cada uno
CREATE TABLE IF NOT EXISTS RutinaEjercicio(
    orden INTEGER,
    idRutina INTEGER,
    idEjercicio INTEGER,
    numeroSeries INTEGER,
    idMetrica INTEGER,
    PRIMARY KEY (orden, idRutina, idEjercicio),
    FOREIGN KEY (idRutina) REFERENCES Rutina(idRutina),
    FOREIGN KEY (idEjercicio) REFERENCES Ejercicio(idEjercicio),
    FOREIGN KEY (idMetrica) REFERENCES CatMetrica(idMetrica)
);
-- Rutina de Pecho y Tríceps
INSERT OR IGNORE INTO RutinaEjercicio (orden, idRutina, idEjercicio, numeroSeries, idMetrica) VALUES
(1, 1, 1, 3, 2),  -- Press de Banca
(2, 1, 2, 3, 2),  -- Fondos en Paralelas
(3, 1, 9, 3, 2),  -- Press de Tríceps en Polea Alta
(4, 1, 10, 3, 1), -- Rompecráneos
(5, 1, 4, 3, 2);  -- Elevaciones Laterales

-- Rutina de Espalda y Bíceps
INSERT OR IGNORE INTO RutinaEjercicio (orden, idRutina, idEjercicio, numeroSeries, idMetrica) VALUES
(1, 2, 5, 3, 1),  -- Dominadas
(3, 2, 6, 3, 1),  -- Remo con Barra
(3, 2, 7, 3, 1),  -- Curl de Bíceps con Barra
(4, 2, 8, 3, 1);  -- Curl Martillo

-- Rutina de Piernas y Abdominales
INSERT OR IGNORE INTO RutinaEjercicio (orden, idRutina, idEjercicio, numeroSeries, idMetrica) VALUES
(1, 3, 11, 3, 1), -- Sentadillas con Barra
(3, 3, 12, 3, 2), -- Prensa de Piernas
(3, 3, 19, 3, 2), -- Crunch
(4, 3, 20, 3, 1); -- Plancha

INSERT OR IGNORE INTO RutinaEjercicio (orden, idRutina, idEjercicio, numeroSeries, idMetrica) VALUES
(1, 4, 1, 3, 2),  -- Press de Banca
(2, 4, 5, 3, 1),  -- Dominadas
(3, 4, 11, 3, 1), -- Sentadillas con Barra
(4, 4, 15, 3, 1), -- Hip Thrust
(5, 4, 17, 3, 2); -- Elevación de Talones de Pie

CREATE TABLE IF NOT EXISTS Sesion(
    idSesion INTEGER PRIMARY KEY AUTOINCREMENT,
    fechaInicio TEXT DEFAULT CURRENT_TIMESTAMP,
    fechaFin TEXT,
    idRutina INTEGER NULL,
    FOREIGN KEY (idRutina) REFERENCES Rutina(idRutina)
);

CREATE TABLE IF NOT EXISTS SesionEjercicio(
    orden INTEGER,
    idSesion INTEGER,
    idEjercicio INTEGER,
    nota TEXT NULL,
    PRIMARY KEY (orden, idSesion, idEjercicio),
    FOREIGN KEY (idSesion) REFERENCES Sesion(idSesion),
    FOREIGN KEY (idEjercicio) REFERENCES Ejercicio(idEjercicio)
);

CREATE TABLE IF NOT EXISTS SesionEjercicioSerie(
    orden INTEGER,
    idSesion INTEGER,
    idEjercicio INTEGER,
    numeroSerie INTEGER,
    peso REAL,
    repeticiones INTEGER,
    PRIMARY KEY (orden, idSesion, idEjercicio, numeroSerie),
    FOREIGN KEY (orden, idSesion, idEjercicio) REFERENCES SesionEjercicio(orden, idSesion, idEjercicio) ON UPDATE CASCADE ON DELETE CASCADE
);
`
);