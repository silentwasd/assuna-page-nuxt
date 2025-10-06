<!-- pages/cassettes/[id].vue -->
<script setup lang="ts">
interface Cassette {
  id: number;
  title: string;
  description: string;
  year: number;
  brand: string;
  frontCoverUrl: string;
  backCoverUrl: string;
}

const route = useRoute();
const cassette = ref<Cassette | null>(null);
const loading = ref(true);

onMounted(async () => {
  try {
    // Запрос к бэкенду за одной кассетой
    const data = await $fetch(`https://back.assunayuuki.ru/cassettes/${route.params.id}`);
    cassette.value = data;
  } catch (err) {
    console.error('Кассета не найдена:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <DecoratorRgbBorder>
    <DecoratorOpacityBackground :opacity="0.85">
      <div class="p-4 md:p-8 font-orbitron text-black max-w-3xl mx-auto">
        <NuxtLink to="/cassettes" class="inline-block mb-6 text-cyan-900 hover:text-cyan-700 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
          &larr; Назад к коллекции
        </NuxtLink>

        <div v-if="loading" class="text-center py-12 text-gray-600">Загрузка... 🦊</div>

        <div v-else-if="!cassette" class="text-center py-12 text-red-500">
          Кассета не найдена 😿
        </div>

        <div v-else class="space-y-6">
          <h1 class="text-2xl md:text-3xl retro-text text-gray-900 drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] text-center">
            {{ cassette.title }}
          </h1>

          <div class="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <!-- Обложки -->
            <div class="flex flex-col gap-4">
              <div v-if="cassette.frontCoverUrl" class="border border-cyan-500/50 rounded-lg overflow-hidden">
                <img :src="cassette.frontCoverUrl" alt="Обложка спереди" class="w-full max-w-[200px] object-contain" />
                <div class="text-center text-sm text-cyan-800 mt-1">Спереди</div>
              </div>
              <div v-if="cassette.backCoverUrl" class="border border-purple-500/50 rounded-lg overflow-hidden">
                <img :src="cassette.backCoverUrl" alt="Обложка сзади" class="w-full max-w-[200px] object-contain" />
                <div class="text-center text-sm text-purple-800 mt-1">Сзади</div>
              </div>
            </div>

            <!-- Информация -->
            <div class="flex-1 bg-black/30 p-5 rounded-lg border border-pink-700/50">
              <p class="text-yellow-900 text-lg drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                {{ cassette.brand }} • {{ cassette.year }}
              </p>
              <p v-if="cassette.description" class="mt-4 text-gray-800 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)] leading-relaxed">
                {{ cassette.description }}
              </p>
              <p v-else class="mt-4 text-gray-600 italic">Описание отсутствует.</p>
            </div>
          </div>

          <div class="text-center text-gray-700 text-sm mt-6">
            📼 Коллекция AssunaYuuki • 900 лет в поисках красоты
          </div>
        </div>
      </div>
    </DecoratorOpacityBackground>
  </DecoratorRgbBorder>
</template>