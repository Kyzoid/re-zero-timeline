<template>
  <div id="app"
    class="h-full"
  >
    <router-view name="header" />
    <router-view />
    <div id="bg-img" style="background-image: url('/images/events/subaru-spawns-lugnica.png')"></div>
    <div id="bg-mask"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  beforeCreate() {
    const imagesPath = [
      // deaths
      'images/deaths/death-1.png',
      'images/deaths/death-2.png',
      'images/deaths/death-3.png',
      'images/deaths/death-4.png',
      'images/deaths/death-5.png',
      'images/deaths/death-6.png',
      'images/deaths/death-7.png',
      'images/deaths/death-8.png',
      'images/deaths/death-9.png',
      'images/deaths/death-9-2.png',
      'images/deaths/death-10.png',
      'images/deaths/death-11.png',
      'images/deaths/death-11-2.png',
      'images/deaths/death-12.png',
      'images/deaths/death-13.png',
      'images/deaths/death-14.png',
      'images/deaths/death-15.png',
      'images/deaths/death-16.png',
      'images/deaths/death-17.png',

      // events
      'images/events/alleyway-emilia.png',
      'images/events/angry-priscilla.png',
      'images/events/bandage-roswaal-talk.png',
      'images/events/beatrice-protects-subaru.png',
      'images/events/beatrice-stabbed-by-elsa.png',
      'images/events/confused-subaru.png',
      'images/events/crusch-fighting.png',
      'images/events/dark-satella.png',
      'images/events/echidna-close-up.png',
      'images/events/echidna-tea-party.png',
      'images/events/empty-room.png',
      'images/events/explosion.png',
      'images/events/felt-steals-insigna.png',
      'images/events/front-tavern.png',
      'images/events/great-whale-eye.png',
      'images/events/great-whale.png',
      'images/events/horse-drawn-cart.png',
      'images/events/inside-village.png',
      'images/events/kids-laughing.png',
      'images/events/lugnica-road.png',
      'images/events/mad-echidna.png',
      'images/events/mad-roswaal.png',
      'images/events/mad-subaru-hugs-rem.png',
      'images/events/pack-lap-alleyway.png',
      'images/events/petra-greets-subaru-ram.png',
      'images/events/petra-hostage-elsa.png',
      'images/events/reinhart-fights-elsa.png',
      'images/events/rem-cursed.png',
      'images/events/rem-great-whale.png',
      'images/events/students-echidna-subaru.png',
      'images/events/subaru-and-big-dog.png',
      'images/events/subaru-attacked-by-dogs.png',
      'images/events/subaru-becomes-butler-2.png',
      'images/events/subaru-becomes-butler.png',
      'images/events/subaru-becomes-guest.png',
      'images/events/subaru-breaking-apart.png',
      'images/events/subaru-bumps-into-elsa.png',
      'images/events/subaru-chased-by-betelgeuse.png',
      'images/events/subaru-forest-near-mansion.png',
      'images/events/subaru-garfiel-cart.png',
      'images/events/subaru-holds-dead-emilia.png',
      'images/events/subaru-in-front-royal-castle.png',
      'images/events/subaru-on-emilia-lap.png',
      'images/events/subaru-rem-leaving-mansion.png',
      'images/events/subaru-screams-alleyway.png',
      'images/events/subaru-shakes-hands-with-crusch.png',
      'images/events/subaru-smashed-by-julius.png',
      'images/events/subaru-spawns-lugnica.png',
      'images/events/subaru-talks-with-anastasia.png',
      'images/events/subaru-tied-up.png',
      'images/events/subaru-tries-convincing-crusch-2.png',
      'images/events/subaru-tries-convincing-crusch.png',
      'images/events/subaru-tries-to-confess.png',
      'images/events/tavern-negotiations.png',
      'images/events/twisted-rem.png',
      'images/events/village-overview.png',
      'images/events/willhem-kills-betelgeuse.png',

      // respawns
      'images/respawns/respawn-1.png',
      'images/respawns/respawn-2.png',
      'images/respawns/respawn-3.png',
      'images/respawns/respawn-4.png',
      'images/respawns/respawn-5.png',
      'images/respawns/respawn-6.png',
    ];

    imagesPath.forEach((path) => {
      const image = new Image();
      image.src = path;
    });
  },
});
</script>

<style lang="postcss">
  input[type="range"]::-webkit-slider-thumb {
    background-color: red;
  }

  input[type=range]:focus {
    outline: none;
  }

  input[type=range]::-webkit-slider-runnable-track {}

  html {
    font-family: Roboto !important;
  }

  html, body {
    user-select: none;
  }

  #app > #bg-img {
    z-index: -1;
    opacity: .3;
    transition: all .5s;
    @apply top-0 left-0 h-full w-full bg-center bg-no-repeat bg-cover absolute;
  }

  #app > #bg-mask {
    z-index: -1;
    opacity: 1;
    background-image: url('/images/bg-mask.png');
    @apply top-0 left-0 h-full w-full bg-repeat absolute;
  }
</style>
