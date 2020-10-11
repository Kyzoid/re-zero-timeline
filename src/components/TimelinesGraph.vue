<template>
  <div class="timelines">
    <div
      id="timeline-graph"
      class="bg-gray-900 h-64 mb-2 py-4 overflow-x-auto"
    >
      <Timeline data-timer="643" style="margin-left: 17%; max-width: calc(643 / 988 * 100%)">
        <TimelineJoint joint-type="bottom" joint-height="96" />
        <Event style="left: 5%" />
        <Event style="left: 15%" />
        <Event style="left: 90%" />
        <DeathEvent />
      </Timeline>
      <Timeline data-timer="643" style="margin-left: 18%; max-width: calc(643 / 988 * 100%)">
        <TimelineJoint joint-type="bottom" joint-height="72" />
        <Event style="left: 5%" />
        <Event style="left: 15%" />
        <Event style="left: 90%" />
        <DeathEvent />
      </Timeline>
      <Timeline data-timer="643" style="margin-left: 19%; max-width: calc(643 / 988 * 100%)">
        <TimelineJoint joint-type="bottom" joint-height="48" />
        <Event style="left: 5%" />
        <Event style="left: 15%" />
        <Event style="left: 90%" />
        <DeathEvent />
      </Timeline>
      <Timeline data-timer="643" style="margin-left: 20%; max-width: calc(643 / 988 * 100%)">
        <TimelineJoint joint-type="bottom" joint-height="24" />
        <Event style="left: 5%" />
        <Event style="left: 15%" />
        <Event style="left: 90%" />
        <DeathEvent />
      </Timeline>
      <Timeline data-timer="643" style="max-width: calc(643 / 988 * 100%)">
        <Event style="left: 5%" />
        <Event style="left: 15%" />
        <Event style="left: 90%" />
        <DeathEvent />
      </Timeline>
      <Timeline
        data-timer="800"
        style="margin-left: 40%; max-width: calc(800 / 988 * 100%)"
      >
        <TimelineJoint joint-type="top" joint-height="24" />
        <Event style="left: 12%" />
        <Event style="left: 35%" />
        <Event style="left: 65%" />
        <Event style="left: 70%" />
        <Event style="left: 80%" />
        <DeathEvent />
      </Timeline>
    </div>
    <div>
      <h3>Time elapsed</h3>
      <input
        v-on:input="updateTimeline"
        type="range"
        id="range"
        class="w-full"
        min="1"
        max="988"
        value="0"
      />
      <div><span id="time-elapsed">0</span> minutes elapsed.</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import DeathEvent from './DeathEvent.vue';
import Event from './Event.vue';
import Timeline from './Timeline.vue';
import TimelineJoint from './TimelineJoint.vue';

class TimelineEvent {
  timeline: number;

  type: string;

  episode: string;

  description: string;

  constructor(
    timeline: number,
    type: string,
    episode: string,
    description: string,
  ) {
    this.timeline = timeline;
    this.type = type;
    this.episode = episode;
    this.description = description;
  }
}

const timeline = [
  new TimelineEvent(
    1,
    'Death',
    '1B',
    "il meurt éventré par surprise par Elsa lorsqu'il rentre dans la taverne de Rom",
  ),
];

console.log(timeline);

export default Vue.extend({
  name: 'TimelinesGraph',
  components: {
    DeathEvent,
    Event,
    Timeline,
    TimelineJoint,
  },
  data: () => ({
    timelineEvents: [
      {
        timeline: '1',
        type: 'Event',
        episode: '1A',
        episodeRelativeTC: '0:02:00',
        timelineRelativeTC: '0:02:00',
        absoluteTC: '0:00:00',
        description: 'Subaru apparait devant la fontaine de Lugnica.',
      },
      {
        timeline: '1',
        type: 'Event',
        episode: '1A',
        episodeRelativeTC: '0:05:30',
        timelineRelativeTC: '0:05:30',
        absoluteTC: '0:05:30',
        description: 'Subaru tombe sur les 3 bandits et Emilia le soigne.',
      },
      {
        timeline: '1',
        type: 'Event',
        episode: '1B',
        episodeRelativeTC: '0:02:00',
        timelineRelativeTC: '0:27:16',
        absoluteTC: '0:27:16',
        description:
          "Subaru laisse Emilia à l'entrée de la taverne de Rom et entre seul.",
      },
      {
        timeline: '1',
        type: 'Death',
        episode: '1B',
        episodeRelativeTC: '0:04:16',
        timelineRelativeTC: '0:28:44',
        absoluteTC: '0:29:32',
        description:
          "il meurt éventré par surprise par Elsa lorsqu'il rentre dans la taverne de Rom.",
      },
      {
        timeline: '2',
        type: 'Event',
        episode: '1B',
        episodeRelativeTC: '0:06:00',
        timelineRelativeTC: '0:01:44',
        absoluteTC: '0:31:16',
        description:
          'Subaru se presse de retrouver Emilia mais il tombe sur les 3 bandits. Il les défonce et va directement à la taverne.',
      },
      {
        timeline: '2',
        type: 'Event',
        episode: '1B',
        episodeRelativeTC: '0:11:45',
        timelineRelativeTC: '0:05:45',
        absoluteTC: '0:37:01',
        description:
          "Il rentre dans la taverne et négocie avec Rom, Felt et Elsa pour racheter l'insigne.",
      },
      {
        timeline: '2',
        type: 'Death',
        episode: '1B',
        episodeRelativeTC: '0:22:38',
        timelineRelativeTC: '0:10:53',
        absoluteTC: '0:47:54',
        description: 'Les négociations échouent. Elsa tue Rom, Felt et Subaru.',
      },
    ],
  }),
  methods: {
    updateTimeline() {
      return true;
    },
  },
});
</script>

<style lang="scss" scoped>
  ::-webkit-scrollbar {
    height: .5rem;
  }

  ::-webkit-scrollbar-track {
    background-color: #151a24;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #2d3748;
  }
</style>
