export default class UsuarioEntity {
  public IdUsuario?: string
  public Nombre!: string
  public Apellido!: string
  public NombreUsuario!: string
  public Contrasena!: string
  public CorreoElectronico!: string
  public NumeroTelefono?: string
  public FechaCreacion!: string
  public FechaActualizacion?: string
  public Estado!: number
  constructor (data: {
    IdUsuario?: string;
    Nombre: string;
    Apellido: string;
    NombreUsuario: string;
    Contrasena: string;
    CorreoElectronico: string;
    NumeroTelefono?: string;
    FechaCreacion: string;
    FechaActualizacion?: string;
    Estado: number;
  }) {
    Object.assign(this, data)
  }
}
