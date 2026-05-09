<script setup lang="ts">
import { computed,ref } from 'vue'
import { requestStore } from '@/store/requests'
const copied = ref(false)
const request = requestStore()
const copy = () => {
  if (!request.response) return
  navigator.clipboard.writeText(JSON.stringify(request.response, null, 2))
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
const highlighted = computed(() => {
  const data = request.response
  if (!data || (Array.isArray(data) && data.length === 0)) return ''
  return JSON.stringify(data, null, 2)
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
  <Transition name="panel">
    <div class="border border-indigo-600/20 bg-[#0F0F20] rounded-md w-full md:w-1/2 relative mx-auto" v-if="request.status">
      <div class="relative w-full h-10 flex items-center px-2 border-b border-indigo-600/20 justify-between">
        
        <div v-if="request.status.includes('20')" class="text-[#34D399] bg-[#152C32] rounded-md p-1 font-terminal">
        {{ request.status }}
      </div>
      <div v-else class="text-[#f87171] bg-[#2c1515] rounded-md p-1 font-terminal ">
        {{ request.status }}
      </div>
      </div>

      

      <div class="p-4 overflow-auto max-h-96 terminal-scroll">
        
        <div v-if="highlighted" class="text-sm font-terminal leading-relaxed whitespace-pre-wrap" v-html="highlighted"></div>
        <span v-else class="text-gray-600 text-sm font-terminal"></span>
      </div>
      <button
          v-if="request.response"
          @click="copy"
          class=" text-xs font-mono px-2 py-1 rounded border transition-colors duration-200 absolute left-1/2 bottom-2 hover: cursor-pointer"
          :class="copied
            ? 'border-green-500/40 text-green-400 bg-green-500/10'
            : 'border-indigo-600/20 text-indigo-400 hover:text-indigo-300 hover:border-indigo-500/40'"
        >{{ copied ? 'copied!' : 'copy' }}</button>
    </div>
    
  </Transition>
</template>

<style scoped>
.panel-enter-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.panel-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.terminal-scroll::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.terminal-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.terminal-scroll::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.3);
  border-radius: 9999px;
}
.terminal-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.6);
}
</style>
