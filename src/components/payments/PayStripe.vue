<template>
  <StripeElements
    v-if="stripeLoaded"
    v-slot="{ elements, instance }"
    ref="elms"
    :stripe-key="stripeKey"
    :instance-options="instanceOptions"
    :elements-options="elementsOptions"
  >
    <StripeElement ref="card" :elements="elements" :options="cardOptions" />
        
  </StripeElements>
</template>

<script setup lang="ts">
import { StripeElements, StripeElement } from 'vue-stripe-js'
import { onBeforeMount, ref } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import store from '@/store'
import { toast } from 'vue3-toastify'
import router from '@/router'

interface PaymentResult {
  client_secret: string
}

const stripeKey = ref('pk_test_51MITbvGgtUfdovJEpJnABGplaqRoPVkj91G43vWG9d9wCD3KIWdQCU7SgQ6Ux35xG1QCt4Y0C18M8nagqfyRPmIB00tNZZq9Hi')
let clientSecret = ''
let totalForPay = ref(0)

const instanceOptions = ref({
  // Stripe instance options here
})

const elementsOptions = ref({
  locale: 'sk',
  // Stripe elements options here
})

const cardOptions = ref({
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
  hidePostalCode: true,
  // Other card options here
})

const stripeLoaded = ref(false)
const card = ref()
const elms = ref()

onBeforeMount(async () => {
  try {
    console.log('Loading stripe component.')
    await loadStripe(stripeKey.value)
    stripeLoaded.value = true
  } catch (error) {
    console.error('Problem with stripe:', error)
  }
})

const payWithStripe = async (order: any) => {
  try {
    const cardElement = card.value.stripeElement
    const result = await elms.value.instance.createToken(cardElement)
    if (result.error) {
      console.log('Token problem')
      console.log(result)
      toast.warning(result.error.message)
      return
    }

    await payForOrder(order.amount)

    const paymentResult = await elms.value.instance.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
      return_url: 'https://example.com/return_url',
    })

    const paymentIntentResult = await elms.value.instance.retrievePaymentIntent(clientSecret)

    if (paymentIntentResult.error) {
      toast.error('Platba neprešla, skúste znova zaplatiť, ak sa problem zopakuje prosím kontaktujte nás.')
    } else {
      console.log('Result is')
      console.log(paymentIntentResult)
      if (paymentIntentResult.paymentIntent.status === 'succeeded') {
        order.payment_date = new Date().toISOString().slice(0, 19).replace('T', ' ')
        order.is_paid = true
        store.dispatch('updateOrderById', order)
        toast.success('Platba bola úspešna.')
        router.push({
          name: 'Payment',
          params: {
            orderId: order.id,
            paymentMethod: 'stripe',
          },
        })
        // Show your customer that the payment has succeeded
      } else if (paymentIntentResult.paymentIntent.status === 'requires_payment_method') {
        toast.warning('Overenie platby neprešlo, prosím skúste znova zaplatiť a správne overiť platbu.')
        // Authentication failed, prompt the customer to enter another payment method
      }
    }
  } catch (error) {
    console.error('Error in payWithStripe:', error)
  }
}

async function payForOrder(amount: number) {
  const amountForPay = {
    amount: amount * 100,
  }

  try {
    const res = await store.dispatch('pay', amountForPay)
    console.log('Payment:', JSON.stringify(res))
    clientSecret = (res as PaymentResult).client_secret
    return res
  } catch (err: any) {
    console.error('Error in payForOrder:', err.response.data)
  }
}

defineExpose({ payWithStripe })
</script>
