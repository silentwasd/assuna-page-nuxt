<script setup lang="ts">
const { request } = useApi();
const brands = ref<string[]>([]);

onMounted(async () => {
  const data = await request('/admin/cassettes/brands');
  brands.value = data;
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl mb-4">Каталог кассет — Производители</h1>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <NuxtLink
          v-for="brand in brands"
          :key="brand"
          :to="`/admin/catalog/${brand}`"
          class="p-3 bg-gray-800 hover:bg-gray-700 rounded border border-cyan-500 text-center"
      >
        {{ brand }}
      </NuxtLink>
    </div>
    <NuxtLink to="/admin/cassettes/create" class="mt-4 block text-green-400">+ Добавить кассету</NuxtLink>
  </div>
</template>