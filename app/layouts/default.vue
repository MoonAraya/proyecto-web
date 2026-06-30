<script setup lang="ts">

//Para ver en que pagina se esta y las disponibles
const route = useRoute();
const isActive = (to: String) => route.path === to;
const { user, clear } = useUserSession();


const navegacion = [
    { label: 'Inicio', to: '/' },
    { label: 'Inscripciones', to: '/inscripciones' },
    { label: 'Consultar Inscripción', to: '/consultarinscripcion' },
    ...(user.value?.rol === 'Administrador' ? [
        { label: 'Cuentas', to: '/gestor-cuentas' },
        { label: 'Gestor de Eventos', to: '/gestor-eventos' }] : [{ label: 'Gestor de Staff', to: '/login' }]),
]

// Para logout
async function logout() {
    await $fetch('/api/auth/logout', {
        method: 'POST'
    });
    await clear();
    await navigateTo('/login');
}



</script>


<template>
    <!-- NAV BAR -->
    <div class="w-full z-50 bg-fondo-general sticky top-0 px-6 py-6 shadow-xl">
        <!-- para que solo use el contenido dentro de esto -->
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-2 sm:justify-between">
            <!-- parte con texto y para poner logo en caso de que haga falta -->
            <div>
                <h3 class="text-texto font-bold text-lg">Smart Events</h3>
            </div>
            <div class="flex flex-col gap-5 sm:flex-row items-center">
                <!-- botones para ir a lugares -->
                <nav class="flex flex-wrap items-center justify-center gap-5">
                    <NuxtLink v-for="link in navegacion" :key="link.to" :to="link.to"
                        :class="isActive(link.to) ? 'bg-boton text-texto font-bold' : 'text-texto/70 hover:bg-boton font-semibold'"
                        class="text-sm py-1 px-2 rounded-xl">
                        {{ link.label }}
                    </NuxtLink>
                </nav>
                <!-- Donde sale el nombre de usuario y boton cerrar sesión -->
                <div class="gap-5 flex items-center">
                    <!-- Nombre y rol -->
                    <div v-if="user?.rol === 'Administrador'"
                        class="flex flex-col rounded-md border-2 border-boton px-4 py-2">
                        <span class="text-texto text-md">{{ user?.nombre }} {{ user?.apellido }}</span>
                        <span class="text-texto/70 text-sm">{{ user?.rol }}</span>
                    </div>

                    <UButton @click="logout" v-if="user?.rol === 'Administrador'"
                        class="bg-boton text-texto py-2 px-4 rounded-xl hover:bg-boton-hover text-md font-bold transition-colors">
                        Cerrar Sesion
                    </UButton>
                </div>
            </div>
        </div>
    </div>
    <main class="bg-fondo-general/95 min-h-screen">
        <div class="class= max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <slot />
        </div>
    </main>
    <footer class="bg-fondo-general py-6 mt-auto bottom-0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p class="text-center text-sm text-texto/70">&copy; 2026 Smart Events. Todos los derechos reservados.
            </p>
        </div>
    </footer>
</template>