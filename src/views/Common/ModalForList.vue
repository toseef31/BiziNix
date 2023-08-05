<template>
  <div class="modal">
    <div class="modal-content">
      <form @submit.prevent="saveItem">
        <label>Name:</label>
        <input v-model="formData.name" required />

        <label>Surname:</label>
        <input v-model="formData.surname" required />

        <label v-if="isFirstList">Is from City:</label>
        <input v-if="isFirstList" type="checkbox" v-model="formData.isFromCity" />

        <label v-if="!isFirstList">Mother's Name:</label>
        <input v-if="!isFirstList" v-model="formData.motherName" required />

        <label v-if="!isFirstList">Father's Name:</label>
        <input v-if="!isFirstList" v-model="formData.fatherName" required />

        <button type="submit">Save</button>
        <button type="button" @click="closeModal">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';


interface FormData {
  name: string;
  surname: string;
  isFromCity: boolean;
  motherName: string;
  fatherName: string;
}

const showModal = ref(false);
const formData = ref<FormData>({
  name: '',
  surname: '',
  isFromCity: false,
  motherName: '',
  fatherName: '',
});
const isFirstList = ref(true);

const onSave = ref<(data: FormData) => void>(() => {});

const closeModal = () => {
  showModal.value = false;
};

const saveItem = () => {
  onSave.value(formData.value);
  closeModal();
};

watch(showModal, (newVal) => {
  if (newVal) {
    formData.value = {
      name: '',
      surname: '',
      isFromCity: false,
      motherName: '',
      fatherName: '',
    };
  }
});
</script>

<style scoped>
/* Styles for the modal */
</style>
