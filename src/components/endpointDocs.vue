<script setup lang="ts">
import { ref } from 'vue'

interface Param {
  name: string
  type: string
  required: boolean
  description: string
  default?: string
}

interface Endpoint {
  path: string
  description: string
  params: Param[]
  example: string
}

const endpoints: Endpoint[] = [
  {
    path: '/getCountry',
    description: 'Returns full data for a single country matching the given name.',
    example: 'https://api.geohub.pm/getCountry?country=Spain',
    params: [
      { name: 'country', type: 'string', required: true, description: 'Name of the country (case-insensitive).' }
    ]
  },
  {
    path: '/getCountries',
    description: 'Returns all countries in the database.',
    example: 'https://api.geohub.pm/getCountries',
    params: []
  },
  {
    path: '/getRandomCountry',
    description: 'Returns one or more random countries.',
    example: 'https://api.geohub.pm/getRandomCountry?limit=3',
    params: [
      { name: 'limit', type: 'number', required: false, description: 'Number of countries to return.', default: '1 (max 50)' }
    ]
  },
  {
    path: '/getCity',
    description: 'Returns cities filtered by country and optional criteria. Fetches missing data from Wikipedia automatically.',
    example: 'https:/api./geohub.pm/getCity?country=Spain&city=Madrid&minPopulation=100000',
    params: [
      { name: 'country', type: 'string', required: true, description: 'Filter cities by country name.' },
      { name: 'city', type: 'string', required: false, description: 'Filter by city name.' },
      { name: 'minPopulation', type: 'number', required: false, description: 'Minimum population threshold.' },
      { name: 'maxPopulation', type: 'number', required: false, description: 'Maximum population threshold.' },
      { name: 'pageSize', type: 'number', required: false, description: 'Number of results per page.', default: 'all (max 1000)' },
      { name: 'page', type: 'number', required: false, description: 'Page number for pagination.', default: '1' },
    ]
  },
  {
    path: '/getrandomCity',
    description: 'Returns one or more random cities.',
    example: 'https://api.geohub.pm/getrandomCity?limit=5',
    params: [
      { name: 'limit', type: 'number', required: false, description: 'Number of cities to return.', default: '1 (max 50)' }
    ]
  },
  {
    path: '/nearme',
    description: 'Returns up to 5 cities closest to your IP-based location.',
    example: 'https://api.geohub.pm/nearme?max=50000',
    params: [
      { name: 'max', type: 'number', required: false, description: 'Search radius in meters.', default: '100000' }
    ]
  },
]

const open = ref<string | null>(null)

function toggle(path: string) {
  open.value = open.value === path ? null : path
}
</script>

<template>
  <div class="space-y-2 font-terminal">
    <div
      v-for="ep in endpoints"
      :key="ep.path"
      class="border border-indigo-600/15 rounded-md overflow-hidden"
    >
      <!-- Header row -->
      <button
        @click="toggle(ep.path)"
        class="w-full flex items-center justify-between px-4 py-3 bg-[#0F0F20] hover:bg-[#161630] transition-colors duration-200 text-left"
      >
        <div class="flex items-center gap-3">
          <span class="text-[9px] text-[#818cf8]/50 tracking-widest uppercase">GET</span>
          <span class="text-sm text-[#34d399]">{{ ep.path }}</span>
          <span class="text-[10px] text-white/25 hidden sm:inline">— {{ ep.description }}</span>
        </div>
        <span
          class="text-[#818cf8]/40 text-xs transition-transform duration-200 select-none"
          :class="open === ep.path ? 'rotate-180' : ''"
        >▾</span>
      </button>

      <!-- Body -->
      <div v-if="open === ep.path" class="bg-[#0c0c1a] border-t border-indigo-600/10 px-4 py-4 space-y-4">

        <!-- Description (mobile only, already shown inline on sm+) -->
        <p class="text-[11px] text-white/30 sm:hidden">{{ ep.description }}</p>

        <!-- Example URL -->
        <div>
          <div class="text-[9px] text-[#818cf8]/40 tracking-[0.2em] uppercase mb-1">Example request</div>
          <div class="bg-[#161630] rounded px-3 py-2 text-[11px] text-[#34d399] break-all">
            {{ ep.example }}
          </div>
        </div>

        <!-- Params table -->
        <div v-if="ep.params.length">
          <div class="text-[9px] text-[#818cf8]/40 tracking-[0.2em] uppercase mb-2">Parameters</div>
          <div class="space-y-1">
            <div
              v-for="param in ep.params"
              :key="param.name"
              class="grid grid-cols-[auto_auto_1fr] sm:grid-cols-[120px_80px_60px_1fr] gap-x-4 gap-y-1 items-start py-2 border-b border-indigo-600/10 last:border-0"
            >
              <span class="text-[#818cf8] text-xs">{{ param.name }}</span>
              <span class="text-[#fb923c] text-[10px]">{{ param.type }}</span>
              <span
                class="text-[10px] px-1.5 py-0.5 rounded text-center leading-tight"
                :class="param.required ? 'text-[#f87171] bg-[#2c1515]' : 'text-[#94a3b8] bg-white/5'"
              >{{ param.required ? 'required' : 'optional' }}</span>
              <span class="text-[10px] text-white/30 col-span-3 sm:col-span-1">
                {{ param.description }}
                <span v-if="param.default" class="text-[#94a3b8]"> Default: {{ param.default }}.</span>
              </span>
            </div>
          </div>
        </div>

        <div v-else class="text-[10px] text-white/20">No parameters required.</div>

      </div>
    </div>
  </div>
</template>
