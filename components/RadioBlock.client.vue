<script setup lang="ts">
import {useTranslate} from "~/composables/translate";

const {t} = useTranslate();
</script>

<template>
    <div>
        <h1 class="text-4xl text-center title2 mb-6">{{ t('radio_title') }}</h1>

        <RadioPlayer/>
    </div>
</template>

<style scoped>
.title2 {
    font-family: 'Dela Gothic One', serif;
}
</style>