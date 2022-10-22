<template>
  <div class="bg-no-repeat bg-cover" style="background-image:linear-gradient(0deg, rgba(36,36,39,0.9332107843137255) 40%, rgba(0,0,0,0.29735644257703087) 100%), url('../src/assets/zalozenie-fimy-bg.png')">
    <div class="max-w-7xl flex h-[80vh] items-center mx-auto py-20 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
      <div class="max-w-full">
        <h2 class="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Jednoduché založenie<br>živnosti za 49 €</h2>
        <p class="mt-8 mb-8 text-2xl text-white">Zaregistrujte alebo upravte svoju živnost rýchlo, z domu a za najmenšie ceny na trhu. Cena obsahuje aj štátne poplatky v hodnote 49€.</p>
        <div class="mt-8 text-white">
          <div class="font-bold text-4xl">Čaka nás</div>
          <div class="mt-2">
            <ul class="list-disc list-inside">
              <li>Predmet podnikania</li>
              <li>Osobné údaje</li>
              <li>Dokončenie objednávky</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="hidden md:block md:max-w-xs lg:max-w-md">
        <img src="../assets/robot.png">
      </div>
    </div>
  </div>
  <div class="py-6 bg-gray-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-800">
      <h2 class="text-center text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Poďme na to</h2>      
      <FormKit type="form" id="zalZivForm"
        #default="{ value, state: { valid } }"
        :plugins="[stepPlugin]"
        @submit="submitApp"
        :actions="false"
      >
        <!-- Zoznam krokov list steps -->
        <div class="flex items-center justify-center">
          <ul class="steps mt-8 list-disc list-inside flex space-x-8 cursor-pointer">
            <li v-for="(step, stepName) in steps" :class="['step px-4 py-5', { 'has-errors': checkStepValidity(stepName) }]" @click="activeStep = stepName.toString()"
            :data-step-valid="step.valid && step.errorCount === 0" :data-step-active="activeStep === stepName.toString()">
              <span
                v-if="checkStepValidity(stepName)"
                class="step--errors"
                v-text="step.errorCount + step.blockingCount"
              />
              {{ camel2title(stepName.toString()) }}
            </li>
          </ul>
        </div>
        <div class="form-body my-6">
          <!-- Predmet podnikania -->
          <section v-show="activeStep === 'PredmetPodnikania'">
            <div class="text-4xl font-bold">Vyberte si premet podnikania</div>
            <div class="mt-2 mb-6">Na tomto mieste vám pomôžeme s výberom najvhodnejších predmetov podnikania. Ako prvú zadajte hlavnú činosť podnikania.</div>
            <FormKit type="group" id="PredmetPodnikania" name="PredmetPodnikania">            
              <FormKit :type="multiSelVueForm" id="subjects_of_business" name="subjects_of_business" label="Predmet podnikania"
                :items="businessCategori"
                @input="priceForBusinessOfcategories"
                placeholder="Example placeholder"
                help="Môžete vybrať aj viac predmetov podnikania"
                validation="required"/>
            </FormKit>
            <div>Cena za zavolené predmety podnikania: {{abc}}</div>
          </section>
          <!-- Podnikatelské údaje -->
          <section v-show="activeStep === 'Podnikatelské údaje'">
            <div class="text-4xl font-bold">Vaše osobné a podnikatelské údaje</div>
            <div class="my-2">Na tomto mieste zadajte prosím vaše údje.</div>
            <div class="flex space-x-4">
            <FormKit class="" type="group" id="Podnikatelské údaje" name="Podnikatelské údaje">
              <FormKit type="text" name="meno" label="Meno" validation="required" />
              <FormKit type="text" label="Priezvisko" help="Môžete vybrať aj viac predmetov podnikania" validation="required" />
            </FormKit>
            </div>
          </section>
          <!-- Fakturačné údaje -->
          <section v-show="activeStep === 'Fakturačné údaje'">
            <div class="text-4xl font-bold">Fakturačné údaje</div>
            <div class="my-2">Na nasledujúce údaje vám budeme odosielať faktúri.</div>
            <div class="flex space-x-4">
            <FormKit class="" type="group" id="Fakturačné údaje" name="Fakturačné údaje">
              <FormKit type="text" label="Meno" validation="required" />
              <FormKit type="text" label="Priezvisko" validation="required" />
              <FormKit type="text" label="Ulica" validation="required" />
              <FormKit type="text" label="Psč" validation="required" />
            </FormKit>
            </div>
          </section>
        </div>

            <!-- NEW: Adds Next / Previous navigation buttons. -->
            <div class="step-nav">
              <FormKit type="button" :disabled="activeStep == 'PredmetPodnikania'" @click="setStep(-1)" v-text="'Previous step'" />
              <FormKit type="button" class="next" :disabled="activeStep == 'Fakturačné údaje' " @click="setStep(1)" v-text="'Next step'"/>
            </div>

        <FormKit type="submit" label="Submit Application" :disabled="!valid" />

        <pre wrap>{{ value }}</pre>

      </FormKit>

    </div>
  </div>
</template>

<script setup lang="ts">

import store from "@/store";
import { ref, onBeforeMount, onMounted, watchEffect } from "vue";
import useSteps from "../components/forms/useStep";
import { createInput } from '@formkit/vue'
import formkitCustomMultiSelectVue from "@/components/forms/formkitCustomMultiSelect.vue";
import { getNode } from "@formkit/core";

const camel2title = (str: string) => str
  .replace(/([A-Z])/g, (match) => ` ${match}`)
  .replace(/^./, (match) => match.toUpperCase())
  .trim()

const { steps, visitedSteps, activeStep, setStep, stepPlugin } = useSteps()

const multiSelVueForm = createInput(formkitCustomMultiSelectVue, {
  props: ['items'],
})

const checkStepValidity = (stepName: any) => {
  return (steps[stepName].errorCount > 0 || steps[stepName].blockingCount > 0) && visitedSteps.value.includes(stepName)
}

let businessCategori = ref([
  {
  label: '' as string,
  value: '' as string
  }
])

onBeforeMount( () => {  

  store.dispatch("getAllSubjectOfBusiness")
  .then(res => {
    res.data.data.forEach((element: any) => {
      businessCategori.value.push({
        label: element.title,
        value: element
      })
    })

    businessCategori.value.shift()
    businessCategori.value = [ ...businessCategori.value ]

  })
    .catch(err => {
    // sucessMsg.value = false
    // errorMsg.value = err.response.data.errors // response data is from store actions
  })
})

let abc = ref(0);
function priceForBusinessOfcategories(){
  let val: any = getNode("PredmetPodnikania")?.value;
  let total = 0;
  if(val.subjects_of_business){
    val.subjects_of_business.forEach((element: any) => {
      total = total + element.price;
      console.log(element.price)
    });
  }
  abc.value = total
}

const submitApp = async (formData: any, node: any) => {
  console.log(formData)
  try {
    const res = await axios.post(formData)
    node.clearErrors()
    alert('Your application was submitted successfully!')
  } catch (err: any) {
    node.setErrors(err.formErrors, err.fieldErrors)
  }
}

// This is just a mock of an actual axios instance.
const axios = {
  post: (formData: any) => {
    return new Promise((resolve, reject) => {
      let response = { status: 200, formErrors: {} , fieldErrors: {} }
      if (formData.organizationInfo.org_name.toLowerCase().trim() !== 'formkit') {
        response = {
          status: 400,
          formErrors: ['There was an error in this form, please correct and re-submit to validate.'],
          fieldErrors: {
              'organizationInfo.org_name': 'Organization Name must be "FormKit", we tricked you!'
          }
        }
      }
      setTimeout(() => {
        if (response.status === 200) {
          resolve(response)
        } else {
          reject(response)
        }
      }, 1500)
    })
    
  }
}
</script>