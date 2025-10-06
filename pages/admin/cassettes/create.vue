<script setup lang="ts">
const newCassette = reactive({
  title: '',
  description: '',
  year: 1980,
  brand: '',
  coverImageUrl: ''
});

const { request } = useApi();
const router = useRouter();

const save = async () => {
  await request('/admin/cassettes', {
    method: 'POST',
    body: JSON.stringify(newCassette)
  });
  await router.push('/admin/catalog');
};
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-2xl mb-4">Добавить кассету</h1>
    <form @submit.prevent="save" class="space-y-4">
      <input v-model="newCassette.title" placeholder="Название" required class="w-full p-2 bg-gray-800 rounded" />
      <textarea v-model="newCassette.description" placeholder="Описание" class="w-full p-2 bg-gray-800 rounded"></textarea>
      <input v-model.number="newCassette.year" type="number" placeholder="Год" min="1960" max="2030" class="w-full p-2 bg-gray-800 rounded" />
      <input v-model="newCassette.brand" placeholder="Производитель (например: Sony, TDK)" required class="w-full p-2 bg-gray-800 rounded" />
      <input v-model="newCassette.coverImageUrl" placeholder="URL обложки" class="w-full p-2 bg-gray-800 rounded" />
      <div class="flex gap-2">
        <button type="submit" class="px-4 py-2 bg-green-700 rounded">Сохранить</button>
        <button type="button" @click="$router.back()" class="px-4 py-2 bg-gray-700 rounded">Отмена</button>
      </div>
    </form>
  </div>
</template>