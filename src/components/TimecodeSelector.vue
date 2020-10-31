<template>
  <div id="timecode-selector" class="z-50 bg-gray-800 w-full bottom-0 p-2">
    <input
      @input="updateDomInfo"
      id="time-elapsed-input"
      type="range"
      class="w-full"
      min="0"
      :max="lengthInSeconds"
      value="0"
    />
    <div class="flex justify-between">
      <div class="flex">
        <div><span id="time-elapsed">00:00</span> / <span id="episode-length">25:16</span></div>
        <span class="px-2">•</span><div>Episode <span id="episode">S1 - E1A</span></div>
      </div>
      <div><span id="total-time-elapsed">00:00:00</span> / <span>16:28:24</span></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import data from './data';

type Episode = {
  id: string;
  endAt: string;
  title: string;
}

export default Vue.extend({
  name: 'TimecodeSelector',
  data: () => ({
    timecode: 0,
    lengthInSeconds: 59304,
    episodes: data.episodes,
  }),
  methods: {
    updateDomInfo() {
      const timeElapsedInput = document.getElementById('time-elapsed-input') as HTMLInputElement;
      const timeElapsedInputValue = parseInt(timeElapsedInput.value, 10);

      this.updateTotalTimeElapsed(timeElapsedInputValue);
      this.updateEpisode(timeElapsedInputValue);
    },

    updateTotalTimeElapsed(timeElapsedInputValue: number) {
      const totalTimeElapsed = document.getElementById('total-time-elapsed') as HTMLElement;
      totalTimeElapsed.textContent = this.toTimecode(timeElapsedInputValue);
    },

    updateEpisode(timeElapsedInputValue: number) {
      const episodeElement = document.getElementById('episode') as HTMLElement;
      const episodeIndex = this.findEpisodeIndex(timeElapsedInputValue);
      const episode = this.$data.episodes[episodeIndex];
      if (episode) {
        episodeElement.textContent = episode.id;
      }
      this.updateEpisodeTimeElapsed(episodeIndex, timeElapsedInputValue);
    },

    updateEpisodeTimeElapsed(episodeIndex: number, timeElapsedInputValue: number) {
      const episodeLengthElement = document.getElementById('episode-length') as HTMLElement;
      const episodeTimeElapsedElement = document.getElementById('time-elapsed') as HTMLElement;

      const lastEpisode = this.$data.episodes[episodeIndex - 1];
      const episodeStartAt = lastEpisode ? lastEpisode.endAt : '00:00:00';
      const episodeEndAt = this.$data.episodes[episodeIndex].endAt;

      const episodeLength = this.toTimecode(
        this.toSeconds(episodeEndAt) - this.toSeconds(episodeStartAt),
      );

      const episodeTimeElapsed = this.toTimecode(
        timeElapsedInputValue - this.toSeconds(episodeStartAt),
      );

      episodeLengthElement.textContent = episodeLength.slice(3);
      episodeTimeElapsedElement.textContent = episodeTimeElapsed.slice(3);
    },

    toSeconds(timecode: string) {
      return timecode.split(':').reduce(
        // eslint-disable-next-line max-len
        (acc, value, index, array) => acc + parseInt(value, 10) * 60 ** (array.length - index - 1),
        0,
      );
    },

    toTimecode(seconds: number): string {
      return new Date(seconds * 1000).toISOString().substr(11, 8);
    },

    findEpisodeIndex(seconds: number): number {
      return this.$data.episodes.findIndex((episode: Episode) => {
        const epEndAtInSeconds = this.toSeconds(episode.endAt);
        return seconds <= epEndAtInSeconds;
      });
    },
  },
});
</script>

<style lang="scss" scoped>

</style>
