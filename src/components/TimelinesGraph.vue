// TODO: Add style (timeline graph background should change depending on current respawnPoint)
// TODO: Refactor: make a created hook that retrieve DOM elements that are later use in methods
// TODO: Make an option to be scrolled full right automatically when input range value change
<template>
  <div class="timelines relative bg-gray-900 flex flex-col justify-between"
  >
    <div
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove"
      id="timeline-graph"
      class="h-full
      flex flex-col justify-center h-64 overflow-scroll"
    >
      <div class="h-full w-full">
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
            v-for="event in timeline.events"
            :data-respawn-id="event.id"
            :key="event.description"
            :style="`left:${event.position};`"
            :type="event.type"
            :timecode="event.timecode"
            :episode="event.episode"
            :episodeRelativeTC="event.episodeRelativeTC"
            :description="event.description"
          >
          </Event>
        </Timeline>
      </div>
    </div>
    <BottomBar v-on:update-timelines="updateTimelines" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Event from './Event.vue';
import Timeline from './Timeline.vue';
import TimelineJoint from './TimelineJoint.vue';
import BottomBar from './BottomBar/BottomBar.vue';

import data from './data';

type EventType = {
  timeline: string;
  type: string;
  episode: string;
  episodeRelativeTC: string;
  timecode: string;
  absoluteTC: string;
  description: string;
  position?: string;
  id?: string;
}

type RespawnPointType = {
  timeline: string;
  type: string;
  episode: string;
  episodeRelativeTC: string;
  timecode: string;
  absoluteTC: string;
  description: string;
  position?: string;
  id: string;
}

type TimelineType = {
  id: number;
  startAt: string;
  respawnId: number;
  complexity: number;
  direction: string;
  endAt: string;
  duration?: number;
  width?: string;
  events: (EventType|RespawnPointType)[];
}

export default Vue.extend({
  name: 'TimelinesGraph',
  components: {
    Event,
    Timeline,
    TimelineJoint,
    BottomBar,
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
    };
  },
  methods: {
    updateTimelines(timecodeValue: string) {
      // ! (optimization) lodash, assign only if deep equality is false
      this.$data.calculatedTimelines = this.calculateTimelines(timecodeValue);
      this.$forceUpdate();
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

    calculteEvents(timeline: TimelineType, events: (EventType|RespawnPointType)[], timecodeValue: string): (EventType|RespawnPointType)[] {
      const computedEvents: (EventType|RespawnPointType)[] = [];

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
      // ! broken
      const respawnPoint = document.querySelector(`[data-respawn-id='${timeline.respawnId}'] > div`) as HTMLElement | null;
      const timelineGraph = document.getElementById('timeline-graph') as HTMLElement | null;
      let value = 0;
      if (respawnPoint !== null && timelineGraph !== null) {
        const respawnPointPositions = respawnPoint.getBoundingClientRect();
        const timelineGraphPositions = timelineGraph.getBoundingClientRect();
        console.log('===');
        console.log(respawnPointPositions);
        console.log(timelineGraphPositions);
        const scrollOffset = timelineGraph.scrollLeft;
        const position = (respawnPointPositions.x - timelineGraphPositions.x) + 23.5 + scrollOffset;

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
          timelineDOM.style.marginLeft = `${position}px`;
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
      const timelineGraph = document.getElementById('timeline-graph') as HTMLElement;
      timelineGraph.style.cursor = 'all-scroll';
      this.$data.isDrawing = true;
      this.setLastClient(event);
    },

    handleMouseUp(event: MouseEvent) {
      event.preventDefault();
      const timelineGraph = document.getElementById('timeline-graph') as HTMLElement;
      timelineGraph.style.cursor = 'inherit';
      this.$data.isDrawing = false;
    },

    handleMouseMove(event: MouseEvent) {
      event.preventDefault();
      if (this.$data.isDrawing) {
        const timelineGraph = document.getElementById('timeline-graph') as HTMLElement;
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

        this.handleMouseLeave(timelineGraph, event);
      }
    },

    handleMouseLeave(element: HTMLElement, { clientX, clientY }: MouseEvent) {
      const {
        x, y, width, height,
      } = element.getBoundingClientRect();
      const offset = 3;
      if (
        (clientX - offset) <= x
        || (clientY - offset) <= y
        || (clientX + offset) >= (x + width)
        || (clientY + offset) >= (y + height)
      ) {
        // eslint-disable-next-line no-param-reassign
        element.style.cursor = 'inherit';
        this.$data.isDrawing = false;
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
  height: 0rem;
  width: 0rem;
}

::-webkit-scrollbar-track {
  background-color: #151a24;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #2d3748;
}

::-webkit-scrollbar-corner {
  background: #151a24;
}

.timelines {
  height: calc(100vh - 43px);
}
</style>
