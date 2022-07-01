<template>
  <div class="gridMain">
    <lateral-menu></lateral-menu>
    <div id="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
  import lateralMenu from './components/lateralMenu.vue'
</script>
<style>
  .gridMain {
    @apply grid;
    grid-template-columns:144px 1fr;
  }
  #main {
    @apply p-2;
  }
</style>