import fs from 'node:fs'

export default defineEventHandler(async(event) => {
    const { titulo, fecha, hora, lugar, imagen, valor } = await readBody(event)

    const tituloNormalizado = typeof titulo === 'string' ? titulo.trim(): '';
    const fechaNormalizada = typeof fecha === 'string' ? fecha.trim() : '';
    const horaNormalizada = typeof hora === 'string' ? hora.trim() : '';
    const lugarNormalizado = typeof lugar === 'string' ? lugar.trim() : '';

    const fechaParaBd = new Date(`${fechaNormalizada}T${horaNormalizada}:00`);


    let ruta = 'img/default.jpg';

    if (imagen) {
        const base64Limpio = imagen.archivoBase64.split(';base64,').pop();
        const nombreUnico = `${Date.now()} - ${imagen.nombreArchivo}`;
        const rutaFisica = `./public/img/${nombreUnico}`;

        fs.writeFileSync(rutaFisica, base64Limpio);
        ruta = `/img/${nombreUnico}`
    }


    //aca se inserta en la bd
    const evento = await prisma.evento.create ({
        data: {
            titulo: tituloNormalizado,
            fecha: fechaParaBd,
            lugar: lugarNormalizado,
            imagen: ruta,
            valor: Number(valor),
        }
    })

    return {
        ok: true,
        evento
    }
})