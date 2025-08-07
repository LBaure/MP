import UsuarioEntity from '../../entities/seguridad/UsuarioEntity'

export default interface IUsuarioRepositorio {
  obetenerUsuarios(): Promise<UsuarioEntity[]>;
}
