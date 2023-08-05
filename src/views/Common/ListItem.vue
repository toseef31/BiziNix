<template>
    <div class="list-item" v-if="listItem">
      {{ listItem.name }}
      <button @click="editItem(listItem)" class="edit-button">Edit</button>
      <input type="checkbox" v-model="listItem.selected" @change="handleCheckboxChange" />
      <button @click="removeItem(listItem)" class="remove-button">Remove</button>
      <button @click="addItem(listItem)" class="remove-button">Add</button>
      <ModalForList v-if="showModal" @close="closeModal">
        <form @submit.prevent="saveItem">
          <label>Name:</label>
          <input v-model="editedItem.name" required />
          <button type="submit">Save</button>
        </form>
      </ModalForList>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue';
  import ModalForList from './ModalForList.vue'
  
  const props = defineProps({
    listItem: Object as () => ItemType | undefined,
  });
  
  interface ItemType {
    id: number;
    name: string;
    selected: boolean;
  }
  
  const showModal = ref(false);
  //const editedItem = reactive({ ...props.listItem });
  const editedItem = reactive<ItemType>({ id: 0, name: '', selected: false });
  
  const itemList = ref<ItemType[]>([]); // Define the type here
  const secondItemList = ref<ItemType[]>([]); // Define the type here
  
  const editItem = (item: ItemType) => {
    editedItem.name = item.name;
    showModal.value = true;
  };
  
  const closeModal = () => {
    showModal.value = false;
  };
  
  const saveItem = () => {
    const item = props.listItem;
    if (item) {
      const index = itemList.value.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        itemList.value[index] = { ...item, name: editedItem.name };
      }
      closeModal();
    }
  };
  
  const handleCheckboxChange = () => {
    const item = props.listItem;
    if (item && item.selected) {
        console.log("test")
      secondItemList.value.push(item);
    } else {
      const index = secondItemList.value.findIndex((i) => i.id === item?.id);
      if (index !== -1) {
        secondItemList.value.splice(index, 1);
      }
    }
  };
    
  const addItem = (itemToRemove: ItemType) => {
    const item = props.listItem;
    if (item) {
      const index = itemList.value.findIndex((i) => i.id === itemToRemove.id);
      itemList.value.push({id: 22, name: "Jozko", selected: false})
      console.log('adddd')
      if (index !== -1) {
        itemList.value.splice(index, 1);
        console.log('sliceAdd?')
      }
    }
  };

  const removeItem = (itemToRemove: ItemType) => {
    const item = props.listItem;
    if (item) {
      const index = itemList.value.findIndex((i) => i.id === itemToRemove.id);
      if (index !== -1) {
        itemList.value.splice(index, 1);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styling here */
  </style>
  