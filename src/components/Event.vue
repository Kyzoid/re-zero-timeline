<template>
  <div
  class="event absolute pl-1 flex items-center"
  >
    <div @click="showTooltip" class="event z-20">
      <div v-if="type === 'Event'"
      class="bg-gray-700 rounded-full w-4 h-4 hover:bg-purple-600
      cursor-pointer transition duration-300">
      </div>
      <DeathIcon v-if="type === 'Death'" />
      <RespawnPoint :data-complexity="complexity" v-if="type === 'RespawnPoint'" />
    </div>
    <Tooltip
    class="hidden z-30"
    :type="type"
    :timecode="timecode"
    :episode="episode"
    :episodeRelativeTC="episodeRelativeTC"
    :description="description"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import DeathIcon from './DeathIcon.vue';
import Tooltip from './Tooltip.vue';
import RespawnPoint from './RespawnPoint.vue';

export default Vue.extend({
  name: 'Event',
  components: {
    DeathIcon,
    Tooltip,
    RespawnPoint,
  },
  props: {
    type: String,
    timecode: String,
    episode: String,
    episodeRelativeTC: String,
    description: String,
    complexity: Number,
  },
  methods: {
    showTooltip({ target }: { target: HTMLElement }) {
      const event = target.closest('.event');
      if (event) {
        const sibling = event.nextSibling as HTMLElement;
        if (sibling) {
          sibling.classList.toggle('hidden');
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
