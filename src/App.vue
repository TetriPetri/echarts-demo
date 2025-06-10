<template>
  <h1>Apache ECharts för GreenKeeping</h1>
  <nav class="nav">
    <RouterLink to="/">Siktanalys</RouterLink>
    <RouterLink to="/graphs">Exempel</RouterLink>
  </nav>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
h1 {
  text-align: center;
  margin: 2rem 0 1rem;
}
.nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}
.nav a {
  text-decoration: none;
  color: #2c3e50;
}
.nav a.router-link-active {
  text-decoration: underline;
}
</style>
