<template>
  <div class="timelines">
    <div class="bg-gray-900 h-64 mb-2 py-4 pl-0 pr-8">
      <div class="relative w-full h-2 my-4 flex items-center">
        <div
          class="timeline h-2 bg-gray-700 my-4"
          data-timer="5"
          style="max-width: calc(5 / 988 * 100%)"
        >
          <img
            src="../assets/death.svg"
            class="absolute"
            style="left: calc((5 / 988 * 100%) + 0.5rem); top: -50%"
          />
        </div>
      </div>

      <div class="relative w-full h-2 my-4 flex items-center">
        <div
          class="timeline loop h-2 bg-gray-700 my-4"
          data-timer="988"
          style="max-width: 100%"
        >
          <img
            src="../assets/death.svg"
            class="absolute"
            style="left: calc(100% + 0.5rem); top: -50%"
          />
        </div>
      </div>

      <div class="relative w-full h-2 my-4 flex items-center">
        <div
          class="timeline loop h-2 bg-gray-700 my-4"
          data-timer="643"
          style="max-width: calc(643 / 988 * 100%)"
        >
          <img
            src="../assets/death.svg"
            class="absolute"
            style="left: calc((643 / 988 * 100%) + 0.5rem); top: -50%"
          />
        </div>
      </div>

      <div class="relative w-full h-2 my-4 flex items-center">
        <div
          class="timeline loop h-full bg-gray-700"
          data-timer="124"
          style="max-width: calc(124 / 988 * 100%)"
        >
          <img
            src="../assets/death.svg"
            class="absolute"
            style="left: calc((124 / 988 * 100%) + 0.5rem); top: -50%"
          />
        </div>
      </div>
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

export default Vue.extend({
  name: 'Timeline',
  data: () => ({
  }),
  methods: {
    updateTimeline() {
      return true;
    },
  },
});
</script>

<style lang="scss" scoped>
  .timeline {
    width: 0.1%;

    & img {
      width: 16px;
      height: 16px;
    }
  }
</style>
