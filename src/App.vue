<script setup lang="ts">
import Header from './components/header.vue'
import MainTitle from './components/mainTitle.vue'
import Stats from './components/stats.vue'
</script>

<template class="">
  <div class="relative min-h-screen w-full bg-[#05050d]">
    <div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

    <!-- Contenido encima del fondo -->
    <div class="relative z-10 flex min-h-screen flex-col bg-[#0f0f20]/30">
      <Header />
      <MainTitle/>
    
      <Stats/>
    </div>
  </div>
</template>

<style scoped></style>
