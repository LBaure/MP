

CREATE PROCEDURE spr_eliminar_indicio
	@p_idIndicio INT,
	@p_idExpediente INT
AS
BEGIN

    BEGIN TRY
        DECLARE @v_existe_expediente INT;
        
       	SELECT  @v_existe_expediente = count(e.idExpediente)
        FROM Expedientes e
        INNER JOIN ExpedientesEstados ee
        ON ee.idEstado = e.idEstado
        WHERE e.idExpediente = @p_idExpediente      
        AND ee.codigo = 'P'
        
        
        IF @v_existe_expediente < 1
        BEGIN
        	SELECT 
                'error' AS estado,
                'El expediente no existe o no se puede modificar' AS mensaje;
            RETURN;
        END
        
        
        -- Se validan los parámetros obligatorios
        IF @p_idIndicio IS NULL OR @p_idExpediente IS NULL
        BEGIN
            SELECT 
                'error' AS estado,
                'Los Parámetros para eliminar indicio no pueden ser nulos' AS mensaje;
            RETURN;
        END

       
        -- Modificar el expediente
        DELETE FROM Indicios
        WHERE idIndicio = @p_idIndicio
        AND idExpediente = @p_idExpediente;

        -- se retorna el resultado OK 
        SELECT 
            'ok' AS estado,
            'Indicio eliminado correctamente' AS mensaje
    END TRY
    BEGIN CATCH
        SELECT 
            'error' AS estado,
            'Error en procedimiento: ' + ISNULL(ERROR_MESSAGE(), '') + 
            ' (Línea: ' + CAST(ERROR_LINE() AS VARCHAR) + ')' AS mensaje;
    END CATCH
END
