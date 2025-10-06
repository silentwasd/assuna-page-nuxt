<!-- pages/cassettes/[brand]/[yearGroup].vue -->
<script setup lang="ts">
const route = useRoute();
const brand = route.params.brand as string;
const yearGroup = route.params.yearGroup as string;
const cassettes = ref<any[]>([]);

onMounted(async () => {
  try {
    const data = await $fetch('https://back.assunayuuki.ru/cassettes/by-brand-year', {
      query: { brand, yearGroup }
    });
    cassettes.value = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Не удалось загрузить кассеты:', err);
  }
});
</script>

<template>
  <DecoratorRgbBorder>
    <DecoratorOpacityBackground :opacity="0.85">
      <div class="p-4 md:p-8 font-orbitron text-black max-w-4xl mx-auto">

        <h1 class="text-2xl retro-text mb-6 text-gray-900 drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">
          📼 {{ brand.toUpperCase() }} {{ yearGroup }}
        </h1>

        <div v-if="cassettes.length === 0" class="text-gray-600 py-12">
          Кассеты этого периода скоро появятся! Фыр-фыр! 🦊
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="cassette in cassettes" :key="cassette.id" class="bg-black/30 p-4 rounded border border-cyan-500">
            <img v-if="cassette.frontCoverUrl" :src="cassette.frontCoverUrl" class="w-full h-32 object-contain mb-2" />
            <div class="font-bold">{{ cassette.title }}</div>
            <div>Год: {{ cassette.year }}</div>
            <div>Тип: {{ cassette.description }}</div>
          </div>
        </div>

        <div class="mt-8 text-center">
          <NuxtLink :to="`/cassettes/${brand}`" class="text-cyan-900 hover:text-cyan-700">
            &larr; Назад к {{ brand.toUpperCase() }}
          </NuxtLink>
        </div>

      </div>
    </DecoratorOpacityBackground>
  </DecoratorRgbBorder>
</template>