<!-- pages/cassettes/index.vue -->
<script setup lang="ts">
const brands = ['tdk', 'basf', 'sony', 'maxell', 'denon'];
</script>

<template>
  <DecoratorRgbBorder>
    <DecoratorOpacityBackground :opacity="0.85">
      <div class="p-4 md:p-8 font-orbitron text-black max-w-4xl mx-auto">

        <h1 class="text-2xl md:text-3xl retro-text mb-6 text-gray-900 drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] text-center">
          📼 Коллекция AssunaYuuki
        </h1>

        <div class="flex flex-col md:flex-row items-start gap-4 mb-8 bg-black/30 p-4 rounded-lg border border-cyan-500/50">
          <img src="/img/fennec.png" alt="AssunaYuuki" class="w-20 h-20 rounded-full border-2 border-pink-500 object-cover" @error="this.src='/img/fallback.png'" />
          <p class="text-gray-800 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] leading-relaxed">
            За эти долгие годы я повидала много всего, и самым интересным для меня оказались всякие технические устройства, которые были изобретены давно-давно. Особенно я люблю японские аудиокассеты — они такие аккуратные и красивые! Фыр-фыр! 🦊
          </p>
        </div>

        <h2 class="text-xl mb-4 text-gray-900">Бренды</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <NuxtLink
              v-for="brand in brands"
              :key="brand"
              :to="`/cassettes/${brand}`"
              class="p-3 bg-black/30 border border-yellow-500 rounded text-center hover:bg-yellow-900/20"
          >
            {{ brand.toUpperCase() }}
          </NuxtLink>
        </div>

        <div class="mt-8 text-center">
          <NuxtLink to="/" class="text-cyan-900 hover:text-cyan-700">&larr; Вернуться к лисичке</NuxtLink>
        </div>

      </div>
    </DecoratorOpacityBackground>
  </DecoratorRgbBorder>
</template>