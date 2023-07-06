<template>
  <div class="bg-gray-900 text-white">
    <div class="container justify-center flex mx-auto">
      <div class="flex flex-col">
        <div class="w-full bg-gray-800 flex flex-row rounded-l-xl my-10">
          <div
            class="flex flex-col basis-1/3 font-bold text-4xl p-4 justify-center"
          >
            <div class="flex flex-row">
              <svg
                x="0px"
                y="0px"
                width="300px"
                height="50px"
                viewBox="0 0 300 50"
              >
                <defs>
                  <filter id="bicolor">
                    <feFlood
                      x="0"
                      y="0"
                      width="300"
                      height="50"
                      flood-color="white"
                      result="white-field"
                    />
                    <feFlood
                      x="135"
                      y="0"
                      width="265"
                      height="50"
                      flood-color="teal"
                      result="teal-field"
                    />
                    <feMerge>
                      <feMergeNode in="white-field" />
                      <feMergeNode in="teal-field" />
                    </feMerge>
                    <feComposite operator="in" in2="SourceGraphic" />
                  </filter>
                </defs>
                <text
                  filter="url(#bicolor)"
                  x="20"
                  y="27"
                  width="200"
                  height="20"
                >
                  Bizinix doklady
                </text>
              </svg>
            </div>
          </div>
          <div class="flex basis-2/3 justify-end text-right">
            <div class="flex flex-col">
              <div class="flex pt-4 pb-2 pr-4 text-lg font-bold text-teal-500">
                3 mesiace zadarmo
              </div>
              <div class="flex text-lg self-end pr-4">potom</div>
              <div class="flex font-bold text-2xl pr-4 pb-1 self-end">
                5€/mesiac
              </div>
            </div>
            <div>
              <img src="@/assets/order_docs.png" class="max-h-[140px]" />
            </div>
          </div>
        </div>
        <div class="flex">
          <DocumentsOrderComponent />
        </div>
      </div>
    </div>
  </div>

  <div class="bg-gray-800 text-white">
    <CounselingCenter></CounselingCenter>
    <Reviews></Reviews>
    <FooterLayout></FooterLayout>
  </div>
</template>

<script setup lang="ts">
import DocumentsOrderComponent from "../../components/forms/DocumentsOrderComponent.vue";
import FooterLayout from "@/components/FooterLayout.vue";
import CounselingCenter from "@/components/CounselingCenter.vue";
import Reviews from "@/components/Reviews.vue";
</script>
