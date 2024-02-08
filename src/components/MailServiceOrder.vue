<template>
    <div class="flex flex-col p-8" v-if="type == 1">
        <div class="flex justify-center text-gray-800 font-extrabold text-4xl py-8">Žiadosť o preposlanie pošty</div>
        <div class="flex flex-row justify-center">
            <div class="flex flex-col justify-start py-6 px-6 text-white font-bold bg-gray-800 rounded-l-lg">
                <div class="text-xl">
                    Uveďte adresu, na ktorú chcete odoslať zásielku
                </div>
                <div class="pt-3">
                    <FormKit type="text" name="receiver" label="Meno adresáta" validation="required" v-model="receiver" />
                </div>
                <FormKit type="text" name="street" label="Ulica" validation="required" v-model="userAddress.street"
                    :value="userAddress.street" />
                <div class="flex flex-row">
                    <FormKit type="text" name="street_number" label="Súpisne číslo" validation="required"
                        v-model="userAddress.street_number" :value="userAddress.street_number" />
                    <div class="py-6 px-4">/</div>
                    <FormKit type="text" name="street_number2" label="Orientačné číslo" validation="required"
                        v-model="userAddress.street_number2" :value="userAddress.street_number2" />
                </div>
                <FormKit type="text" name="city" label="Mesto" validation="required" v-model="userAddress.city"
                    :value="userAddress.city" />
                <FormKit type="text" name="psc" label="PSČ" validation="required" v-model="userAddress.psc"
                    :value="userAddress.psc" />
                <FormKit type="select" name="country" label="Štát" placeholder="Vyberte štát"
                    :options="['Slovensko', 'Česká republika']" validation="required" validation-visibility="dirty"
                    v-model="userAddress.country" :value="userAddress.country" />
            </div>
            <div class="flex flex-col py-6 px-6 bg-gray-800 rounded-r-lg text-white">
                <div class="flex flex-col">
                    <div class="font-bold text-2xl">
                        Preposlanie pošty za <br>5€/preposlanie
                    </div>
                    <div class="py-4">
                        <hr class="h-px my-8 bg-gray-200 border-0">
                    </div>
                    <div class="underline font-bold text-xl">
                        Na zaplatenie {{ totalToPay }}€
                    </div>
                    <div class="pt-2 pb-8">
                        Gramáž zvolených zásielok: {{ totalWeight }} gramov
                    </div>
                    <div class="pt-2 pb-8">
                        Počet zásielok: {{ mails.length }} ks
                    </div>
                    <div class="font-bold text-xl">
                        Platba kartou (Stripe)
                    </div>
                    <div class="py-4">
                        <stripePaymentComponent class="my-4" ref="childRefComponentForPay"></stripePaymentComponent>
                    </div>
                    <div class="flex w-full justify-center">
                        <div class="flex">
                            <div v-if="!paymentInProgress">
                                <button
                                    class="bg-teal-500 hover:bg-teal-700 px-8 shadow flex justify-center border items-center py-4 rounded-lg text-white"
                                    v-on:click="sendMails()">
                                    <CreditCardIcon class="h-6 w-6 text-white" aria-hidden="true" /><span
                                        class="pl-2">Zaplatiť</span>
                                </button>
                            </div>
                            <div v-if="paymentInProgress">
                                <button disabled type="button"
                                    class="bg-teal-500 hover:bg-teal-700 px-8 shadow inline-flex justify-center border items-center py-4 rounded-lg text-white">
                                    <svg aria-hidden="true" role="status"
                                        class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="#E5E7EB"></path>
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentColor"></path>
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
    <div class="flex flex-col p-8" v-else="type == 2">
        <div class="flex justify-center text-gray-800 font-extrabold text-4xl py-8">Žiadosť o SCAN</div>
        <div class="flex flex-row justify-center text-white">
            <div class="flex flex-col justify-start py-6 px-6">
                <div class="w-full md:w-1/2 p-4 flex items-center justify-center">
                    <img src="@/assets/robot_scan.png" class="max-w-sm md:max-w-md" />
                </div>
            </div>
            <div class="flex flex-col py-6 px-6 bg-gray-800 rounded-r-lg">
                <div class="flex flex-col">
                    <div class="font-bold text-2xl">
                        Vytvorenie scanu za <br>0.09€/1g zásielky
                    </div>
                    <div class="py-4">
                        <hr class="h-px my-8 bg-gray-200 border-0">
                    </div>
                    <div class="underline font-bold text-xl">
                        Na zaplatenie {{ payAmount }}€ </div>
                            <div class="pt-2 pb-8">
                                Gramáž zvolených zásielok: {{ totalWeight }} gramov
                            </div>
                            <div class="font-bold text-xl">
                                Platba kartou (Stripe)
                            </div>
                            <div class="py-4">
                                <stripePaymentComponent class="my-4" ref="childRefComponentForPay"></stripePaymentComponent>
                            </div>
                            <div class="flex w-full justify-center">
                                <div class="flex">
                                    <div v-if="!paymentInProgress">
                                        <button
                                            class="bg-teal-500 hover:bg-teal-700 px-8 shadow flex justify-center border items-center py-4 rounded-lg text-white"
                                            v-on:click="scanMails()">
                                            <CreditCardIcon class="h-6 w-6 text-white" aria-hidden="true" /><span
                                                class="pl-2">Zaplatiť</span>
                                        </button>
                                    </div>
                                    <div v-if="paymentInProgress">
                                        <button disabled type="button"
                                            class=" bg-teal-500 hover:bg-teal-700 px-8 shadow inline-flex justify-center border items-center py-4 rounded-lg text-white">
                                            <svg aria-hidden="true" role="status"
                                                class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101"
                                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="#E5E7EB"></path>
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentColor"></path>
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
import { onMounted, computed, ref, watch } from 'vue';
import router from '@/router';
import type Mail from "@/types/Mail";
import stripePaymentComponent from './payments/PayStripe.vue';
import { ChevronLeftIcon, CreditCardIcon } from '@heroicons/vue/24/outline';
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";

const route = useRoute();
const user = computed(() => store.state.user.data);
const userAddress = computed(() => store.state.user.address as any);
const mails = computed(() => store.state.checkedMails as Mail[]);
const selectedCompany = computed(() => store.getters.getSelectedCompany);
const childRefComponentForPay = ref();
const order = ref({
    payment_date: "" as any,
    payment_method: "stripe",
    order_type: 'mail',
    description: "Preposlanie",
    amount: 0,
    amount_vat: 0,
    is_paid: false,
    user_id: 0,
    company_id: 0,
    items: [] as any,
    fakturacne_udaje_id: 0
});
let orderFromResponse;
let invoiceProfileId;
const type = Number(route.params.type);
const isLoading = ref(true);
const paymentInProgress = ref(false);
const receiver = ref("");

const totalWeight: any = computed(() => {
    return mails.value.reduce((acc, item) => acc + item.weight, 0);
});

const payAmount = computed(() => {return totalWeight.value*0.09 < 1.5 ? 1.5 : totalWeight.value*0.09});

const totalToPay: any = computed(() => {
    if (mails.value.length <= 20) {
        return mails.value.length * 5;
    } else {
        return mails.value.length * 10;
    }
});

watch(
    () => user,
    function () {
        fetchInvoiceProfiles();
    }
);

function goBack() {
    router.push({
        name: "Sídlo a pošta",
    });
}

async function fetchInvoiceProfiles() {
    if (user.value.id) {
        const res = await store.dispatch("getFakturacneUdajeByUserId", user.value.id)
        isLoading.value = false
        if (res.data[0].id) {
            invoiceProfileId = res.data[0].id;
        } else {
            isLoading.value = false
            return []
        }
    }
}

async function sendMails() {
    try {
        paymentInProgress.value = true;
        order.value.payment_date = new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        order.value.company_id = selectedCompany.value.id;
        order.value.user_id = user.value.id;

        order.value.description = "Preposlanie";

        mails.value.forEach((mail) => {
            const row = {
                description: "Zásielka č. " + mail.id + " od: " + mail.sender,
                price: 0,
                price_vat: 0
            };
            order.value.items.push(row);
        });

        order.value.amount = totalToPay.value;
        order.value.amount_vat = totalToPay.value * 0.2;

        order.value.fakturacne_udaje_id = invoiceProfileId;

        await store
            .dispatch("addOrder", order.value)
            .then((res) => {
                orderFromResponse = res.order;
            })
            .catch((err) => {
                toast.error('Error: ' + err);
            });

        mails.value.forEach(function (value: any) {
            value.forward_requested = 1;
            value.receiver = receiver.value;
            value.forward_address =
                userAddress.value.street +
                " " +
                userAddress.value.street_number +
                "/" +
                userAddress.value.street_number2 +
                ", " +
                userAddress.value.psc +
                " " +
                userAddress.value.city +
                ", " +
                userAddress.value.country;
        });
        if (mails.value.length > 0) {
            await store
                .dispatch("updateMultipleMails", mails.value)
                .then(async () => {
                    await childRefComponentForPay.value.payWithStripe(orderFromResponse)
                })
                .catch((err) => {
                    paymentInProgress.value = false;
                    toast.error('Error: ' + err);
                });
        }
    } catch (err: any) {
        paymentInProgress.value = false;
        console.error(err);
    }
}

async function scanMails() {
    try {
        paymentInProgress.value = true;
        order.value.payment_date = new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        order.value.company_id = selectedCompany.value.id;
        order.value.user_id = user.value.id;

        order.value.description = "Scan";

        mails.value.forEach((mail) => {
            const row = {
                description: "Zásielka č. " + mail.id + " od: " + mail.sender,
                price: 0,
                price_vat: 0
            };
            order.value.items.push(row);
        });

        order.value.amount = payAmount.value;
        order.value.amount_vat = payAmount.value * 0.2;
        order.value.fakturacne_udaje_id = invoiceProfileId;

        await store
            .dispatch("addOrder", order.value)
            .then((res) => {
                orderFromResponse = res.order;
            })
            .catch((err) => {
                toast.error('Error: ' + err);
            });

        mails.value.forEach(function (value: any) {
            value.scan_requested = 1;
        });

        if (mails.value.length > 0) {
            await store
                .dispatch("updateMultipleMails", mails.value)
                .then(async () => {
                    await childRefComponentForPay.value.payWithStripe(orderFromResponse)
                })
                .catch((err) => {
                    paymentInProgress.value = false;
                    toast.error('Error: ' + err);
                });
        }
    } catch (err: any) {
        paymentInProgress.value = false;
        console.error(err);
    }
}

onMounted(async () => {
    if (user.value) {
        fetchInvoiceProfiles()
    } else {
        isLoading.value = false
    }
})

</script>
