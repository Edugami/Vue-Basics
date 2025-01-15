<script setup lang="ts">
import { ref } from 'vue'
import TagList from './components/TagList.vue'
import TagManager from './components/TagManager.vue'

const activeTab = ref('list')
</script>

<template>
  <div class="container">
    <div class="tabs">
      <button 
        :class="{ active: activeTab === 'list' }" 
        @click="activeTab = 'list'"
      >
        Tag List
      </button>
      <button
        :class="{ active: activeTab === 'manager' }" 
        @click="activeTab = 'manager'"
      >
        Tag Manager
      </button>
    </div>

    <div class="content">
      <TagList v-if="activeTab === 'list'" />
      <TagManager v-else />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.tabs {
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  background: #eee;
  cursor: pointer;
}

.tabs button.active {
  background: #007bff;
  color: white;
}

.content {
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
