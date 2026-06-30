export default defineEventHandler(async (event) => {
    // extraer los datos del formulario de ingreso de inscripcion
    const { email, nombre, apellido, eventoId } = await readBody(event)

    const emailNormalizado = typeof email === 'string' ? email.trim() : '';
    const nombreNormalizado = typeof nombre === 'string' ? nombre.trim() : '';
    const apellidoNormalizado = typeof apellido === 'string' ? apellido.trim() : '';


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
})