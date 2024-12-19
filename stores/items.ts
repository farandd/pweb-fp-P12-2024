import { defineStore } from 'pinia';
import type { Item } from '~/types';
import { DUMMY_ITEMS } from '~/data/dummy/items';

interface ItemsState {
  items: Item[];
}

export const useItemsStore = defineStore('items', {
  state: (): ItemsState => ({
    items: [...DUMMY_ITEMS]
  }),

  actions: {
    addItem(item: Item) {
      this.items.push(item);
    },

    updateItem(index: number, item: Item) {
      this.items[index] = item;
    },

    deleteItem(index: number) {
      this.items.splice(index, 1);
    }
  }
});