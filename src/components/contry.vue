<script setup lang="ts">
import { requestStore } from '@/store/requests'
import { API_BASE } from '@/config'
defineProps({
country:{
type:String,
required:true
}
})
const request = requestStore()
async function setCountrty(country:string){
request.selection = country
let response=await fetch(`${API_BASE}${request.endpoint}?country=${country}`)
request.response= await (await fetch(`${API_BASE}${request.endpoint}?country=${country}`)).json()
request.status= `${response.status} ${response.statusText}`
}

</script>
<template>
    <button class="rounded-full font-sans text-white/30 border px-1 border-accent/30  m-2 hover:cursor-pointer hover:border-accent transition-all duration-300" @click="setCountrty(country)">
        {{ country }}
    </button>
</template>