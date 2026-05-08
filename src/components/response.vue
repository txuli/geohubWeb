<script setup lang="ts">
import { computed } from 'vue'
import { requestStore } from '@/store/requests'
const request = requestStore()
console.log(request.response)
const highlighted = computed(() => {
  const r = request.response
  if (!r || (Array.isArray(r) && r.length === 0)) return ''
  return JSON.stringify(r)
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
  <div class="border border-indigo-600/20 bg-[#0F0F20] rounded-md w-full md:w-1/2">
    <div class="relative w-full h-10 flex items-center px-2 border-b border-indigo-600/20 justify-between">
      <div class="ml-2 text-sm px-2 py-1 text-white/40">
       response
      </div>
      <div v-if="request.status.includes('20')" class="text-[#34D399] bg-[#152C32] rounded-md p-1 font-terminal">
        {{ request.status }}
      </div>
     <div v-else class="text-[#f87171] bg-[#2c1515] rounded-md p-1 font-terminal ">
        {{ request.status }}
      </div>
    </div>
    <div class="p-4">
      <div v-if="highlighted" class="text-sm font-terminal leading-relaxed break-all" v-html="highlighted"></div>
      <span v-else class="text-gray-600 text-sm font-terminal"></span>
    </div>
  </div>
</template>
