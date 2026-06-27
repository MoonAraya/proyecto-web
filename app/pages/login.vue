<template>
    <div class="flex min-h-screen items-center justify-center bg-fondo-general/95">
        <!-- div donde salen todas las cosas del login -->
        <div
            class="w-full max-w-md rounded-lg bg-fondo-login flex flex-col items-center p-4 sm:p-6 lg:p-8 border-2 border-boton shadow-2xl">
            <h2 class="font-bold text-3xl py-4 text-texto">Iniciar Sesion</h2>
            <p class="mb-4 text-texto/70">Ingrese su correo y contraseña</p>
            <form class="space-y-5">
                <!-- Ingreso de correo -->
                <div>
                    <label class="text-texto">Correo Electronico</label>
                    <input placeholder="correo@gmail.com"
                        class="w-full border border-boton rounded-md py-2 px-4 bg-white text-texto/70" />
                </div>
                <!-- Ingreso de contraseña -->
                <div>
                    <label class="text-texto">Contraseña</label>
                    <input placeholder="********"
                        class="w-full border border-boton rounded-md py-2 px-4 bg-white text-texto/70" />
                </div>
                <!-- Boton de iniciar sesion -->
                <button type="submit"
                    class="w-full bg-boton text-texto py-2 px-4 rounded-md hover:bg-boton-hover font-bold transition-colors">Iniciar
                    Sesion</button>
            </form>
        </div>
    </div>

</template>