<script setup lang="ts">
const route = useRoute();
const brand = route.params.brand as string;
const { request } = useApi();
const cassettes = ref<any[]>([]);

onMounted(async () => {
  cassettes.value = await request(`/admin/cassettes/brand/${encodeURIComponent(brand)}`);
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl mb-4">Кассеты: {{ brand }}</h1>
    <div v-if="cassettes.length === 0" class="text-gray-400">Нет кассет</div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="cassette in cassettes" :key="cassette.id" class="border border-gray-700 rounded p-4">
        <img
            v-if="cassette.coverImageUrl"
            :src="cassette.coverImageUrl"
            class="w-full h-40 object-cover rounded mb-2"
            alt="Обложка"
        />
        <h3 class="font-bold">{{ cassette.title }}</h3>
        <p class="text-sm text-gray-300">{{ cassette.description }}</p>
        <p class="text-xs text-gray-500">Год: {{ cassette.year }}</p>
      </div>
    </div>
    <NuxtLink to="/admin/catalog" class="mt-4 inline-block text-cyan-400">&larr; Назад к брендам</NuxtLink>
  </div>
</template>