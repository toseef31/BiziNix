<template>
    <div class="bg-gray-800 ">
      <div class="mx-auto max-w-7xl">
        <div class="bg-gray-800 py-2">
          <div class="px-4 sm:px-6 lg:px-8">
            <div class="sm:flex sm:items-center">
              <div class="sm:flex-auto">
                <h1 class="text-base text-xl font-semibold leading-6 text-white">Posledné pohľadávky</h1>
              </div>
              <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5661 18.6654C18.0829 18.6654 19.3125 17.4715 19.3125 15.9987C19.3125 14.5259 18.0829 13.332 16.5661 13.332C15.0494 13.332 13.8198 14.5259 13.8198 15.9987C13.8198 17.4715 15.0494 18.6654 16.5661 18.6654Z" fill="#9BABC5"/>
                <path d="M5.58079 18.6654C7.09755 18.6654 8.32712 17.4715 8.32712 15.9987C8.32712 14.5259 7.09755 13.332 5.58079 13.332C4.06404 13.332 2.83447 14.5259 2.83447 15.9987C2.83447 17.4715 4.06404 18.6654 5.58079 18.6654Z" fill="#9BABC5"/>
                <path d="M27.5515 18.6654C29.0682 18.6654 30.2978 17.4715 30.2978 15.9987C30.2978 14.5259 29.0682 13.332 27.5515 13.332C26.0347 13.332 24.8052 14.5259 24.8052 15.9987C24.8052 17.4715 26.0347 18.6654 27.5515 18.6654Z" fill="#9BABC5"/>
                </svg>
              </div>
            </div>
            <div class="mt-8 flow-root">
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table class="min-w-full divide-y divide-gray-700">
                  
                    <tbody class="divide-y divide-gray-800">
                      <tr v-for="person in people" :key="person.email">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{{ person.name }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{{ person.title }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-white">{{ person.email }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300 flex justify-end">
                            <button type="button" class="block rounded-md bg-red-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Úhrada</button>
                        </td>
                        
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const people = [
    { name: 'Faktúra č.1', title: 'Február 10, 2024', email: '-$480' },
    { name: 'Faktúra č.1', title: 'Február 10, 2024', email: '-$222' },
    { name: 'Faktúra č.1', title: 'Február 10, 2024', email: '-$480' },
    { name: 'Faktúra č.1', title: 'Február 10, 2024', email: '-$480' },
    // More people...
  ]
  </script>