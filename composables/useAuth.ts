// composables/useAuth.ts
export const useAuth = () => {
    const token = useCookie('auth_token');

    const login = async (email: string, password: string) => {
        const res = await fetch('https://back.assunayuuki.ru/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Login failed');
        token.value = data.token;
    };

    const logout = () => {
        token.value = null;
        navigateTo('/');
    };

    const checkAuth = () => !!token.value;

    return { login, logout, checkAuth, token };
};