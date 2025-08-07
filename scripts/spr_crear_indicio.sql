
CREATE PROCEDURE spr_crear_indicio
	@p_idExpediente INT,
	@p_descripcion NVARCHAR(255),
	@p_color NVARCHAR(50),
	@p_tamanio DECIMAL(10,2),
	@p_peso DECIMAL(10,2),
	@p_ubicacion NVARCHAR(255),
    @p_tecnicoRegistra NVARCHAR(40)
AS
BEGIN

    BEGIN TRY
        DECLARE @v_idEstado INT;
        DECLARE @v_idIndicio INT;
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
        IF @p_descripcion IS NULL OR @p_color IS NULL OR @p_tamanio IS NULL OR @p_peso IS NULL OR @p_ubicacion IS NULL
        BEGIN
            SELECT 
                'error' AS estado,
                'Parámetros requeridos no pueden ser nulos' AS mensaje;
            RETURN;
        END

       
        -- Insertar el expediente
        INSERT INTO Indicios (
        	idExpediente,
        	descripcion,
        	color,
        	tamanio,
        	peso,
        	ubicacion,
        	tecnicoRegistra
        )
        VALUES (
            @p_idExpediente,
            @p_descripcion,
            @p_color,
            @p_tamanio,
            @p_peso,
            @p_ubicacion,
            @p_tecnicoRegistra
        );

        -- Obtener ID generado
        SET @v_idIndicio = SCOPE_IDENTITY();

        -- se retorna el resultado OK con el ID que se genero
        SELECT 
            'ok' AS estado,
            'Indicio creado correctamente' AS mensaje,
            @v_idIndicio AS idIndicio;
    END TRY
    BEGIN CATCH
        SELECT 
            'error' AS estado,
            'Error en procedimiento: ' + ISNULL(ERROR_MESSAGE(), '') + 
            ' (Línea: ' + CAST(ERROR_LINE() AS VARCHAR) + ')' AS mensaje;
    END CATCH
END


EXEC dbo.spr_crear_indicio 
	@p_idExpediente = 3,
	@p_descripcion = 'alguna descripcion',
	@p_color = 'rojo',
	@p_tamanio = 10,
	@p_peso = 2,
	@p_ubicacion = 'algun lugar',
    @p_tecnicoRegistra = '0d585756-0363-40a7-80c0-b82e6a21b3e2';