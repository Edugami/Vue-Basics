# Vue Basics

Este proyecto es para mostrar dos cosas importantes de Vue

- Reactivity
- Pinia Store

La idea es que podamos entender como funcionan estos dos elementos de Vue cuando lo usamos con Clases. Es demasiado potente escribir Clases las cuales se puedan serializar y deserializar bien. Además poder usarlas de forma correcta con la reactividad lo hace super potente.

En teoría deberiamos 

 1. Tener clases para dejar la lógica del negocio
 2. Tener stores para mantener información a traves de la sesión o sesiones
 3. Usar composables para ayudarnos con las clases!
 4. Tener componentes que llamen a los tres de arriba. La lógica nunca debiese estar en la vista principal!. Lo hace muy dificil el mantenimiento


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
