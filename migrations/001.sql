CREATE TABLE lugar (
    id INTEGER NOT NULL,
    nombre VARCHAR(1024) NOT NULL,
    latitud FLOAT NOT NULL,
    longitud FLOAT NOT NULL,
    es_de_entrenamiento BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (nombre),
    CHECK (es_de_entrenamiento IN (0, 1))
);
