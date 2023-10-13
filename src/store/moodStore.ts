import { defineStore } from 'pinia';

// mood data structure
type Mood = {
  color: string;
  note: string;
};
// dict of mood data key = date
type MoodData = {
  [date: string]: Mood;
};

export const useMoodStore = defineStore({
  id: 'mood',
  state: () => ({
    moods: {} as MoodData // initialise state with empty dictionary
  }),
  actions: {
    // set a mood for a specific date
    setMood(date: string, color: string, note: string) {
      this.moods[date] = { color, note }; // update dictionary with the new mood
      localStorage.setItem('moods', JSON.stringify(this.moods)); // store the moods data in local storage
    },
    initializeMoods() {
      // initialise moods from local storage
      const savedMoods = localStorage.getItem('moods'); // retrieve moods
      if (savedMoods) {
        try {
          const parsedMoods = JSON.parse(savedMoods);
          // Check if the parsed data is valid
          if (this.isValidMoodData(parsedMoods)) {
            this.moods = parsedMoods; // update the store's moods with the parsed data
          } else {
            console.warn("Invalid mood data detected in local storage.");
          }
        } catch (error) {
          console.error("Error parsing moods from local storage:", error);
        }
      }
    },
    // validate the format of mood data
    isValidMoodData(data: unknown): data is MoodData {
      if (typeof data !== "object" || data === null) return false;

      const recordData = data as Record<string, unknown>; // type assertion to treat data as a dictionary
      return Object.values(recordData).every(
        // Check if all values in dictionary are objects with correct properties
        item => typeof item === "object" && item !== null && "color" in item && "note" in item
      );
    }
  }
});
