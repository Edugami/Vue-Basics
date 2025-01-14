<script setup lang="ts">
import { computed, reactive, ref, toRef, watch, watchEffect } from 'vue';

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
//   console.log(_data);
// }

// ##############
// ### Part 3 ###
// ##############
//   - Reactive con Objeto

// const localSettings = reactive(_data);
// const localSettings_2 = reactive(_data);

// function onClick() {
//   _data.variable_1 += 2;
//   _data.variable_2 -= 1;

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

// ##############
// ### Part 4 ###
// ##############
//   - Reactive con Clase

class Testing {

  public variable_1: number;
  public variable_2: number;

  constructor(_data: TestingType) {
    this.variable_1 = _data.variable_1;
    this.variable_2 = _data.variable_2;
  }

  onClick() {
    console.log('[!] Entro')
    this.variable_1 += 2;
    this.variable_2 -= 1;

    console.log('\t Variable 1', this.variable_1);
    console.log('\t Variable 2', this.variable_2);
  }

  sum() {
    return this.variable_1 + this.variable_2;
  }
}

// const _testing = new Testing(_data);
// const localSettings = reactive(_testing);

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

  return { _testing, _testingReactive, _sumWithoutReactive, _sumReactive}
}

// - Caso 1
// const { _testing: localSettings, _sumWithoutReactive: _sum } = useTestingClass(_data);
// // - Caso 2
// const { _testing: localSettings, _sumReactive: _sum } = useTestingClass(_data);
// // - Caso 3
// const { _testingReactive: localSettings, _sumWithoutReactive: _sum } = useTestingClass(_data);
// // - Caso 4
// const { _testingReactive: localSettings, _sumReactive: _sum } = useTestingClass(_data);

// ##############
// ### Part 6 ###
// ##############

const localSettings = reactive({
  params: {
   pagination: {
    page: 1,
    size: 1,
   }
  }
});

const page = ref(localSettings.params.pagination.page); // ref<number>(1);
const size = toRef(localSettings.params.pagination, 'size');

watch(page, () => {
  console.log('Entro!!!!')
  page.value = 10;
  console.log('Entro ----- !!!!')
})

// page
// watchEffect((page) => {
//   console.log('Entro 2!!!!')
//   page.value = 10;
// })

function onClick() {
  page.value += 1;
  size.value += 1;
}

function onClick2() {
  localSettings.params.pagination.page += 1;
  localSettings.params.pagination.size += 1;
}

// ##############
// ### Part 7 ###
// ##############

// const hash_reactivity: any = {}
// const localSettings = reactive({
//   number: 0
// });

// function addData(){
//   hash_reactivity[localSettings.number] = reactive(_data);
// }

// function retrieveData(number: number) {
//   return hash_reactivity[number];
// }

// // Opcion 2 - Es la mejor!

// const _data_hash: any = {}

// function addData_2(){
//   _data_hash[localSettings.number] = new Testing(_data);
// }

// function retrieveData_2(number: number) {
//   return reactive(_data_hash[number]);
// }


</script>
<template>
  <div class="container">

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   -->

    <!-- <h2>Part 1 - Only Ref! </h2> 
    <p> {{ variable_1 }} </p>
    <hr/>
    <p> {{ variable_2 }} </p>
    <hr>
    <button @click="onClick"> APRETAR </button> -->

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   -->

    <!-- <h2> Part 2  </h2> 
    <p> {{ localSettings.variable_1 }} </p>
    <hr/>
    <p> {{ localSettings.variable_2 }} </p> 
    <hr>
    <button @click="onClick"> APRETAR </button>
    <button @click="onClick2"> APRETAR 2 </button> -->

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   -->

    <!-- <h2> Part 3 - Reactive </h2> 
    <p> {{ localSettings.variable_1 }} </p>
    <hr/>
    <p> {{ localSettings.variable_2 }} </p> 
    <hr>
    <button @click="onClick"> APRETAR </button>
    <button @click="onClick2"> APRETAR 2 </button>
    <button @click="onClick3"> APRETAR 3 </button> -->

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   -->

    <!-- <h2> Part 4 - Classes </h2> 
    <p> {{ localSettings.variable_1 }} </p>
    <hr/>
    <p> {{ localSettings.variable_2 }} </p> 
    <hr/>
    <p> {{ localSettings.sum() }} </p> 

    <button @click="localSettings.onClick"> APRETAR </button>
    <button @click="_testing.onClick"> APRETAR 2 </button> -->

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   -->

    <!-- <h2> Part 5 - Composables with Classes </h2> 
    <p> Var 1: {{ localSettings.variable_1 }} </p>
    <hr/>
    <p> Var 2: {{ localSettings.variable_2 }} </p> 
    <hr/>
    <p> Sum:  {{ _sum }} </p> 

    <button @click="localSettings.onClick"> APRETAR </button> -->

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   -->

    <h2> Part 6 - toRef </h2> 
    <p> Var 1: {{ localSettings.params.pagination.page }} </p>
    <hr/>
    <p> Var 2: {{ localSettings.params.pagination.size }} </p> 
    
    <hr/>

    <p> Var 1: {{ page }} </p>
    <hr/>
    <p> Var 2: {{ size }} </p> 
    <hr/>

    <button @click="onClick"> APRETAR (toRef) </button>
    <button @click="onClick2"> APRETAR 2 </button>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   -->

  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  text-align: center;
}

hr {
 margin: 10px;
}
</style>
