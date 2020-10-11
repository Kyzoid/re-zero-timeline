<template>
  <div class="event absolute pl-1">
    <div v-if="type === 'Event'"
    class="bg-gray-700 rounded-full w-3 h-3 hover:bg-gray-600 cursor-pointer"></div>
    <DeathIcon v-if="type === 'Death'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import DeathIcon from './DeathIcon.vue';

export default Vue.extend({
  name: 'Event',
  components: {
    DeathIcon,
  },
  props: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
</style>
