<template>
  <div class="home container mx-auto">
    <Timeline />
    <EpisodeSelector />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Timeline from '@/components/Timeline.vue';
import EpisodeSelector from '@/components/EpisodeSelector.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    Timeline,
    EpisodeSelector,
  },
});
</script>
