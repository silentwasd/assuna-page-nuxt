<!-- components/BlockCassettes.vue -->
<template>
  <div class="p-5 md:p-10 font-orbitron text-black ">
    <h2 class="text-2xl md:text-4xl text-center font-gothic px-5 md:px-10 pt-5 md:pt-10 mb-5 ">
       Моя коллекция кассет
    </h2>
    <p class="mb-4 text-gray-800">
      За эти долгие годы я повидала много всего, и самым интересным для меня оказались всякие технические устройства, которые были изобретены давно-давно. Особенно я люблю японские аудиокассеты — они такие аккуратные и красивые! Фыр-фыр!
    </p>
    <NuxtLink
        to="/cassettes"
        class="inline-block px-5 py-2.5 bg-pink-900/60 hover:bg-pink-800/70 border border-pink-500 rounded font-orbitron text-pink-100 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]"
    >
      🦊 Посмотреть коллекцию
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
</script>


<style>
.dark-text {
color: #000;
text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
font-weight: 500;
}
</style>
