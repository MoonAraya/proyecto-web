export default defineEventHandler(async (event) => {
    const id = Number(
        getRouterParam(event, 'id')
    );

    // para borrar inscripciones si es que el evento tiene
    await prisma.inscrito.deleteMany({
        where: { eventoId: id }
    })

    // para borrar el evento en si
    await prisma.evento.delete({
        where: {id}
    })

    return {
        ok: true
    }
})