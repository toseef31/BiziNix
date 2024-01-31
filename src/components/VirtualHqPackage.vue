<template>
    <div class="pb-8 font-bold text-lg w-full text-left">
        Vyberte si balík, ktorý Vám najviac vyhovuje
    </div>
    <div class="flex flex-col gap-2 w-full">
        <!---->
        <div v-for="(p, index) in packages">
            <button type="button" 
            v-on:click="emit('updatePackage', p)" 
            @click="toggleActive(index)" 
            class="w-full block p-3  border rounded-lg shadow border-gray-700"
            :class="activeCard == index? 'bg-teal-700': 'bg-gray-800 hover:bg-gray-700'"
            >
                <div class="flex flex-row justify-between gap-4">
                    <div class="text-left">
                        <div>
                            <span class="font-bold">{{ p.name }} |</span> {{ p.name_desc }}
                        </div>
                        <div class="text-sm">
                            {{ p.desc }}
                        </div> 
                    </div>
                    <div class="flex flex-col justify-end">
                        <div v-if="p.icon">
                            <StarIcon class="w-8 text-yellow-400 pb-4" aria-hidden="true" />
                        </div>
                        <div class="text-xl font-bold">{{ p.price }}€</div>
                        <div class="text-sm">mesiac</div>
                    </div>
                </div>
            </button>
        </div>
        <!---->
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { StarIcon } from "@heroicons/vue/24/solid"
import store from "@/store";

onMounted(() => {
    // default selected package should be Ideal with index 1
    changeVhqPackage(1);
})

const emit = defineEmits(['updatePackage']);

let activeCard = ref(1);

function toggleActive(index: number) {
    switch(index) {
        case 0:
            activeCard.value = 0;
            changeVhqPackage(0);
            break
        case 1:
            activeCard.value = 1;
            changeVhqPackage(1);
            break
        case 2:
            activeCard.value = 2;
            changeVhqPackage(2);
            break
        case 3:
            activeCard.value = 3;
            changeVhqPackage(3);
            break
    }
}

const packages = [
    {
        name: "Mini",
        name_desc: "Základ, bez prehľadu o pošte",
        desc: "Zriadenie sídla a označenie schránky.",
        price: 7,
        icon: false
    },
    {
        name: "Ideal",
        name_desc: "To čo v Mini, plus",
        desc: "Online evidencia zásielok a pošty v našej aplikácii. Možnosť scanovania, preposielania a skartácie. Všetko prehľadne a na jednom mieste vrátane emailových notifikácií.",
        price: 11,
        icon: true
    },
    {
        name: "Premium",
        name_desc: "To čo v Ideal, plus",
        desc: "Preberanie zásielok (žltých papierikov na pobočke pošty)",
        price: 16,
        icon: false
    },
    {
        name: "Extra",
        name_desc: "To čo v Premium, plus",
        desc: "Prepojenie na e-dátovú schránku Slovensko.sk",
        price: 21,
        icon: false
    },
];

function changeVhqPackage(indexToFind: any) {
    store.state.selectedVhqPackage = packages.find((_,index: any) => index === indexToFind);
}

</script>