<template>
  <div id="settings-pannel" class="z-50 bg-black bg-opacity-50 w-64 py-1 rounded-sm">
    <div class="flex flex-col text-sm">
      <div class="flex justify-between px-2 py-1 hover:bg-gray-900 hover:bg-opacity-25">
        <label for="spoil-level">Spoil level</label>
        <select name="spoil-level" class="bg-black bg-opacity-0">
          <option value="0" class="bg-gray-900">All</option>
          <option value="1" class="bg-gray-900">Season 1</option>
          <option value="2" class="bg-gray-900">Season 2</option>
          <option value="3" class="bg-gray-900">Season 3</option>
          <option value="4" class="bg-gray-900">Season 4</option>
        </select>
      </div>
      <div class="flex justify-between px-2 py-1 hover:bg-gray-900 hover:bg-opacity-25">
        <label for="spoil-level">Tree generation</label>
        <select name="spoil-level" @change="emitTreeGenerationChange" class="bg-black bg-opacity-0">
          <option value="down" class="bg-gray-900">Down</option>
          <option value="up" class="bg-gray-900">Up</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SettingsPanel',
  methods: {
    emitTreeGenerationChange(event: { target: HTMLSelectElement }) {
      this.$parent.$parent.$emit('tree-generation-change', event.target.value);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
