<template>
  <div id="app"
    class="h-full"
  >
    <div id="bg-img" style="background-image: url('/images/events/subaru-spawns-lugnica.png')"></div>
    <div id="bg-mask"></div>
    <router-view name="header" />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
});
</script>

<style lang="postcss">
  input[type="range"]::-webkit-slider-thumb {
    background-color: red;
  }

  input[type=range]:focus {
    outline: none;
  }

  input[type=range]::-webkit-slider-runnable-track {}

  html {
    font-family: Roboto !important;
  }

  html, body {
    user-select: none;
  }

  #app > #bg-img {
    opacity: .4;
    @apply top-0 left-0 h-full w-full bg-center bg-no-repeat bg-cover fixed;
    background-image: url('/images/events/subaru-spawns-lugnica.png')
  }

  #app > #bg-mask {
    opacity: 1;
    background-image: url('/images/bg-mask.png');
    @apply top-0 left-0 h-full w-full bg-repeat fixed;
  }
</style>
