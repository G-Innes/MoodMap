<script setup lang="ts">
import Navigation from './components/Navigation/NavBar.vue';
import Footer from './components/Navigation/PageFooter.vue'
</script>

<template>
  <v-app>
  <Navigation />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<style scoped>
 v-main{
  height: 100vh;
 }
</style>
