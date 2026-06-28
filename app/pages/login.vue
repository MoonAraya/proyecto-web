<script setup lang="ts">
import { z } from 'zod'
definePageMeta({
    layout: false
})

const validarLogin = z.object({
    email: z.email({ message: 'Debe ingresar un email válido.' }),
})

const iniciandoSesion = ref(false);
const errorFormulario = ref('');

const formularioLogin = reactive({
    email: '',
    password: ''
});

async function login() {
    iniciandoSesion.value = true;
    errorFormulario.value = '';
    try {
        //revisar credenciales usuario
        await $fetch('/api/auth/login', {
            method: 'POST',
            body: {
                email: formularioLogin.email,
                password: formularioLogin.password
            }
        })
        await fetchSession();
        //redireccionar a la pagina de cuentas
        navigateTo('/cuentas');
    } catch (err: any) {
        errorFormulario.value = getApiErrorMessage(err, "No se pudo iniciar sesión");
    }
    finally {
        iniciandoSesion.value = false;
    }
}

const { fetch: fetchSession } = useUserSession()


const colorTextoFormulario = 'text-texto';
const colorFondoCamposFormulario = 'bg-fondo-general/90 text-texto/70 ring-2 ring-boton';

</script>

<template>
    <div class="flex min-h-screen items-center justify-center bg-fondo-general/95">
        <!-- para ajustar lados en diferentes tamaños de pantalla -->
        <div class="px-4 sm:px-6 lg:px-8 w-full max-w-md mx-auto">
            <!-- div donde salen todas las cosas del login -->
            <div
                class="rounded-lg bg-fondo-login flex flex-col items-center p-4 sm:p-6 lg:p-8 border-2 border-boton shadow-2xl">
                <h2 class="font-bold text-3xl py-4 text-texto">Iniciar Sesión</h2>
                <p class="mb-4 text-texto/70">Ingrese su correo y contraseña</p>
                <UForm class="space-y-5" :state="formularioLogin" :schema="validarLogin" @submit="login">
                    <!-- Ingreso de correo -->
                    <UFormField label="Correo Electrónico" name="email" :ui="{ label: colorTextoFormulario }">
                        <UInput v-model="formularioLogin.email" class="w-full" placeholder="Ej: correo@gmail.com"
                            :ui="{ base: colorFondoCamposFormulario }" />
                    </UFormField>

                    <!-- Ingreso de contraseña -->
                    <UFormField label="Contraseña" name="password" :ui="{ label: colorTextoFormulario }">
                        <UInput v-model="formularioLogin.password" class="w-full" placeholder="Ej: ********"
                            :ui="{ base: colorFondoCamposFormulario }" />
                    </UFormField>

                    <!-- Boton de iniciar sesion -->
                    <UButton type="submit" :loading="iniciandoSesion"
                        class="w-full bg-boton text-texto text-center justify-center py-2 px-4 rounded-md hover:bg-boton-hover font-bold transition-colors">
                        Iniciar
                        Sesion</UButton>
                </UForm>
            </div>

        </div>

    </div>

</template>