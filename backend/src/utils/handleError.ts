import ResponseEntity, { EstadoSolicitudHttp } from '../domain/entities/ResponseEntity'

export default function handleError (error: unknown) {
  console.error(error)

  if (error instanceof Error) {
    const response = new ResponseEntity(EstadoSolicitudHttp.ERROR)
    response.message = error.message
    return response
  } else {
    const response = new ResponseEntity(EstadoSolicitudHttp.ERROR)
    response.message = 'Error desconocido'
    return response
  }
  // res.status(500).send('Internal server error')
}
