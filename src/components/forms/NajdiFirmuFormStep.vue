<template>
  <div class="text-4xl font-bold mb-6">Ako prvé zadajte IČO vašej firmy</div>
  <FormKit
    name="Spoločnosť"
    type="autocomplete"
    label="IČO spoločnosti"
    placeholder="Zadajte IČO spoločnosti"
    value="54639425"
    :options="search"
    validation="required|length:6"
    empty-message="Subjekt nebol nájdený, zadajte správne ičo."
    v-model="companyFromOsRs"
  >
    <template #option="{ option }">
      <div class="formkit-option grow p-2">
        <div class="font-bold">{{ option.label }}, {{ option.city }}</div>
      </div>
    </template>
  </FormKit>
  <div v-if="companyFromOsRs?.obchodne_meno" class="flex flex-col space-y-4 last:mb-4">
    {{companyFromOsRs}}
    Konateliaaa: {{ konateliaFromOrSr }}
    Konatelia lenght {{ konateliaFromOrSr?.length }}
    <br><b>New Konatelia {{ newKonateliaList }}</b>
    <p>Newly added konatel {{ newlyAddedKonatelList }}</p>
    <!-- Nazov spolocnosti -->
    <EditItemForCompany title="Obchodné meno">
      <div class="grid grid-cols-2 items-center">
        <div>
          <h3 v-bind:class="{ 'text-cross': newCompanyFullName.newCompanyName != ''  }" class="text-lg">{{ companyFromOsRs?.obchodne_meno }}</h3>
          <h3 class="text-lg font-bold">{{ newCompanyFullName.newCompanyName + " " + newCompanyFullName.newCompanyPravForm}}</h3>
        </div>
        <div>
          <button @click.prevent="openEditCompanyName" class="bg-bizinix-teal p-2 rounded">Upraviť</button>
          <VueFinalModal
              :modal-id="modalIdAddOrEditCompanyName"
              display-directive="if"
              :clickToClose="false"
              :escToClose="false"
              :lockscroll="true"
              class="block md:flex md:justify-center md:items-center overflow-x-hidden overflow-y-auto"
              content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2"
            >
              <h3 class="text-white text-2xl">
                Obchodné meno
              </h3>
              <p class="text-white mb-4" >Obchodné meno nemôže byť totožné s už existujúcim. Názov si overte cez www.orsr.sk alebo www.rpo.sk. Čiarky, pomlčky, medzery, veľké/malé písmená a podobne nie sú dostatočným odlišovacím znakom.</p>
              <FormKit
                type="form"
                id="form_new_business_name" name="new_business_name"
                @submit="closeModalAndSaveOrEditCompanyName"
                :config="{ validationVisibility: 'live' }"
                submit-label="Pridať"
                #default="{ value, state: { valid } }"
                :actions="false"
              >
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <FormKit type="text" name="new_business_name" v-model="newCompanyFullName.newCompanyName" label="Nové obchodné meno" placeholder="Napíšte nové obchodné meno" validation="required|length:2" />
                  <FormKit type="select" name="pravnaForma" label="Právna forma" v-model="newCompanyFullName.newCompanyPravForm" placeholder="Vybrať"
                    :options="['s. r. o.', ', s. r. o.', ', spol. s r. o.']" validation="required"
                  />
                  </div>
                    <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
                    <button
                      class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
                      type="button"
                      @click.prevent="closeModalForCompanyName"
                    >
                      Zrušiť
                    </button>
                    <button
                      :disabled="!valid"
                      type="submit"
                      class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
                    >
                      Potvrdiť
                    </button>
                  </div>
              </FormKit>
            </VueFinalModal>         
              </div>
            </div>
    </EditItemForCompany>
    <!-- Sídlo -->    
    <EditItemForCompany title="Sídlo">
      <div class="grid grid-cols-2 items-center">
        <div>
          <h3 v-bind:class="{ 'text-cross': newHqAddress.country != '' || selectedVhqFromStore.name != null }" class="text-lg">{{ companyFromOsRs?.adresa.street + " " + companyFromOsRs?.adresa.number }}</h3>
          <h3 v-bind:class="{ 'text-cross': newHqAddress.city != '' || selectedVhqFromStore.name != null }" class="text-lg">{{ companyFromOsRs?.adresa.city + " " + companyFromOsRs?.adresa.zip }}</h3>
          <div v-if="obchodneSidloVirtuOrNormal == 'vlastnePrenajate'">
            <h3 class="text-lg font-bold">{{ newHqAddress.country + " " + newHqAddress.city  + " " + newHqAddress.psc + " " + newHqAddress.street + " " + newHqAddress.street_number }}</h3>
          </div>
          <div v-else>
            <h3 class="text-lg font-bold">{{ selectedVhqFromStore.name }}</h3>
          </div>
        </div>
        <div>
          <button @click="openEditSidlo" class="bg-bizinix-teal p-2 rounded">Upraviť</button>
          <VueFinalModal
              :modal-id="modalIdAddOrEditSidlo"
              display-directive="if"
              :clickToClose="false"
              :escToClose="false"
              :lockscroll="true"
              class="block md:flex md:justify-center md:items-center overflow-x-hidden overflow-y-auto"
              content-class="text-white flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2"
            >
                <h3 class="text-white text-2xl">
                  Sídlo
                </h3>
                <FormKit
                  type="form"
                  id="form_sidlo" name="new_sidlo"
                  @submit="closeModalAndSubmitOrEditSidlo"
                  :config="{ validationVisibility: 'live' }"
                  submit-label="Pridať"
                  #default="{ value, state: { valid } }"
                  :actions="false"
                >
                <FormKit type="radio" v-model="obchodneSidloVirtuOrNormal" label="O aké sídlo máte záujem?" name="obchodneSidloVirtuOrNormal"
                  :options="
                      [
                        { value: 'vlastnePrenajate', label: 'Vlastné alebo prenajaté' },
                        { value: 'virtualne', label: 'Virtuálne sídlo' }
                      ]"
                      validation="required"
                />
                  <div v-if="obchodneSidloVirtuOrNormal === 'vlastnePrenajate'">
                    <div class="grid grid-cols-3 gap-4">
                      <FormKit type="select" name="country" id="country" label="Štát" v-model="newHqAddress.country" placeholder="Vyberte štát"
                        :options="['Slovensko','Česká republika']" validation="required" validation-visibility="dirty"
                      />
                    <FormKit type="text" name="city" v-model="newHqAddress.city" label="Obec" validation="required" />
                    <FormKit type="text" name="psc" v-model="newHqAddress.psc" label="PSČ" validation="required" />
                    <FormKit type="text" name="street" v-model="newHqAddress.street" label="Ulica" validation="required" />
                    <FormKit type="text" name="street_number" v-model="newHqAddress.street_number" label="Súpisne číslo"
                      validation="require_one:street_number2"
                      help="Čislo pred lomítkom"
                    />
                    <FormKit type="text" name="street_number2" v-model="newHqAddress.street_number2" label="Orientačné číslo"
                      validation="require_one:street_number"
                      help="Čislo za lomítkom"
                    />
                    </div>
                    <div class="mb-4">
                      <p>
                        Na vytvorenie dokumentu "Súhlas vlastníka nehnuteľnosti" so zápisom nehnuteľnosti do obchodného registra ako sídla spoločnosti budeme potrebovať nasledovné údaje:
                      </p>
                    </div>
                    <div class="flex flex-col md:flex-row md:space-x-4">
                      <FormKit type="select" name="headquarters_type" id="headquarters_type_company" label="Druh priestoru"
                        v-model="headquarterInfo.headquarters_type" placeholder="Vyberte druh priestoru"
                        :options="[
                          { label: 'Nebytový priestor', value: 1 },
                          { label: 'Byt v bytovom dome', value: 2 },
                          { label: 'Iná budova', value: 3 },
                          { label: 'Rodinný dom', value: 4 },
                          { label: 'Samostatne stojaca garáž', value: 5 }
                        ]"
                        validation="required" validation-visibility="dirty"
                      />
                      <FormKit type="text" name="ownerName" v-model="headquarterInfo.owner_name" label="Vlastník priestoru" validation="required" />
                    </div>
                  </div>
                  <div v-if="obchodneSidloVirtuOrNormal === 'virtualne'">
                    <div class="flex flex-col md:flex-row gap-8 mb-4">
                          <div>
                            <div class="pb-8 font-bold text-lg w-full text-left"> Vyberte si sídlo</div>
                            <VirtualHqSlider></VirtualHqSlider>
                          </div>
                        </div>
                    <div v-if="!store.state.selectedVhq.name" class="my-4 flex items-center justify-between py-3 px-4 bg-red-500 text-white rounded">
                        <b>Prosím vyberte sídlo.</b>
                    </div>
                  </div>
                  <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
                    <button
                      class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
                      type="button"
                      @click.prevent="closeModalForSidlo"
                    >
                      Zrušiť
                    </button>
                    <button
                      :disabled="!valid || isNextButtonDisabledHq"
                      type="submit"
                      class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
                    >
                      Potvrdiť
                    </button>
                  </div>
                </FormKit>
              </VueFinalModal>         
              </div>
            </div>
    </EditItemForCompany>
    <!-- Konatelia -->
    <EditItemForCompany title="Konatelia">
      <div v-for="(konatelDiv, index ) in konateliaFromOrSr" :key="index" class="grid grid-cols-2 items-center space-y-4">
        <div>
          <h3 class="text-lg" :class="{ 'text-cross': checkHasChange(newKonateliaList[index]) }">{{ konatelDiv.name }}</h3>
          <div v-if="newKonateliaList[index] && checkHasChange(newKonateliaList[index]) && !checkCanceled(newKonateliaList[index])">
            <h3 class="text-lg font-bold">{{ newKonateliaList[index]?.title_before + " " + newKonateliaList[index]?.first_name + " " + newKonateliaList[index]?.last_name + " " +  newKonateliaList[index]?.title_after }} {{ newKonateliaList[index].has_change }}</h3>
            <h4 class="text-base">{{ newKonateliaList[index]?.city }}, {{ newKonateliaList[index]?.street }} {{ newKonateliaList[index]?.street_number }}/{{ newKonateliaList[index]?.street_number2 }}, {{ newKonateliaList[index]?.psc }}</h4>
            <h4 class="text-base">{{ newKonateliaList[index]?.country }} </h4>
          </div>  
        </div>
        <div class="flex space-x-4">
          <button @click="openEditKonatel(index)" :disabled="checkCanceled(newKonateliaList[index])" class="bg-bizinix-teal p-2 rounded disabled:bg-gray-600">Zmeniť údaje {{ index }}</button>
          <button @click="openEditCancelKonatel(index)" :disabled="checkCanceled(newKonateliaList[index])" class="bg-bizinix-teal p-2 rounded disabled:bg-gray-600">Odvolať konateľa {{ index }}</button>
          <button>
            <Tippy>
              <ReceiptRefundIcon @click.prevent="returnChangesBack(index)" class="h-7 w-h-7 text-bizinix-teal" aria-hidden="true" />
              <template #content>
                Vrátiť zmeny späť
              </template>
            </Tippy>
          </button>
        </div> 
      </div>
      <div v-for="(newlyAddedKonatel, index) in newlyAddedKonatelList" :key="index" class="grid grid-cols-2 items-center space-y-4">
        <div>
          <h3 :index="index" class="text-lg">{{ newlyAddedKonatel.title_before }} {{ newlyAddedKonatel.first_name }} {{ newlyAddedKonatel.last_name }} {{ newlyAddedKonatel.title_after }}</h3> 
          <h4 :index="index" class="text-base">{{ newlyAddedKonatel.title_before }} {{ newlyAddedKonatel.country }} {{ newlyAddedKonatel.city }}  {{ newlyAddedKonatel.street }} {{ newlyAddedKonatel.street_number }} {{ newlyAddedKonatel.street_number2 }}  {{ newlyAddedKonatel.psc }}</h4> 
        </div>
        <div class="flex space-x-4">
          <button @click="deleteNewKonatel(index)" class="bg-bizinix-teal p-2 rounded disabled:bg-gray-600">Zmazať konateľa {{ index }}</button>          
        </div>
      </div>
      <button @click="openAddKonatel()" class="bg-bizinix-teal mt-4 p-2 rounded">+ Pridať konateľa</button>
      <!-- Edit konatel -->
      <VueFinalModal
          :modal-id="modalIdAddOrEditKonatel"
          display-directive="if"
          :clickToClose="false"
          :escToClose="false"
          :lockscroll="true"
          class="block md:flex md:justify-center md:items-center overflow-x-hidden overflow-y-auto"
          content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2"
        >
        <div v-if="!addOperation">
          <h3 class="text-white text-2xl">Zmeniť osobné údaje konateľa</h3>
          <p class="text-white mb-4" >Zadajte nové údaje alebo prepíšte existujúce údaje tak, ako chcete, aby sa zapísali do obchodného registra</p>
          <small class="text-white">Pozor, všetky nové údaje musia byť už zapísané v občianskom preukaze.</small>
        </div>        
        <div v-else>
          <h3 class="text-white text-2xl">Pridať konateľa</h3>                    
        </div>
          <!-- get konatel via openEditKonatel and asign to form via property name="" -->
          <FormKit
            type="form"
            id="form_new_konatelia" name="new_konatelia"
            @submit="closeModalAndSubmitOrEditKonatel"
            :config="{ validationVisibility: 'live' }"
            submit-label="Pridať"
            #default="{ value, state: { valid } }"
            :actions="false"
            v-model="konatel"
          >
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FormKit type="text" name="first_name" label="Krstné meno" validation="required|length:2" />
            <FormKit type="text" name="last_name" label="Priezvisko" validation="required|length:2" />
            <FormKit type="date" style="color-scheme: dark;" name="date_of_birth" autocomplete="date_of_birth"
              label="Dátum narodenia" validation="required"
            />
            <FormKit type="select" name="gender" label="Pohlavie" placeholder="Vyberte pohlavie" :options="['Muž', 'Žena']"
              validation="required"
            />
            <FormKit type="text" name="title_before" label="Titul pred menom" />
            <FormKit type="text" name="title_after" label="Titul za menom" />
            <FormKit type="text" name="rodne_cislo" label="Rodné číslo" id="rodne_cislo"
              validation="required|length:9"
              validation-visibility="blur" />
            <FormKit type="select" name="country" label="Štát" placeholder="Vyberte štát"
              :options="['Slovenská republika', 'Česká republika']" validation="required" />
            <FormKit type="text" name="city" label="Mesto" validation="required" />
            <FormKit type="text" name="psc" label="PSČ" validation="required" />
            <FormKit type="text" name="street" label="Ulica" validation="required" />
            <FormKit type="text" name="street_number" label="Súpisne číslo" validation="require_one:street_number2" />
            <FormKit type="text" name="street_number2" label="Orientačné číslo" validation="require_one:street_number" />
            <FormKit v-if="addOperation" type="date" style="color-scheme: dark;" name="new_konatel_date_from" label="Vymenovať od" validation="required" />
          </div>
            <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
            <button
              class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
              type="button"
              @click.prevent="closeModalForKonatel"
            >
              Zrušiť
            </button>
            <button
              :disabled="!valid"
              type="submit"
              class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
            >
            Potvrdiť
            </button>
          </div>
          </FormKit>  
        </VueFinalModal>
        <!-- Odovlat konatela -->
        <VueFinalModal
          :modal-id="modalIdCancelKonatel"
          display-directive="if"
          :clickToClose="false"
          :escToClose="false"
          :lockscroll="true"
          class="block md:flex md:justify-center md:items-center overflow-x-hidden overflow-y-auto"
          content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2"
        >
          <h3 class="text-white text-2xl">Odvolať konateľa</h3>          
          <h3 class="text-white text-xl pb-4">{{ konatel?.title_before + " " + konatel.first_name + " " + konatel.last_name + " " + konatel?.title_after }}</h3>
          <FormKit
            type="form"
            id="form_cancel_konatelia" name="cancel_konatelia"
            @submit="closeModalAndSubmitCanceledKonatel"
            :config="{ validationVisibility: 'live' }"
            submit-label="Pridať"
            #default="{ value, state: { valid } }"
            :actions="false"
            v-model="konatel"            
          >
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormKit type="text" name="rodne_cislo" label="Rodné číslo" id="rodne_cislo_odvolat"
              validation="required|length:9"
            />
            <FormKit type="date" style="color-scheme: dark;" name="cancel_from_date"
              label="Odvolať od" validation="required"
            />
          </div>
            <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
            <button
              class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
              type="button"
              @click.prevent="closeModalForCancelKonatel"
            >
              Zrušiť
            </button>
            <button
              :disabled="!valid"
              type="submit"
              class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
            >
            Potvrdiť
            </button>
          </div>
          </FormKit>  
        </VueFinalModal>     
    </EditItemForCompany>
    <!-- Spolicnici -->
    <EditItemForCompany title="Spoločníci">
      <div class="grid grid-cols-2">
        <div v-for="(spolocnikDiv, index ) in spolocniciFromOrSr" :key="index" class="items-center space-y-4">
          <div>
            <span>{{ vyskyVkladovFromOrSr[index].splatene }} {{ vyskyVkladovFromOrSr[index].currency }} {{ calculatePercentageAtIndex(index) }}%</span>
            <ProgressBar :progress="calculatePercentageAtIndex(index)" />
            <h3 class="text-lg">{{ spolocnikDiv.name }}</h3>
            <h4 class="text-base">{{ spolocnikDiv.street }} {{ spolocnikDiv.number }}</h4>
            <h4 class="text-base">{{ spolocnikDiv.city }}</h4>
            <h4 class="text-base">{{ spolocnikDiv.country }}</h4>
            <button @click="openEditSpolocnik(index)" class="bg-bizinix-teal p-2 mt-2 rounded">Zmeniť údaje {{ index }}</button>
          </div>
        </div>
      </div>
      <!-- Edit Spolocnik Modal-->
        <VueFinalModal
          :modal-id="modalIdAddOrEditSpolocnik"
          display-directive="if"
          :clickToClose="false"
          :escToClose="false"
          :lockscroll="true"
          class="block md:flex md:justify-center md:items-center overflow-x-hidden overflow-y-auto"
          content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2"
        >
          <div v-if="!addOperation">
            <h3 class="text-white text-2xl">Zmeniť osobné údaje Spoločníka</h3>
            <p class="text-white mb-4" >Zadajte nové údaje alebo prepíšte existujúce údaje tak, ako chcete, aby sa zapísali do obchodného registra</p>
            <small class="text-white">Pozor, všetky nové údaje musia byť už zapísané v občianskom preukaze.</small>
          </div>        
          <div v-else>
            <h3 class="text-white text-2xl">Prevod podielu</h3>                    
          </div>
            <!-- get spolocnik via openEditSpolocnik and asign to form values via property name="" -->
            <FormKit
              type="form"
              id="form_new_spolocnici" name="new_spolocnici"
              @submit="closeModalAndSubmitOrEditSpolocnik"
              :config="{ validationVisibility: 'live' }"
              submit-label="Uložiť"
              #default="{ value, state: { valid } }"
              :actions="false"
              v-model="spolocnik"
            >
              <FormKit type="select" name="typ_zakladatela"
                label="Typ zakladateľa"
                :options="[
                  { value: 1, label: 'Fyzická osoba' },
                  { value: 2, label: 'Právnicka osoba' }
                ]"
                validation="required"
              />
                <div v-if="value.typ_zakladatela === 2" class="flex flex-col md:flex-row md:space-x-4">
                  <FormKit type="text" name="obchodne_meno" label="Obchodné meno" validation="required" />
                  <FormKit type="text" name="ico" label="IČO" />
                </div>
                <div v-if="value.typ_zakladatela != 2" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <FormKit type="text" name="first_name" label="Krstné meno" validation="required|length:2" />
                  <FormKit type="text" name="last_name" label="Priezvisko" validation="required|length:2" />
                  <FormKit type="date" style="color-scheme: dark;" name="date_of_birth" autocomplete="date_of_birth"
                    label="Dátum narodenia" validation="required" />
                  <FormKit type="select" name="gender" label="Pohlavie" placeholder="Vyberte pohlavie" :options="['Muž', 'Žena']"
                    validation="required"
                  />
                  <FormKit type="text" name="title_before" label="Titul pred menom" />
                  <FormKit type="text" name="title_after" label="Titul za menom" />
                  <FormKit type="text" name="rodne_cislo" label="Rodné číslo" id="rodne_cislo"
                    validation="required|length:9"
                    validation-visibility="blur"
                    />
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <FormKit type="select" name="country" label="Štát" placeholder="Vyberte štát"
                    :options="['Slovensko', 'Česká republika']" validation="required" />
                  <FormKit type="text" name="city" label="Mesto" validation="required" />
                  <FormKit type="text" name="psc" label="PSČ" validation="required" />
                  <FormKit type="text" name="street" label="Ulica" validation="required" />
                  <FormKit type="text" name="street_number" label="Súpisne číslo" validation="require_one:street_number2" />
                  <FormKit type="text" name="street_number2" label="Orientačné číslo" validation="require_one:street_number" />
                </div>
                <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
                  <button
                    class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
                    type="button"
                    @click.prevent="closeModalSpolocnik"
                  >
                    Zrušiť
                  </button>
                  <button
                    :disabled="!valid"
                    type="submit"
                    class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
                  >
                    Uložiť
                  </button>
                </div>
            </FormKit>  
        </VueFinalModal>
    </EditItemForCompany>
    <EditItemForCompany title="Spôsob konania konateľov">
    </EditItemForCompany>
    <EditItemForCompany title="Predmet podnikania">
    </EditItemForCompany>
    <EditItemForCompany title="Základné imanie">
    </EditItemForCompany>
    <EditItemForCompany title="Prokurista">
    </EditItemForCompany>
    <EditItemForCompany title="Iné zmeny">
    </EditItemForCompany>
  </div>
</template>

<script setup lang="ts">

import store from '@/store';
import { getNode } from '@formkit/core';
import { onBeforeMount, reactive, ref, computed, onMounted, onUnmounted, watch } from 'vue';
import type Company from '@/types/Company';
import { useVfm, VueFinalModal, useModal, useModalSlot } from 'vue-final-modal'
import EditItemForCompany from './EditItemForCompany.vue'
import { toast } from "vue3-toastify";
import type Address from '@/types/Address';
import VirtualHqSlider from '@/components/VirtualHqSlider.vue'
import type CompanyMemberKonatel from '@/types/CompanyMemberKonatel';
import { Tippy } from "vue-tippy";
import 'tippy.js/dist/tippy.css' // optional for styling
import { ReceiptRefundIcon } from '@heroicons/vue/24/outline'
import type CompanyMemberSpolocnik from '@/types/CompanyMemberSpolocnik';
import ProgressBar from '@/components/ProgressBar.vue';
import type KonatelFromOrSr from '@/types/FromOrSrParser/KonatelFromOrSr';
import type SpolocnikFromOrSr from '@/types/FromOrSrParser/SpolocnikFromOrSr';
import type ZakladneImanieFromOrSr from '@/types/FromOrSrParser/ZakladneImanieFromOrSr';
import type VyskaVkladuFromOrSr from '@/types/FromOrSrParser/VyskaVkladuFromOrSr';

// defineProps<{
//   indexKonatel: number
// }>()

const companyFromOsRs = ref();
const vfm = useVfm()
const modalIdAddOrEditCompanyName = Symbol('modalIdAddOrEditCompanyName')
const modalIdAddOrEditSidlo = Symbol('modalIdAddOrEditSidlo')
const modalIdAddOrEditKonatel = Symbol('modalIdAddOrEditKonatel')
const modalIdCancelKonatel = Symbol('modalICancelKonatel')
const modalIdCancelSpolocnik = Symbol('modalIdCancelSpolocnik')
const modalIdAddOrEditSpolocnik = Symbol('modalIdAddOrEditSpolocnik')
const loading = ref(true);
const subjects_of_business = ref<Company['subjects_of_business']>([]);
const selectedVhqFromStore = computed(() => store.getters.getSelectedVhq)

let addOperation = false;
let newCompanyFullName = reactive({
  newCompanyName: '',
  newCompanyPravForm: ''
})

let konatelIndex: number;
let konatelObject: CompanyMemberKonatel = {
  company_id: null,
  first_name: '',
  last_name: '',
  title_before: '',
  title_after: '',
  gender: '',
  rodne_cislo: '',
  date_of_birth: '',
  street: '',
  street_number: '',
  street_number2: '',
  country: '',
  obchodne_meno: '',
  city: '',
  psc: '',
  je_konatel: true,
  has_change: false,
  should_be_canceled: false,
  cancel_from_date: '',
  new_konatel_date_from: ''
};
let konatel = ref(konatelObject);

let spolocnikIndex: number;
let spolocnikObject: CompanyMemberSpolocnik = {
  company_id: null,
  first_name: '',
  last_name: '',
  title_before: '',
  title_after: '',
  gender: '',
  rodne_cislo: '',
  date_of_birth: '',
  street: '',
  street_number: '',
  street_number2: '',
  country: '',
  obchodne_meno: '',
  city: '',
  psc: '',
  has_change: false,
  nationality: '',
  je_zakladatel: true
};
let spolocnik = ref(spolocnikObject);

let newKonateliaList = ref<CompanyMemberKonatel[]>([]) // edited konatel
let newlyAddedKonatelList = ref<CompanyMemberKonatel[]>([]) // new added konatel
let newSpolocnikList = ref<CompanyMemberSpolocnik[]>([]) // edited spolocnik
let newlyAddedSpolocnikList = ref<CompanyMemberSpolocnik[]>([]) // new added spolocnil

let obchodneSidloVirtuOrNormal = ref("vlastnePrenajate")
let newHqAddress = ref({
  street: '',
  street_number: '',
  street_number2: '',
  city: '',
  psc: '',
  country: '',
} as Address)

let headquarterInfo = ref({
  name: '',
  description: '',
  headquarters_type: 0,
  owner_name: '',
  price: 0,
  registry: false,
  forwarding: false,
  scanning: false,
  shredding: false,
  is_virtual: false,
  img: '',
  address_id: 0
})

onMounted( () => {
  store.state.selectedVhq = {};
  store.state.selectedVhqPackage = {};  
})

onUnmounted(() => {
  store.state.selectedVhq = {};
  store.state.selectedVhqPackage = {};
})

async function search({ search }: any) {
  if (!search || search.length <= 5) return [];  
  
  try {
    const res = await store.dispatch("getCompanyFromOrsrByIco", search);
    console.log(res);
    return [{
      label: res.data.obchodne_meno,
      value: res.data,
      city: res.data.adresa.city
    }];
  } catch (err) {
    toast.error('Error: ' + err);
    return [];
  }
}

const konateliaFromOrSr = computed<KonatelFromOrSr[]>(() => {
  const konatelia = companyFromOsRs?.value.statutarny_organ.konateľ || companyFromOsRs?.value.statutarny_organ.konatelia || [];
  return konatelia.map(konatel => ({
    name: konatel.name, // replace with actual property
    street: konatel.street, // replace with actual property
    city: konatel.city, // replace with actual property
    country: konatel.country || 'Slovenská republika',
    number: konatel.number, // replace with actual property
    since: konatel.since, // replace with actual property
    zip: konatel.zip // replace with actual property
  }));
});

const spolocniciFromOrSr = computed<SpolocnikFromOrSr[]>(() => {  
  return companyFromOsRs.value.spolocnici.map((spolocnik: SpolocnikFromOrSr) => {
    // pravnicka osoba if function exist
    if (spolocnik.function) {
      return {
        function: spolocnik.function,
        name: spolocnik.function,
        street: spolocnik.name.split(" ")[0],
        city: spolocnik.street,
        country: spolocnik.city || 'Slovenská republika',
        number: '',
        since: spolocnik.since || ''
      }    
    }
    // fyzicka osoba if function not exist
    else {
      return {
        name: spolocnik.name,
        street: spolocnik.street || '',
        city: spolocnik.city || '',
        country: spolocnik.country || 'Slovenská republika',
        number: spolocnik.number || '',
        since: spolocnik.since || ''
      } 
    }
  })
});

const vyskyVkladovFromOrSr = computed<VyskaVkladuFromOrSr[]>(() => {
  return companyFromOsRs.value.vyska_vkladu?.map((vklad) => ({
    name: vklad.name || '',
    vklad: vklad.vklad || '',
    city: vklad.city || '',
    splatene: vklad.splatene || 0,
    currency: vklad.currency
  })) || [];
});

const zakladneImanieFromOrSr = computed<ZakladneImanieFromOrSr>(() => {
  const zakladne_imanie = companyFromOsRs.value.zakladne_imanie;
  return {
    imanie: zakladne_imanie.imanie,
    splatene: zakladne_imanie.splatene,
    currency: zakladne_imanie.currency,
  };
});


const calculatePercentages = () => {
  return vyskyVkladovFromOrSr.value.map(item => {
    if (item.vklad === zakladneImanieFromOrSr.value.splatene) {
      return '100%';
    } else {
      let percentage = (item.vklad / zakladneImanieFromOrSr.value.splatene) * 100;
      return `${percentage.toFixed(2)}%`;
    }
  });
};

const calculatePercentageAtIndex = (index: number) => {
  const item = vyskyVkladovFromOrSr.value[index];
  if (item.vklad === zakladneImanieFromOrSr.value.splatene) {
    return 100;
  } else {
    let percentage = (item.vklad / zakladneImanieFromOrSr.value.splatene) * 100;
    return Math.round(percentage);
  }
};

//#region company name
function openEditCompanyName() {
  vfm.open(modalIdAddOrEditCompanyName)
}

// submit form and close modal
function closeModalAndSaveOrEditCompanyName() {
  console.log("Calling submit function!")
  vfm.close(modalIdAddOrEditCompanyName)?.then(() => {
    console.log("then");
  })
}

function closeModalForCompanyName(){ 
  vfm.closeAll().then(() => {
  })
}
//#endregion

//#region sidlo
function openEditSidlo(){
  vfm.open(modalIdAddOrEditSidlo)
}

// submit form and close modal
function closeModalAndSubmitOrEditSidlo() {
  console.log("Calling submit function!")
  vfm.close(modalIdAddOrEditSidlo)?.then(() => {
    console.log("then");
  })
}

function closeModalForSidlo(){ 
  vfm.closeAll().then(() => {
  })
}
//#endregion

function getSpecificKonatel(index:number){
  
  let fullNameWithTitlesFromOrSr = nameComposerFromOrSr(konateliaFromOrSr.value[index].name);
  
  konatel.value.title_before = fullNameWithTitlesFromOrSr.title_before    
  konatel.value.first_name = fullNameWithTitlesFromOrSr.first_name
  konatel.value.last_name = fullNameWithTitlesFromOrSr.last_name
  konatel.value.title_after = fullNameWithTitlesFromOrSr.title_after
  
  konatel.value.rodne_cislo = ''
  konatel.value.date_of_birth = ''

  konatel.value.country = konateliaFromOrSr.value[index].country as string
  konatel.value.city = konateliaFromOrSr.value[index].city
  konatel.value.psc = konateliaFromOrSr.value[index].zip as string
  konatel.value.street = konateliaFromOrSr.value[index].street
  konatel.value.street_number = konateliaFromOrSr.value[index].number.split("/")[0]
  konatel.value.street_number2 = konateliaFromOrSr.value[index].number.split("/")[1]
  konatel.value.has_change = false;
  konatel.value.should_be_canceled = false;
  konatel.value.cancel_from_date = '';
  konatel.value.new_konatel_date_from = '';
}

//#region edit konatel
function openEditKonatel(index: number) {
  addOperation = false;
  vfm.open(modalIdAddOrEditKonatel)?.then(() => {  
    newKonateliaList.value.length = konateliaFromOrSr.value.length
    konatelIndex = index
    console.log("Lenght of newKonateliaList", newKonateliaList.value.length)
    // get current konatel if index exist if no then work with konatel
    if(newKonateliaList.value[index] !== undefined){
      konatel.value = newKonateliaList.value[index];
      console.log("if");
    } else {
      console.log("Start editing konatel orSr at index:", konatelIndex);
      getSpecificKonatel(index)
    }
  })
}

// submit form and close modal
function closeModalAndSubmitOrEditKonatel() {
  console.log("Calling submit function!")
  vfm.close(modalIdAddOrEditKonatel)?.then(() => {
    if(addOperation){
      addNewKonatelToList();
    } 
    else if(konatelIndex >= 0 && konatelIndex < newKonateliaList.value.length) {
      konatel.value.has_change = true;
      newKonateliaList.value[konatelIndex] = konatel.value;
    }
    else {
      console.error("No index in array");
    }
  })
}

function closeModalForKonatel(){ 
  vfm.closeAll().then(() => {
  })
}
//#endregion

//#region Cancel konatel
// open modal
function openEditCancelKonatel(index: number) {
  vfm.open(modalIdCancelKonatel)?.then(() => {
    newKonateliaList.value.length = konateliaFromOrSr.value.length
    konatelIndex = index
    getSpecificKonatel(index)
  })
}

// submit form and close modal
function closeModalAndSubmitCanceledKonatel() {
  console.log("Calling submit function Cancel Konatel!")
  vfm.close(modalIdCancelKonatel)?.then(() => {
    konatel.value.should_be_canceled = true;
    konatel.value.has_change = true;
    newKonateliaList.value[konatelIndex] = konatel.value
  })
}

function closeModalForCancelKonatel(){ 
  vfm.closeAll().then(() => {
  })
}
//#endregion

//#region  Add new konatel
function openAddKonatel() {
  addOperation = true;
  konatel.value = Object.assign({}, konatelObject);
  vfm.open(modalIdAddOrEditKonatel)?.then(() => {
  })
}

function addNewKonatelToList(){
  newlyAddedKonatelList.value.push(konatel.value)
}

//#endregion

function getSpecificSpolocnik(index:number){
  
  if(spolocniciFromOrSr.value[index].function){
    // prav osoba / firma
    spolocnik.value.typ_zakladatela = 2
    spolocnik.value.obchodne_meno = spolocniciFromOrSr.value[index].name
    spolocnik.value.ico = ''
  }
  else{
      // fiz osoba
    spolocnik.value.typ_zakladatela = 1
    let fullNameWithTitlesFromOrSr = nameComposerFromOrSr(spolocniciFromOrSr.value[index].name);  
    spolocnik.value.title_before = fullNameWithTitlesFromOrSr.title_before    
    spolocnik.value.first_name = fullNameWithTitlesFromOrSr.first_name
    spolocnik.value.last_name = fullNameWithTitlesFromOrSr.last_name
    spolocnik.value.title_after = fullNameWithTitlesFromOrSr.title_after
    spolocnik.value.rodne_cislo = ''
    spolocnik.value.date_of_birth = ''  
    spolocnik.value.gender = ''
  }
  spolocnik.value.country = spolocniciFromOrSr.value[index].country as string
  spolocnik.value.city = spolocniciFromOrSr.value[index].city
  spolocnik.value.psc = spolocniciFromOrSr.value[index].zip as string
  spolocnik.value.street = spolocniciFromOrSr.value[index].street
  spolocnik.value.street_number = spolocniciFromOrSr.value[index].number.split("/")[0]
  spolocnik.value.street_number2 = spolocniciFromOrSr.value[index].number.split("/")[1]
  spolocnik.value.has_change = false;  
}

//#region edit spolocnik
function openEditSpolocnik(index: number){
  addOperation = false; 
  vfm.open(modalIdAddOrEditSpolocnik)?.then(() => {
    newSpolocnikList.value.length = spolocniciFromOrSr.value.length;
    spolocnikIndex = index;
    console.log("Length of newSpolocnikList", newSpolocnikList.value.length)
    // get current konatel if index exist if no then work with konatel
    if(newSpolocnikList.value[index] !== undefined){
      spolocnik.value = newSpolocnikList.value[index];
      console.log("if");
    } else {
      console.log("Start editing spolocnik orSr at index:", spolocnikIndex);
      getSpecificSpolocnik(index)
    }
  })
}

function closeModalAndSubmitOrEditSpolocnik(){
  vfm.close(modalIdAddOrEditSpolocnik)?.then(() => {
    // to do    
    spolocnik.value.has_change = true;
  })
}

function closeModalSpolocnik(){
  vfm.closeAll();
}

//#endregion

const isNextButtonDisabledHq = computed(() => {
  if(obchodneSidloVirtuOrNormal.value === 'virtualne'){
    if(!selectedVhqFromStore.value.name) {
      return true
    }
  } else {
    return false
  }
})

watch(obchodneSidloVirtuOrNormal, (newValue) => {
  if(newValue === 'vlastnePrenajate'){
    store.state.selectedVhq = {};
    store.state.selectedVhqPackage = {};
  }
})

function checkHasChange(item: CompanyMemberKonatel | CompanyMemberSpolocnik ): boolean {
  if (item && item.has_change === true) {
    return true;
  } else {
    return false;
  }
}

function checkCanceled(item: CompanyMemberKonatel): boolean {
  if (item && item.should_be_canceled === true) {
    return true;
  } else {
    return false;
  }
}

function returnChangesBack(index: number){
  let fullNameWithTitlesFromOrSr = nameComposerFromOrSr(konateliaFromOrSr.value[index].name);
  newKonateliaList.value[index].title_before = fullNameWithTitlesFromOrSr.title_before
  newKonateliaList.value[index].first_name = fullNameWithTitlesFromOrSr.first_name
  newKonateliaList.value[index].last_name = fullNameWithTitlesFromOrSr.last_name
  newKonateliaList.value[index].title_after = fullNameWithTitlesFromOrSr.title_after  

  newKonateliaList.value[index].country = konateliaFromOrSr.value[index].country as string
  newKonateliaList.value[index].city = konateliaFromOrSr.value[index].city
  newKonateliaList.value[index].psc = konateliaFromOrSr.value[index].zip as string
  newKonateliaList.value[index].street = konateliaFromOrSr.value[index].street
  newKonateliaList.value[index].street_number = konateliaFromOrSr.value[index].number.split("/")[0]
  newKonateliaList.value[index].street_number2 = konateliaFromOrSr.value[index].number.split("/")[1]
  // set hasChange back to false
  newKonateliaList.value[index].has_change = false
  newKonateliaList.value[index].cancel_from_date = ''
  newKonateliaList.value[index].new_konatel_date_from = ''
  newKonateliaList.value[index].should_be_canceled = false
  // no values from orsr
  newKonateliaList.value[index].date_of_birth = ''
  newKonateliaList.value[index].rodne_cislo = ''
  newKonateliaList.value[index].gender = ''
}

function nameComposerFromOrSr(fullNameWithTitleFromOrSr: string) {  
  let fullName: string[] = fullNameWithTitleFromOrSr.split(" ");
  
  let fullNameWithTitle = {
    title_before: '',
    first_name: '',
    last_name: '',
    title_after: ''    
  };

  if(fullName.length === 3 && fullName[0].includes(".")) {
    // Case when there is a title before the name and no title after
    fullNameWithTitle.title_before = fullName[0];
    fullNameWithTitle.first_name = fullName[1];
    fullNameWithTitle.last_name = fullName[2];
  } else if(fullName.length >= 4 && fullName[0].includes(".") && !fullName[1].includes(".")) {
    // Case when there is a title before the name and a title after
    fullNameWithTitle.title_before = fullName[0];
    fullNameWithTitle.first_name = fullName[1];
    fullNameWithTitle.last_name = fullName[2];
    fullNameWithTitle.title_after = fullName[3] || '' + '' + ' ' + fullName[4] || '' + ' ' + fullName[5] || '';
  } else if(fullName.length >= 4 && fullName[0].includes(".") && fullName[1].includes(".")) {
    // Case when there are two titles before the name
    fullNameWithTitle.title_before = fullName[0] + " " +  fullName[1];
    fullNameWithTitle.first_name = fullName[2];
    fullNameWithTitle.last_name = fullName[3];
    fullNameWithTitle.title_after = fullName[4] || '' + ' ' + fullName[5] || '' + + ' ' + fullName[6] || ''; // Use empty string if no title after
  } else {
    // Case when there are no titles
    fullNameWithTitle.first_name = fullName[0];
    fullNameWithTitle.last_name = fullName[1];
  }
  return fullNameWithTitle;
}

function deleteNewKonatel(index: number){
  newlyAddedKonatelList.value.splice(index, 1);
}


function compareArraysAtIndex(array1FromOrSr: any[], array2: any[], index: number): boolean {
  let fullName: string[] = array1FromOrSr[index].name.split(" ");    
  if (array1FromOrSr[index] && array2[index]) {
    console.log("Full name", fullName)
    console.log("Full lenght", fullName.length)
    if(fullName.length == 3 && fullName[0].includes(".") == true){
      //index 0 title index 3 title after
      return fullName[1] !== array2[index].first_name || fullName[2] !== array2[index].last_name;
    }
    else if(fullName.length >= 4 && fullName[0].includes(".") == true && fullName[1].includes(".") == false){
      //index 0,1 title index 4 title after
      return fullName[1] !== array2[index].first_name || fullName[2] !== array2[index].last_name;
    } 
    else if(fullName.length >= 4 && fullName[0].includes(".") == true && fullName[1].includes(".") == true){
      //index 0,1 title index 4 title after
      return fullName[2] !== array2[index].first_name || fullName[3] !== array2[index].last_name;
    }  
    else {
      //index 0 first name index 1 last name
      return fullName[0] !== array2[index].first_name || fullName[1] !== array2[index].last_name;
    }
  } else {
    console.info('Index out of bounds or item does not exist');
    return false;
  }
}
defineExpose({
})

</script>

<style scoped>
.text-cross {
  text-decoration: line-through;
}
</style>