<template>
    <div class="flex flex-col p-8">
        <div class="flex justify-center text-gray-800 font-extrabold text-4xl py-8">Vyberte si balík, o ktorý máte záujem</div>
        <div class="flex flex-row justify-center">
            <div class="flex flex-col basis-1/3 justify-start py-6 px-6 text-white font-bold bg-gray-800 rounded-l-lg">
                <VirtualHqPackage @update-package="updatePackage"></VirtualHqPackage>
            </div>
            <div class="flex flex-col py-6 px-6 bg-gray-200 rounded-r-lg">
                <div class="flex flex-col">
                    <div>
                        Aktuálne využívate: {{ selectedCompany.sidlo_typ_balika }} Balík
                    </div>
                    <div class="font-bold text-2xl pt-12">
                        Vybrali ste si<br>
                        {{ vhq_package.name }}<br>
                        {{ vhq_package.price }}€/mesiac <span class="text-teal-500">({{ vhq_package.price*12 }}€/rok)</span>
                    </div>
                    <div class="py-2">
                        <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
                    </div>
                    <div class="underline font-bold text-xl">
                        Na zaplatenie {{ totalToPay }}€
                    </div>
                    <div class="py-4">
                        {{ monthsUntilPay }} mesiacov do najbližšej platby za virtuálne sídlo ({{ formatDate(selectedCompany.sidlo_zaplatene_do) }})
                    </div>
                    <div class="flex w-full justify-center">
                        <div class="flex">
                            <div v-if="!paymentInProgress">
                                <button
                                    class="bg-teal-500 hover:bg-teal-700 px-8 shadow flex justify-center border items-center py-4 rounded-lg text-white"
                                    v-on:click="handleSubmit()">
                                    Dokúpiť
                                </button>
                            </div>
                            <div v-if="paymentInProgress">
                                <button disabled type="button" class="bg-teal-500 hover:bg-teal-700 px-8 shadow inline-flex justify-center border items-center py-4 rounded-lg text-white">
                                    <svg aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                                    </svg>
                                    Načítavanie...
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="py-4 text-sm">
                        Faktúra bude vystavená na firmu {{ selectedCompany.name }} a zaslaná emailom
                    </div>
                </div>

            </div>
        </div>
        <div class="flex pl-40">
            <button
                class="bg-red-500 hover:bg-red-700 px-8 shadow flex justify-center border items-center py-4 rounded-lg text-white"
                v-on:click="goBack()">
                <ChevronLeftIcon class="h-6 w-6 text-white" aria-hidden="true" /><span class="pl-2">Vrátiť sa</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import store from '@/store';
import { onMounted, computed, ref, watch, onUnmounted } from 'vue';
import router from '@/router';
import { ChevronLeftIcon } from '@heroicons/vue/24/outline';
import VirtualHqPackage from './VirtualHqPackage.vue';
import dayjs from "dayjs";
import moment from "moment";
import { toast } from "vue3-toastify";

const user = computed(() => store.state.user.data);
const selectedCompany = computed(() => store.getters.getSelectedCompany);
const order = ref({
  payment_date: "" as any,
  payment_method: "",
  order_type: 'mail',
  description: "Objednávka balíka sídla",
  amount: 0,
  amount_vat: 0,
  is_paid: false,
  user_id: 0,
  company_id: 0,
  items: [
    {
      description: "Zakúpenie balíka sídla",
      price: 0,
      price_vat: 0,
    },
  ],
  fakturacne_udaje_id: 0
});
let invoiceProfileId;
const isLoading = ref(true);
const paymentInProgress = ref(false);
const totalToPay = computed(() => vhq_package.value.price*(monthsUntilPay.value<=1? 12 : monthsUntilPay.value ));
const today = moment(new Date()).month();
const today2 = (moment(new Date(selectedCompany.value.sidlo_zaplatene_do)).month())-today;
const monthsUntilPay = computed(() => today2<=0? 12: today2);

const vhq_package = ref({
  name: "Ideal",
  name_desc: "To čo v Mini, plus",
  desc: "Online evidencia zásielok a pošty v našej aplikácii. Možnosť scanovania, preposielania a skartácie. Všetko prehľadne a na jednom mieste vrátane emailových notifikácií.",
  price: 11
});

watch(
  () => user,
  function () {
    fetchInvoiceProfiles();
  }
);

const updatePackage = (updatedPackage: any) => {
  vhq_package.value = updatedPackage;
};

function goBack() {
    router.push({
        name: "Sídlo a pošta",
    });
}

async function fetchInvoiceProfiles() {
    if(user.value.id) {
        const res = await store.dispatch("getFakturacneUdajeByUserId", user.value.id)
        isLoading.value = false
        if(res.data[0].id){
            invoiceProfileId = res.data[0].id;
        } else {
            isLoading.value = false
            return []
        }
    }
}

async function updateCompany() {
  selectedCompany.value.sidlo_typ_balika = vhq_package.value.name;

  await store
    .dispatch("updateCompany", selectedCompany.value)
    .catch((err) => {
        toast.error('Error: ' + err);
    });
}

async function handleSubmit() {
    try {
        paymentInProgress.value = true;
        order.value.payment_date = new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        order.value.company_id = selectedCompany.value.id;
        order.value.user_id = user.value.id;

        order.value.amount = totalToPay.value;
        order.value.amount_vat = totalToPay.value * 0.2;
        order.value.items[0].price = totalToPay.value;
        order.value.items[0].price_vat = totalToPay.value * 0.2;

        order.value.fakturacne_udaje_id = invoiceProfileId;

        order.value.description = "Objednávka balíka sídla: "+vhq_package.value.name;
        order.value.items[0].description = "Objednávka balíka sídla: "+vhq_package.value.name;

        await store
        .dispatch("addOrder", order.value)
        .then(async (res) => {
            paymentInProgress.value = false;
            await updateCompany();
            router.push({
                name: "Thanks You New Order",
                params: {
                    orderId: res.order.id,
                },
            });
        })
        .catch((err) => {
            paymentInProgress.value = false;
            toast.error('Error: ' + err);
        });

    } catch (err: any) {
        paymentInProgress.value = false;
        console.error(err);
    }
}

function formatDate(dateString: string) {
    const date = dayjs(dateString);
    return date.format("DD.MM.YYYY");
}

onUnmounted(() => {
  store.state.selectedVhq = {};
  store.state.selectedVhqPackage = {};
})

onMounted( async () => {
  if(user.value){
    store.state.selectedVhq = {};
    store.state.selectedVhqPackage = {};  
    fetchInvoiceProfiles()
  } else {
    isLoading.value = false
  }
})

</script>
