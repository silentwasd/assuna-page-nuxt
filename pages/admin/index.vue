<!-- pages/admin/index.vue -->
<script setup lang="ts">
interface Cassette {
  id: number;
  title: string;
  description: string;
  year: number;
  brand: string;
  yearGroup: string; // ← НОВОЕ: "1966", "1970-71"
  frontCoverUrl: string;
  backCoverUrl: string;
  specs: string;
  features: string;
  popularity: string;
  funFact: string;
  howToSpotOriginal: string;
}

const cassettes = ref<Cassette[]>([]);
const currentCassette = ref<Cassette>({
  id: 0,
  title: '',
  description: '',
  year: 1980,
  brand: '',
  yearGroup: '',
  frontCoverUrl: '',
  backCoverUrl: '',
  specs: '',
  features: '',
  popularity: '',
  funFact: '',
  howToSpotOriginal: ''
});
const showForm = ref(false);
const { logout } = useAuth();

const loadCassettes = async () => {
  const { request } = useApi();
  cassettes.value = await request('/admin/cassettes');
};

const saveCassette = async () => {
  const { request } = useApi();
  // Приводим бренд к нижнему регистру
  currentCassette.value.brand = currentCassette.value.brand.toLowerCase().trim();
  if (currentCassette.value.id) {
    await request(`/admin/cassettes/${currentCassette.value.id}`, {
      method: 'PUT',
      body: JSON.stringify(currentCassette.value)
    });
  } else {
    await request('/admin/cassettes', {
      method: 'POST',
      body: JSON.stringify(currentCassette.value)
    });
  }
  resetForm();
  loadCassettes();
};

const editCassette = (cassette: Cassette) => {
  currentCassette.value = { ...cassette };
  showForm.value = true;
};

const deleteCassette = async (id: number) => {
  if (!confirm('Удалить кассету?')) return;
  const { request } = useApi();
  await request(`/admin/cassettes/${id}`, { method: 'DELETE' });
  loadCassettes();
};

const openCreateForm = () => {
  currentCassette.value = {
    id: 0, title: '', description: '', year: 1980, brand: '', yearGroup: '',
    frontCoverUrl: '', backCoverUrl: '',
    specs: '', features: '', popularity: '', funFact: '', howToSpotOriginal: ''
  };
  showForm.value = true;
};

const resetForm = () => {
  showForm.value = false;
  currentCassette.value = {
    id: 0, title: '', description: '', year: 1980, brand: '', yearGroup: '',
    frontCoverUrl: '', backCoverUrl: '',
    specs: '', features: '', popularity: '', funFact: '', howToSpotOriginal: ''
  };
};

onMounted(loadCassettes);
</script>

<template>
  <DecoratorRgbBorder>
    <DecoratorOpacityBackground :opacity="0.85">
      <div class="p-5 md:p-8 font-orbitron text-cyan-300">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl md:text-3xl retro-text">📼 Каталог кассет</h1>
          <button @click="logout" class="px-3 py-1.5 bg-red-900/40 hover:bg-red-800/50 rounded text-sm border border-red-500 font-orbitron">
            Выйти
          </button>
        </div>

        <div class="mb-6">
          <button @click="openCreateForm" class="px-4 py-2 bg-green-900/40 hover:bg-green-800/50 rounded border border-green-500 font-orbitron">
            + Добавить кассету
          </button>
        </div>

        <!-- Форма -->
        <div v-if="showForm" class="mb-8 p-4 bg-black/30 rounded border border-cyan-500">
          <h3 class="mb-3 retro-text">{{ currentCassette.id ? 'Редактировать' : 'Новая кассета' }}</h3>
          <div class="space-y-3">
            <input v-model="currentCassette.title" placeholder="Название" class="w-full p-2 bg-black/50 border border-cyan-500 text-cyan-200" required />
            <input v-model="currentCassette.brand" placeholder="Бренд (tdk, basf...)" class="w-full p-2 bg-black/50 border border-yellow-500 text-yellow-200" required />
            <input v-model="currentCassette.yearGroup" placeholder="Группа по годам (1966 или 1970-71)" class="w-full p-2 bg-black/50 border border-green-500 text-green-200" required />
            <input v-model.number="currentCassette.year" type="number" placeholder="Год выпуска" class="w-full p-2 bg-black/50 border border-pink-500 text-pink-200" />
            <input v-model="currentCassette.frontCoverUrl" placeholder="URL обложки спереди" class="w-full p-2 bg-black/50 border border-cyan-500 text-cyan-200" />
            <input v-model="currentCassette.backCoverUrl" placeholder="URL обложки сзади" class="w-full p-2 bg-black/50 border border-purple-500 text-purple-200" />
            <textarea v-model="currentCassette.description" placeholder="Краткое описание" rows="2" class="w-full p-2 bg-black/50 border border-purple-500 text-purple-200"></textarea>

            <div class="space-y-3 pt-3 border-t border-gray-700">
              <textarea v-model="currentCassette.specs" placeholder="Основные характеристики" rows="2" class="w-full p-2 bg-black/50 border border-cyan-500 text-cyan-200"></textarea>
              <textarea v-model="currentCassette.features" placeholder="Особенности" rows="2" class="w-full p-2 bg-black/50 border border-yellow-500 text-yellow-200"></textarea>
              <textarea v-model="currentCassette.popularity" placeholder="Почему популярна?" rows="2" class="w-full p-2 bg-black/50 border border-pink-500 text-pink-200"></textarea>
              <textarea v-model="currentCassette.funFact" placeholder="Интересный факт" rows="2" class="w-full p-2 bg-black/50 border border-green-500 text-green-200"></textarea>
              <textarea v-model="currentCassette.howToSpotOriginal" placeholder="Как распознать оригинал?" rows="2" class="w-full p-2 bg-black/50 border border-purple-500 text-purple-200"></textarea>
            </div>

            <div class="flex gap-2">
              <button @click="saveCassette" class="px-4 py-2 bg-cyan-900/50 hover:bg-cyan-800/60 rounded font-orbitron">Сохранить</button>
              <button @click="resetForm" class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded font-orbitron">Отмена</button>
            </div>
          </div>
        </div>

        <!-- Список -->
        <div>
          <h3 class="mb-3 text-lg retro-text">Кассеты ({{ cassettes.length }})</h3>
          <div v-if="cassettes.length === 0" class="text-gray-400">Нет кассет</div>
          <div v-else class="space-y-3">
            <div v-for="cassette in cassettes" :key="cassette.id" class="p-3 bg-pink-900/10 border border-pink-700 rounded flex justify-between">
              <div>
                <div class="font-bold retro-text">{{ cassette.title }}</div>
                <div class="text-sm">{{ cassette.brand }} / {{ cassette.yearGroup }}</div>
              </div>
              <div class="flex gap-2">
                <button @click="editCassette(cassette)" class="text-blue-300">✏️</button>
                <button @click="deleteCassette(cassette.id)" class="text-red-400">🗑️</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DecoratorOpacityBackground>
  </DecoratorRgbBorder>
</template>