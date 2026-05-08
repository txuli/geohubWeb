<script setup lang="ts">
import { computed } from 'vue'
import { requestStore } from '@/store/requests'
const request = requestStore()

const iso2 = computed(() => request.response?.iso2 ?? '')
const name = computed(() => request.response?.country ?? '')
const continent = computed(() => request.response?.continent ?? '')
const capital = computed(() => request.response?.CapitalLabel ?? '')
const continentLabel = computed(() => request.response?.continentLabel ?? '')
const lat = computed(() => request.response?.lat?.toFixed(4) ?? '')
const lon = computed(() => request.response?.lon?.toFixed(4) ?? '')
const population = computed(() => request.response?.population?.toLocaleString('en') ?? '')
const lifeExpectancy = computed(() => request.response?.lifeExpectancy?.toFixed(1) ?? '')
</script>

<template>
  <div class="border border-indigo-600/20 bg-[#0F0F20] rounded-lg w-full md:w-1/2 overflow-hidden font-terminal">

    <!-- Header row -->
    <div class="flex items-start gap-4 p-5 border-b border-indigo-600/10">
      <div class="text-5xl leading-none text-white/80 min-w-[3.5rem]">
        {{ iso2 }}
      </div>
      <div class="flex flex-col justify-center pt-1">
        <div class="font-serif text-xl text-white/90 leading-tight">{{ name }}</div>
        <div class="text-[10px] text-[#818cf8]/50 tracking-[0.2em] uppercase mt-1">{{ continentLabel || continent }}</div>
      </div>
    </div>

    <!-- Data grid -->
    <div class="grid grid-cols-2 gap-px bg-indigo-600/10 border-t border-indigo-600/10">

      <div class="bg-[#0F0F20] px-4 py-3">
        <div class="text-[9px] text-[#818cf8]/40 tracking-[0.2em] uppercase mb-1">Capital</div>
        <div class="text-[#34d399] text-sm truncate">{{ capital || '—' }}</div>
      </div>

      <div class="bg-[#0F0F20] px-4 py-3">
        <div class="text-[9px] text-[#818cf8]/40 tracking-[0.2em] uppercase mb-1">Population</div>
        <div class="text-[#fb923c] text-sm">{{ population || '—' }}</div>
      </div>

      <div class="bg-[#0F0F20] px-4 py-3">
        <div class="text-[9px] text-[#818cf8]/40 tracking-[0.2em] uppercase mb-1">Coordinates</div>
        <div class="text-[#fb923c] text-sm">
          <span v-if="lat && lon">{{ lat }}<span class="text-[#fb923c]/40">°</span> / {{ lon }}<span class="text-[#fb923c]/40">°</span></span>
          <span v-else class="text-[#94a3b8]">—</span>
        </div>
      </div>

      <div class="bg-[#0F0F20] px-4 py-3">
        <div class="text-[9px] text-[#818cf8]/40 tracking-[0.2em] uppercase mb-1">Life Expectancy</div>
        <div class="text-[#f472b6] text-sm">
          <span v-if="lifeExpectancy">{{ lifeExpectancy }} <span class="text-[#f472b6]/40">yrs</span></span>
          <span v-else class="text-[#94a3b8]">—</span>
        </div>
      </div>

    </div>
  </div>
</template>
