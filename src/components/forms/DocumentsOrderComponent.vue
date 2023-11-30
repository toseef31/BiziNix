<template>
  <!-- FORM -->
  <div>
    <FormKit type="form" :actions="false" id="documentsOrder" @submit-invalid="showErrors"
      #default="{ value, state: { valid } }" @submit="submitApp">
      <div>
        <ul class="validation-errors" v-if="messages.length">
          <li v-for="message in messages">{{ message }}</li>
        </ul>
      </div>
      <FormKit type="multi-step" name="documentsOrderMultiStepPlugin" tab-style="tab">
        <FormKit type="step" name="podnikatelskeUdaje" label="Podnikateľské údaje" next-label="Pokračovať"
          previous-label="Naspäť">
          <PodnikatelskeUdajeDocumentsFormStep ref="doCompanyDataRef" />
        </FormKit>

        <FormKit type="step" name="ucet" label="Účet" next-label="Pokračovať" previous-label="Naspäť">
          <userRegisterFormStep ref="doAccountDataRef" />
        </FormKit>

        <FormKit type="step" name="fakturacneUdaje" label="Fakturačné údaje" previous-label="Naspäť">
          <fakturacneUdajeFormStep ref="doInvoiceDataRef" />
        </FormKit>
      </FormKit>
      <FormKit type="checkbox" label="Všeobecné obchodné podmienky" validation="accepted" validation-visibility="dirty">
        <template #label="context">
          <span :class="context.classes.label">Súhlasím so <a href="/obchodne-podmienky" target="_blank">všeobecnými
              podmienkami poskytovania služby</a>.</span>
        </template>
      </FormKit>
      <FormKit type="submit" label="Objednať" />
      <div v-show="firstTimeActivation">
        <label class="text-xs italic text-gray-300">Prvú faktúru obdržíte o 3 mesiace.<br>Dovtedy Vám nebudeme nič
          účtovať.</label>
      </div>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { ref, computed } from "vue";
import router from "@/router";
import type User from "@/types/User";
import type Company from "@/types/Company";
import moment from "moment";
import { getValidationMessages } from '@formkit/validation'
import userRegisterFormStep from "@/components/forms/UserRegisterFormStep.vue";
import fakturacneUdajeFormStep from "@/components/forms/fakturacneUdajeFormStep.vue";
import PodnikatelskeUdajeDocumentsFormStep from "./podnikatelskeUdajeDocumentsFormStep.vue"

let doCompanyDataRef = ref<InstanceType<typeof PodnikatelskeUdajeDocumentsFormStep>>(null as any);
let doAccountDataRef = ref<InstanceType<typeof userRegisterFormStep>>(null as any);
let doInvoiceDataRef = ref<InstanceType<typeof fakturacneUdajeFormStep>>(null as any);

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
  hqFromResponse: any,
  companyFromResponse: any,
  orderFromRes: any;

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

function addOrder(userId, invoiceProfileId, firstTimeActivation): Promise<Response> {
  if (companyFromResponse) {
    order.value.company_id = companyFromResponse.company.id;
  } else {
    order.value.company_id = doCompanyDataRef.value.currentCompany.id;
  }

  order.value.user_id = userId;

  if (addressFromResponse) {
    order.value.address_id = addressFromResponse.address_id;
  } else {
    order.value.address_id = doInvoiceDataRef.value.invoiceAddressId;
  }

  order.value.amount = 0;
  order.value.amount_vat = 0;
  order.value.is_paid = false;

  let items = [
    {
      price: 0,
      price_vat: 0,
      description: "Objednávka balíčku dokladov",
    },
  ];

  if (firstTimeActivation) {
    items = [
      {
        price: 0,
        price_vat: 0,
        description: "Objednávka balíčku dokladov na 3 mesiace zadarmo",
      },
    ];
    order.value.is_paid = true;
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
  order.value.fakturacne_udaje_id = invoiceProfileId;

  order.value.is_tos_accepted = true;
  order.value.is_advocate_requested = false;
  order.value.description = "Objednávka balíčku dokladov";
  

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

async function submitApp(formData: any) {
  try {
    let userId = null as unknown as number;
    if (!doAccountDataRef.value.userData.id) {
      userId = await registerUser();
    } else {
      userId = doAccountDataRef.value.userData.id
    }

    let invoiceProfileId = null as unknown as number;
    if (doInvoiceDataRef.value.createNewInvoiceProfile) {
      let invoiceAddressRes: any;
      if (!doInvoiceDataRef.value.orderingAsCompany) {
        invoiceAddressRes = await registerAddress();
      }
      else if (doInvoiceDataRef.value.orderingAsCompany) {
        invoiceAddressRes = await registerAddress();
      }
      doInvoiceDataRef.value.invoiceAddressId = invoiceAddressRes.address_id;
      const response = await addInvoiceProfile(userId, invoiceAddressRes.address_id);
      invoiceProfileId = response.id;
    }
    else {
      invoiceProfileId = doInvoiceDataRef.value.invoiceProfileId
    }

    if (firstTimeActivation.value) {
      await continueFirstTimeActivation(userId, invoiceProfileId, doInvoiceDataRef.value.invoiceAddressId);
    } else {
      await continueToPayment(userId, invoiceProfileId);
    }
  } catch (err: any) {
    console.log(err);
  }
};

async function continueFirstTimeActivation(userId, invoiceProfileId, address_id) {
  /*const result = await doCompanyDataRef.value.isIcoAlreadyRegistered(doCompanyDataRef.value.currentCompany.ico);
  console.log(result)*/
  try {
    if (user.value.userId) {
      const result = await doCompanyDataRef.value.isIcoAlreadyRegistered(doCompanyDataRef.value.currentCompany.ico);
      if (result) {
        if (invoiceProfileId == 0) {
          await addHeadquarter(address_id).then(async () => {
            await addCompany(userId).then(async () => {
              addOrder(userId, invoiceProfileId, true).then(() => {
                router.push({
                  name: "Thanks You New Order",
                  params: {
                    orderId: orderFromRes.id,
                  },
                });
              });
            });
          });
        } else { 
          await addHeadquarter(address_id).then(async () => {
            await addCompany(userId).then(async () => {
              addOrder(userId, invoiceProfileId, true).then(() => {
                router.push({
                  name: "Thanks You New Order",
                  params: {
                    orderId: orderFromRes.id,
                  },
                });
              });
            });
          });
        }
      } else {
        doCompanyDataRef.value.currentCompany.fakturacia_zaplatene_do = firstTimePaymentDate;
        doCompanyDataRef.value.currentCompany.fakturacia_free = true;
        await store
          .dispatch("updateCompany", doCompanyDataRef.value.currentCompany)
          .then(async () => {
            addOrder(userId, invoiceProfileId, true).then(() => {
              router.push({
                name: "Thanks You New Order",
                params: {
                  orderId: orderFromRes.id,
                },
              });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      await addHeadquarter(address_id).then(async () => {
        await addCompany(userId).then(async () => {
          addOrder(userId, invoiceProfileId, true).then(() => {
            router.push({
              name: "Thanks You New Order",
              params: {
                orderId: orderFromRes.id,
              },
            });
          });
        });
      });
    }
  } catch (err: any) {
    console.log(err);
  }
}

async function continueToPayment(userId, invoiceProfileId) {
  try {
    const result = await doCompanyDataRef.value.isIcoAlreadyRegistered(doCompanyDataRef.value.currentCompany.ico);
    if (result) {
      try {
        await addCompany(userId).then(async (res) => {
          if (companyFromResponse) {
            addOrder(userId, invoiceProfileId, false).then(async () => {
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
                  router.push({
                    name: "Thanks You New Order",
                    params: {
                      orderId: orderFromRes.id,
                    },
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          } else {
            console.log(res);
          }
        });
      } catch {
        addOrder(userId, invoiceProfileId, false).then(async () => {
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
      addOrder(userId, invoiceProfileId, false).then(async () => {
        doCompanyDataRef.value.currentCompany.fakturacia_zaplatene_do = yearlyPaymentDate;
        doCompanyDataRef.value.currentCompany.fakturacia_free = false;
        router.push({
          name: "Thanks You New Order",
          params: {
            orderId: orderFromRes.id,
          },
        });
        store
          .dispatch("updateCompany", doCompanyDataRef.value.currentCompany)
          .then(() => {
            router.push({
              name: "Thanks You New Order",
              params: {
                orderId: orderFromRes.id,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  } catch (err: any) {
    console.log(err);
  }
}

async function addInvoiceProfile(userId, invoiceAddressId): Promise<any> {
  let faktProfil = {
    first_name: doInvoiceDataRef.value.fakturacne_udaje.first_name,
    last_name: doInvoiceDataRef.value.fakturacne_udaje.last_name,
    name: doInvoiceDataRef.value.fakturacne_udaje.name,
    ico: doInvoiceDataRef.value.fakturacne_udaje.ico,
    dic: doInvoiceDataRef.value.fakturacne_udaje.dic,
    ic_dph: doInvoiceDataRef.value.fakturacne_udaje.ic_dph,
    address_id: invoiceAddressId,
    user_id: userId
  }

  return store.dispatch('addInvoiceProfile', faktProfil)
    .then((res) => {
      console.log("Adding invoice profile: ", JSON.stringify(res))
      return res
    })
    .catch((error: any) => {
      console.log(error)
    })
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
  let user;
  if(!doAccountDataRef.value.userData.id){
    user = doAccountDataRef.value.user
  }

  return store
    .dispatch("registerUser", user)
    .then((res) => {
      return res.user_id;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function addHeadquarter(address_id): Promise<Response> {
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

  headquarter.value.address_id = address_id;

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

async function addCompany(userId): Promise<Response> {
  doCompanyDataRef.value.currentCompany.fakturacia_zaplatene_do = firstTimePaymentDate;
  doCompanyDataRef.value.currentCompany.fakturacia_free = true;
  if (doAccountDataRef.value.userData.id) {
    doCompanyDataRef.value.currentCompany.owner = doAccountDataRef.value.userData.id;
  } else {
    doCompanyDataRef.value.currentCompany.owner = userId;
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
