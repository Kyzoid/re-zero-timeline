<template>
  <div id="progress-bar"
  class="z-50 bottom-bar-gradient w-full bottom-0 p-2 text-sm"
  >
    <ProgressBar class="mb-2 mt-1"
    v-on:play-progress-change="updateBarInfo"
    :min="0"
    :max="lengthInSeconds" />
    <div class="flex justify-between">
      <div class="flex">
        <div><span id="time-elapsed">0:00</span> / <span id="episode-length">25:16</span></div>
        <span class="px-2">•</span>
        <div>
          <span>Episode </span>
          <span id="episode-id">1A</span>
          <span class="hidden md:inline"> – </span>
          <span class="hidden md:inline" id="episode-title">The End of the Beginning and the Beginning of the End</span>
        </div>
      </div>
      <div class="flex">
        <div class="flex">
          <span id="total-time-elapsed">00:00:00</span> / <span>16:28:24</span>
        </div>
        <Settings />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Settings from './Settings/Settings.vue';
import ProgressBar from './ProgressBar.vue';

import data from '../data';

type Episode = {
  id: string;
  endAt: string;
  title: string;
};

export default Vue.extend({
  name: 'BottomBar',
  components: {
    Settings,
    ProgressBar,
  },
  data: () => ({
    isMouseDown: false,
    timecode: 0,
    lengthInSeconds: 59304,
    episodes: data.episodes,
  }),
  provide(): {} {
    return {
      toTimecode: this.toTimecode,
    };
  },
  methods: {
    updateBarInfo(value: number) {
      this.updateTotalTimeElapsed(value);
      this.updateEpisode(value);
    },

    updateTotalTimeElapsed(timeElapsedInputValue: number) {
      const totalTimeElapsed = document.getElementById('total-time-elapsed') as HTMLElement;
      const timeElapsedValue = this.toTimecode(timeElapsedInputValue);
      totalTimeElapsed.textContent = timeElapsedValue;
    },

    updateEpisode(timeElapsedInputValue: number) {
      const episodeIdElement = document.getElementById('episode-id') as HTMLElement;
      const episodeTitleElement = document.getElementById('episode-title') as HTMLElement;
      const episodeIndex = this.findEpisodeIndex(timeElapsedInputValue);
      const episode = this.$data.episodes[episodeIndex];
      if (episode) {
        episodeIdElement.textContent = episode.code;
        episodeTitleElement.textContent = episode.title;
      }
      this.updateEpisodeTimeElapsed(episodeIndex, timeElapsedInputValue);
    },

    updateEpisodeTimeElapsed(episodeIndex: number, timeElapsedInputValue: number) {
      const episodeLengthElement = document.getElementById('episode-length') as HTMLElement;
      const episodeTimeElapsedElement = document.getElementById('time-elapsed') as HTMLElement;

      const prevEpisode = this.$data.episodes[episodeIndex - 1];
      const episodeStartAt = prevEpisode ? prevEpisode.endAt : '00:00:00';
      const episodeEndAt = this.$data.episodes[episodeIndex].endAt;

      const episodeLength = this.toTimecode(
        this.toSeconds(episodeEndAt) - this.toSeconds(episodeStartAt),
      );

      const episodeTimeElapsed = this.toTimecode(
        timeElapsedInputValue - this.toSeconds(episodeStartAt),
      );

      episodeLengthElement.textContent = episodeLength;
      episodeTimeElapsedElement.textContent = episodeTimeElapsed;
    },

    toSeconds(timecode: string) {
      return timecode.split(':').reduce(
        // eslint-disable-next-line max-len
        (acc, value, index, array) => acc + parseInt(value, 10) * 60 ** (array.length - index - 1),
        0,
      );
    },

    toTimecode(seconds: number): string {
      const timecode = new Date(seconds * 1000).toISOString().substr(11, 8);
      const splittedTimecode = timecode.split(':').map((digit) => +digit);
      const cleanedTimecode: string[] = [];
      splittedTimecode.forEach((digit, index) => {
        if (index === 0 && digit === 0) {
          return;
        }

        if (index === 2) {
          cleanedTimecode.push(digit.toLocaleString(undefined, { minimumIntegerDigits: 2 }));
          return;
        }

        if (index !== 0) {
          if (splittedTimecode[index - 1] === 0) {
            cleanedTimecode.push(digit.toString());
            return;
          }
          cleanedTimecode.push(digit.toLocaleString(undefined, { minimumIntegerDigits: 2 }));
          return;
        }

        cleanedTimecode.push(digit.toString());
      });
      return cleanedTimecode.join(':');
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
.bottom-bar-gradient {
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(0,0,0,.7) 0%, rgba(0,0,0,0) 100%);
}
</style>
