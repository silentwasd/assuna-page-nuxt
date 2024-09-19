<script setup lang="ts">


const links = [
    {
        label: 'Главная',
        icon: 'fa-solid:sitemap',
        to: '/'
    }, {
        label: 'Музыкальный Архив',
        icon: 'f7:recordingtape',
        to: 'music'
    }, {
        label: 'Видео Архив',
        icon: 'game-icons:vhs',
        to: 'video_archive'

    }
];

const navUi = {
    base: 'text-xl px-5 py-5',
    active: 'text-gray-200 hover:text-gray-900',
    inactive: 'text-gray-400',
    icon: {
        active: 'text-gray-200 group-hover:text-gray-900',
        inactive: 'text-gray-400'
    }
};
</script>

<template>

    <UCard data-v-97726952 class="flex items-center justify-center rounded-xl bg-gray-900/50 ring-gray-500/50 rgb-border">

        <UHorizontalNavigation :links="links" :ui="navUi"/>

    </UCard>



</template>

