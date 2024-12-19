import { defineStore } from 'pinia';
import type { BorrowItem } from '~/types';
import { DUMMY_BORROWINGS } from '~/data/dummy/borrowings';

interface BorrowingsState {
  borrowings: BorrowItem[];
}

export const useBorrowingsStore = defineStore('borrowings', {
  state: (): BorrowingsState => ({
    borrowings: [...DUMMY_BORROWINGS]
  }),

  actions: {
    addBorrowing(borrowing: BorrowItem) {
      this.borrowings.push(borrowing);
    },

    updateBorrowing(index: number, borrowing: BorrowItem) {
      this.borrowings[index] = borrowing;
    },

    deleteBorrowing(index: number) {
      this.borrowings.splice(index, 1);
    }
  }
});