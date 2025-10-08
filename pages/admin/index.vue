<!-- pages/admin/index.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useApi } from '@/composables/useApi';

definePageMeta({
  middleware: 'auth'
});

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
const currentCassette = ref<Cassette>({
  id: 0,
  title: '',
  description: '',
  year: 1980,
  brand: '',
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
  if (!confirm('Удалить кассету? Это действие нельзя отменить.')) return;
  const { request } = useApi();
  await request(`/admin/cassettes/${id}`, { method: 'DELETE' });
  loadCassettes();
};

const openCreateForm = () => {
  currentCassette.value = {
    id: 0,
    title: '',
    description: '',
    year: 1980,
    brand: '',
    frontCoverUrl: '',
    backCoverUrl: '',
    specs: '',
    features: '',
    popularity: '',
    funFact: '',
    howToSpotOriginal: ''
  };
  showForm.value = true;
};

const resetForm = () => {
  showForm.value = false;
  currentCassette.value = {
    id: 0,
    title: '',
    description: '',
    year: 1980,
    brand: '',
    frontCoverUrl: '',
    backCoverUrl: '',
    specs: '',
    features: '',
    popularity: '',
    funFact: '',
    howToSpotOriginal: ''
  };
};

onMounted(loadCassettes);
</script>

<template>
  <DecoratorRgbBorder>
    <DecoratorOpacityBackground :opacity="0.9">
      <div class="p-4 md:p-6 font-sans text-gray-100 min-h-screen">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl md:text-3xl font-orbitron text-cyan-300 retro-text">📼 Каталог кассет</h1>
          <button
              @click="logout"
              class="px-4 py-2 bg-red-900/60 hover:bg-red-800/70 rounded-md text-sm font-orbitron border border-red-600 transition"
          >
            Выйти
          </button>
        </div>

        <!-- Create Button -->
        <div class="mb-8">
          <button
              @click="openCreateForm"
              class="px-5 py-2.5 bg-emerald-900/60 hover:bg-emerald-800/70 rounded-md font-orbitron border border-emerald-500 transition"
          >
            + Добавить кассету
          </button>
        </div>

        <!-- Form -->
        <div v-if="showForm" class="mb-10 p-5 bg-gray-900/70 rounded-lg border border-cyan-700/50">
          <h2 class="text-xl font-orbitron mb-4 text-cyan-200">
            {{ currentCassette.id ? 'Редактировать кассету' : 'Новая кассета' }}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div class="md:col-span-2">
              <input
                  v-model="currentCassette.title"
                  type="text"
                  placeholder="Название (например: TDK SA 90)"
                  class="w-full p-3 bg-gray-800/80 border border-cyan-600 rounded text-cyan-100 placeholder:text-cyan-500/60 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  required
              />
            </div>

            <input
                v-model="currentCassette.brand"
                type="text"
                placeholder="Производитель (Sony, BASF, TDK...)"
                class="w-full p-3 bg-gray-800/80 border border-yellow-600 rounded text-yellow-100 placeholder:text-yellow-500/60 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                required
            />

            <input
                v-model.number="currentCassette.year"
                type="number"
                min="1960"
                max="2030"
                placeholder="Год выпуска"
                class="w-full p-3 bg-gray-800/80 border border-pink-600 rounded text-pink-100 placeholder:text-pink-500/60 focus:outline-none focus:ring-1 focus:ring-pink-500"
            />

            <div class="md:col-span-2">
              <input
                  v-model="currentCassette.frontCoverUrl"
                  type="url"
                  placeholder="URL обложки спереди (https://...)"
                  class="w-full p-3 bg-gray-800/80 border border-cyan-600 rounded text-cyan-100 placeholder:text-cyan-500/60 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div class="md:col-span-2">
              <input
                  v-model="currentCassette.backCoverUrl"
                  type="url"
                  placeholder="URL обложки сзади (https://...)"
                  class="w-full p-3 bg-gray-800/80 border border-purple-600 rounded text-purple-100 placeholder:text-purple-500/60 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div class="md:col-span-2">
              <textarea
                  v-model="currentCassette.description"
                  rows="3"
                  placeholder="Краткое описание (тип ленты, страна...)"
                  class="w-full p-3 bg-gray-800/80 border border-purple-600 rounded text-purple-100 placeholder:text-purple-500/60 focus:outline-none focus:ring-1 focus:ring-purple-500"
              ></textarea>
            </div>
          </div>

          <!-- Дополнительная информация -->
          <div class="pt-4 border-t border-gray-700">
            <h3 class="text-lg font-orbitron mb-3 text-cyan-300">Дополнительная информация</h3>

            <div class="space-y-4">
              <textarea
                  v-model="currentCassette.specs"
                  rows="3"
                  placeholder="Основные характеристики (тип ленты, уровень шума...)"
                  class="w-full p-3 bg-gray-800/80 border border-cyan-600 rounded text-cyan-100 placeholder:text-cyan-500/60 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              ></textarea>

              <textarea
                  v-model="currentCassette.features"
                  rows="3"
                  placeholder="Особенности (уникальная формула ленты...)"
                  class="w-full p-3 bg-gray-800/80 border border-yellow-600 rounded text-yellow-100 placeholder:text-yellow-500/60 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              ></textarea>

              <textarea
                  v-model="currentCassette.popularity"
                  rows="3"
                  placeholder="Почему популярна? (пример: «Использовалась в студиях...»)"
                  class="w-full p-3 bg-gray-800/80 border border-pink-600 rounded text-pink-100 placeholder:text-pink-500/60 focus:outline-none focus:ring-1 focus:ring-pink-500"
              ></textarea>

              <textarea
                  v-model="currentCassette.funFact"
                  rows="3"
                  placeholder="Интересный факт (например: «Олимпиада-88»)"
                  class="w-full p-3 bg-gray-800/80 border border-emerald-600 rounded text-emerald-100 placeholder:text-emerald-500/60 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              ></textarea>

              <textarea
                  v-model="currentCassette.howToSpotOriginal"
                  rows="3"
                  placeholder="Как распознать оригинал? (голографический стикер...)"
                  class="w-full p-3 bg-gray-800/80 border border-purple-600 rounded text-purple-100 placeholder:text-purple-500/60 focus:outline-none focus:ring-1 focus:ring-purple-500"
              ></textarea>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="mt-5 flex gap-3">
            <button
                @click="saveCassette"
                class="px-5 py-2.5 bg-cyan-900/70 hover:bg-cyan-800/80 rounded font-orbitron border border-cyan-500 transition"
            >
              Сохранить
            </button>
            <button
                @click="resetForm"
                class="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 rounded font-orbitron transition"
            >
              Отмена
            </button>
          </div>
        </div>

        <!-- Cassette List -->
        <div>
          <h2 class="text-xl font-orbitron mb-4 text-cyan-300">Кассеты ({{ cassettes.length }})</h2>

          <div v-if="cassettes.length === 0" class="text-gray-400 italic py-4">
            Пока нет ни одной кассеты. Добавьте первую!
          </div>

          <div v-else class="space-y-4">
            <div
                v-for="cassette in cassettes"
                :key="cassette.id"
                class="p-4 bg-gray-900/50 rounded border border-gray-700 flex flex-col md:flex-row justify-between items-start gap-4"
            >
              <div class="flex gap-4">
                <div class="flex flex-col gap-2">
                  <img
                      v-if="cassette.frontCoverUrl"
                      :src="cassette.frontCoverUrl"
                      alt="Спереди"
                      class="w-16 h-16 object-cover rounded border border-cyan-600/50"
                      @error="cassette.frontCoverUrl = ''"
                  />
                  <img
                      v-if="cassette.backCoverUrl"
                      :src="cassette.backCoverUrl"
                      alt="Сзади"
                      class="w-16 h-16 object-cover rounded border border-purple-600/50"
                      @error="cassette.backCoverUrl = ''"
                  />
                </div>
                <div>
                  <h3 class="font-orbitron text-lg text-cyan-200">{{ cassette.title }}</h3>
                  <p class="text-sm text-yellow-300">{{ cassette.brand }} • {{ cassette.year }}</p>
                  <p v-if="cassette.description" class="mt-1 text-gray-300 text-sm max-w-md line-clamp-2">
                    {{ cassette.description }}
                  </p>
                </div>
              </div>

              <div class="flex gap-2">
                <button
                    @click="editCassette(cassette)"
                    class="p-2 text-blue-400 hover:text-blue-200 hover:bg-blue-900/30 rounded transition"
                    title="Редактировать"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                    @click="deleteCassette(cassette.id)"
                    class="p-2 text-red-400 hover:text-red-200 hover:bg-red-900/30 rounded transition"
                    title="Удалить"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DecoratorOpacityBackground>
  </DecoratorRgbBorder>
</template>