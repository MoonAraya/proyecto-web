export default defineEventHandler(async (event) => {
    const email = getRouterParam(event, 'email')?.trim()

    if (!email) {
        return []
    }

    return await prisma.inscrito.findMany({
        where: {
            email
        },
        include: {
            evento: {
                include: {
                    _count: {
                        select: {
                            inscritos: true
                        }
                    }
                }
            }
        }
    })
})