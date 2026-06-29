<script setup lang="ts">
import type { Evento } from '~/types/evento';
const { data: futurosEventos, pending, error } = await useFetch<Evento[]>('/api/eventos/futuros');
</script>

<template>
    <div class="bg-fondo-general/95">
        <div class="flex-1 max-w-7xl mx-auto w-full px-6 py-10 flex flex-col lg:flex-row gap-8">
            <!-- formulario de inscripción -->
            <aside class="w-full lg:w-80 shrink-0">
                <div class="rounded-2xl p-6 sticky top-24">
                    <h2 class="text-2xl font-bold text-texto mb-4">Inscribirse a un evento</h2>
                    <p class="text-texto/70 mb-4">Ingrese sus datos.</p>

                    <!-- FORMS -->


                </div>
            </aside>
            <main>
                <div class="mb-6">
                    <h1 class="text-3xl font-bold text-texto mb-4">Eventos</h1>
                    <p class="text-texto/70 mt-1">Eventos a los que puedes inscribirte.</p>
                </div>
                <!-- // loop eventos -->
                <div class="max-w-7xl mx-auto">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <EventoCards v-for="evento in futurosEventos" :evento="evento" />
                    </div>
                </div>
            </main>
        </div>
    </div>

</template>