<script setup lang="ts">
import { useTagStore } from '../stores/tagStore'
import { storeToRefs } from 'pinia'

const store = useTagStore()
const { tags, lastSync } = storeToRefs(store)

function updateTagName(id: number) {
  const newName = prompt('Enter new name:')
  if (newName) {
    store.updateTag(id, newName)
  }
}
</script>

<template>
  <div class="tag-list">
    <h2>Tag List</h2>
    <p> Last Sync: {{ lastSync.toLocaleString() }}</p>
    
    <div v-for="tag in tags" :key="tag.id" class="tag-item">
      <h3>{{ store.getDisplayNameTag(tag) }}</h3>

      <h4> Tag Methods </h4>
      <button @click="tag.printName()">Print Name directly</button><br>
      <button @click="() => { console.log(tag.getChildren(store.tags)); }">GetChildren</button><br>
      <button @click="() => { console.log(tag.getParents(store.tags)); }">GetParents</button><br>

      <h4> Store Methods </h4>
      <button @click="updateTagName(tag.id)">Update Name</button><br>
      <button @click="store.printTag(tag)">Print Tag</button><br>
      <button @click="store.printNameTag(tag)">Print Name Tag</button><br>

      <h4> Relations </h4>
      <div class="relations">
        <div v-if="tag.getChildren(tags).length">
          <p>Children:</p>
          <ul>
            <li v-for="child in tag.getChildren(tags)" :key="child.id">
              {{ child.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tag-list {
  padding: 20px;
}

.tag-item {
  border: 1px solid #ddd;
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
}

.relations {
  margin-top: 10px;
  font-size: 0.9em;
}
</style> 