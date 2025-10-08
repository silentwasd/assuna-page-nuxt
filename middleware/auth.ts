// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('auth_token');

    if (!token.value) {
        // Перенаправляем на логин с параметром redirect
        return navigateTo('/admin/login?redirect=' + encodeURIComponent(to.fullPath), {
            replace: true
        });
    }
});