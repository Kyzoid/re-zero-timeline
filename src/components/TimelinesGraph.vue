// TODO: Handle timeline position depending on jointDirection
// TODO: RespawnEvent should be highlighted and be the starting point of multiple timelines
<template>
  <div class="timelines">
    <div id="timeline-graph" class="bg-gray-900 h-64 mb-2 py-4 overflow-x-auto">
      <Timeline
        v-for="timeline in computedTimelines"
        :key="timeline.events.timecode"
        :style="`margin-left:${timeline.position};
           width: ${timeline.width};`"
      >
        <TimelineJoint
        :joint-direction="timeline.direction"
        :joint-complexity="timeline.complexity" />
        <Event
          v-for="event in timeline.events"
          :key="event.timecode"
          :style="`left:${event.position};`"
          :type="event.type"
        >
        </Event>
      </Timeline>
    </div>
    <div>
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

interface EventType {
  type: string;
  timecode: string;
  episode: string;
  episodeRelativeTC: string;
  description: string;
}

interface TimelineType {
  id: number;
  startAt: string;
  complexity: number;
  direction: string;
  endAt: string;
  events: EventType[];
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
    timelines: [
      {
        id: 1,
        startAt: '00:00:00',
        complexity: 1,
        direction: 'top',
        endAt: '00:28:44',
        events: [
          {
            type: 'Event',
            timecode: '0:02:00',
            episode: '1A',
            episodeRelativeTC: '0:02:00',
            description: 'Subaru apparait devant la fontaine de Lugnica.',
          },
          {
            type: 'Event',
            timecode: '0:05:30',
            episode: '1A',
            episodeRelativeTC: '0:05:30',
            description: 'Subaru tombe sur les 3 bandits et Emilia le soigne.',
          },
          {
            type: 'Event',
            timecode: '0:27:16',
            episode: '1B',
            episodeRelativeTC: '0:02:00',
            description:
              "Subaru laisse Emilia à l'entrée de la taverne de Rom et entre seul.",
          },
          {
            type: 'Death',
            timecode: '0:28:44',
            episode: '1B',
            episodeRelativeTC: '0:04:16',
            description:
              "il meurt éventré par surprise par Elsa lorsqu'il rentre dans la taverne de Rom.",
          },
        ],
      },
      {
        id: 2,
        startAt: '00:31:16',
        complexity: 1,
        direction: 'top',
        endAt: '0:42:09',
        events: [
          {
            type: 'Event',
            timecode: '0:01:44',
            episode: '1B',
            episodeRelativeTC: '0:06:00',
            description:
              'Subaru se presse de retrouver Emilia mais il tombe sur les 3 bandits. Il les défonce et va directement à la taverne.',
          },
          {
            type: 'Event',
            timecode: '0:05:45',
            episode: '1B',
            episodeRelativeTC: '0:11:45',
            description:
              "Il rentre dans la taverne et négocie avec Rom, Felt et Elsa pour racheter l'insigne.",
          },
          {
            type: 'Death',
            timecode: '0:10:53',
            episode: '1B',
            episodeRelativeTC: '0:22:38',
            description:
              'Les négociations échouent. Elsa tue Rom, Felt et Subaru.',
          },
        ],
      },
      {
        id: 3,
        startAt: '00:31:16',
        complexity: 2,
        direction: 'bottom',
        endAt: '0:42:09',
        events: [
          {
            type: 'Event',
            timecode: '0:01:44',
            episode: '1B',
            episodeRelativeTC: '0:06:00',
            description:
              'Subaru se presse de retrouver Emilia mais il tombe sur les 3 bandits. Il les défonce et va directement à la taverne.',
          },
          {
            type: 'Event',
            timecode: '0:05:45',
            episode: '1B',
            episodeRelativeTC: '0:11:45',
            description:
              "Il rentre dans la taverne et négocie avec Rom, Felt et Elsa pour racheter l'insigne.",
          },
          {
            type: 'Death',
            timecode: '0:10:53',
            episode: '1B',
            episodeRelativeTC: '0:22:38',
            description:
              'Les négociations échouent. Elsa tue Rom, Felt et Subaru.',
          },
        ],
      },
    ],
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
      return `${
        (this.toSeconds(timeline.startAt) / this.lengthInSeconds) * 100
      }%`;
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
  },
  computed: {
    computedTimelines(): TimelineType[] {
      return this.timelines.map((timeline: TimelineType) => {
        const {
          id, startAt, complexity, direction, endAt, events,
        } = timeline;
        const duration = this.getDuration(startAt, endAt);
        const computedEvents = events.map((event: EventType) => ({
          ...event,
          position: this.getEventPosition(timeline, event),
        }));
        return {
          id,
          startAt,
          complexity,
          direction,
          endAt,
          duration,
          width: this.getTimelineWidth(timeline),
          position: this.getTimelinePosition(timeline),
          events: computedEvents,
        };
      });
    },
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
</style>
