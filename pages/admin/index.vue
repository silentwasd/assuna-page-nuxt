<!-- pages/admin/index.vue -->
<script setup lang="ts">
// definePageMeta({ middleware: 'auth' });

interface Cassette {
  id: number;
  title: string;
  description: string;
  year: number;
  brand: string;
  frontCoverUrl: string;
  backCoverUrl: string;
}

const cassettes = ref<Cassette[]>([]);
const currentCassette = ref<Cassette>({
  id: 0,
  title: '',
  description: '',
  year: 1980,
  brand: '',
  frontCoverUrl: '',
  backCoverUrl: ''
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
    backCoverUrl: ''
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
    backCoverUrl: ''
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
          <button
              @click="logout"
              class="px-3 py-1.5 bg-red-900/40 hover:bg-red-800/50 rounded text-sm border border-red-500 font-orbitron"
          >
            Выйти
          </button>
        </div>

        <div class="mb-6">
          <button
              @click="openCreateForm"
              class="px-4 py-2 bg-green-900/40 hover:bg-green-800/50 rounded border border-green-500 font-orbitron"
          >
            + Добавить кассету
          </button>
        </div>

        <!-- Форма добавления/редактирования -->
        <div v-if="showForm" class="mb-8 p-4 bg-black/30 rounded border border-cyan-500">
          <h3 class="mb-3 retro-text">
            {{ currentCassette.id ? 'Редактировать кассету' : 'Новая кассета' }}
          </h3>
          <div class="space-y-3">
            <input
                v-model="currentCassette.title"
                placeholder="Название (например: TDK SA 90)"
                class="w-full p-2 bg-black/50 border border-cyan-500 text-cyan-200 placeholder:text-cyan-500/50"
                required
            />
            <input
                v-model="currentCassette.brand"
                placeholder="Производитель (Sony, BASF, TDK...)"
                class="w-full p-2 bg-black/50 border border-yellow-500 text-yellow-200 placeholder:text-yellow-500/50"
                required
            />
            <input
                v-model.number="currentCassette.year"
                type="number"
                min="1960"
                max="2030"
                placeholder="Год выпуска"
                class="w-full p-2 bg-black/50 border border-pink-500 text-pink-200 placeholder:text-pink-500/50"
            />
            <input
                v-model="currentCassette.frontCoverUrl"
                placeholder="URL обложки спереди (https://...)"
                class="w-full p-2 bg-black/50 border border-cyan-500 text-cyan-200 placeholder:text-cyan-500/50"
            />
            <input
                v-model="currentCassette.backCoverUrl"
                placeholder="URL обложки сзади (https://...)"
                class="w-full p-2 bg-black/50 border border-purple-500 text-purple-200 placeholder:text-purple-500/50"
            />
            <textarea
                v-model="currentCassette.description"
                placeholder="Описание (тип ленты, особенности, страна...)"
                rows="3"
                class="w-full p-2 bg-black/50 border border-purple-500 text-purple-200 placeholder:text-purple-500/50"
            ></textarea>
            <div class="flex gap-2">
              <button @click="saveCassette" class="px-4 py-2 bg-cyan-900/50 hover:bg-cyan-800/60 rounded font-orbitron">
                Сохранить
              </button>
              <button @click="resetForm" class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded font-orbitron">
                Отмена
              </button>
            </div>
          </div>
        </div>

        <!-- Список кассет -->
        <div>
          <h3 class="mb-3 text-lg retro-text">Кассеты ({{ cassettes.length }})</h3>
          <div v-if="cassettes.length === 0" class="text-gray-400 italic">Пока нет ни одной кассеты. Добавь первую! 🦊</div>
          <div v-else class="space-y-4">
            <div
                v-for="cassette in cassettes"
                :key="cassette.id"
                class="p-4 bg-pink-900/10 border border-pink-700 rounded flex flex-col md:flex-row justify-between gap-4 items-start"
            >
              <div class="flex gap-4 items-start">
                <!-- Две миниатюры -->
                <div class="flex flex-col gap-1">
                  <img
                      v-if="cassette.frontCoverUrl"
                      :src="cassette.frontCoverUrl"
                      alt="Обложка спереди"
                      class="w-14 h-14 object-cover rounded border border-cyan-600"
                      @error="cassette.frontCoverUrl = ''"
                  />
                  <img
                      v-if="cassette.backCoverUrl"
                      :src="cassette.backCoverUrl"
                      alt="Обложка сзади"
                      class="w-14 h-14 object-cover rounded border border-purple-600"
                      @error="cassette.backCoverUrl = ''"
                  />
                </div>
                <div>
                  <div class="font-bold retro-text text-lg">{{ cassette.title }}</div>
                  <div class="text-sm text-yellow-300">{{ cassette.brand }} • {{ cassette.year }}</div>
                  <div v-if="cassette.description" class="text-xs mt-1 text-gray-300 max-w-md line-clamp-2">
                    {{ cassette.description }}
                  </div>
                </div>
              </div>
              <div class="flex gap-2 self-start md:self-center">
                <button
                    @click="editCassette(cassette)"
                    class="text-blue-300 hover:text-blue-100 text-lg"
                    title="Редактировать"
                >
                  ✏️
                </button>
                <button
                    @click="deleteCassette(cassette.id)"
                    class="text-red-400 hover:text-red-200 text-lg"
                    title="Удалить"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DecoratorOpacityBackground>
  </DecoratorRgbBorder>
</template>