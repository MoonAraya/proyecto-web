import type { Inscrito } from '~/types/inscrito'

export interface Evento{
    id: number
    titulo: string
    fecha: Date
    lugar: string
    imagen: string
    valor: number
    inscritos: Inscrito
}