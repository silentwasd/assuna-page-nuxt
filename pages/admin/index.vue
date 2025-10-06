<!-- pages/admin/index.vue -->
<script setup lang="ts">
definePageMeta({ middleware: 'auth' });

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const products = ref<Product[]>([]);
const currentProduct = ref<Product>({ id: 0, name: '', price: 0, description: '' });
const isEditing = ref(false);
const showForm = ref(false);
const { logout } = useAuth();

const loadProducts = async () => {
  const { request } = useApi();
  products.value = await request('/admin/products');
};

const saveProduct = async () => {
  const { request } = useApi();
  if (isEditing.value) {
    await request(`/admin/products/${currentProduct.value.id}`, {
      method: 'PUT',
      body: JSON.stringify(currentProduct.value)
    });
  } else {
    await request('/admin/products', {
      method: 'POST',
      body: JSON.stringify(currentProduct.value)
    });
  }
  showForm.value = false;
  isEditing.value = false;
  currentProduct.value = { id: 0, name: '', price: 0, description: '' };
  loadProducts();
};

const editProduct = (product: Product) => {
  currentProduct.value = { ...product };
  isEditing.value = true;
  showForm.value = true;
};

const deleteProduct = async (id: number) => {
  if (!confirm('Удалить?')) return;
  const { request } = useApi();
  await request(`/admin/products/${id}`, { method: 'DELETE' });
  loadProducts();
};

const openCreateForm = () => {
  currentProduct.value = { id: 0, name: '', price: 0, description: '' };
  isEditing.value = false;
  showForm.value = true;
};

onMounted(loadProducts);
</script>

<template>
  <DecoratorRgbBorder>
    <DecoratorOpacityBackground :opacity="0.85">
      <div class="p-5 md:p-8 font-orbitron text-cyan-300">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl md:text-3xl retro-text">Админ-панель</h1>
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
              class="px-4 py-2 bg-green-900/40 hover:bg-green-800/50 rounded border border-green-500"
          >
            + Добавить товар
          </button>
        </div>

        <div v-if="showForm" class="mb-8 p-4 bg-black/30 rounded border border-cyan-500">
          <h3 class="mb-3">{{ isEditing ? 'Редактировать' : 'Новый товар' }}</h3>
          <div class="space-y-3">
            <input v-model="currentProduct.name" placeholder="Название" class="w-full p-2 bg-black/50 border border-cyan-500 text-cyan-200" />
            <input v-model.number="currentProduct.price" type="number" placeholder="Цена" class="w-full p-2 bg-black/50 border border-pink-500 text-pink-200" />
            <textarea v-model="currentProduct.description" placeholder="Описание" rows="3" class="w-full p-2 bg-black/50 border border-purple-500 text-purple-200"></textarea>
            <div class="flex gap-2">
              <button @click="saveProduct" class="px-3 py-1.5 bg-cyan-900/40 rounded">Сохранить</button>
              <button @click="showForm = false" class="px-3 py-1.5 bg-gray-800 rounded">Отмена</button>
            </div>
          </div>
        </div>

        <div>
          <h3 class="mb-3 text-lg">Товары ({{ products.length }})</h3>
          <div v-if="products.length === 0" class="text-gray-400">Нет товаров</div>
          <div v-else class="space-y-3">
            <div v-for="product in products" :key="product.id" class="p-3 bg-pink-900/10 border border-pink-700 rounded flex justify-between items-start">
              <div>
                <div class="font-bold retro-text">{{ product.name }}</div>
                <div class="text-sm">$ {{ product.price }}</div>
                <div class="text-xs mt-1 text-gray-300">{{ product.description }}</div>
              </div>
              <div class="flex gap-2">
                <button @click="editProduct(product)" class="text-blue-300 hover:text-blue-100 text-sm">✏️</button>
                <button @click="deleteProduct(product.id)" class="text-red-400 hover:text-red-200 text-sm">🗑️</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DecoratorOpacityBackground>
  </DecoratorRgbBorder>
</template>