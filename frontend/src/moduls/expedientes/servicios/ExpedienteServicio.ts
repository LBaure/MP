import axios, { type AxiosResponse } from "axios";
import { Status, type IResponse } from "../../../interfaces/IResponse";
import { handleError } from "../../../helpers/HandleError";
import type { IExpediente, IListadoExpedientes } from "../../../interfaces/expedientes/IExpedientes";
import { toast } from "react-toastify";
import type { IEstadoExpediente } from "../../../interfaces/expedientes/IEstadoExpediente";
import type { IRevisionExpediente } from "../../../interfaces/expedientes/IRevisionExpediente";

const URL: string = "/api/expediente";


export class ExpedienteServicio {
  async obtenerExpedientes(): Promise<IListadoExpedientes[]> {
    try {
      const { data }: AxiosResponse<IResponse> = await axios.get(URL);
      return data.result as IListadoExpedientes[];
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  async obtenerEstadosExpedientes(): Promise<IEstadoExpediente[]> {
    try {
      const { data }: AxiosResponse<IResponse> = await axios.get(
        URL + "/estadosExpediente"
      );
      return data.result as IEstadoExpediente[];
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  async crearExpediente(datos: IExpediente): Promise<IListadoExpedientes[]> {
    try {
      const { data }: AxiosResponse<IResponse> = await axios.post(URL, datos);
      if (data.status === Status.OK) {
        toast.success(data.message || "Expediente creado correctamente");
        return data.result as IListadoExpedientes[];
      } else if (data.status === Status.WARNING) {
        throw new Error(
          data.message || "Ocurrio un error al crear el expediente"
        );
      } else {
        throw new Error(
          data.message || "Error inesperado al crear el expediente"
        );
      }
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  async actualizarExpediente(
    datos: IExpediente,
    idExpediente: number
  ): Promise<IListadoExpedientes[]> {
    try {
      const { data }: AxiosResponse<IResponse> = await axios.put(
        URL + `/${idExpediente}`,
        datos
      );
      if (data.status === Status.OK) {
        toast.success(data.message || "Expediente actualizado correctamente");
        return data.result as IListadoExpedientes[];
      } else if (data.status === Status.WARNING) {
        throw new Error(
          data.message || "Ocurrio un error al actualizar el expediente"
        );
      } else {
        throw new Error(
          data.message || "Error inesperado al actualizar el expediente"
        );
      }
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  async rechazarExpediente(datos: IRevisionExpediente): Promise<IListadoExpedientes[]> {
    try {
      const { data }: AxiosResponse<IResponse> = await axios.post(
        URL + `/actualizarMotivo`,
        datos
      );
      if (data.status === Status.OK) {
        toast.success(data.message || "Expediente actualizado correctamente");
        return data.result as IListadoExpedientes[];
      } else if (data.status === Status.WARNING) {
        throw new Error(data.message || "Ocurrio un error al crear el Expediente");
      } else {
        throw new Error(data.message || "Error inesperado al crear el Expediente");
      }
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}