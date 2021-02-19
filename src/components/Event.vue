<template>
  <div class="event absolute pl-1 flex items-center">
    <div :id="eventId" class="z-20">
      <div
        v-if="type === 'Event'"
        class="bg-gray-700 rounded-full w-4 h-4 hover:bg-purple-600 cursor-pointer transition duration-300"
      ></div>
      <DeathIcon v-if="type === 'Death'" />
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
  },
  mounted() {
    const episodeFound = this.$data.episodes.find((episode: EpisodeType) => episode.code === this.$props.episode);
    tippy(`#${this.$props.eventId}`, {
      content: `
        <span class="font-bold">
          Episode ${this.$props.episode} – ${episodeFound ? episodeFound.title : ''} (${this.$props.episodeRelativeTC})
        </span>
        <p class="py-1">${this.$props.description}</p>
        <span>Type: <span class="text-purple-600">${this.$props.type} #${this.$props.timeline}</span></span>
      `,
      allowHTML: true,
      arrow: true,
      trigger: 'click',
      theme: 'translucent',
      animation: 'shift-away',
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
