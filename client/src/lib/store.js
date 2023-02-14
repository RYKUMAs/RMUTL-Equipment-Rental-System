import { writable } from 'svelte/store';

const storeStructure = {
  data: [],
  limit: null,
  offset: null,
  total: null
};

export const brandStore = writable(storeStructure);
export const equipmentStore = writable(storeStructure);
export const rentStore = writable(storeStructure);
export const returnStore = writable(storeStructure);
export const historyStore = writable(storeStructure);
export const userStore = writable(null);