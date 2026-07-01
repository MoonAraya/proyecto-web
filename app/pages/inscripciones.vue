<script setup lang="ts">
import type { Evento } from '~/types/evento';
import type { Inscrito } from '~/types/inscrito';
import { z } from 'zod';
const { data: eventos, pending, error, refresh } = await useFetch<Evento[]>('/api/eventos/futuros');
const { data: inscritos, pending: pendingInscritos } = await useFetch<Inscrito[]>('/api/inscritos');

const validarInscripcion = z.object({
    email: z.email({ message: 'Debe ingresar un email válido.' }).max(100, 'El correo debe tener como máximo 100 caracteres'),
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.').max(50, 'El nombre debe tener como máximo 50 caracteres'),
    apellido: z.string().min(2, 'El apellido debe tener al menos 2 caracteres.').max(50, 'El apellido debe tener como máximo 50 caracteres')
})

// comboBox de eventos
const eventosOptions = computed(() =>
    (eventos.value ?? []).map((evento: Evento) => ({
        id: evento.id,
        label: evento.titulo,
    })))

const guardando = ref(false)
const errorFormulario = ref('')

const formularioEvento = reactive({
    email: '',
    nombre: '',
    apellido: '',
    eventoId: undefined,
})

// Para vista de los campos del formulario
const colorTextoFormulario = 'text-texto-formulario';
const colorFondoCamposFormulario = 'bg-fondo-general/90 text-texto-formulario hover:bg-fondo-card';

function limpiarFormulario() {
    formularioEvento.email = ''
    formularioEvento.nombre = ''
    formularioEvento.apellido = ''
    formularioEvento.eventoId = undefined
    errorFormulario.value = ''
}

async function guardarInscripcion() {
    if (!formularioEvento.email || !formularioEvento.nombre || !formularioEvento.apellido || !formularioEvento.eventoId) {
        errorFormulario.value = 'Todos los campos son obligatorios'
        return
    }
    errorFormulario.value = ''
    guardando.value = true

    try {
        await $fetch('/api/inscritos',
            {
                method: 'POST', body: {
                    email: formularioEvento.email,
                    nombre: formularioEvento.nombre,
                    apellido: formularioEvento.apellido,
                    eventoId: formularioEvento.eventoId,
                }
            })
        // limpiar formulario
        limpiarFormulario()
        await refresh()
        useToast().add({
            duration: 3000,
            title: 'Inscripción lograda',
            description: 'Se ha inscrito correctamente al evento.',
            ui: {
                root: 'bg-fondo-card border border-fondo-login',
                title: 'text-texto font-bold',
                description: 'text-texto-formulario'
            }
        })
    } catch (err: any) {
        errorFormulario.value = getApiErrorMessage(err, 'Error al inscribirse. No pudo inscribirse.')
    } finally {
        guardando.value = false
    }
}

</script>

<template>
    <div class="flex-1 max-w-7xl mx-auto w-full px-6 py-10 flex flex-col lg:flex-row gap-8">
        <!-- formulario de inscripción -->
        <aside class="w-full lg:w-80 shrink-0">
            <div class="bg-fondo-card border border-fondo-login rounded-2xl p-6 sticky top-24">
                <h2 class="text-texto font-bold text-xl mb-1">Inscribirse a un evento</h2>
                <p class="text-texto/70 text-sm mb-6">Ingrese sus datos para inscribirse</p>

                <UForm class="flex flex-col gap-5" @submit.prevent="guardarInscripcion" :schema="validarInscripcion"
                    :state="formularioEvento">
                    <!-- campo nombre -->
                    <UFormField label="Nombre" name="nombre" :ui="{ label: colorTextoFormulario }">
                        <UInput v-model="formularioEvento.nombre" class="w-full" placeholder="Ej: Juanito"
                            :ui="{ base: colorFondoCamposFormulario }" />
                    </UFormField>

                    <!-- campo apellido -->
                    <UFormField label="Apellido" name="apellido" :ui="{ label: colorTextoFormulario }">
                        <UInput v-model="formularioEvento.apellido" class="w-full" placeholder="Ej: Perez"
                            :ui="{ base: colorFondoCamposFormulario }" />
                    </UFormField>

                    <!-- campo email -->
                    <UFormField label="Email" name="email" :ui="{ label: colorTextoFormulario }">
                        <UInput v-model="formularioEvento.email" class="w-full" placeholder="Ej: jperez@usm.cl"
                            :ui="{ base: colorFondoCamposFormulario }" />
                    </UFormField>

                    <!-- selector de evento  -->
                    <UFormField label="Evento" name="eventoId" :ui="{ label: colorTextoFormulario }">
                        <USelectMenu v-model="formularioEvento.eventoId" :items="eventosOptions" value-key="id"
                            label-key="label" class="w-full" placeholder="Seleccione un evento" :loading="pending"
                            :search-input="{ placeholder: 'Buscar evento', icon: 'i-lucide-search' }" :ui="{
                                base: colorFondoCamposFormulario,
                                content: 'bg-fondo-card border border-fondo-login',
                                item: 'data-highlighted:bg-fondo-login data-highlighted:text-texto',
                                itemLabel: 'text-texto',
                                label: 'text-texto-formulario'
                            }" />
                    </UFormField>

                    <!-- mensaje de error -->
                    <UAlert v-if="errorFormulario" color="error" variant="soft" icon="i-heroicons-exclamation-circle"
                        :title="errorFormulario" />

                    <!-- botón -->
                    <UButton type="submit" color="neutral" :loading="guardando"
                        class="w-full bg-boton hover:bg-boton-hover text-texto font-semibold py-3 rounded-xl transition-colors mt-1 justify-center">
                        Inscribirse
                    </UButton>

                </UForm>
            </div>
        </aside>

        <main class="flex-1">
            <!-- div eventos futuros (para inscribirse) -->
            <div class="mb-6">
                <h1 class="text-3xl font-bold text-texto mb-4">Próximos Eventos</h1>
                <p class="text-texto/70 mt-1">Eventos a los que puedes inscribirte.</p>
            </div>
            <!-- // loop eventos -->
            <div class="max-w-7xl mx-auto">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <EventoCards v-for="evento in eventos" :evento="evento" />
                </div>
            </div>
        </main>
    </div>
</template>