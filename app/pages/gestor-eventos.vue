<script setup lang="ts">
// Para solo darle acceso al administrador a esta pagina
definePageMeta({
    middleware: ['admin']
})

import type { Evento } from '../types/evento'
import { z } from 'zod';

const { data: eventos, pending, error, refresh } = await useFetch<Evento[]>('/api/eventos')

// Agregar evento
const roles = ['Administrador']
const mostrarFormularioAgregar = ref(false);
const errorFormularioAgregar = ref('');
const guardandoNuevoEvento = ref(false);

const formularioNuevoEvento = reactive({
    titulo: '',
    fecha: '',
    hora: '',
    lugar: '',
    //Para imagen
    nombre: '',
    nombreArchivo: '',
    archivoBase64: '',

    valor: undefined
})

function reiniciarFormularioAgregar() {
    formularioNuevoEvento.titulo = '';
    formularioNuevoEvento.fecha = '';
    formularioNuevoEvento.hora = '';
    formularioNuevoEvento.lugar = '';
    formularioNuevoEvento.nombre = '';
    formularioNuevoEvento.nombreArchivo = '';
    formularioNuevoEvento.archivoBase64 = '';
    formularioNuevoEvento.valor = undefined;
    errorFormularioAgregar.value = '';
}

function cerrarFormularioAgregar() {
    mostrarFormularioAgregar.value = false;
    reiniciarFormularioAgregar();
}

// Para leer el archivo del pc y transformar a texto
function alSeleccionarArchivo(event: any) {
    const archivo = event.target.files[0]
    if (archivo) {
        formularioNuevoEvento.nombreArchivo = archivo.name

        const reader = new FileReader()
        reader.onload = (event: any) => {
            formularioNuevoEvento.archivoBase64 = event.target.result // Aquí queda guardado como texto largo
        }
        reader.readAsDataURL(archivo)
    }
}

// Para agregar

async function guardarEvento() {
    guardandoNuevoEvento.value = true;
    errorFormularioAgregar.value = '';
    try {
        await $fetch('/api/eventos', {
            method: 'POST',
            body: {
                titulo: formularioNuevoEvento.titulo,
                fecha: formularioNuevoEvento.fecha,
                hora: formularioNuevoEvento.hora,
                lugar: formularioNuevoEvento.lugar,
                nombre: formularioNuevoEvento.nombre,
                nombreArchivo: formularioNuevoEvento.nombreArchivo,
                archivoBase64: formularioNuevoEvento.archivoBase64,
                valor: formularioNuevoEvento.valor
            }
        });
        cerrarFormularioAgregar();
        await refresh();
    }
    catch (err: any) {
        errorFormularioAgregar.value = getApiErrorMessage(err, "No se pudo agregar el nuevo usuario");
    }
    finally {
        guardandoNuevoEvento.value = false;
    }
}


</script>
<!-- IDEA: BOTON MODAL PARA CADA EVENTO QUE ABRA UN COMBO BOX CON LA LISTA DE INSCRITOS PARA ELIMINARLO -->
<template>
    <div class="space-y-8">
        <!-- titulo + boton para agregar EVENTOS nuevos -->
        <section class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <!-- TEXTOS A LA IZQUIERDA -->
            <div>
                <h1 class="text-3xl font-extrabold tracking-tight text-texto sm:text-4xl">
                    EVENTOS
                </h1>
                <p class="mt-3 max-w-2xl text-base leading-7 text-texto/70">
                    Listado de eventos.
                </p>
            </div>

            <!-- BOTON -->
            <button class="bg-texto hover:bg-brand-hover texto-texto/70 font-bold py-2 px-4 rounded">
                Agregar Evento
            </button>
        </section>

        <!-- LA IDEA ES QUE CADA EVENTO TENGA SUS PROPIOS BOTONES DE MANTENEDOR? -->
        <!-- proximos eventos -->
        <div class="mx-auto max-w-2xl sm:text-center">
            <div class="space-y-5">
                <h2 class="text-3xl font-bold tracking-tight text-texto sm:text-4xl">Próximos eventos</h2>
            </div>
        </div>

        <section class="mx-auto justify-around grid gap-6 md:grid-cols-3">
            <!-- loop de cards con divs no article -->
            <EventoCards v-for="evento in eventos" :evento="evento" />
        </section>
        <!-- Próximos eventos -->
        <!-- <section class="py-16 px-6">
            <div class="max-w-7xl mx-auto">
                <div class="flex items-end justify-between mb-8">
                    <div>
                        <h2 class="text-3xl font-bold text-brand-text">Próximos eventos</h2>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <EventoCard v-for="evento in eventosProximos" :evento="evento" /> //en el script de esta pagina
                </div>
            </div>
        </section> -->
    </div>





</template>