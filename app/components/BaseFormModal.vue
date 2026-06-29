<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })

defineProps<{
    title: string
    description?: string
}>()
</script>

<template>
    <UModal v-model:open="open" :title="title" :description="description" :ui="{
        content: 'bg-fondo-card',
        header: 'bg-fondo-card',
        title: 'text-texto',
        description: 'text-texto-formulario',
        body: 'bg-fondo-card',
        footer: 'bg-fondo-card'
    }">
        <template #body>
            <slot />
        </template>
    </UModal>
</template>