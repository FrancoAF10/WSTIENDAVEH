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

INSERT INTO vehiculos (marca, modelo, color, precio, placa)
VALUES
('Toyota', 'Corolla', 'Blanco', 25000, 'ABC123'),
('Honda', 'Civic', 'Negro', 27000, 'XYZ456'),
('Ford', 'Focus', 'Rojo', 23000, 'JKL789'),
('Chevrolet', 'Onix', 'Azul', 21000, 'MNO321'),
('Hyundai', 'Elantra', 'Gris', 26000, 'PQR654');
```

Módulos requeridos:
```
npm install express mysql2 dotenv nodemon
```