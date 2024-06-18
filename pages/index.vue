<script setup lang="ts">

</script>

<template>
    <div class="overflow-hidden relative w-dvh h-dvh">
        <Head>
            <title>Главная</title>
        </Head>

        <div class="bg bg-fuchsia-300 w-dvw h-dvh fixed -z-10"></div>

        <div class="overflow-auto w-full h-full">
            <div class="container mx-auto max-w-4xl">
                <LangBlock class="second-bg md:rounded-2xl p-10 md:my-10"/>

                <HelloBlock class="second-bg md:rounded-2xl p-10 md:my-10"/>

                <RadioBlock class="second-bg md:rounded-2xl p-10 md:my-10"/>

                <SocialBlock class="second-bg md:rounded-2xl p-10 md:mb-10"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Amaranth:ital,wght@0,400;0,700;1,400;1,700&family=Caveat:wght@400..700&family=Dela+Gothic+One&display=swap&family=Oswald:wght@200..700&display=swap&family=Josefin+Sans:ital,wght@0,100..700;1,100..700');

.bg {
    background-image: url(/img/neon_retrowave.jpg);
    background-position: center;
    background-size: cover;

    animation-composition: add;

    animation: 1s linear 0s infinite alternate ping-pong,
    2s linear 0s infinite alternate rotate,
    1s linear 0s infinite alternate-reverse zoom;
}

.second-bg {
    background-color: rgba(255, 255, 255, .8);
}

@keyframes ping-pong {
    0% {
        filter: brightness(50%) hue-rotate(-360deg);
    }

    100% {
        filter: brightness(100%) hue-rotate(360deg);
    }
}

@keyframes rotate {
    0% {
        transform: rotate(-5deg);
    }

    50% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(5deg);
    }
}

@keyframes zoom {
    0% {
        transform: scale(100%);
    }

    100% {
        transform: scale(150%);
    }
}
</style>