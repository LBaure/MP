
SELECT name FROM sys.databases;


USE Dicri;
CREATE TABLE Usuarios (
  idUsuario nvarchar(40) NOT NULL PRIMARY KEY,
  nombre nvarchar(50) NOT NULL,
  apellido nvarchar(50) NOT NULL,
  nombreUsuario nvarchar(25) NOT NULL,
  contrasena nvarchar(255) NOT NULL,
  correoElectronico nvarchar(255) NOT NULL,
  numeroTelefono nvarchar(15),
  fechaCreacion datetime NOT NULL DEFAULT GETDATE(),
  fechaActualizacion datetime DEFAULT GETDATE(),
  estado int DEFAULT NULL
);



INSERT INTO dbo.Usuarios
	(
	idUsuario,
	nombre,
	apellido,
	nombreUsuario,
	contrasena,
	correoElectronico,
	numeroTelefono,
	estado
	)
VALUES 
	(
	'0d585756-0363-40a7-80c0-b82e6a21b3e2',
	'Luis',
	'Bautista',
	'lbautista',
	'12345',
	'lbaure@gmail.com',
	'33406740',
	1
	);
	
	
	



CREATE TABLE Expedientes (
    idExpediente INT IDENTITY(1,1) PRIMARY KEY, 
    lugarHechos NVARCHAR(255) NOT NULL,
    tipoDelito NVARCHAR(100) NOT NULL,
    tecnicoRegistra NVARCHAR(40) NOT NULL,
    fechaCreacion datetime NOT NULL DEFAULT GETDATE(),
    fechaUltimaActualizacion DATETIME NULL,
    usuarioUltimaActualizacion NVARCHAR(40) NULL,
    idEstado INT NOT NULL,
    observaciones NVARCHAR(500),
    FOREIGN KEY (idEstado) REFERENCES ExpedientesEstados(idEstado),
    FOREIGN KEY (tecnicoRegistra) REFERENCES Usuarios(idUsuario),    
    FOREIGN KEY (usuarioUltimaActualizacion) REFERENCES Usuarios(idUsuario)
);


EXEC sp_rename 'Expedientes.LugarHechos', 'lugarHechos', 'COLUMN';


INSERT INTO dbo.Expedientes
	(
	lugarHechos,
	tipoDelito,
	tecnicoRegistra,
	idEstado,
	observaciones
	)
VALUES 
	(
	'Zona 1',
	'Homicidio',
	'0d585756-0363-40a7-80c0-b82e6a21b3e2',
	1,
	'Esta es una prueba'
	)




CREATE TABLE ExpedientesEstados (
    idEstado INT IDENTITY(1,1) PRIMARY KEY,
    nombreEstado NVARCHAR(100) NOT NULL,
    descripcion NVARCHAR(100),
    codigo CHAR(1) NOT NULL,
    CONSTRAINT CHK_Codigo CHECK (codigo IN ('A', 'P', 'R'))
);


CREATE TABLE Indicios (
    idIndicio INT PRIMARY KEY IDENTITY(1,1),
    idExpediente INT NOT NULL,
    descripcion NVARCHAR(255) NOT NULL,
    color NVARCHAR(50) NOT NULL,
    tamaño DECIMAL(10,2) NOT NULL,
    peso DECIMAL(10,2) NOT NULL,
    ubicacion NVARCHAR(255) NOT NULL,
    tecnicoRegistra NVARCHAR(40) NOT NULL,
    FOREIGN KEY (idExpediente) REFERENCES Expedientes(idExpediente),
    FOREIGN KEY (tecnicoRegistra) REFERENCES Usuarios(idUsuario)
);

SELECT * FROM Indicios;

SELECT * FROM Expedientes;

SELECT * FROM Usuarios;

SELECT * FROM ExpedientesEstados;

INSERT INTO ExpedientesEstados VALUES ('Rechazado', 'El expediente fue rechazado', 'R')
