<template>
    <div>
        <div class="bg-bizinix-teal p-2 font-semibold rounded-t">
            {{ title }}
        </div>
        <div class="p-4 border-r border-b rounded-b border-l border-bizinix-border">
            <slot></slot>
        </div>    
    </div>
</template>

<script setup lang="ts">

defineProps<{
  title: string
}>()
</script>