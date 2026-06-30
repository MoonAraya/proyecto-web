<script setup lang="ts">
import type { Evento } from '~/types/evento';
import { formatFechaCorta, formatHora } from '~/utils/formatters';

const props = defineProps<{
    evento: Evento
}>()

const emit = defineEmits<{
    'borrar-evento': [evento: Evento]
}>()

const fechaFormateada = computed(() => formatFechaCorta(props.evento.fecha))
const horaFormateada = computed(() => formatHora(props.evento.fecha))

</script>
<template>
    <div
        class="bg-fondo-card border border-fondo-login rounded-2xl overflow-hidden hover:border-fondo-formulario transition-colors group">

        <!-- Imagen -->
        <div class="w-full h-48 overflow-hidden">
            <img :src="evento.imagen" :alt="evento.titulo"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>

        <!-- Contenido card -->
        <div class="p-12">
            <h3 class="text-texto font-bold text-lg mb-4 group-hover:text-fondo-formulario transition-colors">
                {{ evento.titulo }}
            </h3>

            <div class="flex flex-col gap-2 text-sm">
                <div class="flex items-center justify-between">
                    <span class="font-medium text-texto-formulario">Fecha</span>
                    <span class="text-texto">{{ fechaFormateada }}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="font-medium text-texto-formulario">Hora</span>
                    <span class="text-texto">{{ horaFormateada }}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="font-medium text-texto-formulario">Lugar</span>
                    <span class="text-texto">{{ evento.lugar }}</span>
                </div>
                <div class="flex items-center justify-between border-t border-fondo-login pt-2 mt-1">
                    <span class="font-medium text-texto-formulario text-sm">Valor</span>
                    <span class="text-fondo-formulario font-semibold">
                        {{ evento.valor }}
                    </span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="font-medium text-texto-formulario text-sm">Inscritos</span>
                    <span class="text-texto font-semibold">{{ evento._count.inscritos }} personas</span>
                </div>
            </div>

            <!-- boton para borrar la card -->
            <div class="mt-4 pt-3 border-t border-fondo-login">
                <UButton @click="emit('borrar-evento', props.evento)"
                    class="w-full bg-boton hover:bg-boton-hover text-texto font-semibold text-sm py-2 px-4 rounded-xl transition-colors cursor-pointer flex justify-center">
                    Eliminar evento
                </UButton>
            </div>
        </div>
    </div>
</template>