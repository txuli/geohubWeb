<script setup lang="ts">
import { computed } from 'vue'
import { requestStore } from '@/store/requests'
import type { CityResponse } from '@/types/requestType'

const request = requestStore()

const city = computed(() => {
  const r = request.response
  if (!r) return null
  return (Array.isArray(r) ? r[0] : r) as CityResponse
})

const cityName = computed(() => city.value?.cityLabel || city.value?.city || '')
const population = computed(() => city.value?.population?.toLocaleString('en') ?? '')
const lon = computed(() => city.value?.location?.coordinates[0]?.toFixed(4) ?? '')
const lat = computed(() => city.value?.location?.coordinates[1]?.toFixed(4) ?? '')
const countryName = computed(() => {
  const c = city.value?.country
  if (!c) return ''
  if (typeof c === 'string') return c
  return c.country ?? ''
})
</script>

<template>
  <Transition name="panel">
  <div class="border border-indigo-600/20 bg-[#0F0F20] rounded-lg w-full md:w-1/2 overflow-hidden font-terminal">

    <!-- Header row -->
    <div class="flex items-start gap-4 p-5 border-b border-indigo-600/10">
      <div class="text-5xl leading-none text-[#818cf8]/40 min-w-14 select-none">⌖</div>
      <div class="flex flex-col justify-center pt-1">
        <div class="font-serif text-xl text-white/90 leading-tight">{{ cityName || '—' }}</div>
        <div class="text-[10px] text-[#818cf8]/50 tracking-[0.2em] uppercase mt-1">{{ countryName }}</div>
      </div>
    </div>

    <!-- Data grid -->
    <div class="grid grid-cols-1 gap-px bg-indigo-600/10 border-t border-indigo-600/10">

      <div class="bg-[#0F0F20] px-4 py-3">
        <div class="text-[9px] text-[#818cf8]/40 tracking-[0.2em] uppercase mb-1">Population</div>
        <div class="text-[#fb923c] text-sm">{{ population || '—' }}</div>
      </div>

      <div class="bg-[#0F0F20] px-4 py-3">
        <div class="text-[9px] text-[#818cf8]/40 tracking-[0.2em] uppercase mb-1">Coordinates</div>
        <div class="text-[#fb923c] text-sm">
          <span v-if="lat && lon">
            {{ lat }}<span class="text-[#fb923c]/40">°</span> / {{ lon }}<span class="text-[#fb923c]/40">°</span>
          </span>
          <span v-else class="text-[#94a3b8]">—</span>
        </div>
      </div>

    </div>
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
</style>
