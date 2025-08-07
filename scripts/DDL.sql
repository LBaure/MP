CREATE TABLE Usuarios (
  IdUsuario varchar(40) NOT NULL PRIMARY KEY,
  Nombre varchar(50) NOT NULL,
  Apellido varchar(50) NOT NULL,
  NombreUsuario varchar(25) NOT NULL,
  Contrasena varchar(255) NOT NULL,
  CorreoElectronico varchar(255) NOT NULL,
  NumeroTelefono varchar(15),
  FechaCreacion datetime NOT NULL DEFAULT GETDATE(),
  FechaActualizacion datetime DEFAULT GETDATE(),
  Estado int DEFAULT NULL
);




INSERT INTO dbo.Usuarios
	(
	IdUsuario,
	Nombre,
	Apellido,
	NombreUsuario,
	Contrasena,
	CorreoElectronico,
	NumeroTelefono,
	Estado
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
	
	
	
SELECT * FROM Usuarios;