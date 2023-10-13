<template>
    <div class="darkMode pb-60">
      <div class="m-auto px-5 py-2">
      <h1>Welcome to MoodMap</h1>
      <Quote />
      </div>
      <h3 class="m-auto w-80 mt-5">Record your moods for any selected date and track in the map page</h3>
      <MoodInput />
    </div>
</template>
<script setup lang="ts">
  import Quote from "../components/Home/ZenQuote.vue";
  import MoodInput from '../components/Heatmap/MoodInput.vue';
</script>
