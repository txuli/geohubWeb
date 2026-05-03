<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
let domain = 'api.geohub.pm/'
const response = ref(null)
const endpoint = ref<string | null>(null)
onMounted(async () => {
  const number = Math.floor(Math.random() * 3)
  switch (number) {
    case 0:
      response.value = await (await fetch("/api/nearme")).json()
      endpoint.value = domain + 'nearme'
      break
    case 1:
      response.value = await (await fetch("/api/getCountry?country=Spain")).json()
      endpoint.value = domain + 'getCountry?country=Spain'
      break
    case 2:
       response.value = await (await fetch("/api/getCity?city=valencia&country=spain")).json()
       endpoint.value = domain + 'getCity?city=valencia&country=spain'
  }
})

const highlighted = computed(() => {
  if (!response.value) return ''
  return JSON.stringify(response.value, null, 2)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
      if (/^"/.test(match)) {
        if (/:$/.test(match)) return `<span style="color:#818cf8">${match}</span>`
        return `<span style="color:#34d399">${match}</span>`
      }
      if (/true|false/.test(match)) return `<span style="color:#f472b6">${match}</span>`
      if (/null/.test(match)) return `<span style="color:#94a3b8">${match}</span>`
      return `<span style="color:#fb923c">${match}</span>`
    })
})
</script>

<template>
  <div class="flex justify-center lg:w-full w-96 mx-auto mb-16">
    <div class="border border-indigo-600/20 bg-[#0F0F20] rounded-md mt-2  w-full max-w-4xl">
      <div class="relative w-full h-10 flex items-center px-2 border-b border-indigo-600/20">
        <div class="flex space-x-1">
          <div class="h-3 w-3 rounded-full bg-red-700 hover:animate-breathing"></div>
          <div class="h-3 w-3 rounded-full bg-yellow-500 hover:animate-breathing"></div>
          <div class="h-3 w-3 rounded-full bg-green-700 hover:animate-breathing"></div>
        </div>
        <div class="ml-5 text-sm border border-indigo-600/20 font-sans bg-[#161630] rounded-sm px-2 py-1">{{ endpoint }}
        </div>
      </div>

      <div class="p-4">
        <pre v-if="response" class="text-sm font-mono leading-relaxed overflow-auto" v-html="highlighted"></pre>
        <span v-else class="text-gray-600 text-sm font-mono">loading...</span>
      </div>
    </div>
  </div>
</template>
