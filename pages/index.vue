<script setup lang="ts">
import PlayerBlock from '~/components/PlayerBlock.vue';


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

                <PlayerBlock class="second-bg  md:rounded-2xl p-10 md:mb-10"/>

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

}

.second-bg {
    background-color: rgba(255, 255, 255, .8); 
    clip-path: inset(0px round 10px);
    animation: 10s rotate linear infinite;
    border: 0.5vmin solid;
    --angle: 0deg;
    border-image: conic-gradient(from var(--angle), #1b1641, #3c249c, #832ad0, #47ffbf, #35dece, #2d9abb,#2de2e6,#035ee8,#f6019d,#d40078,#9700cc) 1;
}

@keyframes rotate {
	to {
		--angle: 360deg;
	}
}

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
</style>