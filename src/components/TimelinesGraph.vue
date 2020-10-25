// TODO: Implement Popper.js
// TODO: User should be able to move through the timeline graph with a cursor grab
// TODO: Draw timelines depending on time elapsed input value
// TODO: User should be able to jump to a specific time elapsed value with the episode menu
// TODO: Add style
// TODO: Menu options: timeline structure (linear, top, center, bottom)
<template>
  <div class="timelines flex flex-col justify-between">
    <div
      id="timeline-graph"
      class="h-full flex flex-col justify-center bg-gray-900 h-64 mb-2 py-4 overflow-x-auto"
    >
      <Timeline
        v-for="timeline in computedTimelines"
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
    <div id="timecode-selector" class="mb-2">
      <h3>Time elapsed</h3>
      <input
        type="range"
        class="w-full"
        min="0"
        :max="lengthInSeconds"
        value="0"
      />
      <div><span id="time-elapsed">0</span> minutes elapsed.</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Event from './Event.vue';
import Timeline from './Timeline.vue';
import TimelineJoint from './TimelineJoint.vue';
import data from './data';

interface EventType {
  type: string;
  timecode: string;
  episode: string;
  episodeRelativeTC: string;
  description: string;
}

interface RespawnPointType {
  id: number;
  type: string;
  timecode: string;
  episode: string;
  episodeRelativeTC: string;
  description: string;
}

interface TimelineType {
  id: number;
  startAt: string;
  respawnId: number;
  complexity: number;
  direction: string;
  endAt: string;
  events: (EventType|RespawnPointType)[];
}

export default Vue.extend({
  name: 'TimelinesGraph',
  components: {
    Event,
    Timeline,
    TimelineJoint,
  },
  data: () => ({
    ratio: 5, // represents the number of seconds for 1px
    lengthInSeconds: 59304,
    timelines: data.timelines,
  }),
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log(item: any) {
      console.log(item);
    },

    getTimelineWidth(timeline: TimelineType) {
      return `${
        this.getDuration(timeline.startAt, timeline.endAt) / this.ratio
      }px`;
    },

    getTimelinePosition(timeline: TimelineType) {
      const respawnPoint = document.querySelector(`[data-respawn-id='${timeline.respawnId}'] > div`);
      const timelineGraph = document.getElementById('timeline-graph');
      let value = 0;
      if (respawnPoint !== null && timelineGraph !== null) {
        const respawnPointPositions = respawnPoint.getBoundingClientRect();
        const timelineGraphPositions = timelineGraph.getBoundingClientRect();
        const position = (respawnPointPositions.x - timelineGraphPositions.x) + 23;

        value = position;
      }
      return `${value}px`;
    },

    toSeconds(timecode: string) {
      return timecode.split(':').reduce(
        // eslint-disable-next-line max-len
        (acc, value, index, array) => acc + parseInt(value, 10) * 60 ** (array.length - index - 1),
        0,
      );
    },

    getDuration(startAt: string, endAt: string) {
      return this.toSeconds(endAt) - this.toSeconds(startAt);
    },

    getEventPosition(timeline: TimelineType, event: EventType) {
      // eslint-disable-next-line max-len
      return `${
        (this.toSeconds(event.timecode)
          / this.getDuration(timeline.startAt, timeline.endAt))
        * 100
      }%`;
    },

    positionTimelines() {
      this.timelines.forEach((timeline: TimelineType) => {
        const timelineDOM: HTMLElement | null = document.querySelector(`[data-timeline-id='${timeline.id}']`);
        const position = this.getTimelinePosition(timeline);
        if (timelineDOM !== null) {
          timelineDOM.style.marginLeft = position;
        }
      });
    },
  },

  computed: {
    computedTimelines(): TimelineType[] {
      return this.timelines.map((timeline: TimelineType) => {
        const {
          id, startAt, respawnId, complexity, direction, endAt, events,
        } = timeline;
        const duration = this.getDuration(startAt, endAt);
        const computedEvents = events.map((event) => ({
          ...event,
          position: this.getEventPosition(timeline, event),
        }));
        return {
          id,
          startAt,
          respawnId,
          complexity,
          direction,
          endAt,
          duration,
          width: this.getTimelineWidth(timeline),
          events: computedEvents,
        };
      });
    },
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
  height: 0.5rem;
}

::-webkit-scrollbar-track {
  background-color: #151a24;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #2d3748;
}

.timelines {
  height: calc(100vh - 53px);
}
</style>
