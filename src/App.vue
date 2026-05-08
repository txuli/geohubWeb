<script setup lang="ts">
import Header from './components/header.vue'
import MainTitle from './components/mainTitle.vue'
import Stats from './components/stats.vue'
import Terminal from './components/terminal.vue'
import Title from './components/title.vue'
import Queries from './components/queries.vue'
import Response from './components/response.vue'
import ResponseFormatted from './components/responseFormatted.vue'
import ResponseFormattedCity from './components/responseFormattedCity.vue'
import EndpointDocs from './components/endpointDocs.vue'
import Footer from './components/footer.vue'
import { requestStore } from './store/requests'
const request = requestStore()
</script>

<template class="">
  <div class="relative min-h-screen w-full bg-[#05050d]">
    <div
      class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
    </div>

    <!-- Contenido encima del fondo -->
    <div class="relative z-10 flex min-h-screen flex-col bg-[#0f0f20]/30">
      <Header />
      <MainTitle />

      <Terminal />
      <Stats />
      <section class="w-full px-4 sm:px-8 md:w-5/6 lg:w-4/6 mx-auto my-16">
        <Title title="LIVE EXPLORER" />
        <Queries/>
        <div class="flex flex-col md:flex-row gap-4 w-full mt-6">
          <Response/>
          <ResponseFormatted v-if="!request.responseType || request.responseType === 'country'" />
          <ResponseFormattedCity v-else />
        </div>
        <div class="mt-16">
          <Title title="ENDPOINTS" />
          <div class="mt-4">
            <EndpointDocs />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  </div>
</template>

<style scoped></style>
