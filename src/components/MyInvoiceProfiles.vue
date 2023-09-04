<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4" v-if="invoiceProfiles.length > 0">
        <div class="" v-for="profile in invoiceProfiles">        
            <div class="overflow-hidden bg-white shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">{{ profile.name? profile.name : profile.first_name+" "+profile.last_name }}</h3>
                </div>
            </div>
        </div>
    </div>
    <div v-if="invoiceProfiles.length == 0">
        <div>Momentálne nemáte vo svojom účte žiadne fakturačné profily.</div>
    </div>
</template>

<script setup lang="ts">
import store from '@/store';
import { onMounted, ref } from 'vue';
let invoiceProfiles = ref({} as any);

onMounted(async () => {
    await store.dispatch("getFakturacneUdajeByUserId", store.state.user.userId)
    .then((response) => {
        console.log(response)
        invoiceProfiles.value = response.data
    })
})

</script>