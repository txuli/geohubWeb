<script setup lang="ts">
defineProps({
  title: [String, Boolean],
})


</script>
<template>
<div class="text-accent flex items-center gap-2 font-sans text-sm" :id="String(title)">
  <div class="border-t border-current w-5"></div>
  {{ title }}
</div>
</template>