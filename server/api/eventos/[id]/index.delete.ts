export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    await prisma.evento.delete({
        where: {id}
    })
    return {ok: true}
})