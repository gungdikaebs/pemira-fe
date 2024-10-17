<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import { apiFetch } from './utils/apiFetch'
apiFetch.get('https://dummyjson.com/auth/RESOURCE').then((res) => {
  console.log(res)
})
</script>

<template>
  <header>
    <nav></nav>
  </header>

  <RouterView />
</template>
``
