<template>
  <div class="home">
    <TimelinesGraph />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TimelinesGraph from '@/components/TimelinesGraph.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    TimelinesGraph,
  },
});
</script>
