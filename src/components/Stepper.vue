<template>
    <div class="flex justify-between items-center">
        <div class="w-full flex items-center" v-html="testa"></div>
    </div>
</template>

<script setup lang="ts">import { ref } from 'vue';

const testa = `
    <div class="relative flex flex-col items-center">
            <div class="flex items-center justify-center rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12">
                <!-- Zobrazenie cisel -->
                1
            </div>
            <div class="absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase">
                <!-- Zobrazenie popisu -->
                Popis
            </div>
        </div>
        <div class="flex-auto border-t transition duration-500 ease-in-out">
            <!-- Zobrazenie ciari -->
        </div> 
`;

</script>