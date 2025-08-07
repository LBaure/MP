import OffCanvas from "../../../components/OffCanvas";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import FieldInput from "../../../components/field-input";
import Button from "../../../components/Button";
import type { IIndicio, IListadoIndicios } from "../../../interfaces/expedientes/IIndicio";
import { IndicioServicio } from "../servicios/IndicioServicio";

const http = new IndicioServicio()

interface FormIndicioProps {
  isOpen: boolean;
  onClose: () => void;
  item: IIndicio | null;
  actualizarListado: (list: IListadoIndicios[]) => void;
  idExpediente: number;
}

// Schema de validación
const validationSchema: Yup.ObjectSchema<IIndicio> = Yup.object().shape({
  idIndicio: Yup.number().nullable(),
  idExpediente: Yup.number().required("El expediente es obligatorio"),
  descripcion: Yup.string()
    .required("La descripción del indicio es obligatoria")
    .max(255, "Ha sobrepasado el limite de caracteres permitidos"),
  color: Yup.string()
    .required("El color del indicio es obligatorio")
    .max(50, "Ha sobrepasado el limite de caracteres permitidos"),
  tamanio: Yup.number()
    .required("El tamanio del indicio es obligatorio")
    .min(1, "El tamanio debe ser mayor a 0"),
  peso: Yup.number()
    .required("El peso del indicio es obligatorio")
    .min(1, "El tamanio debe ser mayor a 0"),
  ubicacion: Yup.string()
    .required("La ubicación del indicio es obligatorio")
    .max(255, "Ha sobrepasado el limite de caracteres permitidos")
});

const FormIndicio: React.FC<FormIndicioProps> = ({
  isOpen,
  onClose,
  item,
  actualizarListado,
  idExpediente,
}) => {
  const [titulo, setTitulo] = useState<string>("Registrar Indicio");
  const [esEdicion, setEsEdicion] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
    reset,
  } = useForm<IIndicio>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      idIndicio: item?.idIndicio || null,
      idExpediente: idExpediente,
      descripcion: "",
      color: "",
      tamanio: 0,
      peso: 0,
      ubicacion: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setFocus("descripcion"), 100);
      if (item) {
        setTitulo("Modificar Expediente");
        reset(item);
        setEsEdicion(true);
      }
    }
  }, [isOpen, setFocus, item, reset]);

  const handleClose = () => {
    if (!isSubmitting && !isLoading) {
      onClose();
    }
  };

  const onSubmit: SubmitHandler<IIndicio> = async (data) => {
    console.log("Datos del formulario:", data);
    setIsLoading(true);
    try {
      let response: IListadoIndicios[] = [];
      if (!esEdicion) {
        response = await http.registrarIndicio(data);
      } else {
        console.log("Actualizando expediente", data);
        response = await http.actualizarIndicio(data);
      }
      // onGetRoles(response);
      actualizarListado(response);
      onClose();
    } catch {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OffCanvas isOpen={isOpen} closeOffcanvas={handleClose}>
      <OffCanvas.Title className="font-bold">{titulo}</OffCanvas.Title>
      <OffCanvas.SubTitle>Registro de nuevos expedientes</OffCanvas.SubTitle>
      <section className="flex flex-col h-full mt-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 sm:gap-6 h-full"
        >
          <FieldInput
            id="descripcion"
            type="text"
            placeholder="descripción del indicio"
            label="Descripción del indicio"
            name="descripcion"
            required
            register={register}
            errorYup={errors.descripcion?.message}
          />
          <FieldInput
            id="color"
            type="text"
            placeholder="negro policromado"
            label="Color"
            name="color"
            required
            register={register}
            errorYup={errors.color?.message}
          />
          <FieldInput
            id="tamanio"
            type="number"
            placeholder="1"
            label="Tamaño"
            name="tamanio"
            required
            register={register}
            errorYup={errors.tamanio?.message}
          />
          <FieldInput
            id="peso"
            type="number"
            placeholder="1"
            label="Peso"
            name="peso"
            required
            register={register}
            errorYup={errors.peso?.message}
          />

          <FieldInput
            id="ubicacion"
            type="text"
            placeholder="Donde se encontro"
            label="Ubicación"
            name="ubicacion"
            required
            register={register}
            errorYup={errors.ubicacion?.message}
          />
          <div className="mt-auto flex sm:flex-row-reverse sm:justify-end gap-2">
            <Button
              type="submit"
              textColor="text-white"
              bgColor="bg-primary dark:bg-primary"
              hover="hover:bg-primary/90 dark:hover:bg-primary"
            >
              {esEdicion ? "Actualizar" : "Guardar"}
            </Button>

            <Button
              textColor="text-secondary"
              bgColor="border border-accent"
              hover="hover:bg-primary/10 dark:bg-transparent dark:hover:bg-secondary"
              onClick={handleClose}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </section>
    </OffCanvas>
  );
};
export default FormIndicio;
