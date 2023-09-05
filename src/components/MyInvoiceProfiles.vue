<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4" v-if="invoiceProfiles.length > 0">
        <div class="" v-for="profile in invoiceProfiles">        
            <div class="overflow-hidden bg-white shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg font-bold leading-6 text-gray-900">{{ profile.name? profile.name : profile.first_name+" "+profile.last_name }}</h3>
                    <p v-if="profile.ico" class="mt-1 max-w-2xl text-sm text-gray-500">IČO:{{ profile.ico }}</p>
                    <div class="my-2 border-b border-gray-200"></div>
                    <p><button @click="invoiceProfileDetails(profile.id)" class="text-teal-500 hover:underline">Zobraziť podrobnosti</button></p>
                </div>
            </div>
        </div>
    </div>
    <div v-if="invoiceProfiles.length == 0">
        <div>Momentálne nemáte vo svojom účte žiadne fakturačné profily.</div>
    </div>
    <Modal
          name="profileDetails"
          v-model:visible="isVisible"
          :type="'clean'"
          :closable="false"
          title="Loading..."
        >
          <div class="bg-gray-800 rounded-lg border-teal-600 border-2">
            <div role="status" class="flex py-10 h-full w-full justify-center text-white">
                Tož tu bude formular
            </div>
          </div>
      </Modal>
</template>

<script setup lang="ts">
import store from '@/store';
import { onMounted, ref, reactive } from 'vue';
import { useModal, Modal } from "usemodal-vue3";

let invoiceProfiles = ref({} as any);

const setModal = useModal({
  profileDetails: 1
});

let isVisible = reactive({});

isVisible = setModal("profileDetails", false);

function showModal(modalName: string) {
  isVisible = setModal(modalName, true);
}

function closeModal(modalName: string) {
  isVisible = setModal(modalName, false);
}

function invoiceProfileDetails(id: number) {
    showModal("profileDetails");
}

onMounted(async () => {
    await store.dispatch("getFakturacneUdajeByUserId", store.state.user.userId)
    .then((response) => {
        invoiceProfiles.value = response.data
    })
})

</script>