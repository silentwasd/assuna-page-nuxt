// composables/useApi.ts
export const useApi = () => {
    const token = useCookie('auth_token');

    const request = async (url: string, options: RequestInit = {}) => {
        const headers = new Headers(options.headers || {});
        if (token.value) {
            headers.set('Authorization', `Bearer ${token.value}`);
        }
        headers.set('Content-Type', 'application/json');

        // 🔥 УБРАЛ ПРОБЕЛЫ В КОНЦЕ!
        const res = await fetch('https://back.assunayuuki.ru' + url, {
            ...options,
            headers
        });

        if (res.status === 401) {
            token.value = null;
            navigateTo('/admin/login');
            throw new Error('Сессия истекла');
        }

        if (!res.ok) {
            const error = await res.json().catch(() => ({ message: 'Ошибка сервера' }));
            throw new Error(error.message || 'Запрос не удался');
        }

        return res.json();
    };

    return { request };
};