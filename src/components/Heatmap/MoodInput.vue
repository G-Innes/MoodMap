<template>
  <div class="card w-80 m-auto mt-5">
    <div class="flex-row content-center">
      <input
        type="date"
        v-model="selectedDate"
        class="m-2 p-1 cursor-text darkMode rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      />
      <!-- Mood selector -->
      <div class="m-2 text-xs">
        <label
          v-for="color in colors"
          :key="color.value"
          class="m-1 cursor-pointer"
          :style="{ color: color.value, textShadow: '1px 1px 1px rgba(0,0,0,0.8)' }"
        >
        <input
          class="cursor-pointer"
          type="radio"
          v-model="selectedColor"
          :value="color.value"
        />
          {{ color.label }}
        </label>
      </div>
      <!-- Mood note input -->
      <div class="flex-col">
          <input
            :style="{ '--placeholder-color': selectedColor, textShadow: '1px rgba(0,0,0,0.8)' }"
            class="styled-placeholder m-2 p-1 text-center rounded-2xl cursor-text darkMode"
            type="text"
            v-model="moodNote"
            placeholder="Reason for this mood..."/>
      </div>
      <button
        class="m-2 font-normal cursor-pointer"
        @click="saveMood">Save Mood
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useMoodStore } from '../../store/moodStore';
  import Swal from 'sweetalert2'

  type Color = {
    label: string;
    value: string;
  };
  const moodStore = useMoodStore();

  const defaultDate = computed(() => new Date().toISOString().substring(0, 10));
  const selectedDate = ref(defaultDate.value);
  const selectedColor = ref('');
  const moodNote = ref('');

  const colors: Color[] = [
    { label: 'Calm', value: '#009be2' },
    { label: 'Happy', value: '#8bcfa3' },
    { label: 'Aggitated', value: '#f9ed2d' },
    { label: 'Angry', value: '#f43800' }
  ];
  // Validation for mood note
  const isMoodNoteValid = (note: string): boolean => {
    if (note.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Mood note cannot be empty!',
      });
      return false;
    }
    if (note.length > 40) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Mood note should not exceed 40 characters!',
      });
      return false;
    }
    return true;
  };

  const saveMood = (): void => {
    if (!isMoodNoteValid(moodNote.value)) return;
    // calls setMood method to save mood if validation checks are passed
    if (selectedDate.value && selectedColor.value) {
      moodStore.setMood(selectedDate.value, selectedColor.value, moodNote.value);
      Swal.fire('Mood Saved!');
      // Reset input fields
      selectedDate.value = defaultDate.value;
      selectedColor.value = '';
      moodNote.value = '';
    }
  };


</script>

<style scoped>
.styled-placeholder::placeholder {
  color: var(--placeholder-color);
}
    button{
    background-color: #009be2;
  }
  button:hover{
    background-color: #8bcfa3 !important;
  }

</style>