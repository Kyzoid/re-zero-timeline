<template>
  <div
  class="respawn-point border-2 hover:border-subaru-100 border-transparent rounded-full w-6 h-6 transition duration-300
  cursor-pointer transition duration-300 flex items-center justify-center"
  >
    <div class="bg-subaru-100 rounded-full w-4 h-4
    cursor-pointer transition duration-300">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'RespawnPoint',
});
</script>
