import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { Resource } from '@/classes';

export const useReviewTaskStore = defineStore('ClassStore', () => {
 
  const _hash: Record<number, Resource> = {} 
  let _resourceID = 1; 
  let _srID = 1; 
  
  const reactiveHash = reactive(_hash);

  function createResource() {
    const _testing = new Resource(_resourceID);
    _resourceID += 1
    _testing.createSubResource(_srID);
    _srID += 1
    _testing.createSubResource(_srID); 
    _srID += 1
    _testing.createSubResource(_srID); 
    _srID += 1

    _hash[_testing.id] = _testing; // Part 1 
    // reactiveHash[_testing.id] = _testing; // Part 2
  }

  createResource();
  createResource();

  function choseResourceById(id: number) {
    return reactive(_hash[id]);
  }

  function choseResourceByIdv2(id: number) {
    return _hash[id];
  }

  // No funciona si se usa computed. Solo funciona desde el componente. 
  const ids = computed(() => {
    if (Object.keys(reactiveHash).length > 0) {
      return Object.keys(reactiveHash).map(id => parseInt(id));
    }
    return [];
  });

  return { ids, createResource, choseResourceById, choseResourceByIdv2, reactiveHash }
})
