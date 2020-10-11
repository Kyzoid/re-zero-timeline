<template>
  <div id="app">
    <div id="nav" class="bg-gray-900 py-2 mb-2">
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

<style lang="scss">
  .re-zero {
    text-shadow: 0 0 1px white;
  }
</style>
