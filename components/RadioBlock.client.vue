<script setup lang="ts">
import rPlayer from '@davland7/rplayer';

const audio    = ref<rPlayer>();
const canvas   = ref<HTMLCanvasElement | null>();
const played   = ref<boolean>(false);
const analyzer = ref<any>(null);

onMounted(() => {
    audio.value = new rPlayer();
});

function play() {
    if (!analyzer.value) {
        const context  = new AudioContext();
        const source   = context.createMediaElementSource(audio.value);
        analyzer.value = context.createAnalyser();

        source.connect(analyzer.value);
        analyzer.value.connect(context.destination);

        analyzer.value.fftSize = 256;

        if (!canvas.value)
            return;

        const rect = canvas.value.getBoundingClientRect();

        canvas.value.width  = rect.width * devicePixelRatio;
        canvas.value.height = rect.height * devicePixelRatio;

        canvas.value.getContext('2d').scale(devicePixelRatio, devicePixelRatio);

        canvas.value.style.width  = rect.width + 'px';
        canvas.value.style.height = rect.height + 'px';
    }

    if (audio.value.playing) {
        audio.value.stop();
        played.value = false;
    } else {
        audio.value.playSrc('https://stream.nightride.fm:8443/nightride/nightride.m3u8');
        played.value = true;
        renderFrame();
    }
}

function renderFrame() {
    if (played.value)
        requestAnimationFrame(renderFrame);
    else
        return;

    const bufferLength = analyzer.value.frequencyBinCount;
    const dataArray    = new Uint8Array(bufferLength);

    const canvasWidth   = canvas.value.width;
    const canvasHeight  = canvas.value.height;
    const canvasContext = canvas.value.getContext('2d');

    analyzer.value.getByteFrequencyData(dataArray);

    canvasContext.fillStyle = 'rgba(255, 255, 255, 0)';
    canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
    canvasContext.reset();

    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        const barWidth  = (canvasWidth / bufferLength) / devicePixelRatio * 2.5;
        const barHeight = dataArray[i] * canvasHeight / 256;

        const r = barHeight + (25 * (i / bufferLength));
        const g = 250 * (i / bufferLength);
        const b = 50;

        canvasContext.fillStyle = `rgb(${r}, ${g}, ${b})`;
        canvasContext.fillRect(x, (canvasHeight - barHeight) / devicePixelRatio, barWidth, barHeight);

        x += barWidth + 1;
    }
}
</script>

<template>
    <div>
        <h1 class="text-4xl text-center title2 mb-6">Радио</h1>

        <div class="flex flex-row gap-5">
            <button class="text-pink-800 hover:text-pink-600" @click="play">
                <Icon :name="played ? 'i-heroicons-pause-circle-16-solid' : 'i-heroicons-play-circle-16-solid'" size="100"/>
            </button>

            <canvas ref="canvas" class="rounded-2xl w-full" height="50"></canvas>
        </div>
    </div>
</template>

<style scoped>
.title2 {
    font-family: 'Dela Gothic One', serif;
}
</style>