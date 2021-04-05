<template>
    <div class="season-separator w-1 text-red-400 absolute text-sm pointer-events-none">
      <span class="absolute text-center bg-red-400 text-rz-800 rounded font-bold">{{ description }}</span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SeasonSeparator',
  props: {
    description: String,
  },
});
</script>
<style lang="scss" scoped>
.season-separator {
    height: 25rem;
    background-image: repeating-linear-gradient(180deg, transparent, transparent 5px, #F87171 5px, #F87171 10px);
    span {
        top: 25%;
        margin-left: 50%;
        transform: translateX(-50%);
        width: 80px;
    }
}

#timeline-1-event-0 {
  transform: translateY(45%);
}
</style>
