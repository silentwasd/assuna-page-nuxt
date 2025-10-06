<!-- pages/cassettes/[brand].vue -->
<script setup lang="ts">
const route = useRoute();
const brand = route.params.brand as string;
const yearGroups = ref<string[]>([]);

// История из Knowledge Base + расширение
const histories: Record<string, string> = {
  tdk: 'TDK — японская компания, основанная в 1935 году. Сначала специализировалась на производстве ферритов, а затем перешла в электронику. TDK стала одним из лидеров рынка аудиокассет в 1970-80-х годах. Их кассеты серии SA, D и Metal были самыми популярными в мире. Фыр-фыр! 🦊',
  basf: 'BASF — немецкий химический гигант, основанный в 1865 году. Известен не только как производитель красителей, но и как один из первых создателей аудиокассет.',
  sony: 'Sony — легендарная японская компания, которая в 1963 году представила первую в мире компакт-кассету. Именно Sony задала стандарт, который позже был принят всеми производителями.'
};

const history = histories[brand] || 'Информация скоро появится!';

onMounted(async () => {
  try {
    const data = await $fetch(`https://back.assunayuuki.ru/cassettes/years/${brand}`);
    yearGroups.value = Array.isArray(data) ? data.sort() : [];
  } catch (err) {
    console.error('Не удалось загрузить годы:', err);
  }
});
</script>

<template>
  <DecoratorRgbBorder>
    <DecoratorOpacityBackground :opacity="0.85">
      <div class="p-4 md:p-8 font-orbitron text-black max-w-4xl mx-auto">

        <h1 class="text-2xl md:text-3xl retro-text mb-6 text-gray-900 drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">
          📼 Аудиокассеты {{ brand.toUpperCase() }}
        </h1>

        <div class="bg-black/30 p-4 rounded-lg border border-cyan-500/50 mb-8">
          <p class="text-gray-800 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] leading-relaxed italic">
            За эти долгие годы я повидала много всего, и самым интересным для меня оказались всякие технические устройства, которые были изобретены давно-давно. Особенно я люблю японские аудиокассеты — они такие аккуратные и красивые! Фыр-фыр! 🦊
          </p>
        </div>

        <div class="text-gray-800 mb-10 whitespace-pre-line">{{ history }}</div>

        <h2 class="text-xl retro-text mb-4 text-gray-900">Кассеты по годам</h2>

        <div v-if="yearGroups.length === 0" class="text-gray-600 italic">
          Кассеты этого бренда ещё не добавлены.
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <NuxtLink
              v-for="years in yearGroups"
              :key="years"
              :to="`/cassettes/${brand}/${years}`"
              class="p-3 bg-pink-900/10 border border-pink-700 rounded text-center hover:bg-pink-800/20"
          >
            {{ brand.toUpperCase() }} {{ years }}
          </NuxtLink>
        </div>

        <div class="mt-8 text-center">
          <NuxtLink to="/cassettes" class="text-cyan-900 hover:text-cyan-700">&larr; Назад к каталогу</NuxtLink>
        </div>

      </div>
    </DecoratorOpacityBackground>
  </DecoratorRgbBorder>
</template>