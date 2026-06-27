<script setup lang="ts">
const route = useRoute();
const isActive = (to: String) => route.path === to;

const navegacion = [
    { label: 'Inicio', to: '/' },
    { label: 'Inscripciones', to: '/inscripciones' },
    { label: 'Consultar Inscripción', to: '/consultarinscripcion' },
    { label: 'Staff', to: '/login' },
    { label: 'Agregar Evento', to: '/agregarevento' },
    { label: 'Cuentas', to: '/cuentas' },
    { label: 'Consultar evento', to: '/consultarevento' },
]

</script>


<template>
    <!-- NAV BAR -->
    <div class="w-full z-50 bg-fondo-general px-6 py-4 shadow-xl">
        <!-- para que solo use el contenido dentro de esto -->
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-2 sm:justify-between">
            <!-- parte con texto y para poner logo en caso de que haga falta -->
            <div>
                <h3 class="text-texto font-bold text-lg">Smart Events</h3>
            </div>
            <div class="flex flex-col gap-5 sm:flex-row items-center">
                <!-- botones para ir a lugares -->
                <nav class="flex items-center gap-5">
                    <NuxtLink v-for="link in navegacion" :key="link.to" :to="link.to"
                        :class="isActive(link.to) ? 'bg-boton text-texto font-bold' : 'text-texto/70 hover:bg-boton font-semibold'"
                        class="text-sm py-1 px-2 rounded-xl">
                        {{ link.label }}
                    </NuxtLink>
                </nav>
                <!-- Donde sale el nombre de usuario y boton cerrar sesión -->
                <div class="gap-5 flex items-center">
                    <!-- Nombre y si es admin o usuario -->
                    <div class="flex flex-col rounded-md border-2 border-boton px-4 py-2">
                        <span class="text-texto text-md">Benjamin Marchant</span>
                        <span class="text-texto/70 text-sm">Administrador</span>
                    </div>

                    <button
                        class="bg-boton text-texto py-2 px-4 rounded-xl hover:bg-boton-hover text-md font-bold transition-colors">Cerrar
                        Sesion</button>
                </div>
            </div>
        </div>
    </div>
    <main>
        <slot />
    </main>
</template>