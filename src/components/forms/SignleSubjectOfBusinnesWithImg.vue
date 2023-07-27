<template>
    <div class="flex flex-col items-center pr-5">
        <!-- Display the image -->
        <img :src="image" :alt="title" class="w-36 cursor-pointer" />
        <!-- Display the title -->
        <h4 class="my-4 font-bold cursor-pointer">{{ title }}</h4>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    // items: {
    //   type: Array as () => SingleSubjectOfBusinessWithImg[],
    //   required: true,
    // },
  },
});

</script>