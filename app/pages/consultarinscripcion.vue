<script setup lang="ts">
import type { Evento } from '~/types/evento'
import type { Inscrito } from '~/types/inscrito'
import { z } from 'zod'

const errorBuscar = ref('')
const buscandoEventos = ref(false)
const busquedaRealizada = ref(false)
const eventosAsociados = ref<Evento[]>([])

const validarCorreo = z.object({
    email: z.email({ message: 'Debe ingresar un email válido.' }).max(100, 'El correo debe tener a lo mas 100 caracteres')
})

const formularioCorreo = reactive({
    correo: ''
})
/*
function reiniciarCampoCorreo() {
    formularioCorreo.correo = ''
    eventosAsociados.value = []
    busquedaRealizada.value = false
    errorBuscar.value = ''
}
*/
async function buscarInscripciones() {
    const resultado = validarCorreo.safeParse({ email: formularioCorreo.correo })

    buscandoEventos.value = true
    errorBuscar.value = ''
    busquedaRealizada.value = true

    try {
        const inscripciones = await $fetch<Inscrito[]>(`/api/inscritos/${encodeURIComponent(formularioCorreo.correo.trim())}/inscritos`)
        eventosAsociados.value = inscripciones.map((inscripcion) => inscripcion.evento)

        if (eventosAsociados.value.length === 0) {
            errorBuscar.value = 'No se encontraron eventos asociados a este correo.'
        }
    }
    catch (err: any) {
        eventosAsociados.value = []
        errorBuscar.value = getApiErrorMessage(err, 'No se pudieron buscar las inscripciones asociadas a este correo')
    }
    finally {
        buscandoEventos.value = false
    }
}
</script>

<template>
    <div class="flex flex-col max-w-xl mx-auto gap-8">
        <h2 class="text-2xl text-texto text-center">Ingrese su correo para ver los eventos</h2>

        <div class="max-w-lg mx-auto gap-4 flex flex-col w-full">
            <UForm class="w-full" @submit.prevent="buscarInscripciones">
                <UInput v-model="formularioCorreo.correo" class="w-full" placeholder="Ej: juanito@gmail.com"
                    :ui="{ base: 'bg-fondo-general/90 text-texto-formulario' }" />
            </UForm>

            <div class="flex gap-3">
                <UButton type="submit" :loading="buscandoEventos"
                    class="bg-boton text-texto py-2 px-4 rounded-md hover:bg-boton-hover font-bold transition-colors flex justify-center flex-1"
                    @click="buscarInscripciones">
                    Consultar
                </UButton>

                <!--
                <UButton type="button" variant="ghost" class="text-texto" @click="reiniciarCampoCorreo">
                    Limpiar
                </UButton>
                -->
            </div>

            <p v-if="errorBuscar" class="text-sm text-red-500 text-center">{{ errorBuscar }}</p>
            <p v-if="busquedaRealizada && eventosAsociados.length === 0" class="text-center text-texto/70">No hay
                eventos asociados al correo</p>
        </div>
    </div>
    <!-- cards eventos asociados -->
    <div v-if="busquedaRealizada && eventosAsociados.length !== 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
        <EventoCards v-for="evento in eventosAsociados" :key="evento.id" :evento="evento" />
    </div>
</template>