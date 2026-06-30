export default defineEventHandler(async () => {
    return await prisma.inscrito.findMany({
        orderBy: [{ eventoId: 'asc' }, { email: 'asc' }],
    })
})