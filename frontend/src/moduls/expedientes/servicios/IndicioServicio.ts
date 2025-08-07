import axios, { type AxiosResponse } from "axios";
import {  Status, type IResponse } from "../../../interfaces/IResponse";
import { handleError } from "../../../helpers/HandleError";
import type { IIndicio, IListadoIndicios } from "../../../interfaces/expedientes/IIndicio";
import { toast } from "react-toastify";

const URL: string = "/api/expediente/indicios";


export class IndicioServicio {
  async obtenerIndicios(idExpediente: number): Promise<IListadoIndicios[]> {
    try {
      const { data }: AxiosResponse<IResponse> = await axios.get(
        URL + `/${idExpediente}`
      );
      return data.result as IListadoIndicios[];
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  async registrarIndicio(datos: IIndicio): Promise<IListadoIndicios[]> {
    try {
      const { data }: AxiosResponse<IResponse> = await axios.post(URL, datos);
      if (data.status === Status.OK) {
        toast.success(data.message || "Indicio creado correctamente");
        return data.result as IListadoIndicios[];
      } else if (data.status === Status.WARNING) {
        throw new Error(data.message || "Ocurrio un error al crear el Indicio");
      } else {
        throw new Error(data.message || "Error inesperado al crear el Indicio");
      }
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  async actualizarIndicio(datos: IIndicio): Promise<IListadoIndicios[]> {
    try {
      const { data }: AxiosResponse<IResponse> = await axios.put(
        URL + `/${datos.idIndicio}`,
        datos
      );
      if (data.status === Status.OK) {
        toast.success(data.message || "Indicio actualizado correctamente");
        return data.result as IListadoIndicios[];
      } else if (data.status === Status.WARNING) {
        throw new Error(data.message || "Ocurrio un error al crear el Indicio");
      } else {
        throw new Error(data.message || "Error inesperado al crear el Indicio");
      }
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  async eliminarIndicio(
    idIndicio: number,
    idExpediente: number
  ): Promise<IListadoIndicios[]> {
    try {
      const { data }: AxiosResponse<IResponse> = await axios.delete(
        URL + `/${idIndicio}/${idExpediente}`
      );
      if (data.status === Status.OK) {
        toast.success(data.message || "Indicio actualizado correctamente");
        return data.result as IListadoIndicios[];
      } else if (data.status === Status.WARNING) {
        throw new Error(data.message || "Ocurrio un error al crear el Indicio");
      } else {
        throw new Error(data.message || "Error inesperado al crear el Indicio");
      }
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}