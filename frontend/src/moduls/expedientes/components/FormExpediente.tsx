import OffCanvas from "../../../components/OffCanvas";
import type { IExpediente, IListadoExpedientes } from "../../../interfaces/expedientes/IExpedientes";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import FieldInput from "../../../components/field-input";
import Button from "../../../components/Button";
import { ExpedienteServicio } from "../servicios/ExpedienteServicio";

const http = new ExpedienteServicio();

interface FormExpedienteProps {
  isOpen: boolean;
  onClose: () => void;
  item: IExpediente | null;
  actualizarListado: (list: IListadoExpedientes[]) => void;
}

// Schema de validación
const validationSchema: Yup.ObjectSchema<IExpediente> = Yup.object().shape({
  idExpediente: Yup.number().nullable(),
  lugarHechos: Yup.string()
    .required("El nombre de la etiqueta es obligatorio")
    .max(255, "Ha sobrepasado el limite de caracteres permitidos"),
  tipoDelito: Yup.string()
    .required("El nombre de la etiqueta es obligatorio")
    .max(100, "Ha sobrepasado el limite de caracteres permitidos"),
  observaciones: Yup.string().max(
    500,
    "Ha sobrepasado el limite de caracteres permitidos"
  ),
});

const FormExpediente: React.FC<FormExpedienteProps> = ({
  isOpen,
  onClose,
  item,
  actualizarListado
}) => {
  const [titulo, setTitulo] = useState<string>("Crear expediente");
  const [esEdicion, setEsEdicion] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
    reset,
  } = useForm<IExpediente>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      idExpediente: item?.idExpediente || null,
      lugarHechos: "",
      tipoDelito: "",
      observaciones: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setFocus("lugarHechos"), 100);
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

  const onSubmit: SubmitHandler<IExpediente> = async (data) => {
    console.log("Datos del formulario:", data);
    setIsLoading(true);
    try {
      let response: IListadoExpedientes[] = [];
      if (!esEdicion) {
        response = await http.crearExpediente(data);
      } else {
        console.log("Actualizando expediente", data);
        response = await http.actualizarExpediente(data, data.idExpediente || 0);
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
            id="lugarHechos"
            type="text"
            placeholder="2a. Avenida 12-34 zona 1"
            label="Lugar de los hechos"
            name="lugarHechos"
            required
            register={register}
            errorYup={errors.lugarHechos?.message}
          />
          <FieldInput
            id="tipoDelito"
            type="text"
            placeholder="Robo a mano armada"
            label="Tipo de delito"
            name="tipoDelito"
            required
            register={register}
            errorYup={errors.tipoDelito?.message}
          />
          <div>
            <label
              htmlFor="observaciones"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-200"
            >
              Descripción
            </label>
            <textarea
              id="observaciones"
              placeholder="Observaciones del expediente"
              rows={5}
              maxLength={500}
              className="bg-gray-50 border border-slate-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus:ring-slate-500 focus:border-slate-500 block  w-full p-2.5 dark:bg-gray-700 dark:text-slate-200"
              {...register("observaciones")}
            ></textarea>
          </div>
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
export default FormExpediente;