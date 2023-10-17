import Swal from 'sweetalert2'

// MoodInput.vue functions 
const isMoodNoteValid = (note: string, showAlerts = true): boolean => {
    if (note.trim() === '') {
        if (showAlerts){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Mood note cannot be empty!',
      });
    }
      return false;
    }
    if (note.length > 40) {
        if (showAlerts){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Mood note should not exceed 40 characters!',
      });
    }
      return false;
    }
    return true;
  };

  export {
    isMoodNoteValid
  }

// MoodMap functions

type MoodStore = {
  moods: {
    [key: string]: {
      note: string;
    };
  };
};

// Mock moodStore
const moodStore: MoodStore = {
  moods: {
    '2022-01-01': {
      note: 'Feeling great!'
    }
  }
};

  type ColorMapping = {
    [key: string]: number;
  };
  const moodColorMapping: ColorMapping = {
    '#009be2': 3,  // blue
    '#8bcfa3': 5,  // green
    '#f9ed2d': 7,  // yellow
    '#f43800': 9   // red
  };
  function mapMoodColorToCount(moodColor: string): number {
    return moodColorMapping[moodColor] || 1;
  };
  // Format tooltip for the mood display
function formatTooltip(value: { date: Date | string; count: number }, moodStore: MoodStore): string {
  // Adjust the date to the next day in UTC
  const adjustedDateString = getNextDayUTC(value.date);
  // Get mood information for the adjusted date
  const moodInfo = moodStore.moods[adjustedDateString];
  // Generate a tooltip if there's a mood note
  return moodInfo?.note ? `${adjustedDateString}: ${moodInfo.note}` : `${adjustedDateString}: No mood note.`;
};
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

  export {
    mapMoodColorToCount,
    formatTooltip,
    getTodayUTC,
    getNextDayUTC,
    moodStore
  }