<script setup lang="ts">
import type { Usuario } from '~/types/usuario'

const props = defineProps<{
    usuario: Usuario
}>()

const emit = defineEmits<{
    'borrar-usuario': [usuario: Usuario]
}>()
</script>


<template>
    <UCard class="bg-fondo-card ring-boton-hover ring-2 px-4 shadow-xl">
        <!-- texto pagina -->
        <div class="flex flex-col gap-4">
            <!-- nombre y apellido -->
            <p class="text-texto text-lg font-semibold">{{ props.usuario.nombre }} {{ props.usuario.apellido }}</p>

            <!-- rol -->
            <p class="text-texto">Rol Asignado: {{ props.usuario.rol }}</p>

            <!-- correo -->
            <p class="text-texto">{{ props.usuario.email }}</p>

            <!-- boton borrar -->
            <div class="flex items-center justify-end">
                <UButton @click="emit('borrar-usuario', props.usuario)"
                    class="bg-boton text-texto py-2 px-4 rounded-md hover:bg-boton-hover font-bold transition-colors">
                    Borrar Usuario
                </UButton>
            </div>
        </div>
    </UCard>
</template>