import { writable } from 'svelte/store';

const storeStructure = {
  data: [],
  limit: null,
  offset: null,
  total: null
};

export const brandStore = writable(storeStructure);
export const equipmentStore = writable(storeStructure);
