<template>
  <div class="event absolute pl-1 flex items-center">
    <div :id="eventId" class="z-20">
      <div
        v-if="type === 'Event'"
        class="respawn-point border-2 hover:border-subaru-100 border-transparent rounded-full w-6 h-6 transition duration-300
        cursor-pointer transition duration-300 flex items-center justify-center transform hover:scale-120"
        >
        <div class="bg-rz-logo-100 rounded-full w-4 h-4
          cursor-pointer transition duration-300">
        </div>
      </div>
      <DeathIcon v-if="type === 'Death'"/>
      <RespawnPoint :data-complexity="complexity" v-if="type === 'RespawnPoint'" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/translucent.css';
import 'tippy.js/animations/shift-away.css';
import DeathIcon from './DeathIcon.vue';
import RespawnPoint from './RespawnPoint.vue';
import { EpisodeType } from './types';

import data from './data';

export default Vue.extend({
  name: 'Event',
  data() {
    return {
      episodes: data.episodes,
    };
  },
  components: {
    DeathIcon,
    RespawnPoint,
  },
  props: {
    type: String,
    timecode: String,
    episode: String,
    episodeRelativeTC: String,
    description: String,
    complexity: Number,
    eventId: String,
    timeline: Number,
    image: String,
  },
  mounted() {
    const episodeFound: EpisodeType = this.$data.episodes.find((episode: EpisodeType) => episode.code === this.$props.episode);
    tippy(`#${this.$props.eventId}`, {
      content: `
        <span class="font-bold">
          Episode ${this.$props.episode} – ${episodeFound ? episodeFound.title : ''} (${this.$props.episodeRelativeTC})
        </span>
        <p class="py-1">${this.$props.description}</p>
        <span>Type:
          <span class="text-purple-300">
            ${this.$props.type} ${this.$props.type === 'Death' ? '#' : ''}${this.$props.type === 'Death' ? this.$props.timeline : ''}
          </span>
        </span>
      `,
      allowHTML: true,
      arrow: true,
      theme: 'translucent',
      animation: 'shift-away',
      onShow: (instance) => {
        const backgroundElement = document.querySelector('#app > #bg-img') as HTMLDivElement || null;
        if (this.$props.image && backgroundElement) {
          backgroundElement.style.backgroundImage = `url('${this.$props.image}')`;
        }
        console.log(instance);
      },
    });
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

<style lang="postcss" scoped>
  .respawn-point:hover > div {
    @apply bg-subaru-100;
  }
</style>
