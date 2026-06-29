export default defineEventHandler(async () => {
    const hoy = new Date()

    return await prisma.evento.findMany({
        where: {
            fecha: {
                gte: hoy
            }
        },
        orderBy: [{ fecha: 'asc' }, { titulo: 'asc' }],
        take: 6,
    })
})