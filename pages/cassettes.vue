<script setup lang="ts">
interface Cassette {
  id: number;
  title: string;
  description: string;
  year: number;
  brand: string;
  frontCoverUrl: string;
  backCoverUrl: string;
  specs: string;
  features: string;
  popularity: string;
  funFact: string;
  howToSpotOriginal: string;
}

const cassettes = ref<Cassette[]>([]);
const brands = ref<string[]>([]);
const selectedBrand = ref<string | null>(null);
const selectedCassette = ref<Cassette | null>(null);
const showModal = ref(false);
const loading = ref(true);
const error = ref<string | null>(null);
const searchQuery = ref('');

const loadCassettes = async () => {
  loading.value = true;
  error.value = null;
  try {
    const data = await $fetch('https://back.assunayuuki.ru/cassettes');
    if (Array.isArray(data)) {
      cassettes.value = data;
      const uniqueBrands = [...new Set(data.map(c => c.brand))].sort();
      brands.value = uniqueBrands;
    } else {
      throw new Error('Invalid data format');
    }
  } catch (err) {
    console.error('❌ Не удалось загрузить кассеты:', err);
    error.value = 'Не удалось загрузить коллекцию. Попробуйте позже!';
    cassettes.value = [];
    brands.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadCassettes();
});

const filteredCassettes = computed(() => {
  let result = cassettes.value;

  if (selectedBrand.value) {
    result = result.filter(c => c.brand === selectedBrand.value);
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.brand.toLowerCase().includes(q)
    );
  }

  return result;
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

        <h1 class="text-2xl md:text-3xl retro-text mb-6 text-gray-900 drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] text-center">
          📼 Коллекция AssunaYuuki
        </h1>

        <div class="flex flex-col md:flex-row items-start gap-4 mb-8 bg-black/30 p-4 rounded-lg border border-cyan-500/50">
          <img
              src="/img/fennec.png"
              alt="AssunaYuuki"
              class="w-20 h-20 rounded-full border-2 border-pink-500 object-cover"
          />
          <p class="text-gray-800 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] leading-relaxed">
            За эти долгие годы я повидала много всего, и самым интересным для меня оказались всякие технические устройства, которые были изобретены давно-давно. Особенно я люблю японские аудиокассеты — они такие аккуратные и красивые! Фыр-фыр! 🦊
          </p>
        </div>

        <!-- 🔍 Поиск -->
        <div class="mb-6">
          <input
              v-model="searchQuery"
              type="text"
              placeholder="Найти кассету или бренд..."
              class="w-full max-w-md mx-auto block px-4 py-2 rounded-lg border border-cyan-500/60 bg-black/30 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-orbitron text-sm"
          />
        </div>

        <!-- 🏷️ Фильтр по брендам -->
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

        <!-- Состояния -->
        <div v-if="loading" class="text-center text-gray-600 py-12 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
          Загружаю кассеты... 🌀<br />Фыр-фыр, подожди немного!
        </div>

        <div v-else-if="error" class="text-center text-red-600 py-12 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
          😿 {{ error }}<br />
          <button @click="loadCassettes" class="mt-2 px-3 py-1 bg-red-700 text-white rounded text-sm hover:bg-red-600 font-orbitron">
            Попробовать снова
          </button>
        </div>

        <div v-else-if="filteredCassettes.length === 0" class="text-center text-gray-600 py-12 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
          Ничего не найдено 😿<br />Попробуй изменить запрос или сбросить фильтры!
        </div>

        <!-- Список кассет -->
        <div v-else>
          <TransitionGroup name="cassette" tag="div" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
                v-for="cassette in filteredCassettes"
                :key="cassette.id"
                @click="openModal(cassette)"
                class="bg-black/40 border border-pink-700/60 rounded-xl p-4 flex flex-col items-center cursor-pointer hover:bg-black/50 transition group"
                :aria-label="`Кассета ${cassette.title}, ${cassette.year} года`"
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
            </button>
          </TransitionGroup>
        </div>

        <div class="mt-10 text-center">
          <NuxtLink
              to="/"
              class="inline-block px-5 py-2.5 bg-cyan-900/50 hover:bg-cyan-800/60 border border-cyan-500 rounded font-orbitron text-cyan-900 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]"
          >
            &larr; Вернуться к лисичке
          </NuxtLink>
        </div>

        <!-- Модалка -->
        <Teleport v-if="showModal && selectedCassette" to="body">
          <div
              class="fixed inset-0 bg-black/85 flex items-start justify-center z-50 p-4 pt-10"
              @click.self="closeModal"
              style="overscroll-behavior: contain;"
          >
            <div
                class="bg-gray-900 border border-cyan-500/60 rounded-xl w-full max-w-2xl shadow-xl overflow-clip"
                style="scrollbar-width: thin; scrollbar-color: #0891b2 #111827;"
            >
              <div class="overflow-auto max-h-[85vh]">
                <div class="sticky top-0 bg-gray-900 z-10 p-5 pb-3 border-b border-cyan-500/30">
                  <div class="flex justify-between items-start">
                    <h2 class="text-xl retro-text text-cyan-300">
                      📼 {{ selectedCassette.title }}
                    </h2>
                    <button @click="closeModal" class="text-gray-400 hover:text-white text-xl font-bold">×</button>
                  </div>
                  <p class="text-yellow-300 text-center mt-2 text-sm">
                    {{ selectedCassette.brand }} • {{ selectedCassette.year }}
                  </p>
                </div>

                <div class="flex justify-center gap-3 py-3">
                  <img
                      v-if="selectedCassette.frontCoverUrl"
                      :src="selectedCassette.frontCoverUrl"
                      alt="Front"
                      class="size-48 object-contain border border-cyan-600 rounded"
                  />
                  <img
                      v-if="selectedCassette.backCoverUrl"
                      :src="selectedCassette.backCoverUrl"
                      alt="Back"
                      class="size-48 object-contain border border-purple-600 rounded"
                  />
                </div>

                <div class="px-5 pb-5 space-y-3">
                  <div v-if="selectedCassette.description" class="p-3 rounded border border-gray-700 bg-gray-800/40">
                    <h3 class="font-orbitron text-xs mb-1 text-gray-300 flex items-center gap-1">📖 Описание</h3>
                    <p class="text-sm text-gray-200 leading-relaxed">
                      {{ selectedCassette.description }}
                    </p>
                  </div>
                  <div v-if="selectedCassette.specs" class="p-3 rounded border border-cyan-600 bg-cyan-900/20">
                    <h3 class="font-orbitron text-xs mb-1 text-cyan-200 flex items-center gap-1">📼 Основные характеристики</h3>
                    <p class="text-sm text-cyan-100 leading-relaxed">
                      {{ selectedCassette.specs }}
                    </p>
                  </div>
                  <div v-if="selectedCassette.features" class="p-3 rounded border border-yellow-600 bg-yellow-900/20">
                    <h3 class="font-orbitron text-xs mb-1 text-yellow-200 flex items-center gap-1">✨ Особенности</h3>
                    <p class="text-sm text-yellow-100 leading-relaxed">
                      {{ selectedCassette.features }}
                    </p>
                  </div>
                  <div v-if="selectedCassette.popularity" class="p-3 rounded border border-pink-600 bg-pink-900/20">
                    <h3 class="font-orbitron text-xs mb-1 text-pink-200 flex items-center gap-1">🔥 Почему популярна?</h3>
                    <p class="text-sm text-pink-100 leading-relaxed">
                      {{ selectedCassette.popularity }}
                    </p>
                  </div>
                  <div v-if="selectedCassette.funFact" class="p-3 rounded border border-green-600 bg-green-900/20">
                    <h3 class="font-orbitron text-xs mb-1 text-green-200 flex items-center gap-1">❓ Интересный факт</h3>
                    <p class="text-sm text-green-100 leading-relaxed">
                      {{ selectedCassette.funFact }}
                    </p>
                  </div>
                  <div v-if="selectedCassette.howToSpotOriginal" class="p-3 rounded border border-purple-600 bg-purple-900/20">
                    <h3 class="font-orbitron text-xs mb-1 text-purple-200 flex items-center gap-1">🔍 Как распознать оригинал?</h3>
                    <p class="text-sm text-purple-100 leading-relaxed">
                      {{ selectedCassette.howToSpotOriginal }}
                    </p>
                  </div>
                  <div class="pt-3 text-center text-gray-600 text-xs">
                    📼 Коллекция AssunaYuuki • 900 лет в поисках красоты
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Teleport>

      </div>
    </DecoratorOpacityBackground>
  </DecoratorRgbBorder>
</template>

<style scoped>
.cassette-enter-active {
  transition: all 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.cassette-leave-active {
  transition: all 0.2s ease-in;
}
.cassette-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.cassette-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}
</style>