<template>
  <footer>
    <div class="w-full bg-[url('../src/assets/footer-2.png')] bg-cover bg-no-repeat bg-top pt-36 pb-8">
      <div class="container mx-auto flex">
        <div class="flex-1 text-white font-bold text-xl">
          <div class="hover:cursor-pointer hover:opacity-75 hover:underline">
            Firmy a ich správa
          </div>
          <div
            class="hover:cursor-pointer hover:opacity-75 my-4 hover:underline"
          >
            <a href="/documents"
              >Faktúry, zmluvy a iné <br />
              dokumenty</a
            >
          </div>
          <div class="hover:cursor-pointer hover:opacity-75 hover:underline">
            <a href="/counseling-center">Centrum poradenstva</a>
          </div>
        </div>
        <div class="flex-1 text-white text-base">
          <div
            class="hover:cursor-pointer hover:opacity-75 mt-2 hover:underline"
          >
            <a href="/contact">Kontakt</a>
          </div>
          <div
            class="hover:cursor-pointer hover:opacity-75 mt-2 hover:underline"
          >
            <a href="/o-nas">O firme</a>
          </div>
          <div
            class="hover:cursor-pointer hover:opacity-75 mt-2 hover:underline"
          >
            <a href="/pricelist">Cenník</a>
          </div>
          <div
            class="hover:cursor-pointer hover:opacity-75 mt-2 hover:underline"
          >
            <router-link to="/login" class="" >Prihlásiť sa</router-link>
          </div>
          <div
            class="hover:cursor-pointer hover:opacity-75 mt-2 hover:underline"
          >
            <a href="/posts">Články</a>
          </div>
        </div>
        <div class="flex-1 relative">
          <div class="text-white text-base font-medium">Novinky</div>
          <div class="w-[350px]">
            <div class="mt-2">
              <input
                placeholder="jozkopodnikatel@mail.sk"
                class="h-10 w-full shadow px-1 rounded border focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-black"
              />
            </div>
            <div class="flex mt-1">
              <div class="shrink text-sm text-white">
                Buďte informovaný o všetkom, čo sa deje vo svete podnikania
              </div>
              <button>
                <div
                  class="bg-teal-500 shrink-0 flex items-center justify-center text-white rounded-lg ml-2"
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
            <div class="text-white text-lg">
              <div
                class="hover:cursor-pointer hover:opacity-75 hover:underline"
              >
                <a href="/obchodne-podmienky">Obchodné podmienky</a>
              </div>
              <div
                class="hover:cursor-pointer hover:opacity-75 hover:underline"
              >
                <a href="/gdpr">Ochrana osobných údajov</a>
              </div>
            </div>
            <img src="../assets/logo-small.png" class="w-12 h-auto" />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
