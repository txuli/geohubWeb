<template>
  <footer class="border-t border-indigo-600/15 bg-[#0F0F20]/60 mt-24 font-terminal">
    <div class="w-full px-4 sm:px-8 md:w-5/6 lg:w-4/6 mx-auto py-12">

      <div class="flex flex-col md:flex-row justify-between gap-10 mb-12">

        <!-- Brand -->
        <div class="space-y-3 max-w-xs">
          <h2 class="font-serif text-2xl text-accent">GeoHub</h2>
          <p class="text-[11px] text-white/30 leading-relaxed">
            A modern REST API to access detailed geographic data — countries, cities, coordinates, and more.
          </p>
          <div class="flex items-center gap-2 pt-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span class="text-[10px] text-white/30 tracking-widest uppercase">All systems operational</span>
          </div>
        </div>

        <!-- Links -->
        <div class="flex flex-col sm:flex-row gap-10">
          <div class="space-y-3">
            <div class="text-[9px] text-[#818cf8]/50 tracking-[0.2em] uppercase mb-3">API</div>
            <a href="#endpoints" class="block text-[11px] text-white/30 hover:text-white/70 transition-colors duration-200">/getCountry</a>
            <a href="#endpoints" class="block text-[11px] text-white/30 hover:text-white/70 transition-colors duration-200">/getCity</a>
            <a href="#endpoints" class="block text-[11px] text-white/30 hover:text-white/70 transition-colors duration-200">/nearme</a>
            <a href="#endpoints" class="block text-[11px] text-white/30 hover:text-white/70 transition-colors duration-200">View all →</a>
          </div>

          <div class="space-y-3">
            <div class="text-[9px] text-[#818cf8]/50 tracking-[0.2em] uppercase mb-3">Resources</div>
            <a href="#live-explorer" class="block text-[11px] text-white/30 hover:text-white/70 transition-colors duration-200">Live Explorer</a>
            <a href="#endpoints" class="block text-[11px] text-white/30 hover:text-white/70 transition-colors duration-200">Documentation</a>
            <a href="https://github.com/txuli/geohub" target="_blank" class="block text-[11px] text-white/30 hover:text-white/70 transition-colors duration-200">GitHub</a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-indigo-600/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span class="text-[10px] text-white/20">© {{ new Date().getFullYear() }} GeoHub. Open source.</span>
        <div class="flex items-center gap-1 text-[10px] text-white/15">
          <span class="text-[#818cf8]/30">◈</span>
          <span>api.geohub.pm</span>
        </div>
      </div>

    </div>
  </footer>
</template>
