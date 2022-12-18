<template>
  <div class="bg-no-repeat bg-cover" style="background-image:linear-gradient(0deg, rgba(36,36,39,0.9332107843137255) 40%, rgba(0,0,0,0.29735644257703087) 100%), url('../src/assets/zalozenie-fimy-bg.png') ">
    <div class="max-w-7xl flex h-[80vh] items-center mx-auto py-20 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
      <div class="max-w-full">
        <h2 class="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Založenie s.r.o. za 199 €</h2>
        <p class="mt-8 mb-8 text-2xl text-white">Zaregistrujte alebo upravte svoju spoločnosť rýchlo, z domu a za najmenšie ceny na trhu.<br>Cena obsahuje aj štátne poplatky v hodnote 150€.</p>
        <div class="mt-8 text-white">
          <div class="font-bold text-4xl">Čaka nás</div>
          <div class="mt-2">
            <ul class="list-disc list-inside">
              <li>Vyplnenie formulárov</li>
              <li>Platba</li>
              <li>Podpísanie a overenie dokumentov</li>
              <li>Registrácia spoločnosti</li>
              <li>Podnikanie</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="hidden md:block md:max-w-xs lg:max-w-md">
        <img src="@/assets/robot.png">
      </div>
    </div>
  </div>
  <div class="py-6 bg-gray-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-800">
      <h2 class="text-center text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Poďme na to</h2>
      <div>
        <div v-if="errorMsg" class="mb-4 flex items-center justify-between py-3 px-4 bg-red-500 text-white rounded">
          {{ errorMsg }}
          <span @click="errorMsg=''" class="rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
          </span>
        </div>
        <div v-if="sucessMsg" class="mb-4 flex items-center justify-between py-3 px-4 bg-green-500 text-white rounded">
          {{ sucessMsg }}
          <span @click="sucessMsg=''" class="rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
          </span>
        </div>
      </div>

      <FormKit type="form" id="zalSpolocnostiForm"
        #default="{ value, state: { valid } }"
        :plugins="[stepPlugin]"
        @submit="submitApp"
        :actions="false"
      >
        <!-- Zoznam krokov list steps -->
        <div class="flex items-center justify-center">
          <ul class="steps m-8 list-none flex flex-col md:flex-row space-x-8 cursor-pointer">
            <li v-for="(step, stepName) in steps" :class="['step px-4 py-5 my-1', { 'has-errors': checkStepValidity(stepName) }]" @click="activeStep = stepName.toString()"
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
              <FormKit :type="multiSelVueForm" id="subjects_of_business" v-model="companyOrZivnostModel.subjects_of_business" name="subjects_of_business" label="Predmet podnikania" autocomplete="off"
                :items="businessCategori"
                @input="priceForBusinessOfcategories"
                placeholder="Example placeholder"
                help="Môžete vybrať aj viac predmetov podnikania."
                validation="required"/>
            </FormKit>
            <div>Cena za zavolené predmety podnikania: {{priceForBusinessCategories}}</div>
          </section>
          <section v-show="activeStep === 'ObchodnéSídlo'">
            <div class="text-4xl font-bold">Vyberte si sídlo spoločnosti</div>
            <div class="mt-2 mb-6">Na tomto mieste vám pomôžeme s výberom sídla spoločnosti.</div>
            <FormKit type="group" id="ObchodnéSídlo" name="ObchodnéSídlo">
              <FormKit type="radio" v-model="obchodneSidlo" label="O aké sídlo máte záujem" name="obchodneSidlo"
              :options="
                  [
                    { value: 'vlastnePrenajate', label: 'Vlastné alebo prenajaté' },
                    { value: 'virtualne', label: 'Virtuálne' }
                  ]"
                  validation="required" />
              <div v-if="obchodneSidlo === 'vlastnePrenajate'">
                <div class="grid grid-cols-3 gap-4">
                  <FormKit type="select" name="country" id="country" label="Štát" v-model="sidloCompanyAddress.country" placeholder="Vyberte štát"
                    :options="['Slovensko','Česká republika']" validation="required" validation-visibility="dirty"
                  />
                <FormKit type="text" name="city" v-model="sidloCompanyAddress.city" label="Obec" validation="required" />
                <FormKit type="text" name="psc" v-model="sidloCompanyAddress.psc" label="PSČ" validation="required" />
                <FormKit type="text" name="street" v-model="sidloCompanyAddress.street" label="Ulica" validation="required" />
                <FormKit type="text" name="street_number" v-model="sidloCompanyAddress.street_number" label="Súpisne číslo" validation="required" />
                <FormKit type="text" name="street_number2" v-model="sidloCompanyAddress.street_number2" label="Orientačné číslo" validation="required" />
                </div>
                <div class="mb-4">
                  <p>
                    Na vytvorenie dokumentu "Súhlas vlastníka nehnuteľnosti" so zápisom nehnuteľnosti do obchodného registra ako sídla spoločnosti budeme potrebovať nasledovné údaje:
                  </p>
                </div>
                <div class="flex flex-col md:flex-row md:space-x-4">
                  <FormKit type="select" name="headquarters_type" id="headquarters_type" label="Druh priestoru" v-model="sidloCompanyAddress.country" placeholder="Vyberte druh priestoru"
                    :options=headquartersTypes validation="required" validation-visibility="dirty"
                  />
                  <FormKit type="text" name="ownerName" v-model="sidloCompanyAddress.ownerName" label="Vlastník priestoru" validation="required" />
                </div>
            </div>
            </FormKit>
          </section>
          <section v-show="activeStep === 'Údaje o spoločnosti'">
            <div class="text-4xl font-bold">Vyplnte udaje o spoločnosti</div>
            <div class="mt-2 mb-6">vyplnte zakladne udaje a pridajte zakladatelov (spoločnikov) a konatelov.</div>
            <FormKit type="group" id="Údaje o spoločnosti" name="Údaje o spoločnosti">
              <FormKit type="text" name="name" v-model="companyOrZivnostModel.name" label="Názov spoločnosti" />
              <h2 class="text-xl my-4">Základné imanie </h2>
              <div class="grid grid-cols-2 gap-4 my-4">
                <FormKit type="number" name="vyska" label="Výška €" validation="required"
                help="Od 1.1.2016 finančné prostriedky do výšky 5000 eur nemusia byť vkladané ná účet v banke. Minimálna výška základného imania pri s.r.o. je podľa zákona 5000,- Eur. Môžete zadať aj viac."
                />
                <FormKit type="number" name="rozsah_splatenia" label="Rozsah splatenia €" validation="required"
                  help="Od 1.1.2016 finančné prostriedky do výšky 5000 eur nemusia byť vkladané ná účet v banke. V prípade jediného zakladateľa musí byť základné imanie splatené v plnom rozsahu, teda 5000 eur (100%). Ak je zakladateľov viac, rozsah splatenia základného imania postačí vo výške 2500 eur."
                />
              </div>
              <!-- Spoločníci -->
              <FormKit id="repeater_spolocnici" name="members_spolocnici" type="repeater" label="Zakladatelia (Spoločníci)"
                v-model="zakladateliaSpolocnici.members"
                add-label="Pridať zakladateľa (spoločníka) +" :down-control="false" :up-control="false"
                #default="{ index, value }"
              >
                <FormKit type="select" name="typ_zakladatela" id="typ_zakladatela" label="Typ zakladateľa" placeholder="Vyberte typ zakladateľa"
                    :options="[{value: 1, label: 'Fyzická osoba' }, {value: 2, label: 'Právnicka osoba' }]" validation="required" validation-visibility="dirty"
                  />
                <div v-if="value.typ_zakladatela === 2" class="flex flex-col md:flex-row md:space-x-4">
                  <FormKit type="text" name="obchodne_meno" label="Obchodné meno" validation="required" />
                  <FormKit type="text" name="ico" label="IČO" validation="required" />
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <FormKit type="text" name="first_name" label="Krstné meno" validation="required|length:2" />
                  <FormKit type="text" name="last_name" label="Priezvisko" validation="required|length:2" />
                  <FormKit type="date" name="date_of_birth" autocomplete="date_of_birth" label="Dátum narodenia" validation="required|length:10" />
                  <FormKit type="select" name="gender" label="Pohlavie" placeholder="Vyberte pohlavie"
                    :options="['Muž','Žena']" validation="required" validation-visibility="dirty"
                  />
                  <FormKit type="select" name="typ_dokladu_totoznosti" label="Typ dokladu totožnosti" placeholder="Vyberte typ dokladu ttožnosti"
                    :options="['Občiansky preukaz','Cestovný pas','Vodičský preukaz']" validation="required" validation-visibility="dirty"
                  />
                  <FormKit type="text" name="cislo_dokladu_totoznosti" label="Číslo dokladu totožnosti" validation="required|length:5" />
                  <FormKit type="text" name="title_before" label="Titul pred menom" />
                  <FormKit type="text" name="title_after" label="Titul za menom" />
                  <FormKit type="text" name="rodne_cislo" label="Rodné číslo" validation="required|length:10" />
                  <FormKit type="select" name="country" label="Štát" placeholder="Vyberte štát"
                    :options="['Slovensko','Česká republika']" validation="required" validation-visibility="dirty"
                  />
                  <FormKit type="text" name="city" label="Mesto" validation="required" />
                  <FormKit type="text" name="psc" label="PSČ" validation="required" />
                  <FormKit type="text" name="street" label="Ulica" validation="required" />
                  <FormKit type="text" name="street_number" label="Súpisne číslo" validation="required" />
                  <FormKit type="text" name="street_number2" label="Orientačné číslo" validation="required" />
                </div>
                <div class="my-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <FormKit type="number" name="vyska_vkladu" label="Výška vkladu €" validation="required" help="Zadajte hodnotu napr. 1000 alebo 0" />
                  <FormKit type="number" name="podiel_v_spolocnosti" label="Podiel v spoločnosti %" validation="required" help="Zadajte hodnotu 0 - 100" />
                  <FormKit type="number" name="rozsah_splatenia_vkladu" label="Rozsah splatenia vkladu €" validation="required" help="Zadajte hodnotu napr. 3000 alebo 0" />
                </div>
                <div>
                  <FormKit type="checkbox" name="je_konatel" label="Tento zakladateľ (spoločník) bude aj konateľom" validation-visibility="dirty" />
                  <FormKit type="checkbox" name="je_spravca_vkladu" :value="true" label="Tento zakladateľ (spoločník) bude aj správcom vkladu" validation-visibility="dirty" />
                </div>
              </FormKit>
              <!-- Konatelia -->
              <FormKit id="repeater_konatelia" name="members_konatelia" type="repeater" label="Konatelia"
                v-model="konatelia.members"
                add-label="Pridať konateľa +" :down-control="false" :up-control="false"
              >
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <FormKit type="text" name="first_name" label="Krstné meno" validation="required|length:2" />
                  <FormKit type="text" name="last_name" label="Priezvisko" validation="required|length:2" />
                  <FormKit type="date" name="date_of_birth" autocomplete="date_of_birth" label="Dátum narodenia" validation="required|length:10" />
                  <FormKit type="select" name="gender" label="Pohlavie" placeholder="Vyberte pohlavie"
                    :options="['Muž','Žena']" validation="required" validation-visibility="dirty"
                  />
                  <FormKit type="text" name="title_before" label="Titul pred menom" />
                  <FormKit type="text" name="title_after" label="Titul za menom" />
                  <FormKit type="text" name="rodne_cislo" label="Rodné číslo" validation="required|length:10" />
                  <FormKit type="select" name="country" label="Štát" placeholder="Vyberte štát"
                    :options="['Slovensko','Česká republika']" validation="required" validation-visibility="dirty"
                  />
                  <FormKit type="text" name="city" label="Mesto" validation="required" />
                  <FormKit type="text" name="psc" label="PSČ" validation="required" />
                  <FormKit type="text" name="street" label="Ulica" validation="required" />
                  <FormKit type="text" name="street_number" label="Súpisne číslo" validation="required" />
                  <FormKit type="text" name="street_number2" label="Orientačné číslo" validation="required" />
                </div>
              </FormKit>
              <div class="my-4">
                <FormKit v-model="companyOrZivnostModel.konecny_uzivatelia_vyhod" type="radio" label="Konečným užívateľom výhod sú" 
                  :options="{ 1: 'Spoločníci/zakladatelia', 2: 'Iné osoby' }" name="konecny_uzivatelia_vyhod"
                  validation="required"
                />
                <div v-if="companyOrZivnostModel.konecny_uzivatelia_vyhod == 2" class="mt-2">
                  <FormKit
                    type="textarea"
                    label="Iné osoby"
                    placeholder="Uveďte mená a priezviská, adresu bydliska, dátum narodenia, rodné číslo, číslo pasu alebo občianskeho preukazu."
                    help="Uveďte mená a priezviská, adresu bydliska, dátum narodenia, rodné číslo, číslo pasu alebo občianskeho preukazu."
                    rows="3"
                  />
                </div>
              </div>
              <div class="my-4">
                <FormKit v-model="companyOrZivnostModel.sposob_konania_konatelov" type="radio" label="Spôsob konania konateľov"
                  :options="{ 1: 'V mene spoločnosti koná a podpisuje každý konateľ samostatne', 2: 'V mene spoločnosti konajú všetci konatelia spoločne', 3: 'Iné' }"
                  name="sposob_konania_konatelov"
                  validation="required"
                />
                <div v-if="companyOrZivnostModel.sposob_konania_konatelov == 3" class="mt-2">
                  <FormKit
                    type="textarea"
                    label="Iný spôsov konania konateľov"
                    rows="3"
                  />
                </div>
              </div>
            </FormKit>
          </section>
          <!-- Podnikatelské údaje -->
          <section v-show="activeStep === 'Podnikatelské údaje'">
            <div class="text-4xl font-bold">Vaše osobné a podnikatelské údaje</div>
            <div class="my-2">Na tomto mieste zadajte prosím vaše údje.</div>
            <div>
              <FormKit type="group" id="Podnikatelské údaje" name="Podnikatelské údaje">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                  <FormKit type="text" name="first_name" v-model="user.first_name" id="first_name" label="Krstné meno" validation="required|length:2" />
                  <FormKit type="text" name="last_name" v-model="user.last_name" label="Priezvisko" validation="required|length:2" />
                  <FormKit type="select" label="Pohlavie" v-model="user.gender" placeholder="Vyberte pohlavie" name="gender" id="gender" :options="['Muž','Žena']" validation="required" validation-visibility="dirty"/>
                </div>
                <div class="flex flex-col md:flex-row md:space-x-4">
                  <FormKit type="checkbox" :ignore="true" v-model="hasTitle" label="Máte titul pred alebo za menom?" id="hasTitle" name="hasTitle" />
                  <div v-show="hasTitle" class="grid grid-cols-2 gap-4">
                    <FormKit type="text" name="title_before" v-model="user.title_before" label="Titul pred menom" />
                    <FormKit type="text" name="title_after" v-model="user.title_after" label="Titul za menom" />
                  </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <FormKit type="text" name="phone" v-model="user.phone" autocomplete="phone" label="Telefonné číslo" validation="required|length:9" />
                  <FormKit type="date" name="date_of_birth" v-model="user.date_of_birth" autocomplete="date_of_birth" label="Dátum narodenia" validation="required|length:10" />
                  <FormKit type="text" name="rodne_cislo" v-model="user.rodne_cislo" label="Rodné číslo" validation="required|length:10" />
                </div>
                <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <FormKit type="text" name="city" v-model="userAddress.city" label="Mesto" validation="required" />
                  <FormKit type="select" name="country" id="userCountry" label="Štát" v-model="userAddress.country" placeholder="Vyberte štát"
                    :options="['Slovensko','Česká republika']" validation="required" validation-visibility="dirty"
                  />
                  <FormKit type="text" name="psc" v-model="userAddress.psc" label="PSČ" validation="required" />
                  <FormKit type="text" name="street" v-model="userAddress.street" label="Ulica" validation="required" />
                  <FormKit type="text" name="street_number" v-model="userAddress.street_number" label="Súpisne číslo" validation="required" />
                  <FormKit type="text" name="street_number2" v-model="userAddress.street_number2" label="Orientačné číslo" validation="required" />
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <FormKit type="email" name="email"
                    v-model="user.email"
                    label="Email"
                    :validation-rules="{ emailIsUnique }"
                    validation="required|email|emailIsUnique"
                    :validation-messages="{ emailIsUnique: 'E-mail sa už používa!'}"
                    validation-visibility="live"                  
                    help="Email ktorý budete používať aj na prihlasenie do účtu."
                  />
                  <FormKit type="password" autocomplete="new-password" v-model="user.password" name="password" label="Heslo" validation="required|length:8" />
                  <FormKit type="password" autocomplete="new-password"  v-model="user.password_confirmation" name="password_confirmation" label="Zopakujte heslo" validation="required|confirm:password" />
                </div>
                <div class="grid grid-cols-1 gap-4">
                  <div class="font-bold">Miesto podnikania?</div>
                  <FormKit type="checkbox" v-model="placeOfBusinness" :ignore="true" :disabled="true" label="Totožné s trvalým bydliskom?" name="placeOfBusinness" />
                </div>
                <div class="flex flex-col md:flex-row md:space-x-4">
                  <FormKit type="radio" v-model="companyRegDateCheckboxValue" :ignore="true" label="Registrácia živnosti ku dňu?"
                  :options="[{ value: 'Nezáleží', label: 'Nezáleží' }, { value: 'Podľa dátumu', label: 'Podľa dátumu' }]" name="companyRegDateCheckbox"
                  validation="required" />
                  <div v-if="companyRegDateCheckboxValue === 'Podľa dátumu'">
                    <FormKit type="date" name="registration_date" v-model="companyOrZivnostModel.registration_date" autocomplete="off" label="Dátum zápisu do živnostenského registra" validation="required" />
                  </div>
                </div>
              </FormKit>
            </div>
          </section>
          <!-- Fakturačné údaje -->
          <section v-show="activeStep === 'Fakturačné údaje'">
            <div class="text-4xl font-bold">Fakturačné údaje</div>
            <div class="my-2">Na nasledujúce údaje vám budeme odosielať faktúri.</div>
            <div>
              <FormKit type="group" v-model="fakturacne_udaje" id="Fakturačné údaje" name="Fakturačné údaje">
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
                <FormKit type="text" name="first_name" label="Meno" validation="required" />
                <FormKit type="text" name="last_name" label="Priezvisko" validation="required" />
                <FormKit type="checkbox" v-model="invoiceAddressIsSame" :ignore="true" :disabled="true" label="Fakturačná adresa je rovnaká ako podnikateľská?" name="invoiceAddressIsSame" />
                </div>
                <div class="w-fit">
                  <FormKit type="checkbox" v-model="orderingAsCompany" :ignore="true" label="Objednávate ako firma?" id="orderingAsCompany" name="orderingAsCompany" />
                </div>
                <div v-show="orderingAsCompany" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <FormKit type="text" name="name" label="Názov firmy" />
                    <FormKit type="text" name="ico" label="IČO" />
                    <FormKit type="text" name="dic" label="DIČ" />
                    <FormKit type="text" name="ic_dph" label="IČ DPH" />
                </div>

                <div class="w-full">
                  <FormKit type="radio" v-model="paymentOptions" label="Spôsob platby?" name="payment_method"
                  :options="
                  [
                    { value: 'iban', label: 'Priamy vklad na účet', help: 'Pošlite vašu platbu priamo na náš bankový účet, ktorý nájdete na ďakovnej stránke po dokončení objednávky.' },
                    { value: 'stripe', label: 'Online kartou', help: 'Platba prostredníctvom platobnej brány Stripe.' }
                  ]"
                  validation="required" />
                </div>

              </FormKit>
            </div>
          </section>
        </div>

        <div class="flex my-2 justify-center space-x-4">
          <FormKit type="button" :disabled="activeStep == 'PredmetPodnikania'" @click="setStep(-1)" v-text="'Previous step'" />
          <FormKit type="button" class="next" :disabled="activeStep == 'Fakturačné údaje' " @click="setStep(1)" v-text="'Next step'"/>
        </div>

        <FormKit type="submit" label="Objednať s povinnosťou platby" :disabled="!valid" />
        <button class="bg-fuchsia-500 p-2 rounded-md" @click="logujData">Loguj dáda</button> 
        <pre wrap>{{ value }}</pre>

      </FormKit>

    </div>
  </div>
</template>

<script setup lang="ts">

import store from "@/store";
import { ref, onBeforeMount, onMounted } from "vue";
import useSteps from "@/components/forms/useStep";
import { createInput } from '@formkit/vue'
import formkitCustomMultiSelectVue from "@/components/forms/formkitCustomMultiSelect.vue";
import router from "@/router";
import type User from "@/@types/User";

const hasTitle = ref(false);
const hasTitleZakladatel = ref(false);
const invoiceAddressIsSame = ref(true);
const placeOfBusinness = ref(true);
const dateOfRegisterCompany = ref(true);
const orderingAsCompany = ref(false);
let errorMsg = ref('');
let errorMsgHq = ref('');
let errorMsgCompany = ref('');
let sucessMsg = ref('');
let addressFromResponse: any, userFromResponse: any, hqFromResponse: any, companyFomResponse: any, orderFromRes: any;

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
    value: ''
  }
])

let headquartersTypes = ref([
  {
    label: '' as string,
    value: ''
  }
])

let companyRegDateCheckboxValue = ref("")
let paymentOptions = ref("")
let obchodneSidlo = ref("")

let priceForBusinessCategories = ref(0);

let zakladateliaSpolocnici = ref({
  members: [{
    company_id: 0,
    obchodne_meno: '',
    ico: '',
    typ_zakladatela: 0, // 1 Fyz Osoba, 2 Prav Osoba
    first_name: '',
    last_name: '',
    title_before: '',
    title_after: '',
    gender: '',
    date_of_birth: '',
    rodne_cislo: '',
    street: '',
    street_number: '',
    street_number2: '',
    city: '',
    psc: '',
    country: '',
    typ_dokladu_totoznosti: '',
    cislo_dokladu_totoznosti: '',
    vyska_vkladu: 0,
    podiel_v_spolocnosti: 0,
    rozsah_splatenia_vkladu: 0,
    je_spravca_vkladu: true,
    je_zakladatel: false,
    je_konatel: false
  }]
})

let konatelia = ref({
  members: [{
    company_id: 0,
    first_name: '',
    last_name: '',
    title_before: '',
    title_after: '',
    gender: '',
    date_of_birth: '',
    rodne_cislo: '',
    street: '',
    street_number: '',
    street_number2: '',
    city: '',
    psc: '',
    country: '',
    je_konatel: true
  }]
})

let fakturacne_udaje = ref({
  first_name: '',
  last_name: '',
  name: '',
  ico: '',
  dic: '',
  ic_dph: '',
  address_id: 12
  // to do address id
})
let userAddress = ref({
  street: '',
  street_number: '',
  street_number2: '',
  city: '',
  psc: '',
  country: '',
})
let sidloCompanyAddress = ref({
  street: '',
  street_number: '',
  street_number2: '',
  city: '',
  psc: '',
  country: '',
  ownerName: ''
})
let user = ref({
    address_id: 0, // address should be created first and save to store
    first_name: '',
    last_name: '',
    title_before: '',
    title_after: '',
    gender: '',
    phone: '',
    date_of_birth: '',
    rodne_cislo: '',
    email: '',
    password: '',
    password_confirmation: ''
} as User)
let companyOrZivnostModel = ref({
  name: '',
  headquarters_id: 0,
  type: 1, // type 1 sro, type 2 živnosť
  status: 2, // Zakladanie spoločnosti je v priebehu
  ičo: '',
  dič: '',
  icdph: '',
  is_dph: false,
  registration_date: '',
  owner: 0,
  konecny_uzivatelia_vyhod: 0,
  sposob_konania_konatelov: 0,
  subjects_of_business: [],
})
let headquarter = ref({
  name: '',
  description: 'test',
  headquarters_type: 1, // 1 Nebytový priestor, 2 Byt, 3 iná budova, 4 rod dom, 5 Samost stoj garaž
  owner_name: '',
  price: 0,
  registry: false,
  forwarding: false,
  scanning: false,
  shredding: false,
  is_virtual: false,
  img: 'test',
  address_id: 0
})

let order = ref({
  payment_date: '' as any,
  payment_method: '',
  description: 'test',
  amount: 20, // final cena s dph
  amount_vat: 3.33, // vat je čisto len dph
  is_paid: false,
  address_id: 0,
  user_id: 0,
  company_id: 0,
  is_tos_accepted: true,
  is_advocate_requested: true,
  items: [
    {
      description: "Založenie firmy",
      price: 20, // finalna cena za polozku s dph
      price_vat: 3.33 // toto je len dph
    }
  ],
  fakturacne_udaje: [{
    first_name: '',
    last_name: '',
    name: '',
    ico: '',
    dic: '',
    ic_dph: '',
    address_id: ''
  }]
})

onBeforeMount( () => {
  store.dispatch("getAllSubjectOfBusiness")
  .then(res => {
    businessCategori.value.shift()
    res.data.data.forEach((element: any) => {
      businessCategori.value.push({
        label: element.title,
        value: element
      })
    })

    //businessCategori.value.shift()
    //businessCategori.value = [ ...businessCategori.value ]

  })
    .catch(err => {
    // sucessMsg.value = false
    // errorMsg.value = err.response.data.errors // response data is from store actions
  })

  store.dispatch("getHeadquartersTypes")
  .then(res => {
    headquartersTypes.value.shift()
    res.data.data.forEach((element: any) => {
      headquartersTypes.value.push({
        value: element.id,
        label: element.name
      })
    });
  })
})

function logujData(){
  console.log(companyOrZivnostModel.value.subjects_of_business)
  console.log(userAddress.value)
  console.log(user.value)
  console.log(headquarter.value)
  console.log(companyOrZivnostModel.value)
  console.log(fakturacne_udaje.value)
  console.log(paymentOptions.value)
  console.log(zakladateliaSpolocnici.value)
  console.log(konatelia.value)
}

function priceForBusinessOfcategories(){
  //let val: any = getNode("PredmetPodnikania")?.value;
  let total = 0;  
  if(companyOrZivnostModel.value.subjects_of_business){
    companyOrZivnostModel.value.subjects_of_business.forEach((element: any) => {
      total = total + element.price;
      console.log(element.price)
    });
  }
  priceForBusinessCategories.value = total
}

/* Submiting form and Api calls */

function registerAddress(): Promise<Response>  {
  return store.dispatch('registerAddress', userAddress.value)
    .then((res) => {
      console.log("Registering address: " + JSON.stringify(res))
      addressFromResponse = res
      return addressFromResponse
    })
    .catch(err => {
      errorMsg.value = JSON.stringify(err.response.data.errors) // response data is from store actions
    })
}

function registerUser(): Promise<Response>  {

  user.value.address_id = addressFromResponse.address_id

  return store.dispatch('registerUser', user.value) // dispatch -> register action in store
      .then((res) => {
          sucessMsg.value = "E-mail na aktiváciu účtu bol odoslaný. Prosím skontrolujte si svoju schránkú, alebo priečinok nevyžiadanej pošty."
          userFromResponse = res
          console.log("Registering user: " + JSON.stringify(res))
          return userFromResponse
      })
  .catch(err => {
    errorMsg.value = JSON.stringify(err.response.data.errors) // response data is from store actions
  })
}

function addHeadquarter(): Promise<Response> {
  headquarter.value.owner_name = user.value.first_name + " " + user.value.last_name

  if(placeOfBusinness.value){
    headquarter.value.name = 'Rovnaký názov ako moja trvalá adresa'
  }
  else {
    headquarter.value.name = 'Iný názov'
  }

  headquarter.value.address_id = addressFromResponse.address_id

  return store.dispatch('addHeadquarter', headquarter.value)
  .then((res) => {
    console.log("Adding hq: " + JSON.stringify(res))
    hqFromResponse = res.headquarters
    return hqFromResponse
  })
  .catch(err => {
    console.log(err.response.data.errors)
    errorMsg.value = JSON.stringify(err.response.data.errors);
  })
}

function addCompany(): Promise<Response> {

  companyOrZivnostModel.value.owner = userFromResponse.user_id
  companyOrZivnostModel.value.headquarters_id = hqFromResponse.id

  return store.dispatch('addCompany', companyOrZivnostModel.value)
  .then((res) => {
    console.log("Adding company: " + JSON.stringify(res))
    companyFomResponse = res
    console.log("Company from Res " + JSON.stringify(companyFomResponse))
    return companyFomResponse
  }).catch( err => {
    console.log(err)
  })
}

function addMultipleCompanyMembersSpolocnici(): Promise<Response> {

  zakladateliaSpolocnici.value.members.forEach((item, index: any) => {
    zakladateliaSpolocnici.value.members[index].company_id = companyFomResponse.company.id
  })

  return store.dispatch('addMultipleCompanyMembers', zakladateliaSpolocnici.value)
  .then((res) => {
    console.log("Adding Multiple Company Members Spolocnici: " + JSON.stringify(res))
    let multipleCompanyMembersFromResponse = res
    console.log("Multiple Company Members Spolocnici from response  " + JSON.stringify(multipleCompanyMembersFromResponse))
    return multipleCompanyMembersFromResponse
  }).catch( err => {
    console.log(err)
    })
}

function addMultipleCompanyMembersKonatelia(): Promise<Response> {

  konatelia.value.members.forEach((item, index: any) => {
    konatelia.value.members[index].company_id = companyFomResponse.company.id
  })

  return store.dispatch('addMultipleCompanyMembers', konatelia.value)
  .then((res) => {
    console.log("Adding Multiple Company Members Konatelia: " + JSON.stringify(res))
    let multipleCompanyMembersFromResponse = res
    console.log("Multiple Company Members Konatelia from response  " + JSON.stringify(multipleCompanyMembersFromResponse))
    return multipleCompanyMembersFromResponse
  }).catch( err => {
    console.log(err)
    })
}

function addOrder(): Promise<Response> {
  order.value.payment_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  order.value.payment_method = paymentOptions.value
  order.value.company_id = companyFomResponse.company.id
  order.value.user_id = userFromResponse.user_id
  order.value.address_id = addressFromResponse.address_id


  order.value.fakturacne_udaje[0].first_name = fakturacne_udaje.value.first_name
  order.value.fakturacne_udaje[0].last_name = fakturacne_udaje.value.last_name
  order.value.fakturacne_udaje[0].dic = fakturacne_udaje.value.dic
  order.value.fakturacne_udaje[0].ic_dph = fakturacne_udaje.value.ic_dph
  order.value.fakturacne_udaje[0].ico = fakturacne_udaje.value.ico
  if(invoiceAddressIsSame.value){
    order.value.fakturacne_udaje[0].address_id = addressFromResponse.address_id
  }

  return store.dispatch('addOrder', order.value)
  .then((res) => {
    console.log("Adding order: " + JSON.stringify(res))
    orderFromRes = res.order
    return orderFromRes
  })
  .catch( err => {
    console.log(err.response.data )
  })
}

async function isEmailAlreadyRegistered(node: any) {
  try {
    const res = await store.dispatch("isEmailAlreadyRegistered", node);
    console.log(res);
    return true;
  }
  catch (error) {
    return false;
  }
}

async function emailIsUnique(node: any){
  const result = await isEmailAlreadyRegistered(node.value)
  return result
}


const submitApp = async (formData: any, node: any) => {

  console.log(formData)
  try {    
    registerAddress().then(() => {
        registerUser().then(() => {
          if(userFromResponse){
            addHeadquarter().then(() => {
              addCompany().then(() => {
                addMultipleCompanyMembersSpolocnici().then(() => {
                  addMultipleCompanyMembersKonatelia()
                  addOrder().then(() => {
                    userFromResponse = null
                    hqFromResponse = null
                    companyOrZivnostModel.value.owner = 0
                    companyOrZivnostModel.value.headquarters_id = 0
                    console.log("SUPER!")
                    router.push({
                      name:"Thanks You New Order",
                      params: {
                        orderId: orderFromRes.id,
                      }
                    })
                  })
                })
              })
            })
          }
        })
    })
    node.clearErrors()
    // alert('Your application was submitted successfully!')

  }
  catch (err: any) {
    node.setErrors(err.formErrors, err.fieldErrors)
  }

}

// // This is just a mock of an actual axios instance.
// const axios = {
//   post: (formData: any) => {
//     return new Promise((resolve, reject) => {
//       let response = { status: 200, formErrors: {} , fieldErrors: {} }
//       if (formData.organizationInfo.org_name.toLowerCase().trim() !== 'formkit') {
//         response = {
//           status: 400,
//           formErrors: ['There was an error in this form, please correct and re-submit to validate.'],
//           fieldErrors: {
//               'organizationInfo.org_name': 'Organization Name must be "FormKit", we tricked you!'
//           }
//         }
//       }
//       setTimeout(() => {
//         if (response.status === 200) {
//           resolve(response)
//         } else {
//           reject(response)
//         }
//       }, 1500)
//     })
    
//   }
// }
</script>