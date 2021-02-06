<template>
  <div class="relative">
    <div class="progress-bar-container cursor-pointer"
    style="height: 5px"
    @mouseleave="handleHoverLeave">
      <div class="progress-bar relative h-full w-full">
        <div class="chapters-container flex h-full">
          <div
            v-for="episode in computedEpisodes"
            :key="episode.id"
            class="chapter relative h-full bg-white bg-opacity-50
            transform hover:scale-y-180 items-start transition duration-100"
            @mouseover="handleHoverEnter"
            @mousemove="handleMove"
            @click="handleClick"
            :data-id="episode.id"
            :style="`width:${episode.width}%; margin-right: ${episode.id !== 39 ? '2px' : '0px'};`"
          >
            <div
              class="play-progress z-2 absolute left-0 h-full bg-purple-600 pointer-events-none"
              style="width: 0%"
            ></div>
            <div
              class="hover-progress z-1 absolute left-0 h-full bg-gray-200 bg-opacity-75 pointer-events-none"
              style="width: 0%"
            ></div>
          </div>
          <div class="absolute hidden" id="hover-tooltip" style="bottom: 14px; left:0px;">00:00</div>
        </div>
        <div class="thumb absolute bg-purple-600 pointer-events-none"
        style="left: 0px;"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import data from '../data';

type Episode = {
  id: number;
  code: string;
  endAt: string;
  title: string;
  length: string;
  width?: number;
}

export default Vue.extend({
  name: 'ProgressBar',
  props: {
    min: Number,
    max: Number,
  },
  data: () => ({
    episodes: data.episodes,
  }),
  computed: {
    computedEpisodes(): Episode[] {
      return this.episodes.map((episode) => {
        const width = ((this as any).toSeconds(episode.length) / this.max) * 100;
        return {
          ...episode,
          width,
        };
      });
    },
  },
  inject: ['toTimecode', 'toSeconds'],
  methods: {
    emitPlayProgressChange(progressPosition: number) {
      const progressBar = document.querySelector('.progress-bar-container') as HTMLDivElement;
      const { width } = progressBar.getBoundingClientRect();
      const value = Math.round((progressPosition / width) * this.max);
      this.$emit('play-progress-change', value);
    },
    getChapters() {
      return Object.values(document.getElementsByClassName('chapter') as HTMLCollectionOf<HTMLDivElement>);
    },
    getPreviousChapters(chapterIndex: number) {
      return this.getChapters()
        .filter((chapter: HTMLDivElement) => chapter.dataset.id && +chapter.dataset.id < chapterIndex);
    },
    setProgress(chapters: HTMLDivElement[], width: number, type: string) {
      chapters.forEach((chapter) => {
        const progress = (type === 'hover')
          ? chapter.querySelector('.hover-progress') as HTMLDivElement
          : chapter.querySelector('.play-progress') as HTMLDivElement;
        progress.style.width = `${width}%`;

        if (type === 'hover') {
          const hoverProgress = chapter.querySelector('.hover-progress')?.parentNode as HTMLDivElement;
          const episodeId = hoverProgress.dataset.id;
          if (episodeId) {
            const episodeFound = this.episodes[this.episodes.findIndex((episode: Episode) => episode.id === +episodeId)];
            const episodeLength = (this as any).toSeconds(episodeFound.length);
            const currentEpisodeTimecode = (this as any).toTimecode((episodeLength * width) / 100);
            (document.getElementById('hover-tooltip') as HTMLDivElement).textContent = currentEpisodeTimecode;
          }
        }
      });
    },
    setThumbPosition(x: number, target: HTMLDivElement, progress: number) {
      const thumb = document.querySelector('.thumb') as HTMLDivElement;
      const thumbOffset = 8 + thumb.getBoundingClientRect().width / 2;
      const progressPosition = x - thumbOffset;
      thumb.style.left = `${progressPosition}px`;
      this.emitPlayProgressChange(progressPosition);
      const { id: chapterIndex } = target.dataset;
      if (chapterIndex) {
        this.setProgress(this.getChapters(), 0, 'play');
        const previousChapters = this.getPreviousChapters(+chapterIndex);
        this.setProgress(previousChapters, 100, 'play');
        this.setProgress([target], progress, 'play');
      }
    },
    setTooltipPosition(x: number) {
      const tooltip = document.getElementById('hover-tooltip') as HTMLDivElement;
      const progressBar = document.querySelector('.progress-bar-container') as HTMLDivElement;
      const { width: tooltipWidth, right: tooltipRight, left: tooltipLeft } = tooltip.getBoundingClientRect();
      const { right: progressBarRight } = progressBar.getBoundingClientRect();
      const tooltipOffset = 8 + tooltipWidth / 2;
      const newTooltipLeft = x - tooltipOffset;
      if (newTooltipLeft >= 0 && (tooltipRight - (tooltipLeft - newTooltipLeft - 8) < progressBarRight)) {
        tooltip.style.left = `${newTooltipLeft}px`;
      }
    },
    handleHoverEnter(event: { target: HTMLDivElement }) {
      const { id: chapterIndex } = event.target.dataset;
      if (chapterIndex) {
        const previousChapters = this.getPreviousChapters(+chapterIndex);
        this.setProgress(previousChapters, 100, 'hover');
      }
    },
    handleHoverLeave() {
      this.setProgress(this.getChapters(), 0, 'hover');
    },
    handleMove(event: MouseEvent) {
      const target = event.target as HTMLDivElement;
      const { left: targetLeft, width: targetWidth } = target.getBoundingClientRect();
      const { x: mouseX } = event;
      const progress = Math.abs(Math.round(((mouseX - targetLeft) / targetWidth) * 100));
      this.setProgress([target], progress, 'hover');
      this.setTooltipPosition(mouseX);
      if (this.$store.state.bottomBarIsMouseDown) {
        this.setThumbPosition(mouseX, target, progress);
      }
    },
    handleClick(event: MouseEvent) {
      const target = event.target as HTMLDivElement;
      const { left: targetLeft, width: targetWidth } = target.getBoundingClientRect();
      const { x: mouseX } = event;
      const progress = Math.round(((mouseX - targetLeft) / targetWidth) * 100);
      this.setThumbPosition(mouseX, target, progress);
    },
  },
});
</script>

<style lang="scss" scoped>
.thumb {
  height: 13px;
  width: 13px;
  border-radius: 6.5px;
  transition: transform .1s cubic-bezier(0.4, 0.0, 1, 1);
  top: -4px;
}

.chapter:hover ~ #hover-tooltip {
  display: block;
}
</style>
