<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4" v-if="companies.length > 0">
        <div class="" v-for="company in companies">        
            <div class="overflow-hidden bg-white shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">{{ company.name }}</h3>
                    <p v-if="company.ico" class="mt-1 max-w-2xl text-sm text-gray-500">IČO: {{ company.ico }}</p>
                    <p v-if="!company.ico" class="mt-1 max-w-2xl text-sm text-gray-500">Čaka na pridanie IČO</p>
                    <div class="my-2 border-b border-gray-200"></div>                    
                    <p><router-link :to="{ name: 'CompanyDetails', params: { id: `${company.id}` } }">Zobraziť podrobnosti</router-link></p>
                </div>
            </div>
        </div>
    </div>
    <div v-if="companies.length == 0">
        <div>Momentálne nemáte vo svojom účte žiadne spoločnosti.</div>
    </div>
</template>

<script setup lang="ts">
import store from '@/store';
import type { id } from '@formkit/i18n';
import { onMounted, ref } from 'vue';
let companies = ref([''] as any);

onMounted(() => {
    store.dispatch("getAllCompaniesByUserId", store.state.user.userId )
    .then((response) => {
        console.log(response)
        companies.value = response.data
    })
})

</script>