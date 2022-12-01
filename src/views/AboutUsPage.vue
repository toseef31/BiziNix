<template>
  <div class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-center">O nás</h1>
    </div>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="px-4 py-6 sm:px-0">
        <p class="font-bold py-6">VITAJTE VO SVETE INOVÁCIÍ!</p>
        <p>Náš tím právnikov a IT špecialistov si stanovil jediný cieľ:</p>

        <p>
          Zjednodušiť založenie spoločnosti cez internet tak, ako jednoduché je
          dnes zriadenie emailového konta.
        </p>

        <p>
          Podarilo sa? Portál na zakladanie firiem bizinix.sk je inovatívny
          nástroj, ktorý využíva najnovšie technológie v oblasti elektronizácie
          služieb štátnej správy. Prostredníctvom tohto user friendly portálu si
          dokáže ktokoľvek vytvoriť firmu už za 15 minút. Cez internet, bez
          potreby vlastniť zložitý zaručený elektronický podpis a bez rád
          drahých právnikov.
        </p>
        <p class="py-2">
          Vďaka inovatívnemu konceptu s plne automatizovanými procesmi môže
          portál bizinix.sk ponúknuť aj veľmi nízke ceny, pri zaručení vysokého
          štandardu kvality služieb. Portál spolupracuje s niektorými významnými
          bankami, advokátmi, daňovými a účtovnými poradcami a odborníkmi v
          oblasti IT.
        </p>

        <p class="pt-10">
          Portál <b>bizinix.sk</b> je úspešný v týchto mestách:
        </p>
        <table class="w-[300px]">
          <tr>
            <td>Bratislava</td>
            <td class="text-right">Trnava</td>
          </tr>
          <tr>
            <td>Pezinok</td>
            <td class="text-right">Piešťany</td>
          </tr>
          <tr>
            <td>Senec</td>
            <td class="text-right">Dunajská Streda</td>
          </tr>
          <tr>
            <td>Malacky</td>
            <td class="text-right">Galanta</td>
          </tr>
        </table>

        <p class="py-6">
          Ale aj inde na Slovensku:<br />
          Košice<br />
          Prešov<br />
          Žilina<br />
          Banská Bystrica<br />
          Nitra
        </p>
      </div>
      <!-- /End replace -->
    </div>
    <div class="bg-gray-800 text-white">
      <CounselingCenter></CounselingCenter>
      <Reviews></Reviews>
      <FooterLayout></FooterLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import FooterLayout from "../components/FooterLayout.vue";
import CounselingCenter from "@/components/CounselingCenter.vue";
import Reviews from "@/components/Reviews.vue";
</script>
