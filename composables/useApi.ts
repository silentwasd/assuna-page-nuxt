// composables/useApi.ts
const API_BASE = 'https://back.assunayuuki.ru';

export const useApi = () => {
    const token = useCookie('auth_token');

    const request = async (url: string, options: RequestInit = {}) => {
        const headers = new Headers(options.headers || {});
        if (token.value) {
            headers.set('Authorization', `Bearer ${token.value}`);
        }
        headers.set('Content-Type', 'application/json');

        const res = await fetch(`${API_BASE}${url}`, {
            ...options,
            headers
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({ message: 'Server error' }));
            throw new Error(error.message || 'Request failed');
        }

        return res.json();
    };

    return { request };
};