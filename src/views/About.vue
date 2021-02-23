<template>
  <div class="design container select-text text-white">
    <h1 class="mt-4 text-3xl font-sans">Colors</h1>
    <div class="grid grid-flow-col grid-flow-row gap-4 mt-4 h-24">
      <div class="bg-rz-100 flex items-center justify-center">rz-100</div>
      <div class="bg-rz-200 flex items-center justify-center">rz-200</div>
      <div class="bg-rz-300 flex items-center justify-center">rz-300</div>
      <div class="bg-rz-400 flex items-center justify-center">rz-400</div>
      <div class="bg-rz-500 flex items-center justify-center">rz-500</div>
      <div class="bg-rz-600 flex items-center justify-center">rz-600</div>
      <div class="bg-rz-700 flex items-center justify-center">rz-700</div>
      <div class="bg-rz-800 flex items-center justify-center">rz-800</div>
    </div>
    <div class="grid grid-flow-col grid-flow-row gap-4 mt-4 h-24">
      <div class="bg-rz-logo-100 flex items-center justify-center">rz-logo-100</div>
      <div class="bg-rz-logo-600 flex items-center justify-center">rz-logo-600</div>
    </div>
    <div class="grid grid-flow-col grid-flow-row gap-4 mt-4 h-24">
      <div class="bg-subaru-100 flex items-center justify-center">subaru-100</div>
    </div>
    <div class="mt-4">
      <h1 class="text-3xl font-sans">Font family</h1>
      <div>
        <a href="https://fonts.google.com/specimen/Roboto?preview.text_type=custom"
        target="_blank"
        class="border-b border-transparent hover:border-google-font-100 transition duration-300 hover:text-google-font-100">
          Roboto
        </a>
      </div>
    </div>
    <div class="mt-4">
      <h1 class="mt-4 text-3xl font-sans">Front-end framework</h1>
      <div>
        <a href="https://vuejs.org/"
        target="_blank"
        class="border-b border-transparent hover:border-vue-100 transition duration-300 hover:text-vue-100">
          Vue.js 2
        </a>
      </div>
    </div>
    <div class="mt-4">
      <h1 class="mt-4 text-3xl font-sans">CSS framework</h1>
      <div>
        <a href="https://tailwindcss.com/"
        target="_blank"
        class="border-b border-transparent hover:border-tailwindcss-100 transition duration-300 hover:text-tailwindcss-100">
          tailwindcss
        </a>
      </div>
    </div>
    <div class="mt-4">
      <h1 class="mt-4 text-3xl font-sans">Tooltip library</h1>
      <div>
        <a href="https://atomiks.github.io/tippyjs/"
        target="_blank"
        class="border-b border-transparent hover:border-tippy-100 transition duration-300 hover:text-tippy-100">
          Tippy.js
        </a>
      </div>
    </div>
    <div class="mt-4">
      <h1 class="mt-4 text-3xl font-sans">Based on</h1>
      <div>
        <a href="http://re-zero-anime.jp/"
        target="_blank"
        class="border-b border-transparent hover:border-rz-logo-100 transition duration-300 hover:text-rz-logo-100">
          Re:Zero –Starting Life in Another World–
        </a>
      </div>
    </div>
    <div class="mt-4">
      <h1 class="mt-4 text-3xl font-sans">Developed by</h1>
      <div>
        <a href="https://github.com/Kyzoid"
        target="_blank"
        class="border-b border-transparent hover:border-github-100 transition duration-300 hover:text-github-100">
          Kyzoid
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'About',
  components: {},
});
</script>
