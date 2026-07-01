<script setup lang="ts">
// Para solo darle acceso al administrador a esta pagina
definePageMeta({
    middleware: ['admin']
})

import type { Evento } from '../types/evento'
import { z } from 'zod';

const validarCrearEvento = z.object({
    titulo: z.string().min(8, 'El evento debe tener al menos 8 caracteres').max(50, 'El evento debe tener a lo mas 50 caracteres'),
    fecha: z.string().min(1, 'Debe ingresar fecha'),
    hora: z.string().min(1, 'Debe ingresar hora'),
    lugar: z.string().min(5, 'El lugar debe tener al menos 5 caracteres'),
    valor: z.coerce.number('El valor debe ser un número')
}).refine((info) => {
    //la condicion es por si no se ingresan valores como tal, que vaya para adelante y se valide con el fecha u otra minima
    if (!info.fecha || !info.hora) {
        return true;
    }
    //esto para comparar la fecha ingresada con la actual en el momento que se presiona el boton agregar
    const fechaHora = new Date(`${info.fecha}T${info.hora}:00`);
    const momentoactual = new Date();

    return fechaHora > momentoactual
}, {
    message: 'La fecha y hora deben ser posteriores a la fecha y hora actual',
    path: ['hora']
}
)



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
    valor: undefined
})

function reiniciarFormularioAgregar() {
    formularioNuevoEvento.titulo = '';
    formularioNuevoEvento.fecha = '';
    formularioNuevoEvento.hora = '';
    formularioNuevoEvento.lugar = '';
    archivoImagen.value = null;
    formularioNuevoEvento.valor = undefined;
    errorFormularioAgregar.value = '';
}

function cerrarFormularioAgregar() {
    mostrarFormularioAgregar.value = false;
    reiniciarFormularioAgregar();
}

// Para la imagen
const archivoImagen = ref<File | null>(null)

// Para agregar

async function guardarEvento() {
    guardandoNuevoEvento.value = true;
    errorFormularioAgregar.value = '';
    try {
        let nombreArchivo = '';
        let archivoBase64 = '';
        if (archivoImagen.value) {
            nombreArchivo = archivoImagen.value.name
            archivoBase64 = await new Promise<string>((resolve) => {
                const reader = new FileReader()
                reader.onload = (event: any) => resolve(event.target.result)
                reader.readAsDataURL(archivoImagen.value!)
            })
        }



        await $fetch('/api/eventos', {
            method: 'POST',
            body: {
                titulo: formularioNuevoEvento.titulo,
                fecha: formularioNuevoEvento.fecha,
                hora: formularioNuevoEvento.hora,
                lugar: formularioNuevoEvento.lugar,
                nombreArchivo: nombreArchivo,
                archivoBase64: archivoBase64,
                valor: formularioNuevoEvento.valor
            }
        });
        cerrarFormularioAgregar();
        await refresh();

        useToast().add({
            duration: 3000,
            title: 'Ha agregado un evento.',
            description: 'El evento se agregó correctamente.',
            ui: {
                root: 'bg-fondo-card border border-fondo-login',
                title: 'text-texto font-bold',
                description: 'text-texto-formulario'
            }
        })

    }
    catch (err: any) {
        errorFormularioAgregar.value = getApiErrorMessage(err, "No se pudo agregar el evento");
    }
    finally {
        guardandoNuevoEvento.value = false;
    }
}

// Para vista de los campos del formulario
const colorTextoFormulario = 'text-texto-formulario';
const colorFondoCamposFormulario = 'bg-fondo-general/90 text-texto-formulario';

// Para borrar evento
const eventoBorrar = ref<Evento | null>(null);
const mostrarConfirmacionBorrar = ref(false);
const borrandoEvento = ref(false);
const errorBorrar = ref('');

async function borrarEvento() {
    borrandoEvento.value = true
    const nombreEventoBorrado = eventoBorrar.value?.titulo;
    try {
        await $fetch(`/api/eventos/${eventoBorrar.value?.id}`, {
            method: 'DELETE'
        })
        cerrarConfirmacionBorrar();
        await refresh();

        useToast().add({
            duration: 3000,
            title: 'Ha eliminado un evento.',
            description: `Se ha eliminado correctamente el evento ${nombreEventoBorrado}.`,
            ui: {
                root: 'bg-fondo-card border border-fondo-login',
                title: 'text-texto font-bold',
                description: 'text-texto-formulario'
            }
        })
    }
    catch (err: any) {
        errorBorrar.value = getApiErrorMessage(err, "No se pudo borrar el evento");
    }
    finally {
        borrandoEvento.value = false;
    }
}
// Para confirmar la eliminacion del evento
function confirmarBorrarEvento(evento: Evento) {
    eventoBorrar.value = evento;
    mostrarConfirmacionBorrar.value = true;
}
// Para cerrar la confirmacion
function cerrarConfirmacionBorrar() {
    mostrarConfirmacionBorrar.value = false;
    eventoBorrar.value = null;
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
            <UButton @click="mostrarFormularioAgregar = true"
                class="bg-boton hover:bg-boton-hover text-texto py-2 px-4 rounded-md font-bold transition-colors">
                Agregar Evento
            </UButton>
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
            <EventoCardsAdmin v-for="evento in eventos" :evento="evento" @borrar-evento="confirmarBorrarEvento" />
        </section>
    </div>


    <Popups v-model:open="mostrarFormularioAgregar" title="Agregar evento">
        <UForm class="space-y-4" :state="formularioNuevoEvento" :schema="validarCrearEvento"
            @submit.prevent="guardarEvento">
            <!-- Titulo -->
            <UFormField label="Titulo" name="titulo" :ui="{ label: colorTextoFormulario }">
                <UInput v-model="formularioNuevoEvento.titulo" class="w-full" placeholder="Ej: Teatro Ballet"
                    :ui="{ base: colorFondoCamposFormulario }" />
            </UFormField>

            <!-- campo fecha -->
            <UFormField label="Fecha" name="fecha" :ui="{ label: colorTextoFormulario }">
                <UInput type="date" v-model="formularioNuevoEvento.fecha" class="w-full"
                    :ui="{ base: colorFondoCamposFormulario }" />
            </UFormField>

            <!-- campo hora -->
            <UFormField label="Hora" name="hora" :ui="{ label: colorTextoFormulario }">
                <UInput type="time" v-model="formularioNuevoEvento.hora" class="w-full"
                    :ui="{ base: colorFondoCamposFormulario }" />
            </UFormField>

            <!-- campo lugar -->
            <UFormField label="Lugar" name="lugar" :ui="{ label: colorTextoFormulario }">
                <UInput v-model="formularioNuevoEvento.lugar" class="w-full" placeholder="Ej: Viña del Mar."
                    :ui="{ base: colorFondoCamposFormulario }" />
            </UFormField>

            <!-- imagen como tal -->
            <UFormField label="Imagen" name="imagen" :ui="{ label: colorTextoFormulario }">
                <UFileUpload v-model="archivoImagen" accept="image/*" label="Agregue su imagen" class="w-full" :ui="{
                    base: 'bg-fondo-general/90 hover:bg-fondo-general/70 transition-colors',
                    label: 'text-texto'
                }" />
            </UFormField>

            <!-- valor -->
            <UFormField label="Valor" name="valor" :ui="{ label: colorTextoFormulario }">
                <UInput v-model="formularioNuevoEvento.valor" class="w-full" placeholder="Ej: 4500"
                    :ui="{ base: colorFondoCamposFormulario }" />
            </UFormField>

            <div class="flex items-center justify-between gap-4 p-2">
                <!-- Boton cancelar -->
                <UButton type="button" @click="cerrarFormularioAgregar"
                    class="bg-boton text-texto py-2 px-4 rounded-md hover:bg-boton-hover font-bold transition-colors">
                    Cancelar
                </UButton>

                <!-- Boton agregar -->
                <UButton type="submit" :loading="guardandoNuevoEvento"
                    class="bg-boton text-texto py-2 px-4 rounded-md hover:bg-boton-hover font-bold transition-colors">
                    Agregar evento
                </UButton>
            </div>
        </UForm>
    </Popups>

    <!-- Confirmar borrar evento -->
    <Popups v-model:open="mostrarConfirmacionBorrar" title="Borrar evento"
        :description="eventoBorrar ? `¿Estas seguro que deseas borrar el evento ${eventoBorrar.titulo}? Esta decisión es permanente` : ''">
        <!-- div con los 2 botones para cancelar o confirmar -->
        <div class="flex justify-between items-center gap-6">
            <!-- cancelar -->
            <UButton @click="cerrarConfirmacionBorrar"
                class="w-full bg-boton text-texto text-center justify-center py-2 px-4 rounded-md hover:bg-boton-hover font-bold transition-colors"
                type="button">Cancelar</UButton>
            <!-- confirmar -->
            <UButton @click="borrarEvento"
                class="w-full bg-boton-eliminar text-white text-center justify-center py-2 px-4 rounded-md hover:bg-boton-eliminar-hover font-bold transition-colors"
                type="button" :loading="borrandoEvento">Confirmar</UButton>
        </div>
    </Popups>

</template>