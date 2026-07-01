export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'))

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID de inscripción inválido'
        })
    }

    await prisma.inscrito.delete({
        where: { id }
    })

    return {
        ok: true
    }
})
