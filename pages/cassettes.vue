<!-- pages/cassettes.vue -->
<script setup lang="ts">
interface Cassette {
  id: number;
  title: string;
  description: string;
  year: number;
  brand: string;
  coverImageUrl: string;
}

// Инициализируем как ПУСТОЙ МАССИВ — чтобы избежать ошибки .length
const cassettes = ref<Cassette[]>([]);
const brands = ref<string[]>([]);
const selectedBrand = ref<string | null>(null);

onMounted(async () => {
  try {
    const data = await $fetch('https://back.assunayuuki.ru/cassettes');
    if (Array.isArray(data)) {
      cassettes.value = data;
      const uniqueBrands = [...new Set(data.map(c => c.brand))].sort();
      brands.value = uniqueBrands;
    } else {
      console.warn('Бэкенд вернул не массив:', data);
      cassettes.value = [];
      brands.value = [];
    }
  } catch (err) {
    console.error('❌ Не удалось загрузить кассеты:', err);
    cassettes.value = [];
    brands.value = [];
  }
});

const filteredCassettes = computed(() => {
  if (!selectedBrand.value) return cassettes.value;
  return cassettes.value.filter(c => c.brand === selectedBrand.value);
});
</script>

<template>
  <DecoratorRgbBorder>
    <DecoratorOpacityBackground :opacity="0.85">
      <div class="p-4 md:p-8 font-orbitron text-black max-w-4xl mx-auto">
        <!-- Заголовок -->
        <h1 class="text-2xl md:text-3xl retro-text mb-6 text-gray-900 drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] text-center">
          📼 Коллекция AssunaYuuki
        </h1>

        <!-- Цитата от лисички -->
        <div class="flex flex-col md:flex-row items-start gap-4 mb-8 bg-black/30 p-4 rounded-lg border border-cyan-500/50">
          <img
              src="/img/fennec.png"
              alt="AssunaYuuki"
              class="w-20 h-20 rounded-full border-2 border-pink-500 object-cover"
              onerror="this.src='/fallback-avatar.png'"
          />
          <p class="text-gray-800 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] leading-relaxed">
            За эти долгие годы я повидала много всего, и самым интересным для меня оказались всякие технические устройства, которые были изобретены давно-давно. Особенно я люблю японские аудиокассеты — они такие аккуратные и красивые! Фыр-фыр! 🦊
          </p>
        </div>

        <!-- Фильтр по брендам -->
        <div class="mb-8 flex flex-wrap justify-center gap-2">
          <button
              @click="selectedBrand = null"
              class="px-4 py-2 text-sm border border-cyan-500 rounded hover:bg-cyan-900/40 text-cyan-900 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] font-orbitron"
              :class="{ 'bg-cyan-900/60': !selectedBrand }"
          >
            Все бренды
          </button>
          <button
              v-for="brand in brands"
              :key="brand"
              @click="selectedBrand = brand"
              class="px-4 py-2 text-sm border border-yellow-500 rounded hover:bg-yellow-900/40 text-yellow-900 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] font-orbitron"
              :class="{ 'bg-yellow-900/60': selectedBrand === brand }"
          >
            {{ brand }}
          </button>
        </div>

        <!-- Список кассет -->
        <div v-if="cassettes.length === 0" class="text-center text-gray-600 py-12 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
          К сожалению, кассеты ещё не добавлены 😿<br />
          Но я уже ищу новые! Фыр-фыр!
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
              v-for="cassette in filteredCassettes"
              :key="cassette.id"
              class="bg-black/40 border border-pink-700/60 rounded-xl p-4 flex flex-col items-center"
          >
            <img
                v-if="cassette.coverImageUrl"
                :src="cassette.coverImageUrl"
                alt="Обложка кассеты"
                class="w-full h-32 object-contain mb-3 rounded border border-gray-700"
                @error="cassette.coverImageUrl = ''"
            />
            <h3 class="font-bold retro-text text-lg text-center text-gray-900 drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">
              {{ cassette.title }}
            </h3>
            <p class="text-yellow-900 text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              {{ cassette.brand }} • {{ cassette.year }}
            </p>
            <p
                v-if="cassette.description"
                class="text-xs text-gray-800 mt-2 text-center line-clamp-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)] leading-tight"
            >
              {{ cassette.description }}
            </p>
          </div>
        </div>

        <!-- Ссылка назад -->
        <div class="mt-10 text-center">
          <NuxtLink
              to="/"
              class="inline-block px-5 py-2.5 bg-cyan-900/50 hover:bg-cyan-800/60 border border-cyan-500 rounded font-orbitron text-cyan-900 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]"
          >
            &larr; Вернуться к лисичке
          </NuxtLink>
        </div>
      </div>
    </DecoratorOpacityBackground>
  </DecoratorRgbBorder>
</template>