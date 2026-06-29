<script setup lang="ts">
import type { Usuario } from '../types/usuario'
import { z } from 'zod';

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

</script>


<template>
    <!-- Texto y boton de agregar -->
    <div class="flex items-center justify-between">
        <!-- Texto -->
        <div class="space-y-2">
            <h2 class="text-3xl font-bold text-texto">Cuentas en el sistema</h2>
            <p class="text-texto/70">Administrar los administradores del sistema</p>
        </div>
        <!-- Boton de agregar -->
        <UButton @click="mostrarFormularioAgregar = true"
            class="bg-boton hover:bg-boton-hover text-texto py-2 px-4 rounded-md font-bold transition-colors">
            Agregar
            administrador</UButton>
    </div>
    <!-- Tarjetas con las cuentas -->
    <section class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
        <CardAdmin v-for="usuario in usuarios" :key="usuario.email" :usuario="usuario"
            @borrar-usuario="confirmarBorrarUsuario" />
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
                    placeholder="Ej: ********" :ui="{ base: colorFondoCamposFormulario }" />
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

</template>