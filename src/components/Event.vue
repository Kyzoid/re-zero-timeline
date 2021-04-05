<template>
  <div class="event z-40 absolute pl-1 flex items-center">
    <div
      v-if="type === 'Event'"
      :id="eventId"
      class="event-type border-2 hover:border-subaru-100 border-transparent rounded-full w-6 h-6 transition duration-300
      cursor-pointer transition duration-300 flex items-center justify-center"
      >
      <div class="bg-rz-logo-100 rounded-full w-4 h-4
        cursor-pointer transition duration-300">
      </div>
    </div>
    <DeathIcon v-if="type === 'Death'" :id="eventId"/>
    <SeasonSeparator v-if="type === 'SeasonSeparator'" :id="eventId" :description="description" />
    <RespawnPoint :data-complexity="complexity" v-if="type === 'RespawnPoint'" :id="eventId" />
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/translucent.css';
import 'tippy.js/animations/shift-away.css';
import DeathIcon from './DeathIcon.vue';
import RespawnPoint from './RespawnPoint.vue';
import SeasonSeparator from './SeasonSeparator.vue';
import { EpisodeType } from './types';

import data from './data';

export default (Vue as VueConstructor<
  Vue & {
    changeBgImage: Function;
  }
  >).extend({
  name: 'Event',
  data() {
    return {
      episodes: data.episodes,
    };
  },
  inject: ['changeBgImage'],
  components: {
    DeathIcon,
    RespawnPoint,
    SeasonSeparator,
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
    if (this.type !== 'SeasonSeparator') {
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
        onShow: () => {
          if (this.$props.image) {
            this.changeBgImage(this.$props.image);
          }
        },
      });
    }
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
  .event-type:hover > div {
    @apply bg-subaru-100;
  }
</style>
