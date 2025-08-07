
ALTER PROCEDURE spr_crear_expediente
    @p_lugarHechos NVARCHAR(255),
    @p_tipoDelito NVARCHAR(100),
    @p_tecnicoRegistra NVARCHAR(40),
    @p_observaciones NVARCHAR(500) = NULL
AS
BEGIN

    BEGIN TRY
        DECLARE @v_idEstado INT;
        DECLARE @v_idExpediente INT;

        -- Se validan los parámetros obligatorios
        IF @p_lugarHechos IS NULL OR @p_tipoDelito IS NULL OR @p_tecnicoRegistra IS NULL
        BEGIN
            SELECT 
                'error' AS estado,
                'Parámetros requeridos no pueden ser nulos' AS mensaje;
            RETURN;
        END

        -- Obtener el ID del estado con código 'P' que se refiere a pendiente
        SELECT @v_idEstado = idEstado
        FROM ExpedientesEstados
        WHERE codigo = 'P';

        IF @v_idEstado IS NULL 
        BEGIN
            SELECT 
                'error' AS estado,
                'No se encontró el estado con código ''P''' AS mensaje;
            RETURN;
        END

        -- Insertar el expediente
        INSERT INTO Expedientes (
            lugarHechos,
            tipoDelito,
            tecnicoRegistra,
            idEstado,
            observaciones
        )
        VALUES (
            @p_lugarHechos,
            @p_tipoDelito,
            @p_tecnicoRegistra,
            @v_idEstado,
            @p_observaciones
        );

        -- Obtener ID generado
        SET @v_idExpediente = SCOPE_IDENTITY();

        -- se retorna el resultado OK con el ID que se genero
        SELECT 
            'ok' AS estado,
            'Expediente creado correctamente' AS mensaje,
            @v_idExpediente AS idExpediente;
    END TRY
    BEGIN CATCH
        SELECT 
            'error' AS estado,
            'Error en procedimiento: ' + ISNULL(ERROR_MESSAGE(), '') + 
            ' (Línea: ' + CAST(ERROR_LINE() AS VARCHAR) + ')' AS mensaje;
    END CATCH
END


EXEC dbo.spr_crear_expediente 
    @p_lugarHechos = 'Zona Centro',
    @p_tipoDelito = 'Robo',
    @p_tecnicoRegistra = '0d585756-0363-40a7-80c0-b82e6a21b3e2',
    @p_observaciones = 'Ninguna';