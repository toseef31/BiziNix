<template>
    <div class="relative inline-block text-left">
      <div>
        <button @click="toggleDropdown" class="inline-flex font-bold text-white text-lg items-center font-medium text-gray-400 hover:text-white focus:outline-none">
          {{ selectedOption }}
          <svg class="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path :class="{ 'transform rotate-180': isOpen }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
  
      <transition name="fade">
      <div v-if="isOpen" class="absolute mt-2 text-sm bg-gray-800 text-gray-400 rounded-lg" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
        <a href="#" @click="selectOption('Prehľad za aktuálny rok')" class="block px-4 py-2 text-white hover:text-[#14b8a6]" role="menuitem">Prehľad za aktuálny rok</a>
        <a href="#" @click="selectOption('Prehľad za posledné 4 roky')" class="block px-4 py-2 text-white hover:text-[#14b8a6]" role="menuitem">Prehľad za posledné 4 roky</a>
      </div>
    </transition>
    </div>
  </template>
  
  <script setup lang="ts">
import { ref } from 'vue';
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import store from '@/store';
import { toast } from 'vue3-toastify';

const isOpen = ref(false);
const selectedOption = ref('Prehľad za aktuálny rok');
const emit = defineEmits(['update-charts']);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = async (option: string) => {
  selectedOption.value = option;
  isOpen.value = false;

  if (option === 'Prehľad za aktuálny rok') {
    await getFinDataForCompany();
  } else if (option === 'Prehľad za posledné 4 roky') {
    await getCompanyFindataFinstat();
  }
};

async function getCompanyFindataFinstat() {
  try {
    const ico = { ico: store.state.selectedCompany.ico };
    const response = await store.dispatch("getCompanyFindataFinstat", ico);
    const data = response.data.Ratios;

    if (data) {
      const salesData = data[1].Values.slice().reverse();
      const profitData = data[0].Values.slice().reverse();

      // Calculate the sum of the values
      const profitSum = profitData.reduce((acc, d) => acc + d.Value, 0);
      const salesSum = salesData.reduce((acc, d) => acc + d.Value, 0);

      // Emit event to parent component to update the charts
      emit('update-charts', {
        profitData: profitData.map(d => ({ month: d.Year, total: d.Value })),
        salesData: salesData.map(d => ({ month: d.Year, total: d.Value })),
        labels: profitData.map(d => d.Year),
        profitSum,
        salesSum
      });
    }
  } catch (err) {
    toast.error('Error: ' + err);
  }
}

async function getFinDataForCompany() {
  try {
    const response = await store.dispatch("getFinDataForCompany", store.state.selectedCompany.id);
    const data = response.data;

    // Calculate the sum of the values
    const profitSum = data.monthlyProfitData.reduce((acc, d) => acc + d.total, 0);
    const salesSum = data.monthlySalesData.reduce((acc, d) => acc + d.total, 0);

    // Emit event to parent component to update the charts
    emit('update-charts', {
      profitData: data.monthlyProfitData,
      salesData: data.monthlySalesData,
      labels: data.monthlyProfitData.map(d => d.month),
      profitSum,
      salesSum
    });
  } catch (err) {
    toast.error('Error: ' + err);
  }
} 
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
  