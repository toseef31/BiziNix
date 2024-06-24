<template>
    <div class="bg-gray-800 ">
      <div class="mx-auto max-w-7xl">
        <div class="bg-gray-800 py-3">
          <div class="px-4 sm:px-6 lg:px-8">
            <div class="sm:flex sm:items-center">
              <div class="sm:flex-auto">
                <h1 class="text-base text-xl font-semibold leading-6 text-white">Pošta</h1>
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
                    <thead>
                      <tr>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">Name</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">Váha v gramoch</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">Dátum</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">Akcia</th>
                        
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-800">
                      <tr v-for="person in people" :key="person.email">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{{ person.name }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-white">{{ person.title }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{{ person.email }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300 flex">
                            <span><svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0442 18V12M12.0442 12L9.04419 14M12.0442 12L15.0442 14M13.0442 3H8.24419C7.12419 3 6.56419 3 6.13619 3.218C5.75984 3.40969 5.45388 3.71565 5.26219 4.092C5.04419 4.52 5.04419 5.08 5.04419 6.2V17.8C5.04419 18.92 5.04419 19.48 5.26219 19.908C5.45393 20.2843 5.75988 20.5903 6.13619 20.782C6.56319 21 7.12319 21 8.24119 21H15.8472C16.9652 21 17.5242 21 17.9512 20.782C18.3282 20.59 18.6342 20.284 18.8262 19.908C19.0442 19.48 19.0442 18.922 19.0442 17.804V9M13.0442 3C13.3302 3.003 13.5102 3.014 13.6832 3.055C13.8872 3.105 14.0822 3.185 14.2612 3.295C14.4632 3.419 14.6362 3.592 14.9812 3.938L18.1072 7.063C18.4532 7.409 18.6252 7.581 18.7492 7.783C18.8592 7.963 18.9392 8.157 18.9892 8.361C19.0292 8.534 19.0412 8.715 19.0442 9M13.0442 3V5.8C13.0442 6.92 13.0442 7.48 13.2622 7.908C13.4539 8.28431 13.7599 8.59026 14.1362 8.782C14.5632 9 15.1232 9 16.2412 9H19.0442" stroke="#00A6A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            </span>
                            <span>
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.3523 13.691L15.1983 8.845M20.1543 5.889L16.0643 19.183C15.6973 20.375 15.5143 20.971 15.1973 21.168C15.0623 21.2524 14.9091 21.3034 14.7505 21.3166C14.5918 21.3298 14.4323 21.3049 14.2853 21.244C13.9413 21.101 13.6613 20.544 13.1033 19.428L10.5133 14.246C10.4597 14.1262 10.3951 14.0117 10.3203 13.904C10.2682 13.8362 10.2077 13.7754 10.1403 13.723C10.036 13.6508 9.92516 13.5886 9.80927 13.537L4.61627 10.939C3.50127 10.381 2.94327 10.102 2.80027 9.758C2.73928 9.61077 2.71435 9.4511 2.72757 9.29229C2.74079 9.13347 2.79177 8.98012 2.87627 8.845C3.07327 8.529 3.66927 8.345 4.86127 7.978L18.1563 3.888C19.0933 3.599 19.5613 3.455 19.8783 3.572C20.0144 3.622 20.1381 3.70103 20.2407 3.8036C20.3432 3.90618 20.4223 4.02983 20.4723 4.166C20.5883 4.482 20.4443 4.95 20.1563 5.886L20.1543 5.889Z" stroke="#00A6A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>

                            </span>
                            <span>
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.04419 6V17.8C6.04419 18.92 6.04419 19.48 6.26219 19.908C6.45393 20.2843 6.75988 20.5903 7.13619 20.782C7.56319 21 8.12319 21 9.24119 21H14.8472C15.9652 21 16.5242 21 16.9512 20.782C17.3282 20.59 17.6342 20.284 17.8262 19.908C18.0442 19.48 18.0442 18.921 18.0442 17.803V6M6.04419 6H8.04419M6.04419 6H4.04419M18.0442 6H16.0442M18.0442 6H20.0442M8.04419 6H16.0442M8.04419 6C8.04419 5.068 8.04419 4.602 8.19619 4.235C8.29659 3.99227 8.44382 3.7717 8.62947 3.58588C8.81512 3.40005 9.03556 3.25262 9.27819 3.152C9.64619 3 10.1122 3 11.0442 3H13.0442C13.9762 3 14.4422 3 14.8092 3.152C15.052 3.25251 15.2726 3.3999 15.4585 3.58572C15.6443 3.77155 15.7917 3.99218 15.8922 4.235C16.0442 4.602 16.0442 5.068 16.0442 6" stroke="#E41820" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>

                            </span>
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
    { name: 'Od', title: '60 g', email: 'Február 10, 2024', role: 'Member' },
    { name: 'Lindsay Walton', title: '60 g', email: 'Február 10, 2024', role: 'Member' },
    { name: 'Lindsay Walton', title: '60 g', email: 'Február 10, 2024', role: 'Member' },
    { name: 'Lindsay Walton', title: '60 g', email: 'Február 10, 2024', role: 'Member' },
    // More people...
  ]
  </script>