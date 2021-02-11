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
          <div class="flex flex-col absolute hidden text-center" id="hover-tooltip">
            <div class="flex flex-col leading-tight mb-1">
              <span id="tooltip-episode" class="font-bold">Episode 1A</span>
              <span id="tooltip-title">The End of the Beginning and the Beginning of the End</span>
            </div>
            <div id="tooltip-timer">00:00</div>
          </div>
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
    progressBarWidth: 0,
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
    progressBar(): HTMLDivElement {
      const progressBar = document.querySelector('.progress-bar-container') as HTMLDivElement;
      return progressBar;
    },
  },
  inject: ['toTimecode', 'toSeconds'],
  methods: {
    handleResize() {
      const newProgressBarWidth = this.progressBar.getBoundingClientRect().width;
      const thumb = document.querySelector('.thumb') as HTMLDivElement;
      const thumbLeft = thumb.getBoundingClientRect().left - 8;
      const newThumbPosition = (thumbLeft / this.progressBarWidth) * newProgressBarWidth;
      thumb.style.left = `${newThumbPosition}px`;
      this.progressBarWidth = newProgressBarWidth;
    },
    emitPlayProgressChange(progressPosition: number) {
      const { width } = this.progressBar.getBoundingClientRect();
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
            (document.querySelector('#hover-tooltip #tooltip-timer') as HTMLDivElement).textContent = currentEpisodeTimecode;
            (document.querySelector('#hover-tooltip #tooltip-title') as HTMLDivElement).textContent = episodeFound.title;
            (document.querySelector('#hover-tooltip #tooltip-episode') as HTMLDivElement).textContent = `Episode ${episodeFound.code}`;
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
      const { width: tooltipWidth, right: tooltipRight, left: tooltipLeft } = tooltip.getBoundingClientRect();
      const { right: progressBarRight } = this.progressBar.getBoundingClientRect();
      const tooltipOffset = 8 + tooltipWidth / 2;
      const newTooltipLeft = x - tooltipOffset;
      if (newTooltipLeft <= 0) {
        tooltip.style.left = '0px';
        return;
      }

      const newTooltipRight = tooltipRight - (tooltipLeft - newTooltipLeft - 8);
      if (newTooltipRight >= progressBarRight) {
        tooltip.style.left = `${progressBarRight - tooltipWidth}px`;
        return;
      }

      tooltip.style.left = `${newTooltipLeft}px`;
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
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.progressBarWidth = this.progressBar.getBoundingClientRect().width;
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

#hover-tooltip {
  bottom: 14px;
  left:0px;
  width: 200px;
}
</style>
