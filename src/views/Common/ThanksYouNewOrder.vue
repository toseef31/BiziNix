<template>
    <main class="bg-gray-bizinix text-white">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div v-if="order">
          <div class="text-center">
            <BadgeCheckIcon class="text-teal-500 w-24 h-24 stroke-1 inline" />
            <h1 class="text-6xl my-6 font-bold">Ďakujeme vám.</h1>
            <div class="text-xl">
                Vaša objednávka <b>#{{ order.id }}</b> bola prijatá na spracovanie o ďalšom postupe Vás budeme informovať.
            </div>
          </div>
          <div class="flex my-6 flex-col md:flex-row">
            <div class="flex-1 p-4">
              <div class="flex items-baseline">
                <span class="flex items-center justify-center w-8 h-8 rounded-full font-bold bg-bizinix-teal">1</span>
                <span class="ml-2 text-2xl">Platba</span>
              </div>
              <div class="mt-2">
                <p class="font-bold">Vykonajte platbu pomocou jedného z uvedených spôsobov.</p>
                <ul class="list-disc list-inside">
                  <li>Po zaplatení (a pričítaní sumy na účet) systém vygeneruje faktúru, ktorú môžete použiť ako daňový a účtovný doklad.</li>
                  <li>Pri založení novej firmy (živnosti alebo s.r.o.) je tiež možné zaplatiť z osobného účtu zakladateľa. Doklad si potom môžete v novej firme bez problémov zaúčtovať ako náklad.</li>
                </ul>
              </div>
              <div class="my-6 flex items-baseline">
                <span class="flex items-center justify-center w-8 h-8 rounded-full font-bold bg-bizinix-teal">2</span>
                <span class="ml-2 text-2xl">Podpis dokumentov.</span>
              </div>
              <div class="mt-2">
                <p>Pre vybavenie Vašej objednávky potrebujeme, aby ste podpísali, naskenovali a zaslali nám e-mailom dokumenty, ktoré sme Vám odoslali na vašu e-mailovú adresu.</p>
              </div>
              <div class="my-6 flex items-baseline">
                <span class="flex items-center justify-center w-8 h-8 rounded-full font-bold bg-bizinix-teal">3</span>
                <span class="ml-2 text-2xl">Počkajte na hotové.</span>
              </div>
              <div class="mt-2">
                <p class="font-bold">O všetko ostatné sa postarajú odborníci z Bizinixu.</p>
                <p>Aktuálny proces a stav objednávky môžete sledovať vo <router-link to="/moj/dashboard" class="" >Vašom Bizinix účte</router-link>, alebo sa môžete kedykoľvek informovať na našej <router-link to="/contact" class="" >infolinke</router-link>.</p>
              </div>
          </div>
          <div class="flex-1 p-4">
            <div class="p-4 rounded-md border border-bizinix-border">
              <FormKit
                type="form"
                id="payment"
                @submit="submitHandler"
                :actions="false"
                #default="{ value }"
              >
                <p class="text-xl font-bold text-center">{{ order.amount ?? 0 }} €</p>
                <fieldset class="mt-4">
                  <div class="space-y-4">
                    <label class="flex items-center mb-4">
                      <input type="radio" name="paymentMethod" value="iban" v-model="selectedOptionForPay" @change="handleRadioChange" class="w-5 h-5">
                      <span class="ml-2 text-lg">Bankovým prevodom</span>
                      <img src="../../assets/logo-small.png" alt="Bankovým prevodom" class="ml-2 h-12">
                    </label>
                    <label class="flex items-center mb-4">
                      <input type="radio" value="stripe" v-model="selectedOptionForPay" @change="handleRadioChange" class="w-5 h-5" name="paymentMethod">
                      <span class="ml-2 text-lg">Platba kartou</span>
                      <img src="../../assets/stripe.png" alt="Platba kartou" class="ml-2 w-32">
                    </label>
                  </div>
                </fieldset>
                <div v-if="selectedOptionForPay == 'stripe'">
                  <stripePaymentComponent class="bg-gray-100 my-5 p-4" ref="childRefComponentForPay"></stripePaymentComponent>
                </div>
                <div class="text-center mt-8">
                  <FormKit class="!w-full" type="submit" label="Zaplatiť" />
                </div>
              </FormKit>
            </div>
          </div>
        </div>
        </div>
        <!-- Objednávka nebola prijatá -->
        <div v-else="!order" class="text-center">
            <EmojiSadIcon class="text-red-500 w-24 h-24 stroke-1 inline" />
            <h1 class="text-6xl my-6 font-bold">Ups, niečo sa pokazilo.</h1>
            <p class="text-xl">Objednávka sa nenašla, alebo nebola prijatá.</p>
        </div>
        <div class="p-4 text-center">Ďakujeme za dôveru.</div>
      </div>
  </main>
  <FooterLayout></FooterLayout>
</template>

<script setup lang="ts">
import store from "@/store";
import { onBeforeMount, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { BadgeCheckIcon } from "@heroicons/vue/outline";
import { EmojiSadIcon } from "@heroicons/vue/outline";
import FooterLayout from "@/components/FooterLayout.vue";
import stripePaymentComponent from '@/components/payments/PayStripe.vue'
import router from "@/router";

const route = useRoute();
const order = ref();
const selectedOptionForPay = ref(null);
let orderId: any;
const childRefComponentForPay = ref();

onBeforeMount(() => {

  orderId = route.params.orderId;
  //totalForPay = computed(() => store.getters.getTotalForPay);
  //orderFromStore = computed(() => store.getters.getOrder(orderId))
  
  store.dispatch("getOrderById", orderId).then((response) => {
    order.value = response.data;
  });

});

// Watch for changes in the radio input's checked status
function handleRadioChange(event: any) {
  selectedOptionForPay.value = event.target.checked ? event.target.value : null;
}

const submitHandler = async (formdata: any, node: any) => {
  try{
    
    if(selectedOptionForPay.value === 'stripe'){
      await childRefComponentForPay.value.payWithStripe(order.value)
    } else {
      await router.push({
          name:"Payment",
          params: {
            orderId: orderId,
            paymentMethod: selectedOptionForPay.value
          }
      })
    }
    
    order.value.payment_method = selectedOptionForPay.value
    await store.dispatch('updateOrderById', order.value)

    node.clearErrors()
  } catch (err: any){
    node.setErrors(err.formErrors, err.fieldErrors);
    console.error(err);
  }
}

</script>
