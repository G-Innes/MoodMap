<template>
  <div class="card m-auto mt-5 w-80 ">
    <div class="map-container">
      <!-- Legend -->
      <div class="p-1 card rounded shadow">
          <div class="flex justify-center">
              <div class="w-2 h-2 rounded-full blue m-1"></div>
              <span class="text-xs mr-2">Calm</span>
              <div class="w-2 h-2 rounded-full green m-1"></div>
              <span class="text-xs">Happy</span>
          </div>
          <div class="flex justify-center">
              <div class="w-2 h-2 rounded-full yellow m-1"></div>
              <span class="text-xs mr-2">Aggitated</span>
              <div class="w-2 h-2 rounded-full red m-1"></div>
              <span class="text-xs">Angry</span>
          </div>
      </div>
      <!-- Mood Map -->
      <calendar-heatmap
      class=""
        :values="moodData"
        :end-date="endDate"
        :tooltip="true"
        tooltip-unit="moods"
        :round="5"
        :vertical="true"
        :tooltip-formatter="formatTooltip"
        :range-color="colorRange"
        :max="9"
      ></calendar-heatmap>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useMoodStore } from '../../store/moodStore';

  type MoodData = {
    date: string;
    count: number;
  };

  type ColorMapping = {
    [key: string]: number;
  };

  const moodStore = useMoodStore(); // Access
  moodStore.initializeMoods(); // initialise

  const moodData = ref<MoodData[]>([]);
  const endDate = ref(getTodayUTC()); // Have to use UTC due to issues with the package & timezones

  // Gets latest mood date from the stored moods (key)
  const latestMoodDate = Object.keys(moodStore.moods).sort().pop();
  // set end date to the day after the latest mood date if available 
  endDate.value = latestMoodDate ? getNextDayUTC(latestMoodDate) : endDate.value;

  // populate moodData with mapped color counts & format
  onMounted(() => {
    moodData.value = Object.entries(moodStore.moods).map(([date, moodInfo]) => ({ date, count: mapMoodColorToCount(moodInfo.color) }));
  });

  // Color range for the moodmap
  const colorRange = [
    '#a1a4a5',
    '#a1a4a5',
    '#009be2',
    '#8bcfa3',
    '#f9ed2d',
    '#f43800'
  ];
  // Color mapping for mood colors
  const moodColorMapping: ColorMapping = {
    '#009be2': 3,  // blue
    '#8bcfa3': 5,  // green
    '#f9ed2d': 7,  // yellow
    '#f43800': 9   // red
  };

  // Map mood color to a count
  function mapMoodColorToCount(moodColor: string): number {
    return moodColorMapping[moodColor] || 1;
  };
  // Format tooltip for the mood display
  function formatTooltip(value: { date: Date | string; count: number }): string {
    // Adjust the date to the next day in UTC
    const adjustedDateString = getNextDayUTC(value.date);
    // Get mood information for the adjusted date
    const moodInfo = moodStore.moods[adjustedDateString];
    // Generate a tooltip if there's a mood note
    return moodInfo?.note ? `${adjustedDateString}: ${moodInfo.note}` : `${adjustedDateString}: No mood note.`;
  };
  // Create new date object in UTC & format
  function getTodayUTC(): string {
    return new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate())).toISOString().split('T')[0];
  };
  // next day date in UTC format
  function getNextDayUTC(date: Date | string): string {
    // coverts date to object if its a string
    const originalDate = typeof date === 'string' ? new Date(date) : date;
    // Create an adjusted date by adding a day
    const adjustedDate = new Date(originalDate);
    // Formnat adjsuted to UTC
    adjustedDate.setUTCDate(originalDate.getUTCDate() + 1);
    return adjustedDate.toISOString().split('T')[0];
  };
</script>

<style>
  .green{
    background-color: #8bcfa3;
  }
  .blue{
    background-color: #009be2;
  }
  .yellow{
    background-color: #f9ed2d;
  }
  .red{
    background-color: #f43800;
  }
  .tippy-box {
    background-color: #1b2123 !important;
    color: #ffffff !important;
    padding: 5%;
    font-size: 1em;
    border-radius: 15px;
  }
  .vch__container .vch__wrapper .vch__months__labels__wrapper text.vch__month__label,
  .vch__container .vch__wrapper .vch__days__labels__wrapper text.vch__day__label{
    fill: whitesmoke !important;
    font-size: xx-small;
  }
  .vch__wrapper{
    margin-left: 10% !important;
    height: 50% !important;
  }
  .vch__legend__wrapper,
  .vch__legend {
    display: none;
  }
  .map-container{
    background-color: rgba(0, 0, 0, 0.437);
    padding: 2% !important;
    border-radius: 20px;
  }
  .card{
    padding: 5% !important;
  }
</style>
