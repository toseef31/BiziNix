<template>
  <div class="text-4xl font-bold">Vyplňte údaje o spoločnosti</div>
  <div class="mt-2 mb-6">vyplňte zakladne údaje a pridajte zakladateľov (spoločnikov) a konateľov.</div>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <FormKit type="text" name="name" v-model="companyOrZivnostModel.name" label="Názov spoločnosti"
      validation="required" />
    <FormKit type="select" name="pravnaForma" label="Právna forma" placeholder="Vybrať" v-model="pravnaForma"
      :options="['s. r. o.', ', s. r. o.', ', spol. s r. o.']" validation="required" />
  </div>
  <!-- Zakladatelia table -->
  <div class="flex items-center justify-between">
    <h2 class="text-2xl">Zakladatelia (Spoločníci)</h2>
    <button @click.prevent="addZakladatelSpolocnik"
      class="text-white font-semibold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded">
      Pridať zakladateľa
    </button>
  </div>
  <template v-if="zakladateliaSpolocniciList.length === 0">
    <div class="font-bold">Zatiaľ nebol pridaný žiadný zakladateľ (spoločník).</div>
  </template>
  <template v-else>
    <div class="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
      <table class="min-w-full divide-y divide-bizinix-border">
        <thead class="bg-gray-950">
          <tr>
            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">Meno a priezvisko / Obchodné meno</th>
            <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell">Vklad</th>
            <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold sm:table-cell">Podiel</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">Konaťel</th>
            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">Upraviť</th>
            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">Odobrať</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-teal-900 bg-gray-800">
          <tr v-for="(item, index) in zakladateliaSpolocniciList" :key="index">
            <td class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-6">
              {{ item.first_name }} {{ item.last_name }} {{ item.obchodne_meno }}
              <!-- Stacked "column" for mobile -->
              <dl class="font-normal lg:hidden">
                <dt class="sr-only">Vklad</dt>
                <dd>{{ item.vyska_vkladu }} €</dd>
                <dt class="sr-only sm:hidden">Podiel</dt>
                <dd class="mt-1 truncate sm:hidden">{{ item.podiel_v_spolocnosti }} %</dd>
              </dl>
            </td>
            <td class="hidden px-3 py-4 text-sm lg:table-cell">{{ item.vyska_vkladu }} €</td>
            <td class="hidden px-3 py-4 text-sm sm:table-cell">{{ item.podiel_v_spolocnosti }} %</td>
            <td class="px-3 py-4 text-sm">{{ item.je_konatel ? 'Áno' : 'Nie' }}</td>
            <td class="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
              <Tippy>
                <button :disabled="item.je_zastupitel"
                  class="flex items-center justify-center w-full  disabled:text-gray-500" @click.prevent="editSpolocnikZakladatel(index, item)">
                  <PencilIcon class="h-5 w-5" aria-hidden="true" />
                </button>
                <template #content v-if="item.je_zastupitel">
                  Tohto zakladatela/spoločníka nie je možné upraviť, pretože je pridaný ako zastupujúca osoba.
                </template>
              </Tippy>
            </td>
            <td class="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
              <button class="flex items-center justify-center w-full"
                @click.prevent="confirmRemoveItemSpolocnikZakladatel(index)">
                <XMarkIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <!-- <button @click.prevent="logValueForZakladatelia">Log for list zakladatelia.</button> -->
  <!-- Konatelia table -->
  <div class="flex items-center justify-between mt-6">
    <h2 class="text-2xl">Konatelia</h2>
    <button @click.prevent="addKonatel"
      class="text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded">
      Pridať konateľa
    </button>
  </div>
  <template v-if="countOfKonatelia === 0">
    <div class="font-semibold">Zatiaľ nebol pridaný žiadný konateľ.</div>
  </template>
  <template v-else>
    <div class="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
      <table class="min-w-full divide-y divide-bizinix-border">
        <thead class="bg-gray-950">
          <tr>
            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">Meno a priezvisko</th>
            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">Upraviť</th>
            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">Odobrať</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-teal-900 bg-gray-800">
          <tr v-for="(item, index) in konateliaList" :key="index">
            <td class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-6">
              {{ item.first_name }} {{ item.last_name }}
              <!-- Stacked "column" for mobile -->
              <dl class="font-normal lg:hidden">
              </dl>
            </td>
            <td class="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
              <Tippy>
                <button :disabled="item.addedFromZakladatelia"
                  ref="btn"              
                  class="flex items-center justify-center w-full disabled:text-gray-500"
                  @click.prevent="editKonatel(index, item)">
                  <PencilIcon class="h-5 w-5" aria-hidden="true" />
                </button>
                <template #content v-if="item.addedFromZakladatelia">
                  Ak si želáte upraviť tohto konateľa, urobte tak v časti Zakladatelia (Spoločníci).
                </template>                
              </Tippy>
            </td>
            <td class="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
              <button :disabled="item.addedFromZakladatelia"
                class="flex items-center justify-center w-full disabled:text-gray-500"
                @click.prevent="confirmRemoveItemKonatel(index)">
                <XMarkIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <div v-if="countOfKonatelia == 0 || countOfZakladatelia == 0"
    class="my-4 flex items-center justify-between py-3 px-4 bg-red-500 text-white rounded">
    <b>Prosím pridajte minimálne jedného zakladateľa a konateľa spoločnosťi.</b>
  </div>
  <h2 class="text-xl my-4">Základné imanie </h2>
  <div class="grid grid-cols-3 gap-4 my-4">
    <FormKit type="number" name="vyska" label="Výška €" validation="required|min:5000"
      v-model="companyOrZivnostModel.imanie_vyska"
      help="Od 1.1.2016 finančné prostriedky do výšky 5000 eur nemusia byť vkladané ná účet v banke. Minimálna výška základného imania pri s.r.o. je podľa zákona 5000,- Eur. Môžete zadať aj viac."
    />
    <FormKit type="number" name="rozsah_splatenia" label="Rozsah splatenia €" validation="required|min:2500"
      v-model="companyOrZivnostModel.imanie_splatene"
      help="Od 1.1.2016 finančné prostriedky do výšky 5000 eur nemusia byť vkladané ná účet v banke. V prípade jediného zakladateľa musí byť základné imanie splatené v plnom rozsahu, teda 5000 eur (100%). Ak je zakladateľov viac, rozsah splatenia základného imania postačí vo výške 2500 eur."
    />
  </div>

  <!-- <button @click.prevent="logValueForKonatelia">Log for list konatelia.</button> -->
  <!-- Modal for SpolocnikZakladatel Add/Edit -->
  <VueFinalModal :modal-id="modalAddOrEditSpolocnikZakladatel" display-directive="if" :clickToClose="false" :escToClose="false"
    :lockscroll="true" class="block md:flex md:justify-center overflow-auto"
    content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2 overflow-auto h-fit"
  >
    <h1 class="text-white text-2xl">
      {{ titleModalText }}
    </h1>
    <button @click.prevent="isRodneCisloUnique" class="text-white">LogNewItemVal</button>
    <!-- Form for SpolocnikZakladatel -->
    <FormKit
      type="form"
      id="form_spolocnici" name="spolocnici"
      :config="{ validationVisibility: 'live' }"
      @submit="closeModalAndSaveOrEditSpolocnikZakladatel"
      submit-label="Pridať"
      #default="{ value, state: { valid } }"
      :actions="false"
      v-model="newItemSpolocnik"
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
            validation="required" />
          <FormKit type="text" name="nationality" label="Štátna príslušnosť " validation="required|length:2" />
          <FormKit type="select" name="typ_dokladu_totoznosti" label="Typ dokladu totožnosti" validation-visibility="live"
            placeholder="Vyberte typ dokladu tožnosti" :options="['Občiansky preukaz', 'Cestovný pas', 'Vodičský preukaz']"
            validation="required" />
          <FormKit type="text" name="cislo_dokladu_totoznosti" label="Číslo dokladu totožnosti"
            validation="required|length:5" />
          <FormKit type="text" name="title_before" label="Titul pred menom" />
          <FormKit type="text" name="title_after" label="Titul za menom" />
          <FormKit type="text" name="rodne_cislo" label="Rodné číslo" id="rodne_cislo"
            :validation-rules="{ isRodneCisloUnique }" validation="required|length:9|isRodneCisloUnique"
            validation-visibility="live"
            :validation-messages="{ isRodneCisloUnique: 'Rodne číslo sa už používa!' }" />
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormKit type="select" name="country" label="Štát" placeholder="Vyberte štát"
            :options="['Slovensko', 'Česká republika']" validation="required" />
          <FormKit type="text" name="city" label="Mesto" validation="required" />
          <FormKit type="text" name="psc" label="PSČ" validation="required" />
          <FormKit type="text" name="street" label="Ulica" validation="required" />
          <FormKit type="text" name="street_number" label="Súpisne číslo" validation="require_one:street_number2" help="Číslo pred lomítkom" />
          <FormKit type="text" name="street_number2" label="Orientačné číslo" validation="require_one:street_number" help="Číslo za lomítkom" />
        </div>
        <div>
          <div class="my-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            <FormKit type="number" name="vyska_vkladu" label="Výška vkladu €" validation="required|min:750|max:5000"
              help="Zadajte hodnotu napr. 5000" />
            <FormKit type="number" name="podiel_v_spolocnosti" label="Podiel v spoločnosti %" validation="required|max:100"
              help="Zadajte hodnotu 0 - 100" />
            <FormKit type="number" name="rozsah_splatenia_vkladu" label="Rozsah splatenia vkladu €" validation="required|min:750|max:5000"
              help="Zadajte hodnotu napr. 5000" />
          </div>
          <div>
            <FormKit v-if="value.typ_zakladatela != 2" type="checkbox" name="je_konatel" label="Tento zakladateľ (spoločník) bude aj konateľom" />
            <FormKit type="checkbox" name="je_spravca_vkladu" :value="true"
              label="Tento zakladateľ (spoločník) bude aj správcom vkladu"
              help="Správca vkladu musí byť vždy ustanovený. Môže to byť iba jeden zo spoločníkov."
            />
          </div>
        </div>
        <div v-if="value.typ_zakladatela == 2">
          <h2 class="text-xl my-4 text-white">Zastúpenie osobou (konateľ)</h2>
          <div class="grid grid-cols-2 gap-4">
            <FormKit type="text" v-model="zastupitel.first_name" label="Krstné meno" validation="required|length:2" />
            <FormKit type="text" v-model="zastupitel.last_name" label="Priezvisko" validation="required|length:2" />
            <FormKit type="date" style="color-scheme: dark;" v-model="zastupitel.date_of_birth" autocomplete="date_of_birth"
              label="Dátum narodenia" validation="required" />           
            <FormKit type="text" v-model="zastupitel.rodne_cislo" label="Rodné číslo" id="rodne_cislo"
              :validation-rules="{ isRodneCisloUnique }" validation="required|length:9|isRodneCisloUnique"
              validation-visibility="live"
              :validation-messages="{ isRodneCisloUnique: 'Rodne číslo sa už používa!' }"
            />            
          </div>    
        </div>
        <!-- <div class="text-white">Rod. cislo: {{ rodneCislo.cislo }}</div> -->
        <div v-if="!valid" class="text-red-700 p-1 text-center text-lg rounded font-bold bg-red-50 mb-4">
          Prosím vyplnte všetky povinné polia.
        </div>
        <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
          <button
            class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
            type="button"
            @click.prevent="closeModal"
          >
            Zrušiť
          </button>
          <button
            :disabled="!valid"
            type="submit"
            class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
          >
            {{ buttonModalText }}
          </button>
        </div>
    </FormKit>
  </VueFinalModal>
  <!-- Modal for Remove SpolocnikZakladatel -->
  <VueFinalModal :modal-id="modalRemoveSpolocnikZakladatel" display-directive="if" :clickToClose="false" :escToClose="false"
    :lockscroll="true" class="block md:flex md:justify-center overflow-auto"
    content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2 overflow-auto h-fit"
  >
    <div class="text-white py-4">
      Naozaj si prajete odobrať spoločníka/zakladateľa?
    </div>
    <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
      <button
        class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
        @click="() => vfm.closeAll()"
      >
        Zrušiť
      </button>
      <button
        class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
        @click.prevent="removeSpolocnikZakladatel"
      >
        {{ buttonModalText }}
      </button>
    </div>
  </VueFinalModal>
  <!-- Modal for Konatel Add/Edit -->
  <VueFinalModal :modal-id="modalAddOrEditKonatel" display-directive="if" :clickToClose="false" :escToClose="false"
    :lockscroll="true" class="block md:flex md:justify-center overflow-auto"
    content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2 overflow-auto h-fit"
  >
    <h1 class="text-white text-2xl">
      {{ titleModalText }}
    </h1>
    <button @click.prevent="isRodneCisloUnique" class="text-white">LogNewItemVal</button>
    <!-- Form for Konatelia -->
    <FormKit
      type="form"
      id="form_konatelia" name="konatelia"
      :config="{ validationVisibility: 'live' }"
      @submit="closeModalAndSaveOrEditKonatel"
      #default="{ value, state: { valid } }"
      :actions="false"
      v-model="newItemKonatel"
    >
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FormKit type="text" name="first_name" label="Krstné meno" validation="required|length:2" />
        <FormKit type="text" name="last_name" label="Priezvisko" validation="required|length:2" />
        <FormKit type="date" style="color-scheme: dark;" name="date_of_birth" autocomplete="date_of_birth"
          label="Dátum narodenia" validation="required" />
        <FormKit type="select" name="gender" label="Pohlavie" placeholder="Vyberte pohlavie" :options="['Muž', 'Žena']"
          validation="required" />
        <FormKit type="text" name="nationality" label="Štátna príslušnosť " validation="required|length:2" />
        <FormKit type="select" name="typ_dokladu_totoznosti" label="Typ dokladu totožnosti" validation-visibility="live"
          placeholder="Vyberte typ dokladu tožnosti" :options="['Občiansky preukaz', 'Cestovný pas', 'Vodičský preukaz']"
          validation="required" />
        <FormKit type="text" name="cislo_dokladu_totoznosti" label="Číslo dokladu totožnosti"
          validation="required|length:5" />
        <FormKit type="text" name="title_before" label="Titul pred menom" />
        <FormKit type="text" name="title_after" label="Titul za menom" />
        <FormKit type="text" name="rodne_cislo" label="Rodné číslo" id="rodne_cislo"
          :validation-rules="{ isRodneCisloUnique }" validation="required|length:9|isRodneCisloUnique"
          validation-visibility="live"
          :validation-messages="{ isRodneCisloUnique: 'Rodne číslo sa už používa!' }" />
        <FormKit type="select" name="country" label="Štát" placeholder="Vyberte štát"
          :options="['Slovensko', 'Česká republika']" validation="required" />
        <FormKit type="text" name="city" label="Mesto" validation="required" />
        <FormKit type="text" name="psc" label="PSČ" validation="required" />
        <FormKit type="text" name="street" label="Ulica" validation="required" />
        <FormKit type="text" name="street_number" label="Súpisne číslo" validation="require_one:street_number2" help="Číslo pred lomítkom" />
        <FormKit type="text" name="street_number2" label="Orientačné číslo" validation="require_one:street_number" help="Číslo za lomítkom" />
      </div>
      <!-- <div class="text-white">Rod. cislo: {{ rodneCislo.cislo }}</div> -->
      <div v-if="!valid" class="text-red-700 p-1 text-center text-lg rounded font-bold bg-red-50 mb-4">
        Prosím vyplnte všetky povinné polia.
      </div>
      <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
        <button
          class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
          @click.prevent="() => vfm.closeAll()">
          Zrušiť
        </button>
        <button
          :disabled="!valid"
          type="submit"
          class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
        >
          {{ buttonModalText }}
        </button>
      </div>
    </FormKit>
  </VueFinalModal>
  <!-- Modal for Konatel Remove -->
  <VueFinalModal :modal-id="modalRemoveKonatel" display-directive="if" :clickToClose="false" :escToClose="false"
    :lockscroll="true" class="block md:flex md:justify-center overflow-auto"
    content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2 overflow-auto h-fit"
  >
    <div class="text-white py-4">
      Naozaj si prajete odobrať konateľa?
    </div>
    <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
      <button
        class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
        @click.prevent="() => vfm.closeAll()"
      >
        Zrušiť
      </button>
      <button
        class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
        @click.prevent="removeKonatel"
      >
        {{ buttonModalText }}
      </button>
    </div>
  </VueFinalModal>
  <!-- Inputs inside step for paren formm -->
  <div class="my-4">
    <FormKit v-model="companyOrZivnostModel.konecny_uzivatelia_vyhod" type="radio" label="Konečným užívateľom výhod sú"
      :options="{ 1: 'Spoločníci/zakladatelia', 2: 'Iné osoby' }" name="konecny_uzivatelia_vyhod" validation="required" />
    <div v-if="companyOrZivnostModel.konecny_uzivatelia_vyhod == 2" class="mt-2">
      <FormKit type="textarea" label="Iné osoby"
        placeholder="Uveďte mená a priezviská, adresu bydliska, dátum narodenia, rodné číslo, číslo pasu alebo občianskeho preukazu."
        help="Uveďte mená a priezviská, adresu bydliska, dátum narodenia, rodné číslo, číslo pasu alebo občianskeho preukazu."
        rows="3" />
    </div>
  </div>
  <div class="my-4">
    <FormKit v-model="companyOrZivnostModel.sposob_konania_konatelov" type="radio" label="Spôsob konania konateľov"
      :options="{
          1: 'V mene spoločnosti koná a podpisuje každý konateľ samostatne',
          2: 'V mene spoločnosti konajú všetci konatelia spoločne',
          3: 'Iné'
        }" name="sposob_konania_konatelov" validation="required" />
    <div v-if="companyOrZivnostModel.sposob_konania_konatelov == 3" class="mt-2">
      <FormKit type="textarea" label="Iný spôsov konania konateľov" rows="3" />
    </div>

  </div>
  Počet pridaných konatelov {{ countOfKonatelia }}
  Počet pridaných zakladatelov {{ countOfZakladatelia }}
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, watch, ref, toRef, type Ref, effect } from 'vue';
import { PencilIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useVfm, VueFinalModal } from 'vue-final-modal'
import { getNode } from '@formkit/core'
import type CompanyMemberKonatel from '@/types/CompanyMemberKonatel';
import type CompanyMemberSpolocnik from '@/types/CompanyMemberSpolocnik';
import { computed } from 'vue';
import { Tippy } from "vue-tippy";
import 'tippy.js/dist/tippy.css' // optional for styling

const vfm = useVfm()
const modalAddOrEditSpolocnikZakladatel = Symbol('modalAddOrEditSpolocnikZakladatel')
const modalAddOrEditKonatel = Symbol('modalAddOrEditKonatel')
const modalRemoveSpolocnikZakladatel = Symbol('modalRemoveSpolocnikZakladatel')
const modalRemoveKonatel = Symbol('modalRemoveKonatel')
const buttonModalText = ref<string>()
const titleModalText = ref<string>('Modal Title')

const rodneCislo = ref({
  cislo: ''
});
const pravnaForma = ref('s. r. o.');

const countOfZakladatelia = computed(() => {
  return zakladateliaSpolocniciList.value.length
})

const countOfKonatelia = computed(() => {
  return konateliaList.value.length
})

let companyOrZivnostModel = ref({
  name: '',
  ico: '',
  dic: '',
  icdph: '',
  headquarters_id: 0,
  imanie_vyska: 0,
  imanie_splatene: 0,
  is_dph: false,
  zaciatok_opravnenia: '',
  konecny_uzivatelia_vyhod: 1,
  sposob_konania_konatelov: 1,
  owner: 0,
  note: '',
  type: 1, // type 1 sro, type 2 živnosť
  status: 2, // neaktívna spoločnosť
  sub_status: 1, // Zakladanie spoločnosti je v priebehu
  subjects_of_business: [{
    id: '',
    title: '',
    price: 0,
    description: '',
    category_id: 0
  }]
})

let zakladateliaSpolocniciList: Ref<CompanyMemberSpolocnik[]> = ref<CompanyMemberSpolocnik[]>([])
let konateliaList: Ref<CompanyMemberKonatel[]> = ref<CompanyMemberKonatel[]>([])
  let zastupitel = ref({
  company_id: null,
  ico: '',
  typ_zakladatela: 1,
  obchodne_meno: '',
  first_name: '',
  last_name: '',
  title_before: '',
  title_after: '',
  gender: '',
  nationality: '',
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
  je_spravca_vkladu: false,
  je_zakladatel: false,
  je_konatel: false,
  je_zastupitel: true
});

function getDefaultNewItemSpolocnik(): CompanyMemberSpolocnik {
  return {
    company_id: null,
    ico: '',
    typ_zakladatela: 1,
    obchodne_meno: '',
    first_name: 'Janko',
    last_name: 'Hrasko',
    title_before: '',
    title_after: '',
    gender: 'Muž',
    nationality: 'Slovenská',
    date_of_birth: '1993-01-20',
    rodne_cislo: '123456789',
    street: 'Kupelska',
    street_number: '50',
    street_number2: '',
    city: 'Sobrance',
    psc: '07301',
    country: 'Slovensko',
    typ_dokladu_totoznosti: 'Cestovný pas',
    cislo_dokladu_totoznosti: 'BC456789123',
    vyska_vkladu: 5000,
    podiel_v_spolocnosti: 100,
    rozsah_splatenia_vkladu: 5000,
    je_spravca_vkladu: true,
    je_zakladatel: true,
    je_konatel: true,
    je_zastupitel: false
  };
}

function getDefaultNewItemKonatel(): CompanyMemberKonatel {
  return {
    company_id: null,
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
    je_konatel: true,
    addedFromZakladatelia: false
  };
}

const newItemSpolocnik: Ref<CompanyMemberSpolocnik> = ref<CompanyMemberSpolocnik>(getDefaultNewItemSpolocnik());
const newItemKonatel: Ref<CompanyMemberKonatel> = ref<CompanyMemberKonatel>(getDefaultNewItemKonatel());

function resetNewItem() {
  newItemSpolocnik.value = getDefaultNewItemSpolocnik();
  newItemKonatel.value = getDefaultNewItemKonatel();
}

const calculatedImanieVyska = computed(() => {
  return zakladateliaSpolocniciList.value.reduce((acc, item) => {
    let vyska_vkladu = Number(item.vyska_vkladu);
    if (isNaN(vyska_vkladu)) {
      vyska_vkladu = 0;  // or handle error
    }
    return acc + vyska_vkladu;
  }, 0);
});

effect(() => {
  companyOrZivnostModel.value.imanie_vyska = calculatedImanieVyska.value;
});

const calculatedRozsahSplatenia = computed(() => {
  return zakladateliaSpolocniciList.value.reduce((acc, item) => acc + (item.rozsah_splatenia_vkladu as number), 0);
});

effect(() => {
  companyOrZivnostModel.value.imanie_splatene = calculatedRozsahSplatenia.value;
});

enum OperationType {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
  // add more operation types as needed
}

const currentOperation = reactive({
  type: null as OperationType | null,
  index: null as number | null
});


function addZakladatelSpolocnik(){
  titleModalText.value = 'Nový zakladateľ (spoločník)'
  currentOperation.type = OperationType.ADD
  vfm.open(modalAddOrEditSpolocnikZakladatel)?.then(() => {
    // Reset newItem after opening the modal
    resetNewItem()
    //console.log("BeforeNode")
    const node = getNode('form_spolocnici');
    if (!node) return;
    rodneCislo.value.cislo = toRef(getNode('rodne_cislo'), 'value')
  })  
  buttonModalText.value = 'Pridať'
}

function addKonatel(){
  titleModalText.value = 'Nový Konateľ'
  currentOperation.type = OperationType.ADD
  vfm.open(modalAddOrEditKonatel)?.then(() => {
    // Reset newItem after opening the modal
    resetNewItem()
    //console.log("BeforeNode")
    const node = getNode('form_konatelia');
    if (!node) return;
    //console.log("After Form node")
    rodneCislo.value.cislo = toRef(getNode('rodne_cislo'), 'value')
  })
  buttonModalText.value = 'Pridať'
}

function editSpolocnikZakladatel(index: number, currentItem: CompanyMemberSpolocnik) {
  //console.log("Index for edit: " + index);

  // Create a deep copy of the current item before editing
  const clonedItem = JSON.parse(JSON.stringify(currentItem));

  // Set the clonedItem as the value of newItemSpolocnik
  newItemSpolocnik.value = clonedItem;

  buttonModalText.value = 'Upraviť';
  titleModalText.value = 'Upraviť zakladateľa (spoločníka)';
  currentOperation.index = index;
  currentOperation.type = OperationType.EDIT;

  let currentKonatelIndex = -1; // Declare the variable here
  if(newItemSpolocnik.value.typ_zakladatela == 2) {
    newItemSpolocnik.value.rodne_cislo = newItemKonatel.value.rodne_cislo;
    currentKonatelIndex = konateliaList.value.findIndex(item => item.rodne_cislo === newItemSpolocnik.value.rodne_cislo);
  }

  vfm.open(modalAddOrEditSpolocnikZakladatel)?.then(() => {
    const node = getNode('form_spolocnici');
    if (!node) return;
    rodneCislo.value.cislo = toRef(getNode('rodne_cislo'), 'value');
  });
  //console.log("Finish edit");
}

async function closeModal(){
  vfm.closeAll().then( () => {
    //console.log("Closing all modals");
  }) 
}

function editKonatel(index: number, currentItem: CompanyMemberKonatel){
  //console.log("Index for edit: " + index)
  
  // Create a deep copy of the current item before editing
  const clonedItem = JSON.parse(JSON.stringify(currentItem));

  // Set the clonedItem as the value of newItemSpolocnik
  newItemKonatel.value = clonedItem;

  currentOperation.index = index;
  currentOperation.type = OperationType.EDIT
  buttonModalText.value = 'Upraviť'  
  titleModalText.value = 'Upraviť konateľa'
  vfm.open(modalAddOrEditKonatel)?.then(() => {
      const node = getNode('form_konatelia');
      if (!node) return;
      rodneCislo.value.cislo = toRef(getNode('rodne_cislo'), 'value')
  });
  //console.log("Finish edit");
}

function removeSpolocnikZakladatel(){
  if (currentOperation.index !== null) {
    const index = currentOperation.index as number;
    // store removed item
    const removedItem = zakladateliaSpolocniciList.value[index];
    zakladateliaSpolocniciList.value.splice(index, 1);

    // find and remove item from konateliaList
    const konateliaIndex = konateliaList.value.findIndex(item => item.rodne_cislo === removedItem.rodne_cislo);
    if (konateliaIndex !== -1) {
      konateliaList.value.splice(konateliaIndex, 1);
    }
  }
  vfm.closeAll();
  currentOperation.type = null;
  currentOperation.index = null;
}

function removeKonatel(){
  if (currentOperation.index !== null) {
      const index = currentOperation.index as number;
      konateliaList.value.splice(index, 1);
  }
  vfm.closeAll();
  currentOperation.type = null;
  currentOperation.index = null;
}

async function confirmRemoveItemSpolocnikZakladatel(index: number) {
  titleModalText.value = 'Potvrdenie odobratia'
  buttonModalText.value = 'Odobrať'
  currentOperation.index = index;
  console.log("CurrentOperation: ", currentOperation)
  await vfm.open(modalRemoveSpolocnikZakladatel);
}

async function confirmRemoveItemKonatel(index: number) {
  titleModalText.value = 'Potvrdenie odobratia'
  buttonModalText.value = 'Odobrať'
  currentOperation.index = index;
  console.log("CurrentOperation: ", currentOperation)
  await vfm.open(modalRemoveKonatel);
}

const closeModalAndSaveOrEditSpolocnikZakladatel = async () => {
  console.log("Calling submit function!")
  vfm.close(modalAddOrEditSpolocnikZakladatel)?.then(() => {
    console.log("Closing modal in function.")
    saveSpolocnikZakladatel()
  })
}

function saveSpolocnikZakladatel() {
  console.log("saveSpolocnikZakladatel() called");
  console.log(`Start ${currentOperation.type === OperationType.EDIT ? "edit" : "add"} function`);

  const isEditOperation = currentOperation.type === OperationType.EDIT;
  const isAddOperation = currentOperation.type === OperationType.ADD;

  let currentKonatelIndex = -1;
  if (isEditOperation) {
    const currentItem = zakladateliaSpolocniciList.value[currentOperation.index as number];
    currentKonatelIndex = konateliaList.value.findIndex(item => item.rodne_cislo === currentItem.rodne_cislo);
  }

  if (isEditOperation || isAddOperation) {
    if(newItemSpolocnik.value.typ_zakladatela == 1){
      if (isEditOperation) {
        zakladateliaSpolocniciList.value[currentOperation.index as number] = newItemSpolocnik.value as CompanyMemberSpolocnik;
      } else {
        zakladateliaSpolocniciList.value.push(newItemSpolocnik.value as CompanyMemberSpolocnik);
      }

      let newKonatel: CompanyMemberKonatel = {
        ...newItemSpolocnik.value,
        je_konatel: newItemSpolocnik.value.je_konatel as boolean,
        addedFromZakladatelia: true
      };

      if (newItemSpolocnik.value.je_konatel) {
        if (currentKonatelIndex === -1) {
          konateliaList.value.push(newKonatel);
        } else {
          konateliaList.value[currentKonatelIndex] = newKonatel;
        }
      } else if (currentKonatelIndex !== -1) {
        konateliaList.value.splice(currentKonatelIndex, 1);
      }
    }
    if(newItemSpolocnik.value.typ_zakladatela == 2){
    // Ensure newItemSpolocnik consumes rodne_cislo from zastupitel
    newItemSpolocnik.value.rodne_cislo = zastupitel.value.rodne_cislo;

    // Create a copy of zastupitel.value
    let zastupitelCopy = {...zastupitel.value};

    // Push the copy to zakladateliaSpolocniciList
    zakladateliaSpolocniciList.value.push(zastupitelCopy);

    // Push newItemSpolocnik to zakladateliaSpolocniciList
    zakladateliaSpolocniciList.value.push(newItemSpolocnik.value as CompanyMemberSpolocnik);
    }
    if(currentOperation.type === OperationType.EDIT && newItemSpolocnik.value.typ_zakladatela == 2){
      // Find the corresponding zastupitel and CompanyMemberSpolocnik in zakladateliaSpolocniciList
      let indexes = zakladateliaSpolocniciList.value.reduce((acc, item, index) => {
        if (item.rodne_cislo === newItemSpolocnik.value.rodne_cislo && item.je_zastupitel) {
          acc.push(index);
        }
        return acc;
      }, [] as number[]);

      // Remove the old zastupitel and CompanyMemberSpolocnik from zakladateliaSpolocniciList
      for (let i = indexes.length -1; i >= 0; i--)
        zakladateliaSpolocniciList.value.splice(indexes[i],1);

      // Ensure newItemSpolocnik consumes rodne_cislo from zastupitel
      newItemSpolocnik.value.rodne_cislo = zastupitel.value.rodne_cislo;

      // Create a copy of zastupitel.value
      let zastupitelCopy = {...zastupitel.value};

      // Push the copy to zakladateliaSpolocniciList
      zakladateliaSpolocniciList.value.push(zastupitelCopy);

      // Push newItemSpolocnik to zakladateliaSpolocniciList
      zakladateliaSpolocniciList.value.push(newItemSpolocnik.value as CompanyMemberSpolocnik);
    }
    else if (isEditOperation && newItemSpolocnik.value.typ_zakladatela == 1) {
      // Remove zastupitel from zakladateliaSpolocniciList
      let zastupitelIndex = zakladateliaSpolocniciList.value.findIndex(item => item.rodne_cislo === zastupitel.value.rodne_cislo && item.je_zastupitel);
      if (zastupitelIndex !== -1) {
        zakladateliaSpolocniciList.value.splice(zastupitelIndex, 1);
      }
    }  
  } else {
    console.error("No OperationType!");
  }

  currentOperation.type = null;
  currentOperation.index = null;
  newItemSpolocnik.value = getDefaultNewItemSpolocnik();
}


function closeModalAndSaveOrEditKonatel() {
  vfm.close(modalAddOrEditKonatel)?.then(() => {
      saveKonatel()
  })    
}

function saveKonatel() {
  if (currentOperation.type === OperationType.EDIT) {
    konateliaList.value[currentOperation.index as number] = newItemKonatel.value as CompanyMemberKonatel
  } else {
    konateliaList.value.push(newItemKonatel.value as CompanyMemberKonatel);
  }
  currentOperation.type = null
  currentOperation.index = null
}

async function isRodneCisloUnique(node: any) {
  console.log(node.value);
  if (currentOperation.type === OperationType.ADD) {
    const isRodneCisloInZakladatelia = zakladateliaSpolocniciList.value.some(
      (item) => item.rodne_cislo === node.value as string
    );
    const isRodneCisloInKonatelia = konateliaList.value.some(
      (item) => item.rodne_cislo === node.value as string
    );

    if (isRodneCisloInZakladatelia || isRodneCisloInKonatelia) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

function logValueForZakladatelia() {
  console.log(companyOrZivnostModel.value)
  console.log(currentOperation)
  console.log("Zakladatelia list")
  console.log(zakladateliaSpolocniciList.value)
  console.log("NewItem")
  console.log(newItemSpolocnik.value)
  console.log(newItemKonatel.value)
}

function logValueForKonatelia() {
  console.log(currentOperation)
  console.log("Konatelia list")
  console.log(konateliaList.value.length)
  console.log("NewItems")
  console.log(newItemSpolocnik.value)
  console.log(newItemKonatel.value)
}

function logNewItemVal() {
  console.log(currentOperation)
  console.log(newItemSpolocnik.value)
  console.log(newItemKonatel.value)
  const node = getNode('form_spolocnici')
  //console.log(getNode('form_spolocnici')?.context?.state)
}

function logNodeFromKonatelia() {
  console.log(getNode('group_konatelia')?.context?.state)
}


defineExpose({
  companyOrZivnostModel,
  pravnaForma,
  zakladateliaSpolocniciList,
  konateliaList,
  countOfKonatelia,
  countOfZakladatelia
})

</script>