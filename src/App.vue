<script setup lang="ts">
import Autocomplete from './components/Autocomplete.vue'
import { geoDataProvider } from './api/geo-data.provider'
</script>

<template>
  <div class="main flex flex-col items-center">
    <div class="header">
      <img
        class="header__image mx-auto"
        alt="Vue logo"
        src="./assets/logo.png"
      />
      <h1 class="header__title">Autocomplete showcase - Geo Data</h1>
    </div>
    <div class="content mt-5">
      <Suspense>
        <Autocomplete :data-provider="geoDataProvider" />
      </Suspense>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
