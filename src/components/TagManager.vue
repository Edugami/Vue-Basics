<script setup lang="ts">
import { ref } from 'vue'
import { useTagStore } from '../stores/tagStore'
import { storeToRefs } from 'pinia'

const store = useTagStore()
const { lastSync } = storeToRefs(store)
const newTagName = ref('')

function addNewTag() {
  if (newTagName.value.trim()) {
    store.addTag(newTagName.value)
    newTagName.value = ''
  }
}

function handleSave() {
  store.saveToLocalStorage()
}

function handleLoad() {
  store.loadFromLocalStorage()
}
</script>

<template>
  <div class="tag-manager">
    <h2>Tag Manager</h2>
    <p>Last Sync: {{ lastSync }}</p>

    <div class="add-tag">
      <input 
        v-model="newTagName" 
        placeholder="New tag name"
        @keyup.enter="addNewTag"
      >
      <button @click="addNewTag">Add Tag</button>
    </div>

    <div class="storage-controls">
      <h3>Storage Controls</h3>
      <button @click="handleSave">Save to LocalStorage</button>
      <button @click="handleLoad">Load from LocalStorage</button>
    </div>
  </div>
</template>

<style scoped>
.tag-manager {
  padding: 20px;
}

.add-tag {
  margin-top: 20px;
}

input {
  padding: 5px;
  margin-right: 10px;
}

.storage-controls {
  margin-top: 20px;
  padding: 10px;
  border-top: 1px solid #ddd;
}

.storage-controls button {
  margin-right: 10px;
}
</style> 