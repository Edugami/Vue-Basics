import { defineStore } from 'pinia'
import { ref } from 'vue'

// Interfaces para serialización
interface SerializedTag {
  id: number;
  name: string;
  children: number[];
  parents: number[];
}

class Tag {
  id: number
  name: string
  children: number[]
  parents: number[]

  constructor(id: number, name: string, children: number[] = [], parents: number[] = []) {
    this.id = id
    this.name = name
    this.children = children
    this.parents = parents
  }

  printName(): string {
    const _name = `Tag: ${this.name} (ID: ${this.id})`
    console.log("PrintName ", _name)
    return _name
  }

  getChildren(allTags: Tag[]): Tag[] {
    return allTags.filter(tag => this.children.includes(tag.id))
  }

  getParents(allTags: Tag[]): Tag[] {
    return allTags.filter(tag => this.parents.includes(tag.id))
  }

  addChild(childId: number) {
    if (!this.children.includes(childId)) {
      this.children.push(childId)
    }
  }

  addParent(parentId: number) {
    if (!this.parents.includes(parentId)) {
      this.parents.push(parentId)
    }
  }

  serialize(): SerializedTag {
    return {
      id: this.id,
      name: this.name,
      children: [...this.children],
      parents: [...this.parents]
    }
  }

  static deserialize(serializedTag: SerializedTag): Tag {
    return new Tag(serializedTag.id, serializedTag.name, serializedTag.children, serializedTag.parents)
  }
}

// Seed data
const seedTags: Tag[] = [
  new Tag(1, "Frontend", [4, 5]),
  new Tag(2, "Backend", [6, 7]),
  new Tag(3, "DevOps", [8]),
  new Tag(4, "Vue", [], [1]),
  new Tag(5, "React", [], [1]),
  new Tag(6, "Node.js", [], [2]),
  new Tag(7, "Python", [], [2]),
  new Tag(8, "Docker", [], [3])
]

function getCurrentDateTime(): string {
  const now = new Date()
  return now.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit', 
    second: '2-digit',
    hour12: false
  })
}


export const useTagStore = defineStore('tagStore', () => {
  console.log("Se llamo a TagStore")

  const tags = ref<Tag[]>(seedTags)
  const lastSync = ref<string>(getCurrentDateTime())

  // Métodos de serialización
  function serializeTags(): SerializedTag[] {
    console.log("Serializing tags...")
    return tags.value.map(tag => tag.serialize())
  }

  function deserializeTags(serializedTags: SerializedTag[]): Tag[] {
    console.log("Deserializing tags...")
    return serializedTags.map((serializedTag: SerializedTag) => Tag.deserialize(serializedTag))
  }

  // Métodos para guardar y cargar
  function saveToLocalStorage() {
    const serializedData = serializeTags()
    localStorage.setItem('tag-store', JSON.stringify(serializedData))
    lastSync.value = getCurrentDateTime()
    console.log("Tags saved to localStorage")
  }

  function loadFromLocalStorage() {
    const storedData = localStorage.getItem('tag-store')
    if (storedData) {
      const parsedData = JSON.parse(storedData) as SerializedTag[]
      tags.value = deserializeTags(parsedData)
      lastSync.value = getCurrentDateTime()
      console.log("Tags loaded from localStorage")
    }
  }

  function updateTag(id: number, newName: string) {
    const tag = tags.value.find(t => t.id === id)
    if (tag) {
      tag.name = newName
      lastSync.value = getCurrentDateTime()
    }
  }

  function addTag(name: string) {
    const newId = Math.max(...tags.value.map(t => t.id)) + 1
    tags.value.push(new Tag(newId, name))
    lastSync.value = getCurrentDateTime()
  }

  function getTagById(id: number): Tag | undefined {
    return tags.value.find(t => t.id === id)
  }
  
  function printTag(tag: Tag) {
    console.log("PrintTag ", tag)
  }

  function getDisplayNameTag(tag: Tag) {
    return `Tag: ${tag.name} (ID: ${tag.id})`
  }

  function printNameTag(tag: Tag) {
    const _name = getDisplayNameTag(tag)
    console.log("PrintNameTag ", _name)
  }

  function initialize() {
    loadFromLocalStorage()
  }

  // initialize();
  return {
    tags,
    lastSync,
    getDisplayNameTag,
    printTag,
    printNameTag,
    updateTag,
    addTag,
    getTagById,
    // Nuevos métodos
    serializeTags,
    deserializeTags,
    saveToLocalStorage,
    loadFromLocalStorage
  }
}, {
  // https://prazdevs.github.io/pinia-plugin-persistedstate/guide/config.html
  persist: {
    key: 'tagStore',
    storage: localStorage,
    serializer: {
      serialize: (state) => {
        const startTime = performance.now()
        const serializableState = {
          tags: state.tags,
          lastSync: state.lastSync,
        };
        const endTime = performance.now()
        console.log(`Serialize took ${endTime - startTime}ms`)
        return JSON.stringify(serializableState);
      },
      deserialize: (data) => {
        console.log('Data to deserialize:', data)
        const startTime = performance.now()
        const parsed = JSON.parse(data)
        const result = {
          tags: parsed.tags.map((serializedTag: SerializedTag) => 
            Tag.deserialize(serializedTag)
          ),
          lastSync: parsed.lastSync
        }
        const endTime = performance.now()
        console.log(`Deserialize took ${endTime - startTime}ms`)
        return result
      }
    }
  }
})