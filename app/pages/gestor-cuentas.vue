<script setup lang="ts">
import type { Usuario } from '../types/usuario'
import { z } from 'zod';
import type { TableColumn } from '@nuxt/ui'

// Para solo darle acceso al administrador a esta pagina
definePageMeta({
    middleware: ['admin']
})

const validarCrearAdmin = z.object({
    email: z.email({ message: 'Debe ingresar un email válido.' }),
    password: z.string().min(8, 'La contraseña debe tener como minimo 8 caracteres'),
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.').max(20, 'El nombre debe tener a lo mas 20 caracteres'),
    apellido: z.string().min(2, 'El apellido debe tener al menos 2 caracteres.').max(20, 'El apellido debe tener a lo mas 20 caracteres')
})

// para tomar la informacion de los usuarios en la tabla usuario
const { data: usuarios, pending, error, refresh } = await useFetch<Usuario[]>('/api/usuarios')

// Agregar usuario
const roles = ['Administrador']
const mostrarFormularioAgregar = ref(false);
const errorFormularioAgregar = ref('');
const guardandoNuevoUsuario = ref(false);

const formularioNuevoUsuario = reactive({
    nombre: '',
    apellido: '',
    password: '',
    rol: roles[0],
    email: ''
})

function reiniciarFormularioAgregar() {
    formularioNuevoUsuario.nombre = '';
    formularioNuevoUsuario.apellido = '';
    formularioNuevoUsuario.password = '';
    formularioNuevoUsuario.rol = roles[0];
    formularioNuevoUsuario.email = '';
    errorFormularioAgregar.value = '';
}

function cerrarFormularioAgregar() {
    mostrarFormularioAgregar.value = false;
    reiniciarFormularioAgregar();
}

async function guardarUsuario() {
    guardandoNuevoUsuario.value = true;
    errorFormularioAgregar.value = '';

    try {
        await $fetch('/api/usuarios', {
            method: 'POST',
            body: {
                email: formularioNuevoUsuario.email,
                password: formularioNuevoUsuario.password,
                nombre: formularioNuevoUsuario.nombre,
                apellido: formularioNuevoUsuario.apellido,
                rol: formularioNuevoUsuario.rol
            }
        });
        cerrarFormularioAgregar();
        await refresh();
    }
    catch (err: any) {
        errorFormularioAgregar.value = getApiErrorMessage(err, "No se pudo agregar el nuevo usuario");
    }
    finally {
        guardandoNuevoUsuario.value = false;
    }
}


// Para vista de los campos del formulario
const colorTextoFormulario = 'text-texto-formulario';
const colorFondoCamposFormulario = 'bg-fondo-general/90 text-texto-formulario';

// Para todo lo que es borrar un admin
const usuarioBorrar = ref<Usuario | null>(null);
const mostrarConfirmacionBorrar = ref(false);
const borrandoUsuario = ref(false);

async function borrarUsuario() {
    borrandoUsuario.value = true
    try {
        await $fetch(`/api/usuarios/${usuarioBorrar.value?.email}`, {
            method: 'DELETE'
        })
        cerrarConfirmacionBorrar();
        await refresh();
    }
    catch (err: any) {

    }
    finally {
        borrandoUsuario.value = false;
    }
}
// Para confirmar la eliminacion del usuario
function confirmarBorrarUsuario(usuario: Usuario) {
    usuarioBorrar.value = usuario;
    mostrarConfirmacionBorrar.value = true;
}
// Para cerrar la confirmacion
function cerrarConfirmacionBorrar() {
    mostrarConfirmacionBorrar.value = false;
    usuarioBorrar.value = null;
}

const columns: TableColumn<Usuario>[] = [
    { accessorKey: 'nombre', header: 'Nombre', meta: { class: { th: 'text-center', td: 'text-center' } } },
    { accessorKey: 'apellido', header: 'Apellido', meta: { class: { th: 'text-center', td: 'text-center' } } },
    { accessorKey: 'email', header: 'Email', meta: { class: { th: 'text-center', td: 'text-center' } } },
    { accessorKey: 'rol', header: 'Rol', meta: { class: { th: 'text-center', td: 'text-center' } } },

    // columnas extras
    { id: 'eliminar', header: 'Eliminar', meta: { class: { th: 'text-center', td: 'text-center' } } },
]

const tableMeta = createTableMeta<Usuario>()
</script>

<template>
    <div class="space-y-8">
        <!-- titulo + boton para agregar usuarios nuevos -->
        <section class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <!-- TEXTOS A LA IZQUIERDA -->
            <div>
                <h1 class="text-3xl font-extrabold tracking-tight text-texto sm:text-4xl">
                    STAFF
                </h1>
                <p class="mt-3 max-w-2xl text-base leading-7 text-texto/70">
                    Vista para gestionar cuentas del staff.
                </p>
            </div>

            <!-- BOTON -->
            <UButton @click="mostrarFormularioAgregar = true"
                class="bg-boton hover:bg-boton-hover text-texto py-2 px-4 rounded-md font-bold transition-colors">
                Agregar
                administrador</UButton>
        </section>

        <!-- tabla de usuarios/mantenedor con sus botones en una columna -->
        <section>
            <UTable :data="usuarios" :columns="columns" :meta="tableMeta"
                class="rounded-2xl border border-brand-border bg-boton/45" :ui="{
                    th: 'text-texto font-bold',
                    td: 'text-texto'
                }">

                <!-- columna extra -->
                <template #eliminar-cell="{ row }">
                    <UButton icon="i-lucide-trash-2" size="md" color="neutral" variant="solid"
                        class="bg-boton-eliminar hover:bg-boton-eliminar-hover focus:outline-none focus:ring-0 text-white"
                        @click="confirmarBorrarUsuario(row.original)" />
                </template>
            </UTable>
        </section>

        <!-- Formulario para agregar usuario -->
        <Popups v-model:open="mostrarFormularioAgregar" title="Agregar administrador">
            <UForm class="space-y-4" :state="formularioNuevoUsuario" :schema="validarCrearAdmin"
                @submit.prevent="guardarUsuario">
                <!-- campo nombre -->
                <UFormField label="Nombre" name="nombre" :ui="{ label: colorTextoFormulario }">
                    <UInput v-model="formularioNuevoUsuario.nombre" class="w-full" placeholder="Ej: Juanito"
                        :ui="{ base: colorFondoCamposFormulario }" />
                </UFormField>

                <!-- campo apellido -->
                <UFormField label="Apellido" name="apellido" :ui="{ label: colorTextoFormulario }">
                    <UInput v-model="formularioNuevoUsuario.apellido" class="w-full" placeholder="Ej: Perez"
                        :ui="{ base: colorFondoCamposFormulario }" />
                </UFormField>

                <!-- campo email -->
                <UFormField label="Email" name="email" :ui="{ label: colorTextoFormulario }">
                    <UInput v-model="formularioNuevoUsuario.email" class="w-full" placeholder="Ej: jperez@usm.cl"
                        :ui="{ base: colorFondoCamposFormulario }" />
                </UFormField>

                <!-- campo contraseña -->
                <UFormField label="Contraseña" name="password" :ui="{ label: colorTextoFormulario }">
                    <UInput v-model="formularioNuevoUsuario.password" class="w-full" type="password"
                        placeholder="Ej: Al menos 8 caracteres." :ui="{ base: colorFondoCamposFormulario }" />
                </UFormField>

                <div class="flex items-center justify-between gap-4 p-2">
                    <!-- Boton cancelar -->
                    <UButton type="button" @click="cerrarFormularioAgregar"
                        class="bg-boton text-texto py-2 px-4 rounded-md hover:bg-boton-hover font-bold transition-colors">
                        Cancelar
                    </UButton>

                    <!-- Boton agregar -->
                    <UButton type="submit" :loading="guardandoNuevoUsuario"
                        class="bg-boton text-texto py-2 px-4 rounded-md hover:bg-boton-hover font-bold transition-colors">
                        Agregar administrador
                    </UButton>
                </div>
            </UForm>
        </Popups>


        <!-- modal para eliminar usuario -->
        <!-- Confirmar borrar cuenta -->
        <Popups v-model:open="mostrarConfirmacionBorrar" title="Borrar administrador"
            :description="usuarioBorrar ? `¿Estas seguro que deseas borrar a ${usuarioBorrar.nombre} ${usuarioBorrar.apellido}? Esta decisión es permanente` : ''">
            <!-- div con los 2 botones para cancelar o confirmar -->
            <div class="flex justify-between items-center gap-6">
                <!-- cancelar -->
                <UButton @click="cerrarConfirmacionBorrar"
                    class="w-full bg-boton text-texto text-center justify-center py-2 px-4 rounded-md hover:bg-boton-hover font-bold transition-colors"
                    type="button">Cancelar</UButton>
                <!-- confirmar -->
                <UButton @click="borrarUsuario"
                    class="w-full bg-boton-eliminar text-white text-center justify-center py-2 px-4 rounded-md hover:bg-boton-eliminar-hover font-bold transition-colors"
                    type="button" :loading="borrandoUsuario">Confirmar</UButton>
            </div>
        </Popups>
    </div>
</template>