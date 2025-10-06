<!-- pages/admin/login.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { navigateTo } from '#imports'
import { useAuth } from '~/composables/useAuth'

const email = ref('admin@assunayuuki.ru')
const password = ref('')
const loading = ref(false)
const error = ref('')
const { login } = useAuth()

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    await login(email.value, password.value)
    await navigateTo('/admin')
  } catch (err: any) {
    error.value = err.message || 'Ошибка входа'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <DecoratorRgbBorder>
    <DecoratorOpacityBackground :opacity="0.85">
      <div class="p-6 font-orbitron text-cyan-300 max-w-md mx-auto">
        <h2 class="text-2xl mb-6 retro-text">Вход в админку</h2>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <input
              v-model="email"
              type="email"
              placeholder="Email"
              required
              class="w-full p-3 bg-black/50 border border-cyan-500 rounded font-mono text-cyan-200"
          />
          <input
              v-model="password"
              type="password"
              placeholder="Пароль"
              required
              class="w-full p-3 bg-black/50 border border-pink-500 rounded font-mono text-pink-200"
          />
          <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 bg-pink-900 hover:bg-pink-800 rounded font-orbitron"
          >
            {{ loading ? '...' : 'Войти' }}
          </button>
          <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
        </form>
      </div>
    </DecoratorOpacityBackground>
  </DecoratorRgbBorder>
</template>