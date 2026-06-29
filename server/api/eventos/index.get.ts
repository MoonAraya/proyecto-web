export default defineEventHandler(async () => {
  return await prisma.evento.findMany({
    orderBy: [{ fecha: 'asc' }, { titulo: 'asc' }],
    include: {
      _count: {
        select: { inscritos:true }
      }
    }
  })
})