<script setup lang="ts">
// Para solo darle acceso al administrador a esta pagina
definePageMeta({
    middleware: ['admin']
})

</script>
<!-- IDEA: BOTON MODAL PARA CADA EVENTO QUE ABRA UN COMBO BOX CON LA LISTA DE INSCRITOS PARA ELIMINARLO -->
<template>
    <div class="mx-auto max-w-7xl space-y-8">
        <!-- titulo + boton para agregar EVENTOS nuevos -->
        <section class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
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
            <button class="bg-texto hover:bg-brand-hover texto-texto/70 font-bold py-2 px-4 rounded">
                Agregar Evento
            </button>
        </section>
        <!-- LA IDEA ES QUE CADA EVENTO TENGA SUS PROPIOS BOTONES DE MANTENEDOR? -->
        <!-- proximos eventos -->
        <div class="mx-auto max-w-2xl sm:text-center">
            <div class="space-y-5">
                <h2 class="text-3xl font-bold tracking-tight text-texto sm:text-4xl">Próximos eventos</h2>
            </div>
        </div>
        <section class="mx-auto justify-around grid gap-6 md:grid-cols-3"">
            <!-- loop de cards con divs no article  PLACEHOLDERS-->
            <article class=" rounded-xl border border-course-line bg-course-surface p-6 shadow-md">
            <h3 class="text-lg font-semibold text-texto">PLACEHOLDER</h3>
            <p class="mt-2 text-sm leading-6 text-texto/70">
                TEXTO PLACEHOLDER
            </p>
            </article>

            <article class="rounded-xl border border-course-line bg-course-surface p-6 shadow-md">
                <h3 class="text-lg font-semibold text-texto">PLACEHOLDER</h3>
                <p class="mt-2 text-sm leading-6 text-texto/70">
                    TEXTO PLACEHOLDER
                </p>
            </article>

            <article class="rounded-xl border border-course-line bg-course-surface p-6 shadow-md">
                <h3 class="text-lg font-semibold text-texto">PLACEHOLDER</h3>
                <p class="mt-2 text-sm leading-6 text-texto/70">
                    TEXTO PLACEHOLDER
                </p>
            </article>
            <article class="rounded-xl border border-course-line bg-course-surface p-6 shadow-md">
                <h3 class="text-lg font-semibold text-texto">PLACEHOLDER</h3>
                <p class="mt-2 text-sm leading-6 text-texto/70">
                    TEXTO PLACEHOLDER
                </p>
            </article>

            <article class="rounded-xl border border-course-line bg-course-surface p-6 shadow-md">
                <h3 class="text-lg font-semibold text-texto">PLACEHOLDER</h3>
                <p class="mt-2 text-sm leading-6 text-texto/70">
                    TEXTO PLACEHOLDER
                </p>
            </article>

            <article class="rounded-xl border border-course-line bg-course-surface p-6 shadow-md">
                <h3 class="text-lg font-semibold text-texto">PLACEHOLDER</h3>
                <p class="mt-2 text-sm leading-6 text-texto/70">
                    TEXTO PLACEHOLDER
                </p>
            </article>
        </section>
        <!-- Próximos eventos -->
        <!-- <section class="py-16 px-6">
            <div class="max-w-7xl mx-auto">
                <div class="flex items-end justify-between mb-8">
                    <div>
                        <h2 class="text-3xl font-bold text-brand-text">Próximos eventos</h2>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <EventoCard v-for="evento in eventosProximos" :evento="evento" /> //en el script de esta pagina
                </div>
            </div>
        </section> -->
    </div>
</template>