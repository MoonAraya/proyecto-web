import { Prisma } from '../../../generated/prisma/client' 

export default defineEventHandler(async (event) => {
    // extraer los datos del formulario de ingreso de inscripcion
    const { email, nombre, apellido, eventoId } = await readBody(event)

    const emailNormalizado = typeof email === 'string' ? email.trim() : '';
    const nombreNormalizado = typeof nombre === 'string' ? nombre.trim() : '';
    const apellidoNormalizado = typeof apellido === 'string' ? apellido.trim() : '';

    try {
        // insertar la inscripcion en la bd
        const inscripcion = await prisma.inscrito.create({
            data: {
                email: emailNormalizado,
                nombre: nombreNormalizado,
                apellido: apellidoNormalizado,
                eventoId: Number(eventoId)
            }
        })

        return {
            ok: true,
            inscripcion
        }
    } catch (err: any) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
            throw createError({
                statusCode: 409,
                statusMessage: 'No puedes inscribirte al mismo evento más de una vez.'
            })
        }
        throw err
    }
})