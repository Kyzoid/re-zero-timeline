<template>
  <div class="relative w-full h-2 my-2 flex items-center">
    <div class="timeline relative flex items-center loop h-1 bg-gray-700 w-full">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Timeline',
});
</script>

<style lang="scss" scoped>
</style>
