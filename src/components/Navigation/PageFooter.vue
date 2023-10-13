<template>
    <footer class="bg-gray-800 text-white py-4 text-center">
      MoodMap &copy; {{ currentYear }}
    </footer>
  </template>

  <script setup lang="ts">
  import { computed } from 'vue';

  const currentYear = computed(() => new Date().getFullYear());
  </script>

  <style scoped>
  footer {
    font-size: 16px;
  }
  </style>
