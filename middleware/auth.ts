// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('auth_token');

    if (!token.value) {
        // Перенаправляем на логин с сообщением
        return navigateTo('/admin/login?redirect=' + encodeURIComponent(to.path), {
            replace: true
        });
    }
});