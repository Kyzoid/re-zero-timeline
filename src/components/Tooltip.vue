<template>
  <div class="select-none z-20 text-sm tooltip bg-black bg-opacity-75 p-2 rounded absolute">
    <h1 class="text-lg">{{ type }} #{{ 1 }}</h1>
    <hr class="mb-2">
    <p class="leading-none">{{ description }}</p>
    <div class="mt-2 flex justify-between">
      <span>Episode : {{ episode }}</span>
      <span>Timecode : {{ episodeRelativeTC }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Tooltip',
  props: {
    type: String,
    timecode: String,
    episode: String,
    episodeRelativeTC: String,
    description: String,
  },
});
</script>

<style lang="scss" scoped>
  .tooltip {
    width: 350px;
    left: 1.75rem;

  }
  .tooltip::after{
    content: '';
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-bottom: 10px solid transparent;
    border-right: 10px solid rgba(0, 0, 0, .75);
    border-top: 10px solid transparent;
    clear: both;
}
</style>
