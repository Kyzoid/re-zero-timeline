<!-- eslint-disable max-len -->
<template>
  <div id="nav" class="py-2 relative transparent text-white top-bar-gradient">
    <div class="mx-4 flex justify-between">
      <router-link to="/" class="re-zero font-bold text-black text-lg">
        <img src="/images/re-zero.png" class="w-32 md:w-44 lg:w-52" alt="Re:Zero Logo" />
      </router-link>
      <ul class="flex items-center">
        <li>
          <a href="https://github.com/Kyzoid/re-zero-timeline" target="_blank" rel="noreferrer">
            <img src="images/github.svg" alt="Github">
          </a>
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
  background: rgb(0, 0, 0);
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
}
</style>
