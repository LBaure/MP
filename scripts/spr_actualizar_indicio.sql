
CREATE PROCEDURE spr_actualizar_indicio
	@p_idIndicio INT,
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
                'Los Parámetros para actualizar indicio no pueden ser nulos' AS mensaje;
            RETURN;
        END

       
        -- Modificar el expediente
        UPDATE Indicios 
        SET
        	descripcion = @p_descripcion,
        	color = @p_color,
        	tamanio = @p_tamanio,
        	peso = @p_peso,
        	ubicacion = @p_ubicacion,
        	fechaUltimaActualizacion = GETDATE(),
        	usuarioUltimaActualizacion = @p_tecnicoRegistra
        WHERE idIndicio = @p_idIndicio
        AND idExpediente = @p_idExpediente;

        -- se retorna el resultado OK 
        SELECT 
            'ok' AS estado,
            'Indicio creado correctamente' AS mensaje
    END TRY
    BEGIN CATCH
        SELECT 
            'error' AS estado,
            'Error en procedimiento: ' + ISNULL(ERROR_MESSAGE(), '') + 
            ' (Línea: ' + CAST(ERROR_LINE() AS VARCHAR) + ')' AS mensaje;
    END CATCH
END



EXEC dbo.spr_actualizar_indicio
	@p_idIndicio = 2,
	@p_idExpediente = 3,
	@p_descripcion = 'Arma de fuego',
	@p_color = 'rojo',
	@p_tamanio = 10,
	@p_peso = 2,
	@p_ubicacion = 'algun lugar',
    @p_tecnicoRegistra = '0d585756-0363-40a7-80c0-b82e6a21b3e2';
