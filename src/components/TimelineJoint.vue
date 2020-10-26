<template>
  <div class="timeline-joint">
    <svg
      v-if="jointDirection === 'top'"
      class="absolute"
      :style="`
      left: -1.1rem;
      bottom: 0rem;
      transform: scale(-1,1) rotate(180deg);
    `"
      width="19"
      :height="svgHeight(jointComplexity)"
      :viewBox="`0 0 19 ${svgHeight(jointComplexity)}`"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.2963 2C9.2961 2 2 11.8497 2 24"
        stroke="#4A5568"
        stroke-width="4"
      />
      <line
        x1="2"
        y1="24"
        x2="2"
        :y2="svgHeight(jointComplexity)"
        stroke="#4A5568"
        stroke-width="4"
      />
    </svg>
    <svg
      v-if="jointDirection === 'bottom'"
      class="absolute"
      style="left: -1.1rem; top: 0rem"
      width="19"
      :height="svgHeight(jointComplexity)"
      :viewBox="`0 0 19 ${svgHeight(jointComplexity)}`"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.2963 2C9.2961 2 2 11.8497 2 24"
        stroke="#4A5568"
        stroke-width="4"
      />
      <line
        x1="2"
        y1="24"
        x2="2"
        :y2="svgHeight(jointComplexity)"
        stroke="#4A5568"
        stroke-width="4"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TimelineJoint',
  props: {
    jointDirection: String,
    jointComplexity: Number,
  },
  data: () => ({
    spacing: 40,
  }),
  computed: {
    computedComplexity(): number {
      return this.jointComplexity + 1;
    },
  },
  methods: {
    svgHeight(jointComplexity: number) {
      return this.$data.spacing * jointComplexity;
    },
  },
});
</script>

<style lang="scss" scoped>

svg path, svg line {
  transition: all .3s;
}

</style>
