CREATE TABLE user (
    id INTEGER NOT NULL,
    username VARCHAR(1024) NOT NULL,
    password VARCHAR(1024) NOT NULL,
    email VARCHAR(1024) NOT NULL,
    nombre VARCHAR(1024) NOT NULL,
    apellido VARCHAR(1024) NOT NULL,
    es_entrenador BOOLEAN NOT NULL,
    es_administrador BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (username),
    UNIQUE (email),
    CHECK (es_entrenador IN (0, 1)),
    CHECK (es_administrador IN (0, 1))
);
