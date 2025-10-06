// composables/useAuth.ts
export default function () {
    const token = useCookie('auth_token')

    const login = async (email: string, password: string) => {
        try {
            const data = await $fetch<any>('https://back.assunayuuki.ru/admin/login', {
                method: 'POST',
                body: {email, password}
            })

            token.value = data.token;
        } catch (e: any) {
            throw new Error(e.message || 'Login failed');
        }
    }

    const logout = () => {
        token.value = null
        navigateTo('/')
    }

    const checkAuth = () => !!token.value

    return {login, logout, checkAuth, token}
}