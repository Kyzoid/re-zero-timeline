<template>
  <div class="home container h-full">
    <TimelinesGraph />
    <EpisodeSelector />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TimelinesGraph from '@/components/TimelinesGraph.vue';
import EpisodeSelector from '@/components/EpisodeSelector.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    TimelinesGraph,
    EpisodeSelector,
  },
});
</script>
