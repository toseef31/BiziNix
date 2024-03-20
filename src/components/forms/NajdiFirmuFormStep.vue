<template>
  <div class="text-4xl font-bold mb-6">Ako prvé zadajte IČO vašej firmy</div>
  <FormKit
    name="Spoločnosť"
    type="autocomplete"
    label="IČO spoločnosti"
    placeholder="Zadajte IČO spoločnosti"
    value="45633461"
    :options="search"
    validation="required|length:6"
    empty-message="Subjekt nebol nájdený, zadajte správne ičo."
    v-model="companyFromOrSr"
  >
    <template #option="{ option }">
      <div class="formkit-option grow p-2">
        <div class="font-bold">{{ option.label }}, {{ option.city }}</div>
      </div>
    </template>
  </FormKit>
  <div v-if="companyFromOrSr?.obchodne_meno" class="flex flex-col space-y-4 last:mb-4">
    {{companyFromOrSr}}
    Konateliaaa: {{ konateliaFromOrSr }}
    Konatelia lenght {{ konateliaFromOrSr?.length }}
    <br><b>New Konatelia {{ newKonateliaList }}</b>
    <p>Newly added konatel {{ newlyAddedKonatelList }}</p>
    <!-- Nazov spolocnosti -->
    <EditItemForCompany title="Obchodné meno">
      <div class="grid grid-cols-2 items-center">
        <div>
          <h3 v-bind:class="{ 'text-cross': newCompanyFullName.newCompanyName != ''  }" class="text-lg">{{ companyFromOrSr?.obchodne_meno }}</h3>
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
          <h3 v-bind:class="{ 'text-cross': newHqAddress.country != '' || selectedVhqFromStore.name != null }" class="text-lg">{{ companyFromOrSr?.adresa.street + " " + companyFromOrSr?.adresa.number }}</h3>
          <h3 v-bind:class="{ 'text-cross': newHqAddress.city != '' || selectedVhqFromStore.name != null }" class="text-lg">{{ companyFromOrSr?.adresa.city + " " + companyFromOrSr?.adresa.zip }}</h3>
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
      <div v-if="newlyAddedKonatelList.length" v-for="(newlyAddedKonatel, index) in newlyAddedKonatelList" :key="index" class="grid grid-cols-2 items-center space-y-4">
        <div>
          <h3 :index="index" class="text-lg">{{ newlyAddedKonatel.title_before }} {{ newlyAddedKonatel.first_name }} {{ newlyAddedKonatel.last_name }} {{ newlyAddedKonatel.title_after }}</h3> 
          <h4 :index="index" class="text-base">{{ newlyAddedKonatel.country }} {{ newlyAddedKonatel.city }}  {{ newlyAddedKonatel.street }} {{ newlyAddedKonatel.street_number }} {{ newlyAddedKonatel.street_number2 }}  {{ newlyAddedKonatel.psc }}</h4> 
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
        <div v-if="!addOperationKonatel">
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
            <FormKit v-if="addOperationKonatel" type="date" style="color-scheme: dark;" name="new_konatel_date_from" label="Vymenovať od" validation="required" />
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
            <h3 :class="{ 'text-cross': checkHasChange(newSpolocnikList[index]) }" class="text-lg">{{ spolocnikDiv.name }}</h3>
            <h4 :class="{ 'text-cross': checkHasChange(newSpolocnikList[index]) }" class="text-base">{{ spolocnikDiv.street }} {{ spolocnikDiv.number }}</h4>
            <h4 :class="{ 'text-cross': checkHasChange(newSpolocnikList[index]) }" class="text-base">{{ spolocnikDiv.city }}</h4>
            <h4 :class="{ 'text-cross': checkHasChange(newSpolocnikList[index]) }" class="text-base">{{ spolocnikDiv.country }}</h4>
            <div
              v-if="newSpolocnikList[index] && checkHasChange(newSpolocnikList[index])"
              class="flex flex-row items-center"
            >
              <div>
                <h3 class="text-lg font-bold">{{ (newSpolocnikList[index]?.title_before || '') + " " + (newSpolocnikList[index]?.first_name || '') + " " + (newSpolocnikList[index]?.last_name || '') + " " +  (newSpolocnikList[index]?.title_after || '') }} {{ newSpolocnikList[index]?.obchodne_meno || '' }} {{ newSpolocnikList[index]?.has_change || '' }}</h3>
                <h4 class="text-base">{{ newSpolocnikList[index]?.city || '' }}, {{ newSpolocnikList[index]?.street || '' }} {{ newSpolocnikList[index]?.street_number || '' }}/{{ newSpolocnikList[index]?.street_number2 || '' }}, {{ newSpolocnikList[index]?.psc || '' }}</h4>
                <h4 class="text-base">{{ newSpolocnikList[index]?.country || '' }} </h4>
              </div>
              <div>
                <button>
                  <Tippy>
                    <ReceiptRefundIcon @click.prevent="returnChangesBackSpolocnici(index)" class="h-7 w-h-7 text-bizinix-teal" aria-hidden="true" />
                    <template #content>
                      Vrátiť zmeny späť
                    </template>
                  </Tippy>
                </button>
              </div>
            </div>  
            <div class="flex flex-col mt-2 space-y-4">
              <button @click.prevent="openEditSpolocnik(index)" class="bg-bizinix-teal p-2 mr-4 rounded">Zmeniť údaje {{ index }}</button>
              <button @click.prevent="openPreviestPodielSpolocnika(index)" class="bg-bizinix-teal mr-4 p-2 mt-2 rounded">Previesť/zrušIť podiel {{ index }}</button>            
            </div>
          </div>
        </div>
      </div>
      <!-- New added spolicnici -->
      <div v-if="newlyAddedSpolocnikList.length" v-for="(newSpolocnik, index ) in newlyAddedSpolocnikList" :key="index" class="grid grid-cols-2 items-center space-y-4 mt-4">
        <div>
          <span>{{ newSpolocnik.rozsah_splatenia_vkladu }} {{ calculatePercentageAtIndex(index) }}%</span>
          <ProgressBar :progress="calculatePercentageAtIndex(index)" />
          <h3 class="text-lg font-bold">{{ (newSpolocnik.title_before || '') + " " + (newSpolocnik.first_name || '') + " " + (newSpolocnik.last_name || '') + " " +  (newSpolocnik.title_after || '') }} {{ newSpolocnik.obchodne_meno || '' }}</h3>
          <h4 class="text-base">{{ newSpolocnik.city || '' }}, {{ newSpolocnik.street || '' }} {{ newSpolocnik.street_number || '' }}/{{ newSpolocnik.street_number2 || '' }}, {{ newSpolocnik.psc || '' }}</h4>
          <h4 class="text-base">{{ newSpolocnik.country || '' }} </h4>
        </div>
        <div class="flex space-x-4">
          <button @click="deleteNewSpolocnik(index)" class="bg-bizinix-teal p-2 rounded disabled:bg-gray-600">Zmazať spoločníka {{ index }}</button>          
        </div>
      </div>
      <div class="mt-4 pt-2 border-t border-t-gray-700">
        {{ newSharesTransfersList }}
        <div>Selected nadobudatel: {{ selectedNadobudatel }}</div>
        <div>Newly added spolicnici {{ newlyAddedSpolocnikList }}</div>
        <button @click.prevent="openAddSpolocnik" class="bg-bizinix-teal p-2 mr-4 rounded">+ Pridať spoločníka cez navýšenie základného imania</button>        
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
          <div v-if="!addOperationSpolocnik && !isPrevodPodielu">
            <h3 class="text-white text-2xl">Zmeniť osobné údaje Spoločníka</h3>
            <p class="text-white mb-4" >Zadajte nové údaje alebo prepíšte existujúce údaje tak, ako chcete, aby sa zapísali do obchodného registra</p>
            <small class="text-white">Pozor, všetky nové údaje musia byť už zapísané v občianskom preukaze.</small>
          </div>
          <div v-if="addOperationSpolocnik">
            <h3 class="text-white text-2xl">Pridať spoločníka (bez prevodu obchodného podielu)</h3>
          </div>        
          <div v-if="isPrevodPodielu">
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
              <!-- Prevod podielu -->
              <div class="text-white" v-if="isPrevodPodielu">
                Spolocnik index {{ spolocnikIndex }}<br>
                Selected nabodudatel {{ selectedNadobudatel }}<br>
                <br><div>{{ nadobudatelia }}</div>
                <FormKit type="select" v-model="selectedNadobudatel" name="transfer_from" label="Vyberte zo zoznamu nadobúdateľa" validation="required"
                  :options="nadobudatelia"                
                />
              </div>
              <div v-if="addOperationSpolocnik">
                <div class="text-white my-4">Nový spoločník preberá vklad do základného imania spoločnosti vo výške</div>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <FormKit type="number" name="vyska_vkladu" label="Výška vkladu" validation="required|min:750" />
                  <FormKit type="number" name="podiel_v_spolocnosti" label="Podiel v spoločnosti" validation="required" />
                  <FormKit type="number" name="rozsah_splatenia_vkladu" label="Rozsah splatenia vkladu" validation="required|min:750" />
                </div>
              </div>
              <div v-if="selectedNadobudatel == 'Iná osoba' || !isPrevodPodielu">
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
              </div>
              <div v-if="isPrevodPodielu">
                <FormKit v-model="mnozstvoPodielu" type="radio" label="Mňožstvo podielu" validation="required"
                :options="[
                    { value: 'fullTransfer', label: 'Vsetko' },
                    { value: 'partialTransfer', label: 'Časť obchodného podielu' }
                  ]"
                />
                <div v-if="mnozstvoPodielu == 'partialTransfer'">
                  <FormKit type="text" v-model="prevodPodieluFromTo.amount" label="Čast podielu v EUR" />
                </div>
                <div class="flex flex-row space-x-4">
                  <FormKit type="text" v-model="prevodPodieluFromTo.priceForTransfer" label="Cena za prevod obch. podielu" validation="required" />
                  <FormKit
                    type="select"
                    label="Mena"
                    v-model="prevodPodieluFromTo.currency"
                    :options="[
                      { value: 'EUR', label: 'EUR'},
                      { value: 'CZK', label: 'CZK (Kč)'},
                      { value: 'USD', label: 'USD ($)'}
                    ]"
                  /> 
                </div>                  
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
      <div class="grid grid-cols-2 items-center">
        <div>
          <h3 v-bind:class="{ 'text-cross': [1, 2, 3].includes(sposob_konania_konatelov_selected) }" class="text-lg">{{ companyFromOrSr.konanie_menom_spolocnosti }}</h3>
          <h3 class="text-lg font-bold">{{ sposoby_konania_konatelov_options[sposob_konania_konatelov -1 ]?.label }}</h3>
          <h3 v-if="sposob_konania_konatelov_selected == 3" class="text-lg font-bold">{{ sposob_konania_konatelov_ine }}</h3>
        </div>
        <div>
          <button @click.prevent="openEditSposobKonania" class="bg-bizinix-teal p-2 rounded">Zmeniť</button>
        </div>
      </div>
      <VueFinalModal
        :modal-id="modalIdAddOrEditSposobKonania"
        display-directive="if"
        :clickToClose="false"
        :escToClose="false"
        :lockscroll="true"
        class="block md:flex md:justify-center md:items-center overflow-x-hidden overflow-y-auto"
        content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2"
      >
        <h3 class="text-white text-2xl">
          Spôsob konania konateľov
        </h3>
        <FormKit
          type="form"
          id="form_new_spolocnici" name="new_spolocnici"
          @submit="closeModalAndSubmitEditSposobKonania"
          :config="{ validationVisibility: 'live' }"
          submit-label="Uložiť"
          #default="{ value, state: { valid } }"
          :actions="false"
        >      
          <div class="my-4">
            <FormKit v-model="sposob_konania_konatelov" type="radio" label="Spôsob konania konateľov"
              :options="sposoby_konania_konatelov_options" name="sposob_konania_konatelov" validation="required" />
            <div v-if="sposob_konania_konatelov == 3" class="mt-2">
              <FormKit v-model="sposob_konania_konatelov_ine" type="textarea" label="Iný spôsov konania konateľov" rows="3" />
            </div>
          </div>
          <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
            <button
              class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
              type="button"
              @click.prevent="cancelModalEditSposobKonanie"
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
    <EditItemForCompany title="Predmet podnikania">
    </EditItemForCompany>
    <EditItemForCompany title="Základné imanie">
      <div class="flex items-center space-x-4">
        <div>Zakladné imanie {{ zakladneImanieFromOrSr.splatene }} EUR</div>        
        <button @click.prevent="openChangeZakladneImanie" class="bg-bizinix-teal p-2 rounded disabled:bg-gray-600">Zmeniť údaje</button>
      </div>
      <div class="flex flex-row mt-3" v-for="(zakladneImanie, index) in newZakladneImanie" :key="index">
        <div>{{ zakladneImanie.change_for }} {{ zakladneImanie.operation }} {{ zakladneImanie.value }} €</div> <button @click.prevent="() => newZakladneImanie.splice(index, 1)">Zrušiť</button>
      </div>
      <VueFinalModal
        :modal-id="modalIdChangeZakladneImanie"
        display-directive="if"
        :clickToClose="false"
        :escToClose="false"
        :lockscroll="true"
        class="block md:flex md:justify-center md:items-center overflow-x-hidden overflow-y-auto"
        content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2"
      >
        <h3 class="text-white text-2xl">
          Základné imanie
        </h3>
        <FormKit
          type="form"
          id="form_change_zakladne_imanie" name="change_zakladne_imanie"
          @submit="closeAndSubmitChangeZakladneImanie"
          :config="{ validationVisibility: 'live' }"
          submit-label="Uložiť"
          #default="{ value, state: { valid } }"
          :actions="false"
        >      
          <div class="my-4 space-y-2">
            <FormKit v-model="zakladne_imanie" type="radio" label="Základné imanie"
              :options="zakladne_imanie_options" name="zakladne_imanie" validation="required"
            />
            <FormKit type="select" label="Vyberte zo zoznamu SPOLOČNÍKA"
              v-model="selected_spolocnik_for_imanie"
              :options="zakladne_imanie_spolocnici_options"
              validation="required"
            />
            <FormKit v-if="zakladne_imanie === '+'" v-model="zakladne_imanie_hodnota" type="text" label="Hodnota o ktorú chcete zvýšiť (+)" validation="required" />
            <FormKit v-if="zakladne_imanie === '-'" v-model="zakladne_imanie_hodnota" type="text" label="Hodnota o ktorú chcete znížiť (-)" validation="required" />
          </div>
          <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
            <button
              class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
              type="button"
              @click.prevent="cancelModalChangeZakladneImanie"
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
          <pre wrap>{{ value }}</pre>
        </FormKit>    
      </VueFinalModal>   
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
import type SharesTransfers from '@/types/editCompany/SharesTransfers';
import { includes, split, values } from 'lodash';

// defineProps<{
//   indexKonatel: number
// }>()

const companyFromOrSr = ref();
const vfm = useVfm()
const modalIdAddOrEditCompanyName = Symbol('modalIdAddOrEditCompanyName')
const modalIdAddOrEditSidlo = Symbol('modalIdAddOrEditSidlo')
const modalIdAddOrEditKonatel = Symbol('modalIdAddOrEditKonatel')
const modalIdCancelKonatel = Symbol('modalICancelKonatel')
const modalIdCancelSpolocnik = Symbol('modalIdCancelSpolocnik')
const modalIdAddOrEditSpolocnik = Symbol('modalIdAddOrEditSpolocnik')
const modalIdAddOrEditSposobKonania = Symbol('modalIdAddOrEditSposobKonania')
const modalIdChangeZakladneImanie = Symbol('modalIdChangeZakladneImanie')
const loading = ref(true);
const subjects_of_business = ref<Company['subjects_of_business']>([]);
const selectedVhqFromStore = computed(() => store.getters.getSelectedVhq)

let addOperationKonatel = false;
let isPrevodPodielu = false;
let addOperationSpolocnik = false;
let zakladne_imanie = ref("+")
let zakladne_imanie_selected = ref()

let zakladne_imanie_hodnota = ref()
let selected_spolocnik_for_imanie = ref()
let zakladne_imanie_spolocnici_options = ref([
  { label: '', value: ''}
])
let zakladne_imanie_options  = ref([
  { label: 'Znížiť', value: '-' },
  { label: 'Zvýšiť', value: '+'}
]);
let newZakladneImanie = ref([
  { change_for: '', operation: '', value: null as number | null }
]);

let sposob_konania_konatelov = ref()
let sposob_konania_konatelov_selected = ref()
let sposob_konania_konatelov_ine = ref()
let sposoby_konania_konatelov_options  = ref([
  { label: 'V mene spoločnosti koná a podpisuje každý konateľ samostatne', value: '1' },
  { label: 'V mene spoločnosti konajú všetci konatelia spoločne', value: '2'},
  { label: 'Iné', value: '3'}
]);

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
  typ_zakladatela: '',
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
  je_zakladatel: true,
  vyska_vkladu: 0,
  podiel_v_spolocnosti: 0,
  rozsah_splatenia_vkladu: 0,
};
let spolocnik = ref(spolocnikObject);
let mnozstvoPodielu = ref('fullTransfer');
let prevodPodieluFromTo = ref({
  from: '',
  to: '',
  amount: '',
  percentageOfAmount: 0,
  fullTransfer: false,
  partialTransfer: false,
  priceForTransfer: '',
  currency: 'EUR'
});

let newKonateliaList = ref<CompanyMemberKonatel[]>([]) // edited konatel
let newlyAddedKonatelList = ref<CompanyMemberKonatel[]>([]) // new added konatel
let newSpolocnikList = ref<CompanyMemberSpolocnik[]>([]) // edited spolocnik
let newlyAddedSpolocnikList = ref<CompanyMemberSpolocnik[]>([]) // new added spolocnil
let newSharesTransfersList = ref<SharesTransfers[]>([])
let obchodneSidloVirtuOrNormal = ref("vlastnePrenajate")
let selectedNadobudatel = ref();
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

let nadobudatelia = computed(() => [
  {
    label: '',
    value: '' as string | Object,
  }
]);

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
  const konatelia = companyFromOrSr?.value.statutarny_organ.konateľ || companyFromOrSr?.value.statutarny_organ.konatelia || [];
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
  return companyFromOrSr.value.spolocnici.map((spolocnik: SpolocnikFromOrSr) => {
    // pravnicka osoba if function exist
    if (spolocnik.function) {
      return {
        function: spolocnik.function,
        name: spolocnik.function as string,
        street: spolocnik.name.split(" ")[0],
        city: spolocnik.street,
        country: spolocnik.city || 'Slovenská republika',
        number: '',
        psc: spolocnik.zip || '',
        since: spolocnik.since || ''
      }    
    }
    // fyzicka osoba if function not exist
    else {
      return {
        name: spolocnik.name  as string,
        street: spolocnik.street || '',
        city: spolocnik.city || '',
        country: spolocnik.country || 'Slovenská republika',
        number: spolocnik.number || '',
        psc: spolocnik.zip || '',
        since: spolocnik.since || ''
      } 
    }
  })
});

const vyskyVkladovFromOrSr = computed<VyskaVkladuFromOrSr[]>(() => {
  return companyFromOrSr.value.vyska_vkladu?.map((vklad) => ({
    name: vklad.name || '',
    vklad: vklad.vklad || '',
    city: vklad.city || '',
    splatene: vklad.splatene || 0,
    currency: vklad.currency
  })) || [];
});

const zakladneImanieFromOrSr = computed<ZakladneImanieFromOrSr>(() => {
  if(companyFromOrSr.value.vyska_vkladu){
    let vyska_vkladu = companyFromOrSr.value.vyska_vkladu;
    let totalVkladFromVyskaVkladu = vyska_vkladu.reduce((total, item) => total + item.splatene, 0);
    let totalSplateneFromVyskaVkladu = vyska_vkladu.reduce((total, item) => total + item.splatene, 0);
    let currency = vyska_vkladu.every(vklad => vklad.currency === "EUR") ? "EUR" : "MIXED Currency";
    // zakladne_imanie sa vyparilo?
    //const zakladne_imanie = companyFromOrSr.value.zakladne_imanie;
    return {
      imanie: totalVkladFromVyskaVkladu,
      splatene: totalSplateneFromVyskaVkladu,
      currency: currency,
    };
  } else {
    return {
      imanie: 0, // default value
      splatene: 0, // default value
      currency: '', // default value
    };
  }
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
  } else if (zakladneImanieFromOrSr.value.splatene !== 0) {
    let percentage = (item.vklad / zakladneImanieFromOrSr.value.splatene) * 100;
    return Math.round(percentage);
  } else {
    // Handle the case when zakladneImanieFromOrSr.value.splatene is zero
    // You can return a specific value or throw an error
    return 0; // or throw new Error("Division by zero");
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
  addOperationKonatel = false;
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
    if(addOperationKonatel){
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
  addOperationKonatel = true;
  konatel.value = Object.assign({}, konatelObject);
  vfm.open(modalIdAddOrEditKonatel)?.then(() => {
  })
}

function addNewKonatelToList(){
  newlyAddedKonatelList.value.push(konatel.value)
}

//#endregion

function getSpecificSpolocnik(index: number){  
  if(spolocniciFromOrSr.value[index].function){
    // prav osoba / firma
    spolocnik.value.typ_zakladatela = 2
    spolocnik.value.obchodne_meno = spolocniciFromOrSr.value[index].name
    spolocnik.value.ico = ''
  }
  else if(spolocniciFromOrSr.value[index].name.includes('s. r.') || spolocniciFromOrSr.value[index].name.includes('o. z.')){
    // prav osoba / firma
    spolocnik.value.typ_zakladatela = 2
    spolocnik.value.obchodne_meno = spolocniciFromOrSr.value[index].name
    spolocnik.value.ico = ''
  }
  else {
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
  addOperationSpolocnik = false; 
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

function openPreviestPodielSpolocnika(index: number){
  addOperationSpolocnik = false; 
  isPrevodPodielu = true;
  spolocnikIndex = index;
  nadobudatelia.value.length = 0;
  selectedNadobudatel.value = ''
  if(spolocniciFromOrSr.value.length >= 2){
    let mappedSpolicniciFromOrSr = spolocniciFromOrSr.value.map(spolocnikFromOrSr => ({
      label: spolocnikFromOrSr.name,
      value: spolocnikFromOrSr
    }))
    nadobudatelia.value.push(...mappedSpolicniciFromOrSr)
  }
  nadobudatelia.value.push({
      label: 'Iná osoba',
      value: 'Iná osoba'
  })

  if(nadobudatelia.value.length >= 2){
        nadobudatelia.value.splice(index, 1) // splice due to preselect
        selectedNadobudatel.value = nadobudatelia.value[0].__original
  }
  vfm.open(modalIdAddOrEditSpolocnik)?.then(() => {
    if(newSharesTransfersList.value.length == 0){
      prevodPodieluFromTo.value.amount = '';
      prevodPodieluFromTo.value.priceForTransfer = '';
      spolocnik.value = Object.assign({}, spolocnikObject);
    }
    else if(newSharesTransfersList.value.length > 0) {    
      mnozstvoPodielu.value = newSharesTransfersList.value[index]?.transferType, // full or partial
      prevodPodieluFromTo.value.amount = newSharesTransfersList.value[index]?.amountOfTransfer
      prevodPodieluFromTo.value.priceForTransfer = newSharesTransfersList.value[index]?.priceForTransfer
      prevodPodieluFromTo.value.currency = newSharesTransfersList.value[index]?.currency
      console.log("Selected nadobudalte in if: ", selectedNadobudatel.value)
      selectedNadobudatel.value = newSharesTransfersList.value[index]?.sharesFrom
    }  
  })
}

function openAddSpolocnik(){
  addOperationSpolocnik = true;
  isPrevodPodielu = false;
  isPrevodPodielu = false;  
  spolocnik.value = Object.assign({}, spolocnikObject);
  vfm.open(modalIdAddOrEditSpolocnik)?.then(() => {});
}

function addNewSpolocnikTolist(){
  newlyAddedSpolocnikList.value.push(spolocnik.value)
}

function closeModalAndSubmitOrEditSpolocnik(){
  console.log("Calling submit function Spolocnik!")
  vfm.close(modalIdAddOrEditSpolocnik)?.then(() => {
    if(addOperationSpolocnik){
      addNewSpolocnikTolist();
    }
    else if(isPrevodPodielu){
      let amountFromCurrentSpolocnik = vyskyVkladovFromOrSr.value[spolocnikIndex].splatene;
      newSharesTransfersList.value.length = vyskyVkladovFromOrSr.value.length;
      newSharesTransfersList.value.splice(spolocnikIndex, 1, {
        sharesFrom: {
          name: spolocniciFromOrSr.value[spolocnikIndex].name,
          city: spolocniciFromOrSr.value[spolocnikIndex].city,
          street: spolocniciFromOrSr.value[spolocnikIndex].street,
          streetNumber: spolocniciFromOrSr.value[spolocnikIndex].number,
          country: spolocniciFromOrSr.value[spolocnikIndex].country as string,
          psc: spolocniciFromOrSr.value[spolocnikIndex].zip as string,
        },
        sharesTo: {
          typOsoby: spolocnik.value.typ_zakladatela as string,
          name: selectedNadobudatel.value.name || ((spolocnik.value.first_name + " " + spolocnik.value.last_name).trim() || spolocnik.value.obchodne_meno),
          city: spolocnik.value.city || selectedNadobudatel.value.city,
          street: spolocnik.value.street || selectedNadobudatel.value.street,
          streetNumber: ((spolocnik.value.street_number +"/"+spolocnik.value.street_number2).trim() || selectedNadobudatel.value.number),
          psc: spolocnik.value.psc || selectedNadobudatel.value.psc,
          date_of_birth: spolocnik.value.date_of_birth,
          country: spolocnik.value.country || selectedNadobudatel.value.country,
          rodneCislo: spolocnik.value.rodne_cislo,
          pohlavie: spolocnik.value.gender,
          title_before: spolocnik.value.title_before,
          title_after: spolocnik.value.title_after
        },
        transferType: mnozstvoPodielu.value, // full or partial
        amountOfTransfer: mnozstvoPodielu.value === 'fullTransfer' ? amountFromCurrentSpolocnik.toString() : prevodPodieluFromTo.value.amount, // if partial then not amountFromCurrentSpolocnik
        priceForTransfer: prevodPodieluFromTo.value.priceForTransfer,
        currency: prevodPodieluFromTo.value.currency,
      })
      console.log("Selected nadobudatel", selectedNadobudatel.value)
    }
    else if(spolocnikIndex >= 0 && spolocnikIndex < newSpolocnikList.value.length){
      spolocnik.value.has_change = true;
      newSpolocnikList.value[spolocnikIndex] = spolocnik.value
    }
    else {
      console.error("No index in array Spolocni");
    }
    // to do    
    spolocnik.value.has_change = true;
    addOperationSpolocnik = false;
    isPrevodPodielu = false;
    isPrevodPodielu = false;  
    //selectedNadobudatel.value = ''
  })
}

function closeModalSpolocnik(){
  vfm.closeAll();
  isPrevodPodielu = false;
}

//#endregion

//#region sposob konania
function openEditSposobKonania() {
  if(sposob_konania_konatelov_selected.value){
    sposob_konania_konatelov.value = sposob_konania_konatelov_selected.value
  }
  else if(companyFromOrSr.value.konanie_menom_spolocnosti.includes("podpis")){
    sposob_konania_konatelov.value = 3;    
    sposob_konania_konatelov_ine.value = companyFromOrSr.value.konanie_menom_spolocnosti;    
  } else {

  }
  vfm.open(modalIdAddOrEditSposobKonania)?.then(() => {
  })
}

function closeModalAndSubmitEditSposobKonania(){
  vfm.closeAll().then(() => {
    sposob_konania_konatelov_selected.value = sposob_konania_konatelov.value    
  })
}

function cancelModalEditSposobKonanie(){
  vfm.closeAll().then(() => {
    if(sposob_konania_konatelov_selected.value){
      sposob_konania_konatelov.value = sposob_konania_konatelov_selected.value
    } else {
      sposob_konania_konatelov_selected.value = 0;             
      sposob_konania_konatelov.value = 0;             
    }
  })
}

//#endregion

//#region  zakladne imanie
function openChangeZakladneImanie(){
  zakladne_imanie_spolocnici_options.value.length = 0;
  spolocniciFromOrSr.value.forEach(spolocnik => {
    zakladne_imanie_spolocnici_options.value.push(
      { label: spolocnik.name, value: spolocnik.name }
    )
  });
  selected_spolocnik_for_imanie.value = spolocniciFromOrSr.value[0].name;  
  vfm.open(modalIdChangeZakladneImanie)?.then(() => {
    // actions after open modal
  })
}

function closeAndSubmitChangeZakladneImanie() {
  //newZakladneImanie.value.length = 0;
  newZakladneImanie.value.push({
    change_for: selected_spolocnik_for_imanie.value, operation: zakladne_imanie.value, value: zakladne_imanie_hodnota.value
  })
  vfm.closeAll();
}

function cancelModalChangeZakladneImanie (){
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

function returnChangesBackSpolocnici(index: number){
  let fullNameWithTitlesFromOrSr = nameComposerFromOrSr(spolocniciFromOrSr.value[index].name);
  newSpolocnikList.value[index].title_before = fullNameWithTitlesFromOrSr.title_before
  newSpolocnikList.value[index].first_name = fullNameWithTitlesFromOrSr.first_name
  newSpolocnikList.value[index].last_name = fullNameWithTitlesFromOrSr.last_name
  newSpolocnikList.value[index].title_after = fullNameWithTitlesFromOrSr.title_after  

  newSpolocnikList.value[index].country = spolocniciFromOrSr.value[index].country as string
  newSpolocnikList.value[index].city = spolocniciFromOrSr.value[index].city
  newSpolocnikList.value[index].psc = spolocniciFromOrSr.value[index].zip as string
  newSpolocnikList.value[index].street = spolocniciFromOrSr.value[index].street
  newSpolocnikList.value[index].street_number = spolocniciFromOrSr.value[index].number.split("/")[0]
  newSpolocnikList.value[index].street_number2 = spolocniciFromOrSr.value[index].number.split("/")[1]
  // set hasChange back to false
  newSpolocnikList.value[index].has_change = false
  // no values from orsr
  newSpolocnikList.value[index].obchodne_meno = ''
  newSpolocnikList.value[index].ico = ''
  newSpolocnikList.value[index].date_of_birth = ''
  newSpolocnikList.value[index].rodne_cislo = ''
  newSpolocnikList.value[index].gender = ''
  newSpolocnikList.value[index].vyska_vkladu = 0
  newSpolocnikList.value[index].podiel_v_spolocnosti = 0
  newSpolocnikList.value[index].rozsah_splatenia_vkladu = 0
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
    fullNameWithTitle.title_after = (fullName[3] || '') + ' ' + (fullName[4] || '') + ' ' + (fullName[5] || '');
  } else if(fullName.length >= 4 && fullName[0].includes(".") && fullName[1].includes(".")) {
    // Case when there are two titles before the name
    fullNameWithTitle.title_before = fullName[0] + " " +  fullName[1];
    fullNameWithTitle.first_name = fullName[2];
    fullNameWithTitle.last_name = fullName[3];
    fullNameWithTitle.title_after = (fullName[4] || '') + ' ' + (fullName[5] || '') + ' ' + (fullName[6] || '');
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

function deleteNewSpolocnik(index: number){
  newlyAddedSpolocnikList.value.splice(index, 1);
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
  companyFromOrSr,
  konateliaFromOrSr,
  spolocniciFromOrSr,
  newCompanyFullName,
  newlyAddedKonatelList,
  newlyAddedSpolocnikList,
  obchodneSidloVirtuOrNormal, // if virtual then select from store
  newHqAddress,
  headquarterInfo,
  selectedVhqFromStore,
  newKonateliaList,
  newSpolocnikList,
  newSharesTransfersList
})

</script>

<style scoped>
.text-cross {
  text-decoration: line-through;
}
</style>