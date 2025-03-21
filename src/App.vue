<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Games from "./components/Games.vue";
// import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <main>
    <Navbar />
    <section id="games">
      <Games />
    </section>
    <!-- <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a> -->
  </main>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>
