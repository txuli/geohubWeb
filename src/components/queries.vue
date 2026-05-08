<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { requestStore } from '@/store/requests'
import { API_BASE } from '@/config'

const request = requestStore()

interface Param {
  name: string
  required: boolean
  type: 'string' | 'number'
  placeholder: string
}

interface Endpoint {
  path: string
  description: string
  params: Param[]
  category: 'country' | 'city'
}

const endpoints: Endpoint[] = [
  {
    path: '/getCountry',
    description: 'Single country by name',
    category: 'country',
    params: [{ name: 'country', required: true, type: 'string', placeholder: 'e.g. Spain' }]
  },
  {
    path: '/getCountries',
    description: 'All countries',
    category: 'country',
    params: []
  },
  {
    path: '/getRandomCountry',
    description: 'Random countries',
    category: 'country',
    params: [{ name: 'limit', required: false, type: 'number', placeholder: '1 – 50' }]
  },
  {
    path: '/getCity',
    description: 'Cities with filters',
    category: 'city',
    params: [
      { name: 'country', required: true, type: 'string', placeholder: 'e.g. Spain' },
      { name: 'city', required: false, type: 'string', placeholder: 'e.g. Madrid' },
      { name: 'minPopulation', required: false, type: 'number', placeholder: 'min pop' },
      { name: 'maxPopulation', required: false, type: 'number', placeholder: 'max pop' },
      { name: 'pageSize', required: false, type: 'number', placeholder: 'page size' },
      { name: 'page', required: false, type: 'number', placeholder: 'page' },
    ]
  },
  {
    path: '/getrandomCity',
    description: 'Random cities',
    category: 'city',
    params: [{ name: 'limit', required: false, type: 'number', placeholder: '1 – 50' }]
  },
  {
    path: '/nearme',
    description: 'Cities nearest to your IP',
    category: 'city',
    params: [{ name: 'max', required: false, type: 'number', placeholder: 'radius in meters' }]
  },
]

const selected = ref<Endpoint>(endpoints[0]!)
const paramValues = reactive<Record<string, string>>({})
const suggestions = ref<string[]>([])

onMounted(loadSuggestions)

async function loadSuggestions() {
  const data = await (await fetch(`${API_BASE}/getRandomCountry?limit=6`)).json() as { country?: string }[]
  suggestions.value = data.map(d => d.country ?? '').filter(Boolean)
}

function selectEndpoint(ep: Endpoint) {
  selected.value = ep
  Object.keys(paramValues).forEach(k => delete paramValues[k])
  request.endpoint = ep.path
}

async function sendRequest() {
  const params = new URLSearchParams()
  for (const p of selected.value.params) {
    const val = paramValues[p.name]
    if (val) params.set(p.name, val)
  }
  const qs = params.toString()
  const url = `${API_BASE}${selected.value.path}${qs ? '?' + qs : ''}`
  const res = await fetch(url)
  request.status = String(res.status)
  request.response = await res.json()
  request.endpoint = selected.value.path
  request.selection = paramValues['country'] ?? ''
  request.responseType = selected.value.category
}

const hasCountryParam = (ep: Endpoint) => ep.params.some(p => p.name === 'country')
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-4xl md:text-6xl font-serif">Test it now!</h2>
      <p class="text-white/50 mt-1">Search any country or city and see the response instantly.</p>
    </div>

    <!-- Endpoint selector -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="ep in endpoints"
        :key="ep.path"
        @click="selectEndpoint(ep)"
        :class="selected.path === ep.path
          ? 'border-accent text-accent bg-accent/5'
          : 'border-accent/20 text-white/25 hover:border-accent/40 hover:text-white/50'"
        class="font-terminal text-xs px-3 py-1.5 border rounded-sm transition-colors duration-200"
      >
        {{ ep.path }}
      </button>
    </div>

    <!-- Selected endpoint info -->
    <div class="border border-indigo-600/15 bg-[#161630]/40 rounded-md px-4 py-3 space-y-4">
      <div class="flex flex-wrap items-center gap-2">
        <span class="font-terminal text-[10px] text-[#818cf8]/40 tracking-widest uppercase">GET</span>
        <span class="font-terminal text-sm text-[#34d399]">{{ selected.path }}</span>
        <span class="font-terminal text-[10px] text-white/20 hidden sm:inline">—</span>
        <span class="font-terminal text-[10px] text-white/30 hidden sm:inline">{{ selected.description }}</span>
      </div>

      <!-- Params -->
      <div v-if="selected.params.length" class="space-y-3">
        <div
          class="grid gap-2"
          :class="selected.params.length > 2 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'"
        >
          <div v-for="param in selected.params" :key="param.name" class="flex flex-col gap-1">
            <label class="font-terminal text-[9px] text-[#818cf8]/50 tracking-[0.15em] uppercase">
              {{ param.name }}<span v-if="param.required" class="text-[#f87171] ml-0.5">*</span>
            </label>
            <input
              v-model="paramValues[param.name]"
              :placeholder="param.placeholder"
              :type="param.type === 'number' ? 'number' : 'text'"
              @keydown.enter="sendRequest"
              class="border border-accent/25 rounded-sm px-3 py-1.5 bg-[#0F0F20] font-terminal text-xs text-white/80 focus:border-accent outline-none transition-colors placeholder:text-white/15"
            >
          </div>
        </div>

        <!-- Country suggestions -->
        <div v-if="hasCountryParam(selected)" class="flex flex-wrap gap-1 pt-1">
          <button
            v-for="s in suggestions"
            :key="s"
            @click="paramValues['country'] = s"
            :class="paramValues['country'] === s
              ? 'border-accent/60 text-white/70'
              : 'border-accent/20 text-white/25 hover:border-accent/40 hover:text-white/50'"
            class="font-terminal text-[10px] px-2 py-0.5 border rounded-full transition-colors duration-200"
          >
            {{ s }}
          </button>
        </div>
      </div>

      <div v-else class="font-terminal text-[10px] text-white/20">
        No parameters required
      </div>
    </div>

    <!-- Send -->
    <button
      @click="sendRequest"
      class="font-terminal text-sm px-6 py-2 border border-accent/40 rounded-sm bg-[#0F0F20] text-accent/60 hover:border-accent hover:text-accent transition-colors duration-300"
    >
      send →
    </button>
  </div>
</template>
