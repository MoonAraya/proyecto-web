export default defineEventHandler(async (event) => {
    // extraer los datos del formulario de creacion de cuenta
    const { email, nombre, apellido, eventoId } = await readBody(event)

    const emailNormalizado = typeof email === 'string' ? email.trim() : '';
    
    // insertar la inscripcion en la bd
    const inscripcion = await prisma.inscrito.create({
        data: {
            email: emailNormalizado,
            nombre: nombre,
            apellido: apellido,
            eventoId: Number(eventoId)
        }
    })

    return {
        ok: true,
        inscripcion
    }
})