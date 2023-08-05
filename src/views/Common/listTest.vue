<template>
  <div>
    <h2>First List</h2>
    <ul>
      <li v-for="(item, index) in firstList" :key="index">
        {{ item.name }} {{ item.surname }} {{ item.isFromCity }}
        <button @click="editItem(index, 'first')">Edit</button>
        <button @click="confirmRemoveItem(index, 'first')">Remove</button>
      </li>
    </ul>
    <h2>Second List</h2>
    <ul>
      <li v-for="(item, index) in secondList" :key="index">
        {{ item.motherName }} {{ item.fatherName }}
        <button :disabled="item.addedFromFirstList" @click="editItem(index, 'second')">Edit</button>
        <button @click="confirmRemoveItem(index, 'second')">Remove</button>
      </li>
    </ul>
    <button @click="addItem">Add Item</button>

    <div v-if="showModal">
      <h3>Add Item</h3>
      <form @submit.prevent="saveItem">

        <label>List: 
        <select v-model="selectedList">
          <option value="first">First List</option>
          <option value="second">Second List</option>
        </select>
      </label><br />
        <div v-if="selectedList === 'first'">
          <label>Name: <input type="text" v-model="newItem.name" /></label><br />
          <label>Surname: <input type="text" v-model="newItem.surname" /></label><br />
          <label>Is From City: <input type="checkbox" v-model="newItem.isFromCity" /></label><br />
        </div>
        <div v-else-if="selectedList === 'second'">
          <label>Mother Name: <input type="text" v-model="newItem.motherName" /></label><br />
          <label>Father Name: <input type="text" v-model="newItem.fatherName" /></label><br />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>


    <div v-if="showRemoveModal">
    <h3>Remove Item</h3>
    <p>Would you like to remove this item from the first list, second list, or both lists?</p>
    <button @click="removeItem(removeItemIndex, 'first')">First List</button> | 
    <button @click="removeItem(removeItemIndex, 'second')">Second List</button> | 
    <button @click="removeItem(removeItemIndex, 'both')">Both Lists</button>
  </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
    const showRemoveModal = ref(false);
    const removeItemIndex = ref();

    const firstList = reactive([
      { name: 'John', surname: 'Doe', isFromCity: true },
      { name: 'Jane', surname: 'Doe', isFromCity: false },
      { name: 'Bob', surname: 'Smith', isFromCity: true },
    ]);
    const secondList = reactive([
      { motherName: 'Alice', fatherName: 'Bob',addedFromFirstList: false },
      { motherName: 'Eve', fatherName: 'Frank',addedFromFirstList: false },
      { motherName: 'Grace', fatherName: 'Henry',addedFromFirstList: false },
    ]);
    const showModal = ref(false);
    const selectedList = ref('first');
    const newItem = reactive({
      name: '',
      surname: '',
      isFromCity: false,
      motherName: '',
      fatherName: '',
    });

    function editItem(index: number, list: string) {
      if (list === 'first') {
        newItem.name = firstList[index].name;
        newItem.surname = firstList[index].surname;
        newItem.isFromCity = firstList[index].isFromCity;
      } else if (list === 'second') {
        newItem.motherName = secondList[index].motherName;
        newItem.fatherName = secondList[index].fatherName;
      }
      selectedList.value = list;
      showModal.value = true;
    }

    function removeItem(index: number, list: string) {
      if (list === 'first') {
        firstList.splice(index, 1);
      } else if (list === 'second') {
        secondList.splice(index, 1);
      } else if (list === 'both') {
        firstList.splice(index, 1);
        secondList.splice(index, 1);
      }
      showRemoveModal.value = false;
      removeItemIndex.value = null;
    }

    function confirmRemoveItem(index: number, list: string) {
      if (list === 'first' && firstList[index].isFromCity) {
        showRemoveModal.value = true;
        removeItemIndex.value = index;
      } else if (list === 'second' && secondList[index].addedFromFirstList) {
        showRemoveModal.value = true;
        removeItemIndex.value = index;
      } else {
        removeItem(index, list);
      }
    }


    function addItem() {
      showModal.value = true;
    }

    function saveItem() {
      if (selectedList.value === 'first') {
        firstList.push({
          name: newItem.name,
          surname: newItem.surname,
          isFromCity: newItem.isFromCity,
        });
        if (newItem.isFromCity) {
          secondList.push({
            motherName: newItem.name,
            fatherName: newItem.surname,
            addedFromFirstList: true
          });
        }
      } else if (selectedList.value === 'second') {
        secondList.push({
          motherName: newItem.motherName,
          fatherName: newItem.fatherName,
          addedFromFirstList: false
        });
      }
      showModal.value = false;
    }
</script>

