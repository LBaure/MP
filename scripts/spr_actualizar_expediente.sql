
CREATE PROCEDURE spr_actualizar_expediente
	@p_idExpediente INT,
    @p_lugarHechos NVARCHAR(255),
    @p_tipoDelito NVARCHAR(100),
    @p_usuario NVARCHAR(40),
    @p_observaciones NVARCHAR(500) = NULL
AS
BEGIN

    BEGIN TRY
        -- Se validan los parámetros obligatorios
        IF @p_lugarHechos IS NULL OR @p_tipoDelito IS NULL OR @p_usuario IS NULL OR @p_idExpediente IS NULL
        BEGIN
            SELECT 
                'error' AS estado,
                'Parámetros requeridos no pueden ser nulos' AS mensaje;
            RETURN;
        END


        -- Insertar el expediente
        UPDATE Expedientes 
        SET
            lugarHechos = @p_lugarHechos,
            tipoDelito = @p_tipoDelito,
            observaciones = @p_observaciones,
            fechaUltimaActualizacion = getdate(),
            usuarioUltimaActualizacion = @p_usuario
        WHERE idExpediente = @p_idExpediente;
        

        -- se retorna el resultado OK con el ID que se genero
        SELECT 
            'ok' AS estado,
            'Expediente actualizado correctamente' AS mensaje;
    END TRY
    BEGIN CATCH
        SELECT 
            'error' AS estado,
            'Error en procedimiento: ' + ISNULL(ERROR_MESSAGE(), '') + 
            ' (Línea: ' + CAST(ERROR_LINE() AS VARCHAR) + ')' AS mensaje;
    END CATCH
END