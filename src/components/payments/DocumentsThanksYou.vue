<template>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div v-if="order">
          <div class="flex p-4 justify-between">
            <div>
                <h1 class="text-6xl my-6 font-bold">Vyberte si spôsob platby</h1>
                <div class="text-2xl text-gray-300">
                    Za Vašu objednávku č. <b>{{ order.id }}</b>
                </div>
                <div class="py-4 text-2xl font-bold text-teal-500">
                  Nezabudnite si pred prvým prihlásením aktivovať svoj účet.<br>
                  Aktivačný link nájdete vo Vašej emailovej schránke.
                </div>
                <div class="text-gray-400 pt-4">
                    Užívajte si našu službu na 3 mesiace zdarma. Za každý feedback budeme vďační!
                </div>
            </div>
            <div>
                <img src="../../assets/bizinix-robot-heart.png" class="w-52">
            </div>
          </div>
          <div v-if="order.amount === 0" class="flex p-4 flex-col">
            <h2 class="text-4xl font-bold">Vystavte svoj prvý doklad</h2>
            <p class="font-bold text-gray-400 py-4">Prihláste sa do svojho <router-link to="/moj/dashboard" class="" >Bizinix účtu</router-link>, prejdite do sekcie dokladov a vystavte svoj prvý doklad.</p>
            <div>
              <router-link
                to="/moj/dashboard"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-teal-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-700"
                >Prihlásiť sa</router-link
              >
            </div>
          </div>
          <div class="flex my-6 flex-col md:flex-row" v-else>
            <div class="flex-1 p-4">
              <h2 class="pb-4 text-4xl font-bold">Čo nás čaká teraz?</h2>
              <div class="flex items-baseline">
                <span class="flex items-center justify-center w-8 h-8 rounded-full font-bold bg-bizinix-teal">1</span>
                <span class="ml-2 text-2xl font-bold">Platba</span>
              </div>
              <div class="mt-2">
                <p class="text-gray-400 font-bold">Vykonajte platbu pomocou jedného z uvedených spôsobov.</p>
                <ul class="list-disc list-inside text-gray-400 py-4">
                  <li class="pb-2">Po zaplatení (a pričítaní sumy na účet) systém vygeneruje faktúru, ktorú môžete použiť ako daňový a účtovný doklad.</li>
                  <li>Okrem toho aktivujeme zakúpenú službu a Vy môžete pohodlne vystavovať firemné doklady</li>
                </ul>
                <p class="text-gray-400 font-bold">PRE RÝCHLEJŠIU AKTIVÁCIU SLUŽBY A VYBAVENIE OBJEDNÁVKY DOPORUČUJEME VYUŽIŤ PLATBU KARTOU</p>
              </div>
              <div class="my-6 flex items-baseline">
                <span class="flex items-center justify-center w-8 h-8 rounded-full font-bold bg-bizinix-teal">2</span>
                <span class="ml-2 text-2xl font-bold">Vystavujte doklady na plno</span>
              </div>
              <div class="mt-2 text-gray-400 font-bold">
                <p>Po aktivácii služby sa prihláste do svojho <router-link to="/moj/dashboard" class="" >Bizinix účtu</router-link>, prejdite do sekcie dokladov a vystavujte doklady bez obmedzení</p>
              </div>
          </div>
          <div class="flex-1 p-4">
            <div class="my-5 text-2xl">Spôsob platby</div>
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
                      <input type="radio" name="paymentMethod" value="IBAN"
                        v-model="selectedOptionForPay" @change="handleRadioChange"
                        class="w-5 h-5" required >
                      <span class="ml-2 text-lg">Bankovým prevodom</span>
                      <img src="../../assets/logo-small.png" alt="Bankovým prevodom" class="ml-2 h-12">
                    </label>
                    <label class="flex items-center mb-4">
                      <input type="radio" value="Stripe" v-model="selectedOptionForPay"
                        @change="handleRadioChange" class="w-5 h-5" 
                        name="paymentMethod" required >
                      <span class="ml-2 text-lg">Platba kartou</span>
                      <img src="../../assets/stripe.png" alt="Platba kartou" class="ml-2 w-32">
                    </label>
                  </div>
                </fieldset>
                <div v-if="selectedOptionForPay == 'Stripe'">
                  <stripePaymentComponent class="bg-gray-bizinix my-4 text-white" ref="childRefComponentForPay"></stripePaymentComponent>
                </div>
                <div class="text-center mt-4">
                  <FormKit class="!w-full font-bold" type="submit" label="Zaplatiť" />
                </div>
              </FormKit>
            </div>
          </div>
        </div>
        </div>
      </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import stripePaymentComponent from '@/components/payments/PayStripe.vue'
import router from "@/router";

const route = useRoute();
const order = ref();
const selectedOptionForPay = ref(null);
let orderId: any;
const childRefComponentForPay = ref();

onBeforeMount(() => {

  orderId = route.params.orderId;
  
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
      order.value.payment_method = selectedOptionForPay.value;
      await store.dispatch('updateOrderById', order.value);
      await router.push({
          name:"Payment",
          params: {
            orderId: orderId,
            paymentMethod: selectedOptionForPay.value
          }
      })
    }
    
    /*order.value.payment_method = selectedOptionForPay.value
    await store.dispatch('updateOrderById', order.value)*/

    node.clearErrors()
  } catch (err: any){
    node.setErrors(err.formErrors, err.fieldErrors);
    console.error(err);
  }
}

</script>
