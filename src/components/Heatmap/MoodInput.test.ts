import { isMoodNoteValid } from './componentTests'
import { describe, expect, it } from 'vitest'

// MoodInput Tests //
describe('isMoodNoteValid', () => {
    it('should return false if mood note is empty', () => {
      const result = isMoodNoteValid('');
      expect(result).toBe(false);
    });

    it('should return false if mood note exceeds 40 characters', () => {
      const longNote = 'This is a very long mood note that definitely exceeds the limit of 40 characters.';
      const result = isMoodNoteValid(longNote);
      expect(result).toBe(false);
    });

    it('should return true if mood note is valid', () => {
      const validNote = 'This is a valid mood note.';
      const result = isMoodNoteValid(validNote);
      expect(result).toBe(true);
    });
  });