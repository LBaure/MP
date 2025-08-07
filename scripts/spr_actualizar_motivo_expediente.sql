CREATE PROCEDURE spr_actualizar_motivo_expediente
    @p_idExpediente INT,
    @p_codigoEstado NVARCHAR(1),
    @p_motivoRechazo NVARCHAR(500),
    @p_usuario NVARCHAR(40)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION; 

        DECLARE @v_idEstado INT;
        DECLARE @v_existeExpediente INT;

        -- Validación de parámetros requeridos
        IF @p_idExpediente IS NULL OR @p_codigoEstado IS NULL OR @p_motivoRechazo IS NULL OR @p_usuario IS NULL
        BEGIN
            ROLLBACK TRANSACTION;
            SELECT 
                'error' AS estado,
                'Parámetros requeridos no pueden ser nulos' AS mensaje;
            RETURN;
        END

        -- Obtener el idEstado del estado
        SELECT @v_idEstado = idEstado
        FROM ExpedientesEstados
        WHERE codigo = @p_codigoEstado;

        IF @v_idEstado IS NULL 
        BEGIN
            ROLLBACK TRANSACTION;
            SELECT 
                'error' AS estado,
                'No se encontró el estado para modificar' AS mensaje;
            RETURN;
        END

        -- Verificar que el expediente esté en estado "P" (Pendiente)
        SELECT @v_existeExpediente = COUNT(1)
        FROM Expedientes e
        INNER JOIN ExpedientesEstados ee ON ee.idEstado = e.idEstado        
        WHERE e.idExpediente = @p_idExpediente
        AND ee.codigo = 'P';

        IF @v_existeExpediente < 1 
        BEGIN
            ROLLBACK TRANSACTION;
            SELECT 
                'warning' AS estado,
                'No está permitido modificar un expediente con estado Aprobado o Rechazado' AS mensaje;
            RETURN;
        END

        -- Actualizar expediente
        UPDATE Expedientes 
        SET
            idEstado = @v_idEstado,
            fechaUltimaActualizacion = GETDATE(),
            usuarioUltimaActualizacion = @p_usuario
        WHERE idExpediente = @p_idExpediente;

        -- Insertar motivo de rechazo
        INSERT INTO MotivoExpedientes (
            idExpediente,
            fechaRevision,
            idUsuario,
            idEstado,
            motivo
        ) VALUES (
            @p_idExpediente,
            GETDATE(),
            @p_usuario,
            @v_idEstado,
            @p_motivoRechazo
        );

        COMMIT TRANSACTION;

        SELECT 
            'ok' AS estado,
            'Expediente actualizado correctamente' AS mensaje;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        SELECT 
            'error' AS estado,
            'Error en procedimiento: ' + ISNULL(ERROR_MESSAGE(), '') + 
            ' (Línea: ' + CAST(ERROR_LINE() AS VARCHAR) + ')' AS mensaje;
    END CATCH
END
