import bcrypt from "bcryptjs"
export default defineEventHandler(async (event) => {
    // extraer los datos del formulario de creacion de cuenta
    const { email, password, nombre, apellido, rol } = await readBody(event)
    
    // pasar la contraseña a hash
    const hash = await bcrypt.hash(password, 12)

    // insertar el usuario en la bd
    const usuario = await prisma.usuario.create({
        data: {
            email,
            password: hash,
            nombre,
            apellido,
            rol
        }
    })

    return {
        ok: true,
        usuario
    }
})