<template>
  <div class="episode-selector">
    <div>Episodes</div>
    <nav class="text-white">
      <ul class="episodes flex flex-wrap w-48">
        <li v-for="episode in episodes" :key="episode.id" class="mr-1 mb-1">
          <a :href="`#${episode.id}`"
          class="bg-gray-900 flex py-2 hover:bg-gray-800 transition duration-300 text-center">
            <span class="w-full">{{ episode.id }}</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'EpisodeSelector',
  data: () => ({
    episodes: [
      { id: '1A', title: '' },
      { id: '1B', title: '' },
      { id: '2', title: '' },
      { id: '3', title: '' },
      { id: '4', title: '' },
      { id: '5', title: '' },
      { id: '6', title: '' },
      { id: '7', title: '' },
      { id: '8', title: '' },
      { id: '9', title: '' },
      { id: '10', title: '' },
      { id: '11', title: '' },
      { id: '12', title: '' },
      { id: '13', title: '' },
      { id: '14', title: '' },
      { id: '15', title: '' },
      { id: '16', title: '' },
      { id: '17', title: '' },
      { id: '18', title: '' },
      { id: '19', title: '' },
      { id: '20', title: '' },
      { id: '21', title: '' },
      { id: '23', title: '' },
      { id: '24', title: '' },
      { id: '25', title: '' },
      { id: '26', title: '' },
      { id: '27', title: '' },
      { id: '28', title: '' },
      { id: '29', title: '' },
      { id: '30', title: '' },
      { id: '31', title: '' },
      { id: '32', title: '' },
      { id: '33', title: '' },
      { id: '34', title: '' },
      { id: '35', title: '' },
      { id: '36', title: '' },
      { id: '37', title: '' },
      { id: '38', title: '' },
    ],
  }),
});
</script>

<style lang="scss" scoped>
  .episodes > li {
    width: 44px;
  }
</style>
