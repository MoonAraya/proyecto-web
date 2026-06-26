<template>
    <div class="flex min-h-screen items-center justify-center bg-[#F5EFEF]/95">
        <!-- div donde salen todas las cosas del login -->
        <div
            class="w-full max-w-md rounded-lg bg-[#CBB8A0] flex flex-col items-center p-4 sm:p-6 lg:p-8 border-2 border-[#F6D579] shadow-2xl">
            <h2 class="font-bold text-3xl py-4 text-[#4F3D35]">Iniciar Sesion</h2>
            <p class="mb-4 text-[#4F3D35]/70">Ingrese su correo y contraseña</p>
            <form class="space-y-5">
                <!-- Ingreso de correo -->
                <div>
                    <label class="text-[#4F3D35]">Correo Electronico</label>
                    <input placeholder="correo@gmail.com"
                        class="w-full border border-[#F6D579] rounded-md py-2 px-4 bg-white" />
                </div>
                <!-- Ingreso de contraseña -->
                <div>
                    <label class="text-[#4F3D35]">Contraseña</label>
                    <input placeholder="********"
                        class="w-full border border-[#F6D579] rounded-md py-2 px-4 bg-white" />
                </div>
                <!-- Boton de iniciar sesion -->
                <button type="submit"
                    class="w-full bg-[#F6D579] text-[#4F3D35] py-2 px-4 rounded-md hover:bg-[#ECB914] font-bold transition-colors">Iniciar
                    Sesion</button>
            </form>
        </div>
    </div>

</template>