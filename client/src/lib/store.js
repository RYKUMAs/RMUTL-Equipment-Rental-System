import { writable } from 'svelte/store';

const storeStructure = {
  data: [],
  limit: null,
  offset: null,
  total: null
};

export const equipmentStore = writable(storeStructure);
