<template>
  <section class="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden">

   
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
      style="background: radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)"
    />

  
    <div class="relative z-10 flex items-center gap-2 border border-white/20 bg-white/6 rounded-full px-4 py-1.5 text-sm text-white/70 mb-10">
      <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
       NOW LIVE
    </div>

  
    <div class="relative z-10 mb-6">
      <h1 class="text-7xl font-bold font-serif text-white leading-tight">
        Every country.
      </h1>
      <h1 class="text-7xl font-bold font-serif italic text-[#818CF8] leading-tight">
        Every city.
      </h1>
    </div>

    
    <p class="relative z-10 text-white/50 text-base max-w-md leading-relaxed mb-10">
     A modern REST API to access detailed geographic data — population, coordinates, time zones, and more, in milliseconds.
    </p>

 
    <div class="relative z-10 flex gap-3 mb-10">
      <a class="px-6 py-3 rounded-xl bg-indigo-500 text-white font-medium
               shadow-[0_0_25px_rgba(99,102,241,0.6)]
               hover:shadow-[0_0_35px_rgba(99,102,241,0.9)]
               transition duration-300 hover:cursor">
        Try the API
      </a>
      <button class="border border-white/20 hover:border-white/40 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
        View Docs →
      </button>
    </div>

  </section>
</template>