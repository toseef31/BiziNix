<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4" v-if="companies.length > 0">
        <div class="" v-for="company in companies">        
            <div class="overflow-hidden bg-white shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">{{ company.name }}</h3>
                    <p v-if="company.ico" class="mt-1 max-w-2xl text-sm text-gray-500">IČO: {{ company.ico }}</p>
                    <p v-if="!company.ico" class="mt-1 max-w-2xl text-sm text-gray-500">Čaka na pridanie IČO</p>
                    <div class="my-2 border-b border-gray-200"></div>
                    <p><button @click="redirectToCompany(company.id, 'CompanyDetails')" class="text-teal-500 hover:underline">Zobraziť podrobnosti</button></p>
                    <p v-if="company.fakturacia_zaplatene_do"><button @click="redirectToCompany(company.id, 'Doklady')" class="text-teal-500 hover:underline font-bold">Doklady</button></p>
                    <p v-if="company.sidlo_zaplatene_do"><button @click="redirectToCompany(company.id, 'Sídlo a pošta')" class="text-teal-500 hover:underline font-bold">Sídlo a pošta</button></p>
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
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router";

const companies = ref([] as any[]);
const currentCompany = ref({} as any)
const router = useRouter();

function redirectToCompany(companyId: number, routeName: string) {
    currentCompany.value = companies.value.find(
        (item: any) => item.id == companyId
    );

    store.state.selectedCompany = currentCompany.value;

    return router.push({
        name: routeName,
        params: { activeTab: 1 }
    });
}

onMounted(async () => {
    await store.dispatch("getAllCompaniesByUserId", store.state.user.userId )
    .then((response) => {
        companies.value = response.data.data;
        currentCompany.value = store.state.selectedCompany;
    })
})

</script>