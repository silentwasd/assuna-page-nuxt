// composables/useAuth.ts
export const useAuth = () => {
    // Токен хранится в secure cookie (только HTTPS)
    const token = useCookie('auth_token', {
        httpOnly: false, // нужно для клиентского доступа
        secure: process.env.NODE_ENV === 'production', // только HTTPS в продакшене
        maxAge: 7 * 24 * 60 * 60, // 7 дней
        sameSite: 'lax'
    });

    const login = async (email: string, password: string) => {
        try {
            const data = await $fetch<{ token: string }>('https://back.assunayuuki.ru/admin/login', {
                method: 'POST',
                body: { email, password }
            });
            token.value = data.token;
        } catch (e: any) {
            throw new Error(e.data?.error || 'Не удалось войти');
        }
    };

    const logout = () => {
        token.value = null;
        navigateTo('/admin/login', { replace: true });
    };

    const isAuthenticated = computed(() => !!token.value);

    return {
        login,
        logout,
        isAuthenticated,
        token
    };
};