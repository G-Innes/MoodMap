import { describe, expect, it } from 'vitest'

import { mapMoodColorToCount, formatTooltip, getTodayUTC, getNextDayUTC } from './componentTests';

describe('MoodMap.vue', () => {
  describe('mapMoodColorToCount', () => {
    it('should return the correct count for a given mood color', () => {
      expect(mapMoodColorToCount('#009be2')).toBe(3); // blue
      expect(mapMoodColorToCount('#8bcfa3')).toBe(5); // green
      expect(mapMoodColorToCount('#f9ed2d')).toBe(7); // yellow
      expect(mapMoodColorToCount('#f43800')).toBe(9); // red
      expect(mapMoodColorToCount('#unknown')).toBe(1); // unknown
    });
  });

  describe('formatTooltip', () => {
    it('should return the correct tooltip format', () => {
      const moodStore = {
        moods: {
          '2022-01-02': {
            note: 'Feeling great!'
          }
        }
      };
      const value = { date: '2022-01-01', count: 5 };
      expect(formatTooltip(value, moodStore)).toBe('2022-01-02: Feeling great!');
    });
  });

  describe('getTodayUTC', () => {
    it('should return the current date in UTC format', () => {
      const today = new Date();
      const expected = today.toISOString().split('T')[0];
      expect(getTodayUTC()).toBe(expected);
    });
  });

  describe('getNextDayUTC', () => {
    it('should return the next day date in UTC format', () => {
      const date = '2022-01-01';
      expect(getNextDayUTC(date)).toBe('2022-01-02');
    });
  });
});