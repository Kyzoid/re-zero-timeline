<template>
  <div id="nav" class="py-2 transparent text-white top-bar-gradient">
    <div class="mx-4 flex justify-between">
      <router-link to="/" class="re-zero font-bold text-black text-lg">
        <img src="/images/re-zero.png" width="220" />
      </router-link>
      <ul class="flex items-center">
        <li>
          <router-link
            to="/about"
            class="py-1 border-b-2 border-transparent hover:border-rz-logo-100 transition duration-300 uppercase"
            >:About</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Header',
});
</script>

<style lang="postcss" scoped>
.re-zero {
  text-shadow: 0 0 1px white;
}

.top-bar-gradient {
  background: rgb(0,0,0);
  background: linear-gradient(180deg, rgba(0,0,0,.5) 0%, rgba(0,0,0,0) 100%);
}
</style>
