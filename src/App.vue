<template>
  <div id="app"
  class="h-full"
  @mousedown="handleMouseDown"
  @mouseup="handleMouseUp">
    <div id="nav" class="bg-gray-800 py-2">
      <div class="container mx-auto flex justify-between">
        <router-link to="/" class="hover:text-gray-400">Home</router-link>
        <router-link to="/" class="re-zero font-bold text-black text-lg">
          <span class="text-purple-300 font-normal">Re</span>:ゼロ
        </router-link>
        <router-link to="/about" class="hover:text-gray-400">About</router-link>
      </div>
    </div>
    <router-view />
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
        const settingsPanel = document.getElementById('settings-panel') as HTMLElement;
        const settingsIcon = document.getElementById('settings-icon') as HTMLElement;
        settingsPanel.classList.add('invisible');
        settingsPanel.classList.remove('visible');
        settingsPanel.classList.remove('opacity-100');
        settingsIcon.classList.remove('rotate-90');
      }
    },
  },
});
</script>

<style lang="scss">
  .re-zero {
    text-shadow: 0 0 1px white;
  }

  input[type="range"]::-webkit-slider-thumb {
    background-color: red;
  }

  input[type=range]:focus {
    outline: none;
  }

  input[type=range]::-webkit-slider-runnable-track {}

  body {
    user-select: none;
  }
</style>
