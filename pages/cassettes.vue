<!-- pages/cassettes.vue -->
<script setup lang="ts">
interface Cassette {
  title: string;
  description: string;
  year: number;
  brand: string;
  frontCoverUrl: string;
  backCoverUrl: string;
  specs: string;           // Основные характеристики
  features: string;        // Особенности
  popularity: string;      // Почему популярна?
  funFact: string;         // Интересный факт
  howToSpotOriginal: string; // Как распознать оригинал?
}

const cassettes = ref<Cassette[]>([]);
const brands = ref<string[]>([]);
const selectedBrand = ref<string | null>(null);
const selectedCassette = ref<Cassette | null>(null);
const showModal = ref(false);

onMounted(async () => {
  try {
    const data = await $fetch('https://back.assunayuuki.ru/cassettes');
    if (Array.isArray(data)) {
      cassettes.value = data;
      const uniqueBrands = [...new Set(data.map(c => c.brand))].sort();
      brands.value = uniqueBrands;
    } else {
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

const openModal = (cassette: Cassette) => {
  selectedCassette.value = cassette;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedCassette.value = null;
};
</script>

<template>
  <DecoratorRgbBorder>
    <DecoratorOpacityBackground :opacity="0.85">
      <div class="p-4 md:p-8 font-orbitron text-black max-w-4xl mx-auto">

        <!-- Заголовок -->
        <h1 class="text-2xl md:text-3xl retro-text mb-6 text-gray-900 drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] text-center">
          📼 Коллекция AssunaYuuki
        </h1>

        <!-- Цитата от лисички (из Knowledge Base!) -->
        <div class="flex flex-col md:flex-row items-start gap-4 mb-8 bg-black/30 p-4 rounded-lg border border-cyan-500/50">
          <img
              src="/img/fennec.png"
              alt="AssunaYuuki"
              class="w-20 h-20 rounded-full border-2 border-pink-500 object-cover"
              @error="this.src = '/img/fallback.png'"
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
              v-for="(cassette, index) in filteredCassettes"
              :key="index"
              @click="openModal(cassette)"
              class="bg-black/40 border border-pink-700/60 rounded-xl p-4 flex flex-col items-center cursor-pointer hover:bg-black/50 transition"
          >
            <img
                v-if="cassette.frontCoverUrl"
                :src="cassette.frontCoverUrl"
                alt="Обложка кассеты"
                class="w-full h-32 object-contain mb-3 rounded border border-gray-700"
                @error="cassette.frontCoverUrl = ''"
            />
            <h3 class="font-bold retro-text text-lg text-center text-gray-900 drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">
              {{ cassette.title }}
            </h3>
            <p class="text-yellow-900 text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              {{ cassette.brand }} • {{ cassette.year }}
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

        <!-- МОДАЛЬНОЕ ОКНО С ПОЛНОЙ ИНФОРМАЦИЕЙ -->
        <div
            v-if="showModal"
            class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            @click.self="closeModal"
        >
          <div class="bg-black/80 border border-cyan-500/50 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-start mb-4">
              <h2 class="text-xl retro-text text-gray-900 drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">
                {{ selectedCassette?.title }}
              </h2>
              <button
                  @click="closeModal"
                  class="text-gray-400 hover:text-white text-xl"
              >
                ×
              </button>
            </div>

            <!-- Обложки -->
            <div class="flex gap-4 mb-4 justify-center">
              <img
                  v-if="selectedCassette?.frontCoverUrl"
                  :src="selectedCassette.frontCoverUrl"
                  alt="Спереди"
                  class="w-28 h-28 object-cover rounded border border-cyan-500"
                  @error="selectedCassette.frontCoverUrl = ''"
              />
              <img
                  v-if="selectedCassette?.backCoverUrl"
                  :src="selectedCassette.backCoverUrl"
                  alt="Сзади"
                  class="w-28 h-28 object-cover rounded border border-purple-500"
                  @error="selectedCassette.backCoverUrl = ''"
              />
            </div>

            <!-- Основная информация -->
            <p class="text-yellow-900 text-lg drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] mb-4 text-center">
              {{ selectedCassette?.brand }} • {{ selectedCassette?.year }}
            </p>

            <!-- Краткое описание -->
            <div v-if="selectedCassette?.description" class="mb-4 p-3 bg-gray-800/40 rounded border border-gray-600">
              <p class="text-gray-200">{{ selectedCassette.description }}</p>
            </div>

            <!-- Основные характеристики -->
            <div v-if="selectedCassette?.specs" class="mb-4 p-3 bg-cyan-900/20 rounded border border-cyan-700">
              <h3 class="text-cyan-300 font-orbitron text-sm mb-1">Основные характеристики</h3>
              <p class="text-cyan-100 text-sm">{{ selectedCassette.specs }}</p>
            </div>

            <!-- Особенности -->
            <div v-if="selectedCassette?.features" class="mb-4 p-3 bg-yellow-900/20 rounded border border-yellow-700">
              <h3 class="text-yellow-300 font-orbitron text-sm mb-1">Особенности</h3>
              <p class="text-yellow-100 text-sm">{{ selectedCassette.features }}</p>
            </div>

            <!-- Почему популярна? -->
            <div v-if="selectedCassette?.popularity" class="mb-4 p-3 bg-pink-900/20 rounded border border-pink-700">
              <h3 class="text-pink-300 font-orbitron text-sm mb-1">Почему была так популярна?</h3>
              <p class="text-pink-100 text-sm">{{ selectedCassette.popularity }}</p>
            </div>

            <!-- Интересный факт -->
            <div v-if="selectedCassette?.funFact" class="mb-4 p-3 bg-green-900/20 rounded border border-green-700">
              <h3 class="text-green-300 font-orbitron text-sm mb-1">Интересный факт</h3>
              <p class="text-green-100 text-sm">{{ selectedCassette.funFact }}</p>
            </div>

            <!-- Как распознать оригинал? -->
            <div v-if="selectedCassette?.howToSpotOriginal" class="mb-4 p-3 bg-purple-900/20 rounded border border-purple-700">
              <h3 class="text-purple-300 font-orbitron text-sm mb-1">Как распознать оригинал?</h3>
              <p class="text-purple-100 text-sm">{{ selectedCassette.howToSpotOriginal }}</p>
            </div>

            <div class="mt-6 text-center text-gray-700 text-sm">
              📼 Коллекция AssunaYuuki • 900 лет в поисках красоты
            </div>
          </div>
        </div>

      </div>
    </DecoratorOpacityBackground>
  </DecoratorRgbBorder>
</template>