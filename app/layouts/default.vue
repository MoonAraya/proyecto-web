<template>
    <!-- NAV BAR -->
    <div class="w-full z-50 bg-[#F5EFEF] px-6 py-4 shadow-xl">
        <!-- para que solo use el contenido dentro de esto -->
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
            <!-- parte con logo o lo que sea asi -->
            <div>
                <h3 class="text-[#4F3D35] font-bold text-lg">Smart Events</h3>
            </div>
            <div class="flex flex-col gap-5 sm:flex-row items-center">
                <!-- botones para ir a lugares -->
                <nav class="flex items-center gap-5">
                    <a href="#"
                        class="text-[#4F3D35] text-md font-semibold hover:bg-[#F6D579] py-1 px-2 rounded-xl">Eventos</a>
                    <a href="#" class="text-[#4F3D35]/70 text-md hover:bg-[#F6D579] py-1 px-2 rounded-xl">Staff</a>
                    <a href="#"
                        class="text-[#4F3D35]/70 text-md hover:bg-[#F6D579] py-1 px-2 rounded-xl">Inscripciones</a>
                </nav>
                <!-- Donde sale el nombre de usuario y boton cerrar sesión -->
                <div class="gap-5 flex items-center">
                    <!-- Nombre y si es admin o usuario -->
                    <div class="flex flex-col rounded-md border-2 border-[#F6D579] px-4 py-2">
                        <span class="text-[#4F3D35] text-md">Benjamin Marchant</span>
                        <span class="text-[#4F3D35]/70 text-sm">Administrador</span>
                    </div>

                    <button
                        class="bg-[#F6D579] text-[#4F3D35] py-2 px-4 rounded-xl hover:bg-[#ECB914] text-md font-bold transition-colors">Cerrar
                        Sesion</button>
                </div>
            </div>
        </div>
    </div>
    <main>
        <slot />
    </main>
</template>