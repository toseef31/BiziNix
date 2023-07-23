<template>
  <footer>
    <div class="text-white w-full bg-gradient-to-b from-gray-bizinix to-gray-800 pt-36 pb-8">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row">
        <div class="flex-1 p-4 font-bold text-xl">
            <router-link to="/moj/dashboard" class="block flink">Firmy a ich správa</router-link>
            <router-link to="/documents" class="block flink">Faktúry, zmluvy a iné dokumenty</router-link>
            <router-link to="/counseling-center" class="block flink">Centrum poradenstva</router-link>
        </div>
        <div class="flex-1 p-4 text-base">
          <div
            class="hover:cursor-pointer hover:opacity-75 mt-2 hover:underline"
          >
            <router-link to="/contact" class="flink">Kontakt</router-link>
          </div>
          <div
            class="hover:cursor-pointer hover:opacity-75 mt-2 hover:underline"
          >
            <router-link to="/o-nas" class="flink">O firme</router-link>
          </div>
          <div
            class="hover:cursor-pointer hover:opacity-75 mt-2 hover:underline"
          >
            <router-link to="/pricelist" class="flink">Cenník</router-link>
          </div>
          <div
            class="hover:cursor-pointer hover:opacity-75 mt-2 hover:underline"
          >
            <router-link to="/login" class="flink">Prihlásiť sa</router-link>
          </div>
          <div
            class="hover:cursor-pointer hover:opacity-75 mt-2 hover:underline"
          >
            <router-link to="/posts" class="flink">Články</router-link>
          </div>
        </div>
        <div class="flex-1 p-4 relative">
          <div class="text-base font-medium">Novinky</div>
          <div class="w-[350px]">
            <div class="mt-2">
              <input
                placeholder="jozkopodnikatel@mail.sk"
                class="h-10 w-full shadow px-1 rounded border focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-black"
              />
            </div>
            <div class="flex mt-1">
              <div class="shrink text-sm">
                Buďte informovaný o všetkom, čo sa deje vo svete podnikania
              </div>
              <button>
                <div
                  class="bg-teal-500 shrink-0 flex items-center justify-center rounded-lg ml-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-10 h-10"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between mt-16">
            <div class="text-lg">
                <router-link to="/obchodne-podmienky" class="block flink">Obchodné podmienky</router-link>
                <router-link to="/gdpr" class="block flink">Ochrana osobných údajov</router-link>
            </div>
            <img src="../assets/logo-small.png" class="w-12 h-auto" />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
