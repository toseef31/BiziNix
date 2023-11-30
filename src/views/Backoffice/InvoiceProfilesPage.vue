<template>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <h1 class="text-3xl font-bold text-gray-600 pb-10">
            Fakturačné profily
          </h1>
          <MyInvoiceProfiles></MyInvoiceProfiles>
          <h1 class="text-3xl font-bold text-gray-600 pb-10">
            Faktúry
          </h1>
          <MyInvoices></MyInvoices>
        </div>
        <!-- /End replace -->
      </div>
    </main>
</template>

<script setup lang="ts">
import MyInvoiceProfiles from '@/components/MyInvoiceProfiles.vue';
import MyInvoices from '@/components/MyInvoices.vue';
</script>