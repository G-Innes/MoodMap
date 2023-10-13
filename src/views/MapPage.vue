<template>
  <div class="darkMode pb-5">
    <h1>Track your mood history</h1>
    <div class="w-80 m-auto px-5 py-2">
    <h3>Hover over the dates to check the note for that day</h3>
  </div>
    <MoodMap />
  </div>
  </template>
  <script setup lang="ts">
import MoodMap from '../components/Heatmap/MoodMap.vue';
  </script>
