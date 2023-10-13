<template>
  <!-- Activity card container-->
    <div class="w-80 m-auto">
      <div class="card p-6">
        <img
        :src="getActivitySvgPath(activities[currentActivityIndex])"
        alt="Activity Image"
        class="w-full h-56 object-cover mb-4 rounded"
        >
        <p class="text-center mb-4">
          {{ activities[currentActivityIndex].description }}
        </p>
        <div class="flex justify-between">
          <button
            @click="previousActivity"
            class="px-4 py-2 text-white rounded font-normal"
            :disabled="currentActivityIndex === 0">
            Previous
          </button>
          <button
            @click="nextActivity"
            class="px-4 py-2  text-white rounded font-normal"
            :disabled="currentActivityIndex === activities.length - 1">
            Next
        </button>
        </div>
      </div>
    </div>
  </template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import activitiesData from '../../assets/activities.json';

  // Actvity structure
  type Activity = {
    id: number;
    image: string;
    description: string;
  };

  export default defineComponent({
    setup() {
      // reference for activities using the type
      const activities = ref<Activity[]>([...activitiesData]);
      const currentActivityIndex = ref(0)

      // shuffle activities for random order each time
      function shuffleArray(array: Activity[]) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      // shuffle when component mounted
      onMounted(() => {
        shuffleArray(activities.value);
      });
      // Get the path to the image
      function getActivitySvgPath(activity: Activity) {
        return `/assets/activities/${activity.image}`;
      }
      // navigate next if possible
      function nextActivity() {
        if (currentActivityIndex.value < activities.value.length - 1) {
          currentActivityIndex.value++;
        }
      }
      // navigate back if possible
      function previousActivity() {
        if (currentActivityIndex.value > 0) {
          currentActivityIndex.value--;
        }
      }

      return {
        activities,
        currentActivityIndex,
        getActivitySvgPath,
        nextActivity,
        previousActivity
      };
    }
  });
</script>

<style scoped>
  img {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
  }
  button {
    background-color: #009be2;
  }
  button:hover{
    background-color: #8bcfa3;
  }
</style>
  