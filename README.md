## APIrest utilizando Express + MySQL

No olvides construirlal tabla:

```
CREATE DATABASE tiendaveh;
USE tiendaveh;

CREATE TABLE vehiculos (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    marca   VARCHAR(50) NOT NULL,
    modelo  VARCHAR(50) NOT NULL,
    color   VARCHAR(20) NOT NULL,
    precio  DECIMAL(10, 2) NOT NULL,
    placa   CHAR(7) NOT NULL,
    CONSTRAINT placa_unique UNIQUE (placa)
);

insert into vehiculos(marca,modelo,color,precio,placa) values('nose','tampoco','negro',20000,'asjemap');
```

Módulos requeridos:
```
npm install express mysql2 dotenv nodemon
```