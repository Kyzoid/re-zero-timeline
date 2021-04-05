<template>
  <div class="timelines relative flex flex-col justify-between"
  >
    <div
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      id="timeline-graph"
      ref="timelineGraph"
      class="h-full
      flex flex-col justify-center h-64 overflow-scroll"
    >
      <div class="h-full w-full pb-10">
        <Timeline
          v-for="timeline in calculatedTimelines"
          :key="timeline.events.timecode"
          :style="`width: ${timeline.width};`"
          :data-timeline-id="timeline.id"
        >
          <TimelineJoint
            :joint-direction="timeline.direction"
            :joint-complexity="timeline.complexity"
          />
          <Event
            v-for="(event, eventIndex) in timeline.events"
            :eventId="`timeline-${timeline.id}-event-${eventIndex}`"
            :data-respawn-id="event.id"
            :key="event.description"
            :style="`left:${event.position};`"
            :type="event.type"
            :timecode="event.timecode"
            :episode="event.episode"
            :episodeRelativeTC="event.episodeRelativeTC"
            :description="event.description"
            :image="event.image"
            :timeline="timeline.id"
          >
          </Event>
        </Timeline>
      </div>
    </div>
    <BottomBar v-on:update-timelines="updateTimelines" v-on:tree-generation-change="updateTreeGeneration" />
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import _ from 'lodash';
import Event from './Event.vue';
import Timeline from './Timeline.vue';
import TimelineJoint from './TimelineJoint.vue';
import BottomBar from './BottomBar/BottomBar.vue';
import { EventType, RespawnPointType, SeasonSeparatorType, TimelineType } from './types';

import data from './data';

export default (Vue as VueConstructor<
  Vue & {
    $refs: {
      timelineGraph: HTMLDivElement;
    };
  }
  >).extend({
  name: 'TimelinesGraph',
  components: {
    Event,
    Timeline,
    TimelineJoint,
    BottomBar,
  },
  created() {
    document.addEventListener('mouseup', this.handleMouseUp);
  },
  data: () => ({
    ratio: 5, // represents the number of seconds for 1px
    timelines: data.timelines,
    calculatedTimelines: [],
    isDrawing: false,
    lastClientX: 0,
    lastClientY: 0,
  }),
  provide(): {} {
    return {
      toSeconds: this.toSeconds,
      toTimecode: this.toTimecode,
      changeBgImage: this.changeBgImage,
    };
  },
  methods: {
    updateTreeGeneration() {
      throw new Error('TimelinesGraph@updateTreeGeneration() not implemented.');
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
    updateTimelines(timecodeValue: string) {
      const calculatedTimelines = this.calculateTimelines(timecodeValue);
      if (!_.isEqual(this.$data.calculatedTimelines, calculatedTimelines)) {
        this.$data.calculatedTimelines = calculatedTimelines;
        this.$forceUpdate();
        const lastTimelineWithEvents = calculatedTimelines[calculatedTimelines.length - 1].events.length
          ? calculatedTimelines[calculatedTimelines.length - 1]
          : calculatedTimelines[calculatedTimelines.length - 2];
        if (lastTimelineWithEvents) {
          const lastEvent = lastTimelineWithEvents.events[lastTimelineWithEvents.events.length - 1];
          if (lastEvent && lastEvent.image) {
            this.changeBgImage(lastEvent.image);
          }
        }
      }
    },
    changeBgImage(imagePath: string) {
      const nextBgActive = document.querySelector(`#bg-img > img[data-src='${imagePath}']`) as HTMLImageElement || null;
      const bgActive = document.querySelector('#bg-img > .bg-active') as HTMLImageElement || null;

      if (nextBgActive && bgActive && nextBgActive !== bgActive) {
        nextBgActive.classList.remove('hidden');
        nextBgActive.classList.add('bg-active');

        bgActive.classList.remove('bg-active');
        bgActive.classList.add('hidden');
      }
    },
    calculateTimelines(timecodeValue: string): TimelineType[] {
      const timelines: TimelineType[] = [];

      this.timelines.forEach((timeline: TimelineType) => {
        if (this.toSeconds(timeline.startAt) <= this.toSeconds(timecodeValue)) {
          const {
            id, startAt, respawnId, complexity, direction, endAt, events,
          } = timeline;
          const duration = this.getDuration(startAt, endAt);
          const computedEvents = this.calculteEvents(timeline, events, timecodeValue);
          const width = this.toSeconds(timeline.endAt) >= this.toSeconds(timecodeValue)
            ? this.getTimelineWidth(timeline, timecodeValue)
            : this.getTimelineWidth(timeline);

          timelines.push({
            id,
            startAt,
            respawnId,
            complexity,
            direction,
            endAt,
            duration,
            width: `${width}px`,
            events: computedEvents,
          });
        }
      });

      return timelines;
    },

    calculteEvents(
      timeline: TimelineType,
      events: (EventType|RespawnPointType|SeasonSeparatorType)[],
      timecodeValue: string,
    ): (EventType|RespawnPointType|SeasonSeparatorType)[] {
      const computedEvents: (EventType|RespawnPointType|SeasonSeparatorType)[] = [];

      events.forEach((event) => {
        if (this.toSeconds(event.absoluteTC) <= this.toSeconds(timecodeValue)) {
          computedEvents.push({
            ...event,
            position: `${this.getEventPosition(timeline, event)}px`,
          });
        }
      });

      return computedEvents;
    },

    getTimelineWidth(timeline: TimelineType, timecodeValue?: string): number {
      const timelineEndAt = timecodeValue || timeline.endAt;
      return this.getDuration(timeline.startAt, timelineEndAt) / this.ratio;
    },

    getTimelinePosition(timeline: TimelineType): number {
      const respawnPoint = document.querySelector(`[data-respawn-id='${timeline.respawnId}'] > div`) as HTMLElement | null;
      const { timelineGraph } = this.$refs;
      let value = 0;
      if (respawnPoint !== null && timelineGraph !== null) {
        const respawnPointPositions = respawnPoint.getBoundingClientRect();
        const timelineGraphPositions = timelineGraph.getBoundingClientRect();
        const scrollOffset = timelineGraph.scrollLeft;
        const position = (respawnPointPositions.x - timelineGraphPositions.x) + 27.5 + scrollOffset;
        value = position;
      }
      return value;
    },

    toSeconds(timecode: string): number {
      return timecode.split(':').reduce(
        // eslint-disable-next-line max-len
        (acc, value, index, array) => acc + parseInt(value, 10) * 60 ** (array.length - index - 1),
        0,
      );
    },

    getDuration(startAt: string, endAt: string): number {
      return this.toSeconds(endAt) - this.toSeconds(startAt);
    },

    getEventPosition(timeline: TimelineType, event: EventType): number {
      const eventPosition = (this.toSeconds(event.timecode)
        / this.getDuration(timeline.startAt, timeline.endAt))
        * this.getTimelineWidth(timeline);
      return eventPosition;
    },

    positionTimelines() {
      this.timelines.forEach((timeline: TimelineType) => {
        const timelineDOM: HTMLElement | null = document.querySelector(`[data-timeline-id='${timeline.id}']`);

        if (timelineDOM !== null) {
          const position = this.getTimelinePosition(timeline);
          timelineDOM.style.marginLeft = timeline.id === 1 ? `${position + 40}px` : `${position}px`;
        }
      });
    },

    setLastClient(event: MouseEvent) {
      const { clientX, clientY } = event;
      this.$data.lastClientX = clientX;
      this.$data.lastClientY = clientY;
    },

    handleMouseDown(event: MouseEvent) {
      event.preventDefault();
      const { timelineGraph } = this.$refs;
      timelineGraph.style.cursor = 'all-scroll';
      this.$data.isDrawing = true;
      this.setLastClient(event);
    },

    handleMouseUp(event: MouseEvent) {
      event.preventDefault();
      const { timelineGraph } = this.$refs;
      if (timelineGraph) {
        timelineGraph.style.cursor = 'inherit';
      }
      this.$data.isDrawing = false;
    },

    handleMouseMove(event: MouseEvent) {
      event.preventDefault();
      if (this.$data.isDrawing) {
        const { timelineGraph } = this.$refs;
        const { clientX, clientY } = event;
        const { lastClientX, lastClientY } = this.$data;

        this.setLastClient(event);

        const scrollByValueX = -(clientX - lastClientX);
        const scrollByValueY = -(clientY - lastClientY);

        if ((timelineGraph.scrollLeft + scrollByValueX) >= 0) {
          timelineGraph.scrollBy(scrollByValueX, 0);
        }

        if ((timelineGraph.scrollTop + scrollByValueY) >= 0) {
          timelineGraph.scrollBy(0, scrollByValueY);
        }
      }
    },
  },

  computed: {
    computedTimelines(): TimelineType[] {
      return this.calculateTimelines('16:28:24');
    },
  },
  updated() {
    this.$nextTick(() => {
      this.positionTimelines();
      const { timelineGraph } = this.$refs;
      if (timelineGraph) {
        timelineGraph.scroll({
          top: 9999999,
          left: 9999999,
          behavior: 'smooth',
        });
      }
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.positionTimelines();
    });
  },
});
</script>

<style lang="scss" scoped>

::-webkit-scrollbar {
    height: 12px;
    width: 12px;
    background: rgba(0, 0, 0, 0.4);
}

::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
}

::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0.4);
}

.timelines {
  height: calc(100vh - 59px);
}

@media (min-width: 768px) {
  .timelines {
    height: calc(100vh - 76px);
  }
}

@media (min-width: 1024px) {
  .timelines {
    height: calc(100vh - 86px);
  }
}

</style>
