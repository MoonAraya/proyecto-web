<scrip setup lang="es">
  //  import type { Evento } from '~/types/Evento';

  //  const { data: eventosProximos, pending, error } = await useFetch < Evento[] > ('/api/eventos/proximos')
</scrip>
<template>
    <div class="mx-auto max-w-7xl space-y-8">
        <!-- actua como hero -->
        <section class="mx-auto max-w-2xl sm:text-center">
            <div class="space-y-5">
                <h1 class="text-4xl font-bold tracking-tight text-texto sm:text-6xl">Bienvenido a Smart Events</h1>
                <p class="text-lg leading-8 text-texto/70">lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div class="flex justify-center items-center gap-x-6">
                <NuxtLink to="/inscripciones"
                    class="rounded-md bg-boton px-3.5 py-2.5 text-sm font-semibold text-texto shadow-sm hover:bg-boton-hover focus-visible:outline-offset-2 focus-visible:outline-boton">
                    Inscribirse
                </NuxtLink>
                <NuxtLink to="/#" class="text-sm font-semibold leading-6 text-texto/70 hover:text-texto">Ver lista de
                    eventos
                </NuxtLink>
            </div>
        </section>

        <!-- proximos eventos -->
        <div class="mx-auto max-w-2xl sm:text-center">
            <div class="space-y-5">
                <h2 class="text-3xl font-bold tracking-tight text-texto sm:text-4xl">Próximos eventos</h2>
            </div>
        </div>
        <section class="mx-auto justify-around grid gap-6 md:grid-cols-3"">
            <!-- loop de cards con divs no article -->
            <article class=" rounded-xl border border-course-line bg-course-surface p-6 shadow-md">
            <h3 class="text-lg font-semibold text-course-text">PLACEHOLDER</h3>
            <p class="mt-2 text-sm leading-6 text-course-text-muted">
                Vista inicial con una síntesis breve del sistema y accesos a las demás páginas.
            </p>
            </article>

            <article class="rounded-xl border border-course-line bg-course-surface p-6 shadow-md">
                <h3 class="text-lg font-semibold text-course-text">PLACEHOLDER</h3>
                <p class="mt-2 text-sm leading-6 text-course-text-muted">
                    Página con la tabla de cursos cargada desde la API y acciones para refrescar los datos.
                </p>
            </article>

            <article class="rounded-xl border border-course-line bg-course-surface p-6 shadow-md">
                <h3 class="text-lg font-semibold text-course-text">PLACEHOLDER</h3>
                <p class="mt-2 text-sm leading-6 text-course-text-muted">
                    Sección estática preparada para añadir más adelante directorio, fichas o filtros de
                    estudiantes.
                </p>
            </article>
            <article class="rounded-xl border border-course-line bg-course-surface p-6 shadow-md">
                <h3 class="text-lg font-semibold text-course-text">PLACEHOLDER</h3>
                <p class="mt-2 text-sm leading-6 text-course-text-muted">
                    Vista inicial con una síntesis breve del sistema y accesos a las demás páginas.
                </p>
            </article>

            <article class="rounded-xl border border-course-line bg-course-surface p-6 shadow-md">
                <h3 class="text-lg font-semibold text-course-text">PLACEHOLDER</h3>
                <p class="mt-2 text-sm leading-6 text-course-text-muted">
                    Página con la tabla de cursos cargada desde la API y acciones para refrescar los datos.
                </p>
            </article>

            <article class="rounded-xl border border-course-line bg-course-surface p-6 shadow-md">
                <h3 class="text-lg font-semibold text-course-text">PLACEHOLDER</h3>
                <p class="mt-2 text-sm leading-6 text-course-text-muted">
                    Sección estática preparada para añadir más adelante directorio, fichas o filtros de
                    estudiantes.
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