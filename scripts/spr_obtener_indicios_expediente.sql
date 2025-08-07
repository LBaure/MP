CREATE PROCEDURE spr_obtener_indicios_expediente
	@p_idExpediente INT
AS
BEGIN

    BEGIN TRY
        -- Se validan los parámetros obligatorios
        IF @p_idExpediente IS NULL 
        BEGIN
            SELECT 
                'error' AS estado,
                'Parámetros requeridos no pueden ser nulos' AS mensaje;
            RETURN;
        END


       SELECT 
			i.idIndicio,
			i.idExpediente,
			i.descripcion,
			i.color,
			i.tamaño,
			i.peso,
			i.ubicacion,
			u.nombre + ' ' + u.apellido AS  tecnicoRegistra,
			FORMAT(i.fechaCreacion, 'dd/MM/yyyy HH:mm:ss') AS fechaCreacion,
			FORMAT(i.fechaUltimaActualizacion, 'dd/MM/yyyy HH:mm:ss') AS fechaUltimaActualizacion,	
			COALESCE(ua.nombre + ' ' + ua.apellido, NULL) AS usuarioActualiza
		FROM Indicios i
		INNER JOIN Usuarios u
		ON u.idUsuario = i.tecnicoRegistra
		LEFT JOIN Usuarios ua
		ON ua.idUsuario = i.usuarioUltimaActualizacion
		WHERE i.idExpediente = @p_idExpediente;

    END TRY
    BEGIN CATCH
        SELECT 
            'error' AS estado,
            'Error en procedimiento: ' + ISNULL(ERROR_MESSAGE(), '') + 
            ' (Línea: ' + CAST(ERROR_LINE() AS VARCHAR) + ')' AS mensaje;
    END CATCH
END