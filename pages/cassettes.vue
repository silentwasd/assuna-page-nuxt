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

interface ArchiveMeta {
  totalCassettes: number;
  lastUpdated: string | null;
  totalBrands: number;
  yearRange: string | null;
}

const cassettes = ref<Cassette[]>([]);
const brands = ref<string[]>([]);
const selectedBrand = ref<string | null>(null);
const selectedCassette = ref<Cassette | null>(null);
const showModal = ref(false);
const loading = ref(true);
const error = ref<string | null>(null);
const searchQuery = ref('');
const archiveMeta = ref<ArchiveMeta | null>(null);
const isWarmedUp = ref(false);

const formatDate = (isoString: string | null): string => {
  if (!isoString) return '—';
  const date = new Date(isoString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const config = useRuntimeConfig();

const loadCassettes = async () => {
  loading.value = true;
  error.value = null;
  try {
    const data = await $fetch(`${config.public.apiBase}/cassettes`);
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

const loadArchiveMeta = async () => {
  try {
    const meta = await $fetch(`${config.public.apiBase}/archive`);
    archiveMeta.value = meta;
  } catch (err) {
    console.error('Ошибка загрузки архива:', err);
  }
};

const loadEverything = async () => {
  loading.value = true;
  error.value = null;
  await Promise.allSettled([loadCassettes(), loadArchiveMeta()]);
  loading.value = false;
  setTimeout(() => {
    isWarmedUp.value = true;
  }, 800);
};

onMounted(() => {
  loadEverything();
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

// Функция для форматирования текста с переносами строк в html с <br>
const formatTextWithLineBreaks = (text: string | null | undefined) => {
  if (!text) return '';
  return text.replace(/\n/g, '<br>');
};

// Форматированные тексты для вывода в HTML с переносами
const formattedDescription = computed(() => formatTextWithLineBreaks(selectedCassette.value?.description));
const formattedSpecs = computed(() => formatTextWithLineBreaks(selectedCassette.value?.specs));
const formattedFeatures = computed(() => formatTextWithLineBreaks(selectedCassette.value?.features));
const formattedPopularity = computed(() => formatTextWithLineBreaks(selectedCassette.value?.popularity));
const formattedFunFact = computed(() => formatTextWithLineBreaks(selectedCassette.value?.funFact));
const formattedHowToSpot = computed(() => formatTextWithLineBreaks(selectedCassette.value?.howToSpotOriginal));
</script>

<template>
  <div class="relative w-full min-h-screen bg-black text-white overflow-auto"
       :class="{ 'saturated': isWarmedUp }">
    <!-- CRT SCANLINES -->
    <div class="absolute inset-0 pointer-events-none opacity-20"
         style="background: repeating-linear-gradient(to bottom, transparent, transparent 1px, rgba(0,0,0,0.15) 1px, rgba(0,0,0,0.15) 2px);"></div>

    <!-- SUBTLE NOISE -->
    <div class="absolute inset-0 pointer-events-none opacity-10"
         style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.7%22 numOctaves=%222%22 stitchTiles=%22stitch%22></feTurbulence></filter><rect width=%22100%%22 height=%22100%%22 filter=%22url(%23noise)%22></rect></svg>');"></div>

    <div class="p-4 md:p-6 font-retro max-w-4xl mx-auto relative z-10">

      <!-- Заголовок + Живой архив -->
      <div class="text-center mb-6">
        <h1 class="text-2xl md:text-3xl mb-2 text-cyan-300 font-bold tracking-wide drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]">
          📼 Коллекция AssunaYuuki
        </h1>
        <div v-if="archiveMeta" class="text-xs text-gray-500 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">
          В коллекции: {{ archiveMeta.totalCassettes }} кассет •
          Годы: {{ archiveMeta.yearRange || '—' }} •
          Обновлено: {{ formatDate(archiveMeta.lastUpdated) }}
        </div>
      </div>

      <!-- Вступление -->
      <div class="mb-6 p-4 bg-gray-900/60 rounded-lg border border-cyan-500/30 backdrop-blur-sm">
        <div class="flex items-start gap-3">
          <img src="/img/fennec.png" alt="AssunaYuuki" class="w-16 h-16 rounded-full border-2 border-pink-500 object-cover" />
          <p class="text-gray-200 text-sm leading-relaxed drop-shadow-[0_0_4px_rgba(0,0,0,0.6)]">
            За эти долгие годы я повидала много всего, и самым интересным для меня оказались всякие технические устройства, которые были изобретены давно-давно. Особенно я люблю японские аудиокассеты — они такие аккуратные и красивые! Фыр-фыр! 🦊
          </p>
        </div>
      </div>

      <!-- Поиск -->
      <div class="mb-6">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Найти кассету или бренд..."
            class="w-full max-w-md mx-auto block px-4 py-2 rounded-lg border border-cyan-500/40 bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 font-retro text-sm"
        />
      </div>

      <!-- Фильтры -->
      <div class="mb-8 flex flex-wrap justify-center gap-2">
        <button
            @click="selectedBrand = null"
            class="px-4 py-2 text-sm border border-cyan-500/50 rounded hover:bg-cyan-900/20 text-cyan-200 font-retro"
            :class="{ 'bg-cyan-900/30': !selectedBrand }"
        >
          Все бренды
        </button>
        <button
            v-for="brand in brands"
            :key="brand"
            @click="selectedBrand = brand"
            class="px-4 py-2 text-sm border border-yellow-500/50 rounded hover:bg-yellow-900/20 text-yellow-200 font-retro"
            :class="{ 'bg-yellow-900/30': selectedBrand === brand }"
        >
          {{ brand }}
        </button>
      </div>

      <!-- Состояния -->
      <div v-if="loading" class="text-center text-gray-400 py-12 drop-shadow-[0_0_6px_rgba(0,0,0,0.6)]">
        Загружаю кассеты... 🌀<br />Фыр-фыр, подожди немного!
      </div>

      <div v-else-if="error" class="text-center text-red-400 py-12 drop-shadow-[0_0_6px_rgba(0,0,0,0.6)]">
        😿 {{ error }}<br />
        <button @click="loadEverything" class="mt-2 px-3 py-1 bg-red-900/40 text-white rounded text-sm hover:bg-red-800/50 font-retro">
          Попробовать снова
        </button>
      </div>

      <div v-else-if="filteredCassettes.length === 0" class="text-center text-gray-500 py-12 drop-shadow-[0_0_6px_rgba(0,0,0,0.6)]">
        Ничего не найдено 😿<br />Попробуй изменить запрос или сбросить фильтры!
      </div>

      <!-- Список кассет -->
      <div v-else>
        <TransitionGroup name="cassette" tag="div" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
              v-for="cassette in filteredCassettes"
              :key="cassette.id"
              @click="openModal(cassette)"
              class="bg-gray-900/50 border border-pink-700/30 rounded-xl p-4 flex flex-col items-center cursor-pointer hover:bg-gray-800/60 transition group"
          >
            <img
                v-if="cassette.frontCoverUrl"
                :src="cassette.frontCoverUrl"
                alt="Обложка кассеты"
                class="w-full h-32 object-contain mb-3 rounded border border-gray-700/40"
                @error="cassette.frontCoverUrl = ''"
            />
            <h3 class="font-bold text-lg text-center text-cyan-200 drop-shadow-[0_0_6px_rgba(0,255,255,0.3)]">
              {{ cassette.title }}
            </h3>
            <p class="text-yellow-200 text-sm drop-shadow-[0_0_4px_rgba(255,255,0,0.3)]">
              {{ cassette.brand }} • {{ cassette.year }}
            </p>
          </button>
        </TransitionGroup>
      </div>

      <div class="mt-10 text-center">
        <NuxtLink
            to="/"
            class="inline-block px-5 py-2.5 bg-cyan-900/30 hover:bg-cyan-800/40 border border-cyan-500/40 rounded font-retro text-cyan-200 drop-shadow-[0_0_6px_rgba(0,255,255,0.3)]"
        >
          &larr; Вернуться к лисичке
        </NuxtLink>
      </div>

      <!-- Модалка -->
      <Teleport v-if="showModal && selectedCassette" to="body">
        <div
            class="fixed inset-0 bg-black/95 flex items-start justify-center z-50 p-4 pt-10"
            @click.self="closeModal"
        >
          <div class="bg-gray-900 border border-cyan-500/30 rounded-xl w-full max-w-2xl shadow-2xl overflow-clip">
            <div class="overflow-auto max-h-[85vh]">
              <div class="sticky top-0 bg-gray-900 z-10 p-5 pb-3 border-b border-cyan-500/20">
                <div class="flex justify-between items-start">
                  <h2 class="text-xl text-cyan-300 font-bold drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]">
                    📼 {{ selectedCassette.title }}
                  </h2>
                  <button @click="closeModal" class="text-gray-400 hover:text-cyan-200 text-2xl font-bold">×</button>
                </div>
                <p class="text-yellow-300 text-center mt-2 text-sm drop-shadow-[0_0_4px_rgba(255,255,0,0.3)]">
                  {{ selectedCassette.brand }} • {{ selectedCassette.year }}
                </p>
              </div>

              <div class="flex justify-center gap-3 py-4">
                <img
                    v-if="selectedCassette.frontCoverUrl"
                    :src="selectedCassette.frontCoverUrl"
                    alt="Front"
                    class="size-44 object-contain border border-cyan-600/40 rounded"
                />
                <img
                    v-if="selectedCassette.backCoverUrl"
                    :src="selectedCassette.backCoverUrl"
                    alt="Back"
                    class="size-44 object-contain border border-purple-600/40 rounded"
                />
              </div>

              <div class="px-5 pb-6 space-y-4">
                <div v-if="selectedCassette.description" class="p-3 rounded border border-gray-700/40 bg-gray-900/40">
                  <h3 class="font-retro text-xs mb-1 text-gray-300">📖 Описание</h3>
                  <p class="text-sm text-gray-200 leading-relaxed" v-html="formattedDescription"></p>
                </div>
                <div v-if="selectedCassette.specs" class="p-3 rounded border border-cyan-600/30 bg-cyan-900/10">
                  <h3 class="font-retro text-xs mb-1 text-cyan-300">📼 Основные характеристики</h3>
                  <p class="text-sm text-cyan-100 leading-relaxed" v-html="formattedSpecs"></p>
                </div>
                <div v-if="selectedCassette.features" class="p-3 rounded border border-yellow-600/30 bg-yellow-900/10">
                  <h3 class="font-retro text-xs mb-1 text-yellow-300">✨ Особенности</h3>
                  <p class="text-sm text-yellow-100 leading-relaxed" v-html="formattedFeatures"></p>
                </div>
                <div v-if="selectedCassette.popularity" class="p-3 rounded border border-pink-600/30 bg-pink-900/10">
                  <h3 class="font-retro text-xs mb-1 text-pink-300">🔥 Почему популярна?</h3>
                  <p class="text-sm text-pink-100 leading-relaxed" v-html="formattedPopularity"></p>
                </div>
                <div v-if="selectedCassette.funFact" class="p-3 rounded border border-green-600/30 bg-green-900/10">
                  <h3 class="font-retro text-xs mb-1 text-green-300">❓ Интересный факт</h3>
                  <p class="text-sm text-green-100 leading-relaxed" v-html="formattedFunFact"></p>
                </div>
                <div v-if="selectedCassette.howToSpotOriginal" class="p-3 rounded border border-purple-600/30 bg-purple-900/10">
                  <h3 class="font-retro text-xs mb-1 text-purple-300">🔍 Как распознать оригинал?</h3>
                  <p class="text-sm text-purple-100 leading-relaxed" v-html="formattedHowToSpot"></p>
                </div>
                <div class="pt-4 text-center text-gray-600 text-xs drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">
                  📼 Коллекция AssunaYuuki • 900 лет в поисках красоты
                </div>
              </div>
            </div>
          </div>
        </div>
      </Teleport>

    </div>
  </div>
</template>

<style scoped>
.font-retro {
  font-family: 'Courier New', monospace;
  letter-spacing: 0.5px;
}

/* Эффект разогрева: плавное усиление насыщенности и свечения */
.saturated {
  --glow-cyan: 0 0 10px rgba(0, 255, 255, 0.6);
  --glow-yellow: 0 0 8px rgba(255, 255, 0, 0.4);
  --glow-pink: 0 0 8px rgba(255, 0, 255, 0.3);
}
.saturated h1,
.saturated h2,
.saturated h3 {
  filter: saturate(1.2);
}
.saturated .text-cyan-200,
.saturated .text-cyan-300 {
  text-shadow: var(--glow-cyan);
}
.saturated .text-yellow-200,
.saturated .text-yellow-300 {
  text-shadow: var(--glow-yellow);
}
.saturated .text-pink-200,
.saturated .text-pink-300 {
  text-shadow: var(--glow-pink);
}

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