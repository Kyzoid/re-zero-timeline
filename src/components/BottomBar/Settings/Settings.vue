<template>
  <div id="settings">
    <SettingsPanel
      id="settings-panel"
      class="absolute right-0 opacity-0"
      style="bottom: 64px; right: 8px;"
    />
    <SettingsIcon
      id="settings-icon"
      class="ml-2 transform duration-500"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SettingsPanel from './SettingsPanel.vue';
import SettingsIcon from './SettingsIcon.vue';

export default Vue.extend({
  name: 'Settings',
  components: {
    SettingsPanel,
    SettingsIcon,
  },
  methods: {
    handleSettingsIconClick() {
      const settingsPanel = document.getElementById('settings-panel') as HTMLElement;
      const settingsIcon = document.getElementById('settings-icon') as HTMLElement;
      const isShown = Object.values(settingsPanel.classList).includes('opacity-100');
      if (isShown) {
        settingsPanel.classList.add('invisible');
        settingsPanel.classList.remove('visible');
        settingsPanel.classList.remove('opacity-100');
        settingsIcon.classList.remove('rotate-90');
      } else {
        settingsPanel.classList.remove('invisible');
        settingsPanel.classList.add('visible');
        settingsPanel.classList.add('opacity-100');
        settingsIcon.classList.add('rotate-90');
      }
    },
  },
  provide(): object {
    return {
      handleClick: this.handleSettingsIconClick,
    };
  },
});
</script>

<style lang="scss" scoped>
#settings-panel {
  transition: all .3s;
}

path {
  transition: all 0.3s;
}

svg:hover path {
  fill: #805ad5;
  transition: all 0.3s;
}
</style>
