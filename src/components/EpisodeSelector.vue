<template>
  <div class="episode-selector">
    <div>Episodes</div>
    <nav class="text-white">
      <ul class="episodes flex flex-wrap w-48">
        <li v-for="episode in episodes" :key="episode.id" class="mr-1 mb-1">
          <a
            :href="`#${episode.id}`"
            class="bg-gray-900 flex py-2 hover:bg-gray-800 transition duration-300 text-center"
          >
            <span class="w-full" :title="episode.length">{{ episode.id }}</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import data from './data';

export default Vue.extend({
  name: 'EpisodeSelector',
  data: () => ({
    episodes: data.episodes,
  }),
});
</script>

<style lang="scss" scoped>
.episodes > li {
  width: 44px;
}
</style>
