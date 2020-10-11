<template>
<div>
  <svg
    v-if="jointType === 'top'"
    class="absolute"
    style="left: -1.1rem; top: -1.25rem"
    width="19"
    :height="jointHeight"
    :viewBox="`0 0 19 ${jointHeight}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.2963 22C9.2961 22 2 12.1503 2 0"
      stroke="#4A5568"
      stroke-width="4"
    />
    <line x1="2" y1="24" x2="2" :y2="jointHeight" stroke="#4A5568" stroke-width="4"/>
  </svg>
  <svg
    v-if="jointType === 'bottom'"
    class="absolute"
    style="left: -1.1rem; top: 0rem; "
    width="19"
    :height="jointHeight"
    :viewBox="`0 0 19 ${jointHeight}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.2963 2C9.2961 2 2 11.8497 2 24" stroke="#4A5568" stroke-width="4"/>
    <line x1="2" y1="24" x2="2" :y2="jointHeight" stroke="#4A5568" stroke-width="4"/>
  </svg>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TimelineJoint',
  props: {
    jointType: String,
    jointHeight: String,
  },
});
</script>

<style lang="scss" scoped>
</style>
