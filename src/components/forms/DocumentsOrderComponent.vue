<template>
  <!--FORM -->
  <div>
        <FormKit type="form"
          :actions="false"
          id="documentsOrder"
          @submit-invalid="showErrors"  
          #default="{ value, state: { valid } }"
          @submit="submitApp"
        >
        <div>
          <ul class="validation-errors" v-if="messages.length">
            <li v-for="message in messages">{{ message }}</li>
          </ul>
        </div>
          <FormKit type="multi-step" name="documentsOrderMultiStepPlugin" tab-style="tab">
            <FormKit type="step" name="podnikatelskeUdaje" label="Podnikateľské údaje" next-label="Pokračovať" previous-label="Naspäť">
              <PodnikatelskeUdajeDocumentsFormStep ref="doCompanyDataRef" />
            </FormKit>

            <FormKit type="step" name="ucet" label="Účet" next-label="Pokračovať" previous-label="Naspäť">
              <UcetDocumentsFormStep ref="doAccountDataRef" />
            </FormKit>

            <FormKit type="step" name="fakturacneUdaje" label="Fakturačné údaje" previous-label="Naspäť">
              <SimplifiedFakturacneUdajeFormStep ref="doInvoiceDataRef" />
            </FormKit>
          </FormKit>
          <FormKit
            type="checkbox"
            label="Všeobecné obchodné podmienky"
            validation="accepted"
            validation-visibility="dirty"
          >
            <template #label="context">
              <span :class="context.classes.label">Súhlasím so <a href="/obchodne-podmienky" target="_blank">všeobecnými podmienkami poskytovania služby</a>.</span>
            </template>
          </FormKit>
          <FormKit type="submit" label="Objednať" />
          <div v-show="firstTimeActivation">
            <label class="text-xs italic text-gray-300">Prvú faktúru obdržíte o 3 mesiace.<br>Dovtedy Vám nebudeme nič účtovať.</label>
          </div>
        </FormKit>
      <Modal
          name="loadingDocumentsModal"
          v-model:visible="isVisible"
          :type="'clean'"
          :closable="false"
          title="Loading..."
        >
          <div class="bg-gray-800 rounded-lg border-teal-600 border-2">
            <div role="status" class="flex py-10 h-full w-full justify-center">
              <svg
                aria-hidden="true"
                class="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-teal-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
      </Modal>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { ref, computed, reactive } from "vue";
import router from "@/router";
import type User from "@/types/User";
import type Company from "@/types/Company";
import moment from "moment";
import { useModal, Modal } from "usemodal-vue3";
import { getValidationMessages } from '@formkit/validation'
import SimplifiedFakturacneUdajeFormStep from "./simplifiedFakturacneUdajeFormStep.vue";
import UcetDocumentsFormStep from "./ucetDocumentsFormStep.vue";
import PodnikatelskeUdajeDocumentsFormStep from "./podnikatelskeUdajeDocumentsFormStep.vue"

let doCompanyDataRef = ref<InstanceType<typeof PodnikatelskeUdajeDocumentsFormStep>>(null as any);
let doAccountDataRef = ref<InstanceType<typeof UcetDocumentsFormStep>>(null as any);
let doInvoiceDataRef = ref<InstanceType<typeof SimplifiedFakturacneUdajeFormStep>>(null as any);

const company = computed(() => store.state.selectedCompany as Company);
const user = computed(() => store.state.user);
const userData = computed(() => store.state.user.data as User);

const headquarter = ref({
  name: "",
  description: "test",
  headquarters_type: 1,
  owner_name: "",
  price: 0,
  registry: false,
  forwarding: false,
  scanning: false,
  shredding: false,
  is_virtual: false,
  img: "",
  address_id: 0,
});

let addressFromResponse: any,
  userFromResponse: any,
  hqFromResponse: any,
  companyFromResponse: any,
  orderFromRes: any,
  invoiceProfileFromResponse: any;

const today = moment(new Date()).format("YYYY-MM-DD");
const firstTimePaymentDate = moment(today).add(90, "days").format("YYYY-MM-DD");
const monthlyPaymentDate = moment(today).add(30, "days").format("YYYY-MM-DD");
const yearlyPaymentDate = moment(today).add(365, "days").format("YYYY-MM-DD");

const firstTimeActivation = computed(() => {
  return company.value.fakturacia_zaplatene_do ? false : true;
});

let order = ref({
  payment_method: '',
  order_type: 'documents',
  description: 'test',
  amount: 0,
  amount_vat: 0,
  is_paid: false,
  address_id: 0,
  user_id: 0,
  company_id: 0,
  is_tos_accepted: true,
  is_advocate_requested: true,
  items: [{
      description: "test",
      price: 0,
      price_vat: 0
    }],
  fakturacne_udaje_id: 0
})

const setModal = useModal({
  loadingDocumentsModal: 1,
});

let isVisible = reactive({});

isVisible = setModal("loadingDocumentsModal", false);

function showModal() {
  isVisible = setModal("loadingDocumentsModal", true);
}

function closeModal() {
  isVisible = setModal("loadingDocumentsModal", false);
}

function addOrder(): Promise<Response> {
  if(companyFromResponse) {
    order.value.company_id = companyFromResponse.company.id;
  } else {
    order.value.company_id = doCompanyDataRef.value.currentCompany.id;
  }

  if(userFromResponse) {
    order.value.user_id = userFromResponse.user_id;
  } else {
    order.value.user_id = doAccountDataRef.value.userData.id;
  }

  if(addressFromResponse) {
    order.value.address_id = addressFromResponse.address_id;
  } else {
    order.value.address_id = doInvoiceDataRef.value.currentInvoiceProfile.address_id;
  }

  order.value.amount = 0;
  order.value.amount_vat = 0 * 0.2;

  let items = [
    {
      price: 0,
      price_vat: 0,
      description: "Objednávka balíčku dokladov",
    },
  ];

  if(firstTimeActivation.value) {
    items = [
      {
        price: 0,
        price_vat: 0,
        description: "Objednávka balíčku dokladov na 3 mesiace zadarmo",
      },
    ];
  } else {
    order.value.amount = 60;
    order.value.amount_vat = 60 * 0.2;
    items = [
          {
            price: 60,
            price_vat: 60 * 0.2,
            description: "Objednávka balíčku dokladov na rok",
          },
        ];
  }

  order.value.items = items;
  order.value.fakturacne_udaje_id = doInvoiceDataRef.value.currentInvoiceProfile.id;

  order.value.is_tos_accepted = true;
  order.value.is_advocate_requested = false;
  order.value.description = "Objednávka balíčku dokladov";
  order.value.is_paid = false;

  return store
    .dispatch("addOrder", order.value)
    .then((res) => {
      orderFromRes = res.order;
      return orderFromRes;
    })
    .catch((err) => {
      console.log(err.response.data);
    });
}

const messages = ref([])

function showErrors(node: any) {
  messages.value = []
  const validations = getValidationMessages(node)
  validations.forEach((inputMessages: any) => {
    messages.value = messages.value.concat(
      inputMessages.map((message: any) => message.value)
    )
  })
}

async function submitApp(formData: any){
  showModal();
  try {
    if (firstTimeActivation.value) {
      await continueFirstTimeActivation();
    } else {
      await continueToPayment();
    }
  } catch (err: any) {
    console.log(err);
    closeModal();
  }
};

async function continueFirstTimeActivation() {
  try {
    if(user.value.userId) {
      const result = await doCompanyDataRef.value.isIcoAlreadyRegistered(doCompanyDataRef.value.currentCompany.ico);
      if(result) {
        if(doInvoiceDataRef.value.currentInvoiceProfile.id == 0) {
          await registerAddress().then(async () => {
            doInvoiceDataRef.value.currentInvoiceProfile.address_id = addressFromResponse.address_id;
            await addInvoiceProfile().then(async () => {
              await addHeadquarter().then(async () => {
                  await addCompany().then(async () => {
                    addOrder().then(() => {
                      closeModal();
                      router.push({
                        name: "Thanks You New Order",
                        params: {
                          orderId: orderFromRes.id,
                        },
                      });
                    });
                  });
                });
              });
            });
          } else {
            await registerAddress().then(async () => {
              doInvoiceDataRef.value.currentInvoiceProfile.address_id = addressFromResponse.address_id;
                await addHeadquarter().then(async () => {
                    await addCompany().then(async () => {
                      addOrder().then(() => {
                        closeModal();
                        router.push({
                          name: "Thanks You New Order",
                          params: {
                            orderId: orderFromRes.id,
                          },
                        });
                      });
                    });
                  });
              });
          }
        } else {
          doCompanyDataRef.value.currentCompany.fakturacia_zaplatene_do = firstTimePaymentDate;
          await store
            .dispatch("updateCompany", doCompanyDataRef.value.currentCompany)
            .then(async () => {
              addOrder().then(() => {
                closeModal();
                router.push({
                  name: "Thanks You New Order",
                  params: {
                    orderId: orderFromRes.id,
                  },
                });
              });
            })
            .catch((err) => {
              closeModal();
              console.log(err);
          });
        }
    } else {
      await registerAddress().then(async () => {
        doInvoiceDataRef.value.currentInvoiceProfile.address_id = addressFromResponse.address_id;
        await registerUser().then(async () => {
          await addInvoiceProfile().then(async () => {
            await addHeadquarter().then(async () => {
              await addCompany().then(async () => {
                addOrder().then(() => {
                  closeModal();
                  router.push({
                    name: "Thanks You New Order",
                    params: {
                      orderId: orderFromRes.id,
                    },
                  });
                });
              });
            });
          });
        });
      });
    }
    closeModal();
  } catch (err: any) {
    closeModal();
  }
}

async function continueToPayment() {
  try {
    const result = await doCompanyDataRef.value.isIcoAlreadyRegistered(doCompanyDataRef.value.currentCompany.ico);
    if(result) {
      try {
        await addCompany().then(async (res) => {
            if(companyFromResponse) {
              addOrder().then(async () => {
                  companyFromResponse.company.fakturacia_zaplatene_do = yearlyPaymentDate;
                  router.push({
                    name: "Thanks You New Order",
                    params: {
                      orderId: orderFromRes.id,
                    },
                  });
                store
                  .dispatch("updateCompany", companyFromResponse.company)
                  .then(() => {
                    closeModal();
                    router.push({
                      name: "Thanks You New Order",
                      params: {
                        orderId: orderFromRes.id,
                      },
                    });
                  })
                  .catch((err) => {
                    closeModal();
                    console.log(err);
                  });
              });
            } else {
              console.log(res);
            }
          });
      } catch {
        addOrder().then(async () => {
                  doCompanyDataRef.value.currentCompany.fakturacia_zaplatene_do = yearlyPaymentDate;
                  router.push({
                    name: "Thanks You New Order",
                    params: {
                      orderId: orderFromRes.id,
                    },
                  });
              });
      }
      
    } else {
      addOrder().then(async () => {
          doCompanyDataRef.value.currentCompany.fakturacia_zaplatene_do = yearlyPaymentDate;
          router.push({
            name: "Thanks You New Order",
            params: {
              orderId: orderFromRes.id,
            },
          });
        store
          .dispatch("updateCompany", doCompanyDataRef.value.currentCompany)
          .then(() => {
            closeModal();
            router.push({
              name: "Thanks You New Order",
              params: {
                orderId: orderFromRes.id,
              },
            });
          })
          .catch((err) => {
            closeModal();
            console.log(err);
          });
      });
    }  
  } catch (err: any) {
    closeModal();
    console.log(err);
  }
}

async function addInvoiceProfile(): Promise<Response> {
  if(doAccountDataRef.value.userData.id) {
    doInvoiceDataRef.value.currentInvoiceProfile.user_id = doAccountDataRef.value.userData.id;
  } else {
    doInvoiceDataRef.value.currentInvoiceProfile.user_id = userFromResponse.user_id;
  }

  return store
    .dispatch("addInvoiceProfile", doInvoiceDataRef.value.currentInvoiceProfile)
    .then((res) => {
      invoiceProfileFromResponse = res;
      doInvoiceDataRef.value.currentInvoiceProfile.id = invoiceProfileFromResponse.id;
      return invoiceProfileFromResponse;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function registerAddress(): Promise<Response> {
  return store
    .dispatch("registerAddress", doInvoiceDataRef.value.invoiceAddress)
    .then((res) => {
      addressFromResponse = res;
      return addressFromResponse;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function registerUser(): Promise<Response> {
  user.value.addressId = addressFromResponse.address_id;
  user.value.data.address_id = addressFromResponse.address_id;

  return store
    .dispatch("registerUser", user.value.data)
    .then((res) => {
      userFromResponse = res;
      return userFromResponse;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function addHeadquarter(): Promise<Response> {
  headquarter.value.owner_name =
    userData.value.first_name + " " + userData.value.last_name;
  headquarter.value.description = "Sídlo pre spoločnosť: " + doCompanyDataRef.value.currentCompany.name;
  headquarter.value.name = doCompanyDataRef.value.currentCompany.name;
  headquarter.value.price = 0;

  headquarter.value.registry = false;
  headquarter.value.forwarding = false;
  headquarter.value.scanning = false;
  headquarter.value.shredding = false;
  headquarter.value.is_virtual = false;

  headquarter.value.address_id = addressFromResponse.address_id;

  return store
    .dispatch("addHeadquarter", headquarter.value)
    .then((res) => {
      hqFromResponse = res.headquarters;
      return hqFromResponse;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function addCompany(): Promise<Response> {
  doCompanyDataRef.value.currentCompany.fakturacia_zaplatene_do = firstTimePaymentDate;
  if(userFromResponse) {
    doCompanyDataRef.value.currentCompany.owner = userFromResponse.user_id;
  } else {
    doCompanyDataRef.value.currentCompany.owner = userData.value.id;
  }
  doCompanyDataRef.value.currentCompany.headquarters_id = hqFromResponse.id;

    return store
    .dispatch("addCompany", doCompanyDataRef.value.currentCompany)
    .then((res) => {
      companyFromResponse = res;
      return companyFromResponse;
    })
    .catch((err) => {
      console.log(err);
    });
}

</script>
