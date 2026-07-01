export default defineEventHandler(async (event) => {
    const eventoId = Number(getRouterParam(event, 'id'))

    if (!eventoId) {
        return []
    }

    return await prisma.inscrito.findMany({
        where: {
            eventoId
        },
        orderBy: [
            { email: 'asc' }
        ]
    })
})
