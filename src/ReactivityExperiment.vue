<script setup lang="ts">
import { computed, reactive, ref, toRef, watch, watchEffect } from 'vue';
import { useReviewTaskStore } from './stores/reviewTask';

type TestingType = { variable_1: number, variable_2: number };

// No se puede hacer ref(_data) ....
const _data = {
  variable_1: 2,
  variable_2: -1,
};

const variable_1 = ref<number>(0);
const variable_2 = ref<number>(0);

// ##############
// ### Part 1 ###
// ##############
//   -  Basic Ref

// function onClick() {
//   variable_1.value += 2;
//   variable_2.value -= 1;
// }

// ##############
// ### Part 2 ###
// ##############
//   - Reactive

// const localSettings = reactive(_data);

// function onClick() {
//   localSettings.variable_1 += 2;
//   localSettings.variable_2 -= 1;
//   console.log(_data); // No se actualiza // Si lo actualiza
// }

// function onClick2() {
//   _data.variable_1 += 2;
//   _data.variable_2 -= 1;
//   console.log(_data); // Todo se actualiza
// }

// ##############
// ### Part 3 ###
// ##############
//   - Reactive con Objeto

// const localSettings = reactive(_data);
// const localSettings_2 = reactive(_data); // Proxy

// // const variable_1_ref = toRef(localSettings, 'variable_1');

// function onClick() {
//   _data.variable_1 += 2;
//   _data.variable_2 -= 1;

//   // variable_1_ref.value += 2000;
//   console.log(_data);
// }

// function onClick2() {
//   localSettings.variable_1 += 2;
//   localSettings.variable_2 -= 1;

//   console.log(_data);
// }

// function onClick3() {
//   localSettings_2.variable_1 += 2;
//   localSettings_2.variable_2 -= 1;

//   console.log(_data);
// }

// ##############
// ### Part 4 ###
// ##############
//   - Reactive con Clase

class Testing {

  public variable_1: number;
  public variable_2: number;
  public variable_3: any;

  constructor(_data: TestingType) {
    this.variable_1 = _data.variable_1;
    this.variable_2 = _data.variable_2;
    this.variable_3 = {
      variable_3: 0,
      variable_4: 0,
    }
  }

  onClick() {
    console.log('[!] Entro')
    this.variable_1 += 2;
    this.variable_2 -= 1;
    this.variable_3.variable_3 += 2;
    this.variable_3.variable_4 -= 1;

    console.log('\t Variable 1', this.variable_1);
    console.log('\t Variable 2', this.variable_2);
  }

  sum() {
    return this.variable_1 + this.variable_2;
  }
}

// const _testing = new Testing(_data); // Cambia Valores & No Vista
// const localSettings = reactive(_testing); // Cambia Valores & Vista (Check)
// const localSettings_2 = ref<Testing>(_testing); // No Cambia Valores & No Vista

// function onClickWithRef() {
//   localSettings_2.value.variable_1 += 2;
//   localSettings_2.value.variable_2 -= 1;

//   localSettings_2.value.variable_3.variable_3 += 2;
//   localSettings_2.value.variable_3.variable_4 -= 1;

//   console.log('localSettings', localSettings.variable_1);
//   console.log('localSettings', localSettings.variable_2);
//   console.log('localSettings_2', localSettings_2.value.variable_1);
//   console.log('localSettings_2', localSettings_2.value.variable_2);
// }

// ##############
// ### Part 5 ###
// ##############
//   - Composables with Classes

// Composable
function useTestingClass(input_1: TestingType) {
  const _testing = new Testing(input_1);
  const _testingReactive = reactive(_testing);
  
  const _sumWithoutReactive = computed(() => _testing.variable_1 + _testing.variable_2);
  const _sumReactive = computed(() => _testingReactive.variable_1 + _testingReactive.variable_2);
  const _sumReactive2 = computed(() => _testingReactive.variable_1 + _testing.variable_2);

  return { _testing, _testingReactive, _sumWithoutReactive, _sumReactive, _sumReactive2}
}

// - Caso 1
// const { _testing: localSettings, _sumWithoutReactive: _sum } = useTestingClass(_data);
// - Caso 2
// const { _testing: localSettings, _sumReactive: _sum } = useTestingClass(_data);
// - Caso 3
// const { _testingReactive: localSettings, _sumWithoutReactive: _sum } = useTestingClass(_data);
// - Caso 4
// const { _testingReactive: localSettings, _sumReactive: _sum } = useTestingClass(_data);
// Caso 5
// const { _testingReactive: localSettings, _sumReactive2: _sum } = useTestingClass(_data);
// Caso 6
// const { _testing: localSettings, _sumReactive2: _sum } = useTestingClass(_data);

// ##############
// ### Part 6 ###
// ##############

// const localSettings = reactive({
//   params: {
//    pagination: {
//     page: 1,
//     size: 1,
//    }
//   }
// });

// const page = toRef(localSettings.params.pagination, 'page');
// const size = toRef(localSettings.params.pagination, 'size');
// const pagination = toRef(localSettings.params, 'pagination');

// watch(page, () => {
//   console.log('Entro!!!!')
//   page.value = 10;
// })

// watchEffect(() => {
//   if (size.value === 1) {
//     return;
//   }

//   console.log('Watch Effect !!!!')
//   page.value = 10;
//   size.value = 5;
// })

// function onClick() {
//   page.value += 1;
//   size.value += 1;
// }

// function onClick2() {
//   localSettings.params.pagination.page += 1;
//   localSettings.params.pagination.size += 1;
// }

// #######################
// ### Part 7 - Part 1 ###
// #######################


const { ids, choseResourceById, choseResourceByIdv2 } = useReviewTaskStore();

const chosen = ref(0);

let localSettings = choseResourceById(chosen.value);
function onChangeResource() {
  localSettings = choseResourceById(chosen.value);
}
function onChangeResourceV2() {
  localSettings.value = reactive(choseResourceByIdv2(chosen.value));
}
function onChangeResourceV3() {
  localSettings.value = choseResourceByIdv2(chosen.value);
}

// #######################
// ### Part 7 - Part 2 ###
// #######################

// const { createResource, reactiveHash } = useReviewTaskStore();

// const ids = computed(() => {
//   if (Object.keys(reactiveHash).length > 0) {
//     return Object.keys(reactiveHash).map(id => parseInt(id));
//   }
//   return [];
// });

// let _resource = computed(() => reactiveHash[chosen.value]);

// const reRenderSelected = ref(0);
// function onChangeResource() {
//   reRenderSelected.value += 1;
//   chosen.value = 0;
//   createResource();
// }

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

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   -->

    <!-- <h2>Part 1 - Only Ref! </h2> 
    <p> variable_1: {{ variable_1 }} </p>
    <hr/>
    <p> variable_2: {{ variable_2 }} </p>
    <hr>
    <button @click="onClick"> APRETAR </button> -->

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   -->

    <!-- <h2> Part 2  </h2> 
    <p> localSettings.variable_1: {{ localSettings.variable_1 }} </p>
    <hr/>
    <p> localSettings.variable_2: {{ localSettings.variable_2 }} </p> 
    <hr>
    <button @click="onClick"> APRETAR </button>
    <button @click="onClick2"> APRETAR 2 </button> -->

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   -->

    <!-- <h2> Part 3 - Reactive </h2> 
    <p> localSettings.variable_1: {{ localSettings.variable_1 }} </p>
    <hr/>
    <p> localSettings.variable_2: {{ localSettings.variable_2 }} </p> 
    <hr>
    <button @click="onClick"> APRETAR </button>
    <button @click="onClick2"> APRETAR 2 </button>
    <button @click="onClick3"> APRETAR 3 </button> -->

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   -->

    <!-- <h2> Part 4 - Classes </h2> 
    <p> localSettings.variable_1: {{ localSettings.variable_1 }} </p>
    <hr/>
    <p> localSettings.variable_2: {{ localSettings.variable_2 }} </p> 
    <hr/>
    <p> localSettings.variable_3: {{ localSettings.variable_3 }} </p> 
    <hr/>
    <p> localSettings.sum(): {{ localSettings.sum() }} </p> 

    <button @click="localSettings.onClick"> LocalSettings.onClick </button>
    <button @click="_testing.onClick"> _testing.onClick </button>
    <button @click="onClickWithRef"> onClickWithRef </button> -->

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   -->

    <!-- <h2> Part 5 - Composables with Classes </h2> 
    <p> LocalSettings.Var 1: {{ localSettings.variable_1 }} </p>
    <hr/>
    <p> LocalSettings.Var 2: {{ localSettings.variable_2 }} </p> 
    <hr/>
    <p> Sum:  {{ _sum }} </p> 
    <hr/>

    <button @click="localSettings.onClick"> LocalSettings.onClick </button> -->

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   -->
<!-- 
   <h2> Part 6 - toRef </h2> 
    <p> Var 1 (LocalSettings.Params.Pagination.Page): {{ localSettings.params.pagination.page }} </p>
    <hr/>
    <p> Var 2 (LocalSettings.Params.Pagination.Size): {{ localSettings.params.pagination.size }} </p> 
    <hr/>


    <p> Var 1 (toRef.Page): {{ page }} </p>
    <hr/>
    <p> Var 2 (toRef.Size): {{ size }} </p> 
    <hr/>

    <button @click="onClick"> onClick (toRef) </button>
    <button @click="onClick2"> onClick2 </button> -->

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   -->

    <h2> Part 7 - Composition of Clases (Part 1) </h2>
    
    localSettings = choseResourceById(chosen)
    <select v-model="chosen" @change="onChangeResource">
      <option v-for="id in ids" :key="id" :value="id">Resource {{id}}</option>
    </select>

    localSettings.value = reactive(choseResourceByIdv2(chosen))
    <select v-model="chosen" @change="onChangeResourceV2">
      <option v-for="id in ids" :key="id" :value="id">Resource {{id}}</option>
    </select>

    localSettings.value = choseResourceByIdv2(chosen.value);
    <select v-model="chosen" @change="onChangeResourceV3">
      <option v-for="id in ids" :key="id" :value="id">Resource {{id}}</option>
    </select>

    <div v-if="localSettings.id">
      <div v-for="(subResource) in localSettings.subResources" :key="subResource.id" class="sub-resource">
        <h3>SubResource {{subResource.id}}</h3>
        <p>Variable 1: {{subResource.variable_1}}</p>
        <p>Variable 2: {{subResource.variable_2}}</p>
        <button @click="subResource.onClick()">on Click</button>
      </div>
    </div>

    <hr>

    <button @click="localSettings.createSubResource()">Add SubResource</button>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   -->

   <!-- <h2> Part 7 - Composition of Clases (Part 2) </h2>
    
    <div>
      <select v-model="chosen" :key="reRenderSelected">
        <option v-for="id in [0, ...ids]" :key="id" :value="id">Resource {{id}}</option>
      </select>
    </div>

    <hr>

    <div v-if="_resource">
      <div v-for="(subResource) in _resource.subResources" :key="subResource.id" class="sub-resource">
        <h3>SubResource {{subResource.id}}</h3>
        <p>Variable 1: {{subResource.variable_1}}</p>
        <p>Variable 2: {{subResource.variable_2}}</p>
        <button @click="subResource.onClick()">on Click</button>
      </div>
    </div>

    Crear un SubResource
    <button @click="_resource.createSubResource()">Add SubResource</button>

    <hr>

    Crear un Resource
    <button @click="onChangeResource()">Add Resource</button> -->


<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   -->

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
