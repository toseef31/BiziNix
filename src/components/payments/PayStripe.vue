<template>
  <StripeElements
    v-if="stripeLoaded"
    v-slot="{ elements, instance }"
    ref="elms"
    :stripe-key="stripeKey"
    :instance-options="instanceOptions"
    :elements-options="elementsOptions"
  >
  <StripeElement
    ref="card"
    :elements="elements"
    :options="cardOptions"
  />
</StripeElements>
</template>

<script setup lang="ts">
import { StripeElements, StripeElement } from 'vue-stripe-js'
import { onBeforeMount, ref } from "vue";
import { loadStripe } from '@stripe/stripe-js'
import store from "@/store";
import { toast } from 'vue3-toastify';
import router from "@/router";

const stripeKey = ref('pk_test_51MITbvGgtUfdovJEpJnABGplaqRoPVkj91G43vWG9d9wCD3KIWdQCU7SgQ6Ux35xG1QCt4Y0C18M8nagqfyRPmIB00tNZZq9Hi') // test key
let clientSecret = '';
let orderId: any;
let totalForPay = ref(0);

const instanceOptions = ref({
    // https://stripe.com/docs/js/initializing#init_stripe_js-options
  })
const elementsOptions = ref({
locale: 'sk'
// https://stripe.com/docs/js/elements_object/create#stripe_elements-options
})
const cardOptions = ref({
// https://stripe.com/docs/stripe.js#element-options
// value: {
//   postalCode: '12345',
// },
style: {
  base: {
    iconColor: '#c4f0ff',
    color: '#333',
    fontWeight: '500',
    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    fontSize: '18px',
    fontSmoothing: 'antialiased',
    ':-webkit-autofill': {
      color: '#fce883',
    },
    '::placeholder': {
      color: '#87BBFD',
    },
  },
  invalid: {
    iconColor: '#FFC7EE',
    color: '#FFC7EE',
  },
},
hidePostalCode: true
})

const stripeLoaded = ref(false)
const card = ref()
const elms = ref()

onBeforeMount(() => {  

  console.log("Loading stripe component.")
  const stripePromise = loadStripe(stripeKey.value)
      stripePromise.then(() => {
          stripeLoaded.value = true
  }).catch(error => {
      console.log("Problem with stripe: " + error)
  } );
})


const payWithStripe = (totalForPay: number, orderId: any) => {
    // Get stripe element
    const cardElement = card.value.stripeElement
  
    // Access instance methods, e.g. createToken()
    elms.value.instance.createToken(cardElement).then((result: object) => {
      // Handle result.error or result.token
      console.log(result)
    })
  
    payForOrder(totalForPay).then(() => {
      //console.log("Ja som client secreet: " + clientSecret)
      elms.value.instance.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement
        },
        return_url: 'https://example.com/return_url',
      }).then(() => {
        elms.value.instance.retrievePaymentIntent(clientSecret).then((result: any) => {
          if (result.error) {
            toast.error("Platba neprešla, skúste znova zaplatiť, ak sa problem zopakuje prosím kontaktujte nás.")
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          toast.success("Platba bola úspešna.")
          router.push({
            name:"Thanks You New Order",
            params: {
              orderId: orderId,
            }
          })
          // Show your customer that the payment has succeeded
        } else if (result.paymentIntent.status === 'requires_payment_method') {
          toast.warning("Overenie platby neprešlo, prosím skúste znova zaplatiť a správne overiť platbu.")
          // Authentication failed, prompt the customer to enter another payment method
        }
      }
        })
      }),
      {
        handleActions: false,
      }
    })
};

async function payForOrder(amount: number){

  const amountForPay = {
    amount: amount * 100
  }

  return store.dispatch('pay', amountForPay)
  .then((res) => {
    console.log("Payment: " + JSON.stringify(res))
    clientSecret = res.client_secret
    return res
  })
  .catch( err => {
    console.log(err.response.data)
  })
  
}

defineExpose( { payWithStripe } )

</script>