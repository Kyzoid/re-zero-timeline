<template>
  <div class="relative w-full h-10 flex items-center">
    <div
    class="timeline relative flex items-center transition duration-300
    loop h-1 bg-rz-logo-100 hover:bg-subaru-100 w-full">
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

<style lang="scss">

.timeline:hover {
  transition: all .3s;
  & .timeline-joint svg {
    z-index: 15;
    & path {
      stroke: #F3B15F;
      transition: all .3s;
    }

    & line {
      stroke: #F3B15F;
      transition: all .3s;
    }
  }
}

</style>
