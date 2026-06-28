import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
    //para el correo y contraseña que se envia en el form
    const { email, password } = await readBody(event);
    
    //para ver si se escribio el correo y la contraseña
    if (!email || !password) {
        throw createError({ statusCode: 401, message: 'Credenciales no validas' });
    }

    //buscar el usuario en la base de datos por correo
    const usuario = await prisma.usuario.findUnique({
        where: { email },
    });

    //si no se encuentra el usuario
    if (!usuario) {
        throw createError({ statusCode: 401, message: 'Credenciales no validas' });
    }

    // revisar password
    // bcrypt.compare(password que se ingreso en el form, password dentro de la bd)
    const contraValida = await bcrypt.compare(password, usuario.password);
    if (!contraValida) {
        throw createError({ statusCode: 401, message: 'Credenciales no validas' })  
    }

    //guardar sesion con nuxt auth utils
    await setUserSession(event, {
        user: {
            email: usuario.email,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            rol: usuario.rol,
        }
    });
    return { ok: true };
})
