<template>
  <div id="app"
  class="h-full"
  @mousedown="handleMouseDown"
  @mouseup="handleMouseUp">
    <router-view name="header" />
    <router-view />
    <div id="bg-img" style="background-image: url('/images/events/subaru-spawns-lugnica.png')"></div>
    <div id="bg-mask"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  methods: {
    handleMouseUp() {
      this.$store.commit('bottomBarIsMouseDown', false);
    },
    handleMouseDown(event: { target: HTMLElement }) {
      this.$store.commit('bottomBarIsMouseDown', true);
      if (!event.target.closest('#settings')) {
        const settingsPanel = document.getElementById('settings-panel');
        const settingsIcon = document.getElementById('settings-icon');
        if (settingsPanel && settingsIcon) {
          settingsPanel.classList.add('invisible');
          settingsPanel.classList.remove('visible');
          settingsPanel.classList.remove('opacity-100');
          settingsIcon.classList.remove('rotate-90');
        }
      }
    },
  },
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
    z-index: -1;
    opacity: .3;
    transition: all .5s;
    @apply top-0 left-0 h-full w-full bg-center bg-no-repeat bg-cover absolute;
  }

  #app > #bg-mask {
    z-index: -1;
    opacity: 1;
    background-image: url('/images/bg-mask.png');
    @apply top-0 left-0 h-full w-full bg-repeat absolute;
  }
</style>
