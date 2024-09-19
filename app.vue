<script setup lang="ts">

</script>

<template>
    <div class="overflow-hidden relative w-dvh h-dvh">


        <BackgroundFixed class="bg-fuchsia-300"/>
        <BackgroundVhsScanLines/>
        <BackgroundOldTv/>

        <ScrollbarSolidPink/>

        <div class="overflow-auto w-full h-full">
            <div class="container mx-auto max-w-4xl flex flex-col gap-5 md:gap-10 px-2.5 py-2.5 md:px-0 md:py-10">
                <BlockNavigator class="z-10"/>

                <BlockSwitchLanguage class="z-10"/>

                <NuxtPage/>
            </div>
        </div>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Amaranth:ital,wght@0,400;0,700;1,400;1,700&family=Caveat:wght@400..700&family=Dela+Gothic+One&display=swap&family=Oswald:wght@200..700&display=swap&family=Josefin+Sans:ital,wght@0,100..700;1,100..700');

.font-amaranth {
    font-family: 'Amaranth', serif;
}

.font-caveat {
    font-family: 'Caveat', sans-serif;
}

.font-gothic {
    font-family: 'Dela Gothic One', serif;
}

.font-oswald {
    font-family: 'Oswald', sans-serif;
}

.font-josefin {
    font-family: 'Josefin Sans', sans-serif;
}
</style>