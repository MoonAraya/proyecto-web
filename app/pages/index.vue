<script setup lang="ts">

import type { Evento } from '~/types/evento';

const { data: futurosEventos, pending, error } = await useFetch<Evento[]>('/api/eventos/futuros');

</script>

<template>
    <div class="space-y-8">
        <!-- // actua como hero -->
        <section class="mx-auto max-w-2xl sm:text-center">
            <div class="space-y-5">
                <h1 class="text-4xl font-bold tracking-tight text-texto sm:text-6xl">Bienvenido a Smart Events</h1>
                <p class="text-lg leading-8 text-texto/70">Para nosotros, tú eres el centro de cada experiencia. Explora
                    nuestro catálogo y acompáñanos en los eventos más entretenidos.</p>
            </div>
            <div class="flex justify-center items-center gap-x-6 pt-4">
                <NuxtLink to="/inscripciones"
                    class="rounded-md bg-boton px-3.5 py-2.5 text-sm font-semibold text-texto shadow-sm hover:bg-boton-hover focus-visible:outline-offset-2 focus-visible:outline-boton">
                    Inscribirse a un evento
                </NuxtLink>
            </div>
        </section>

        <!-- //TODOS LOS eventos -->

        <section class="py-16 px-6">
            <div class="max-w-7xl mx-auto">
                <!-- // div titulo eventos -->
                <div class="flex items-end justify-between mb-8">
                    <div class="space-y-5">
                        <h2 class="text-3xl font-bold tracking-tight text-texto sm:text-4xl">Próximos eventos</h2>
                    </div>
                </div>
                <!-- // loop eventos -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <EventoCards v-for="evento in futurosEventos" :evento="evento" />
                </div>
            </div>
        </section>
    </div>


</template>