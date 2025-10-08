// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('auth_token');

    if (!token.value) {
        return navigateTo('/admin/login');
    }
});