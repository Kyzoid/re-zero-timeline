<template>
  <div id="progress-bar"
  class="text-white bottom-bar-gradient w-full bottom-0 p-2 text-sm"
  >
    <ProgressBar class="mb-2 mt-1"
    v-on:play-progress-change="updateBarInfo"
    :min="0"
    :max="lengthInSeconds" />
    <div class="flex justify-between">
      <div class="flex">
        <div><span ref="timeElapsed">0:00</span> / <span ref="episodeLength">25:16</span></div>
        <span class="px-2">•</span>
        <div>
          <span>Episode </span>
          <span id="episode-id" ref="episodeId">1A</span>
          <span class="hidden md:inline"> – </span>
          <span class="hidden md:inline" ref="episodeTitle">The End of the Beginning and the Beginning of the End</span>
        </div>
      </div>
      <div class="flex">
        <div class="flex">
          <span ref="totalTimeElapsed">00:00:00</span> / <span>16:28:24</span>
        </div>
        <!-- <Settings /> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { EpisodeType } from '../types';
// import Settings from './Settings/Settings.vue';
import ProgressBar from './ProgressBar.vue';
import data from '../data';

export default (Vue as VueConstructor<
  Vue & {
    $refs: {
      episodeLength: HTMLSpanElement;
      episodeId: HTMLSpanElement;
      episodeTitle: HTMLSpanElement;
      totalTimeElapsed: HTMLSpanElement;
      timeElapsed: HTMLSpanElement;
    };
    toTimecode: Function;
  }
  >).extend({
  name: 'BottomBar',
  components: {
    // Settings,
    ProgressBar,
  },
  data: () => ({
    isMouseDown: false,
    timecode: 0,
    lengthInSeconds: 59304,
    episodes: data.episodes,
  }),
  inject: ['toTimecode'],
  methods: {
    updateBarInfo(value: number) {
      this.updateTotalTimeElapsed(value);
      this.updateEpisode(value);
    },

    updateTotalTimeElapsed(timeElapsedInputValue: number) {
      const timeElapsedValue = this.toTimecode(timeElapsedInputValue);
      this.$refs.totalTimeElapsed.textContent = timeElapsedValue;
    },

    updateEpisode(timeElapsedInputValue: number) {
      const episodeIndex = this.findEpisodeIndex(timeElapsedInputValue);
      const episode = this.$data.episodes[episodeIndex];
      if (episode) {
        this.$refs.episodeId.textContent = episode.code;
        this.$refs.episodeId.dataset.episodeId = episode.code;
        this.$refs.episodeTitle.textContent = episode.title;
      }
      this.updateEpisodeTimeElapsed(episodeIndex, timeElapsedInputValue);
    },

    updateEpisodeTimeElapsed(episodeIndex: number, timeElapsedInputValue: number) {
      const prevEpisode = this.$data.episodes[episodeIndex - 1];
      const episodeStartAt = prevEpisode ? prevEpisode.endAt : '00:00:00';
      const episodeEndAt = this.$data.episodes[episodeIndex].endAt;

      const episodeLength = this.toTimecode(
        this.toSeconds(episodeEndAt) - this.toSeconds(episodeStartAt),
      );

      const episodeTimeElapsed = this.toTimecode(
        timeElapsedInputValue - this.toSeconds(episodeStartAt),
      );

      this.$refs.episodeLength.textContent = episodeLength;
      this.$refs.timeElapsed.textContent = episodeTimeElapsed;
    },

    toSeconds(timecode: string) {
      return timecode.split(':').reduce(
        // eslint-disable-next-line max-len
        (acc, value, index, array) => acc + parseInt(value, 10) * 60 ** (array.length - index - 1),
        0,
      );
    },

    findEpisodeIndex(seconds: number): number {
      return this.$data.episodes.findIndex((episode: EpisodeType) => {
        const epEndAtInSeconds = this.toSeconds(episode.endAt);
        return seconds <= epEndAtInSeconds;
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.bottom-bar-gradient {
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(0,0,0,.7) 0%, rgba(0,0,0,0) 100%);
}
</style>
