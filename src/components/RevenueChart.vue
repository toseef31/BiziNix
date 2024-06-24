
<template>
    <div class="bg-[#00A6A6] p-4 shadow rounded-[1.25rem]">
    <div class="flex justify-between">
    <h2 class="text-xl font-bold mb-2 text-white">Tržba</h2>
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.0439 9.074C10.2141 8.54724 10.5269 8.07788 10.9475 7.71795C11.368 7.35802 11.8801 7.12157 12.4268 7.03479C12.9735 6.94802 13.5336 7.01432 14.045 7.22634C14.5563 7.43836 14.999 7.78782 15.3239 8.236C15.6493 8.68353 15.8445 9.21231 15.8881 9.76388C15.9316 10.3155 15.8218 10.8683 15.5707 11.3614C15.3196 11.8544 14.9371 12.2684 14.4654 12.5576C13.9937 12.8468 13.4512 12.9999 12.8979 13V14M12.8979 21C11.7161 21 10.5457 20.7672 9.4538 20.3149C8.36187 19.8626 7.36972 19.1997 6.53399 18.364C5.69826 17.5282 5.03533 16.5361 4.58303 15.4442C4.13074 14.3522 3.89795 13.1819 3.89795 12C3.89795 10.8181 4.13074 9.64778 4.58303 8.55585C5.03533 7.46392 5.69826 6.47177 6.53399 5.63604C7.36972 4.80031 8.36187 4.13738 9.4538 3.68508C10.5457 3.23279 11.7161 3 12.8979 3C15.2849 3 17.5741 3.94821 19.2619 5.63604C20.9497 7.32387 21.8979 9.61305 21.8979 12C21.8979 14.3869 20.9497 16.6761 19.2619 18.364C17.5741 20.0518 15.2849 21 12.8979 21ZM12.9479 17V17.1H12.8479V17H12.9479Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    </div>
    <div class="flex justify-between">
      <h1 class="text-3xl text-white mt-2">$2211,21</h1>
      <div>
        <p class="text-lg text-white mb-2">Tržba s DPH</p>
        <p class="text-lg text-white">$4811,21</p>
      </div>
      <div></div>
     
    </div>
    <!-- <LineChart /> -->
  </div>
  
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const LineChart = defineAsyncComponent(() => import('@/components/LineChart.vue'));
</script>