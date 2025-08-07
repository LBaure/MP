import axios, { type AxiosResponse } from "axios";
import type { IResponse } from "../../../interfaces/IResponse";
import type { IUsuario } from "../../../interfaces/seguridad/IUsuario";
import { handleError } from "../../../helpers/HandleError";

const URL: string = "/api/seguridad/usuarios";


export class UsuarioServicio {
  async obtenerUsuarios(): Promise<IUsuario[]> {
    try {
      const { data }: AxiosResponse<IResponse> = await axios.get(URL);
      return data.result as IUsuario[];
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}