export default defineNuxtRouteMiddleware(() => {
    const { user } = useUserSession();

    // si la persona no es admin no le da acceso
    if (user.value?.rol !== 'Administrador') {
        throw createError({statusCode: 403, message: 'No tienes permiso para acceder a esta página'})
    }
})