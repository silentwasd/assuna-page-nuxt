<script setup lang="ts">

const time = ref('');

setInterval(function () {
    time.value = new Date().toLocaleTimeString();
}, 1000);
</script>

<template>
    <div>
        <h1 class="text-2xl md:text-4xl text-center font-gothic mb-5 md:mb-8">{{ $t('time') }}</h1>

        <div class="clock text-center text-4xl">
            <p>{{ time }}</p>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Press+Start+2P');

.clock {
    will-change:     text-shadow;
    font-family:     'Press Start 2P', cursive;
    animation:       rgbText 0.6s steps(9) 0s infinite alternate,
                     rgbColor 3s infinite;

    --first-color:   rgba(255, 255, 255, 0.6);
    --second-color:  rgba(255, 255, 235, 0.7);
    --third-color:   rgba(251, 0, 231, 0.8);
    --fourth-color:  rgba(0, 233, 235, 0.8);
    --fifth-color:   rgba(0, 242, 14, 0.8);
    --sixth-color:   rgba(244, 45, 0, 0.8);
    --seventh-color: rgba(59, 0, 226, 0.8);
}

@keyframes rgbText {
    0% {
        text-shadow: -1px 1px 8px var(--first-color),
                     1px -1px 8px var(--second-color),
                     0px 0 1px var(--third-color),
                     0 0px 3px var(--fourth-color),
                     0px 0 3px var(--fifth-color),
                     0 0px 3px var(--sixth-color),
                     0px 0 3px var(--seventh-color);
    }
    25% {
        text-shadow: -1px 1px 8px var(--first-color),
                     1px -1px 8px var(--second-color),
                     0px 0 1px var(--third-color),
                     0 0px 3px var(--fourth-color),
                     0px 0 3px var(--fifth-color),
                     0 0px 3px var(--sixth-color),
                     0px 0 3px var(--seventh-color);
    }
    45% {
        text-shadow: -1px 1px 8px var(--first-color),
                     1px -1px 8px var(--second-color),
                     5px 0 1px var(--third-color),
                     0 5px 1px var(--fourth-color),
                     -5px 0 1px var(--fifth-color),
                     0 -5px 1px var(--sixth-color),
                     5px 0 1px var(--seventh-color);
    }
    50% {
        text-shadow: -1px 1px 8px var(--first-color),
                     1px -1px 8px var(--second-color),
                     -5px 0 1px var(--third-color),
                     0 -5px 1px var(--fourth-color),
                     5px 0 1px var(--fifth-color),
                     0 5px 1px var(--sixth-color),
                     -5px 0 1px var(--seventh-color);
    }
    55% {
        text-shadow: -1px 1px 8px var(--first-color),
                     1px -1px 8px var(--second-color),
                     0px 0 3px var(--third-color),
                     0 0px 3px var(--fourth-color),
                     0px 0 3px var(--fifth-color),
                     0 0px 3px var(--sixth-color),
                     0px 0 3px var(--seventh-color);
    }
    90% {
        text-shadow: -1px 1px 8px var(--first-color),
                     1px -1px 8px var(--second-color),
                     -5px 0 1px var(--third-color),
                     0 5px 1px var(--fourth-color),
                     5px 0 1px var(--fifth-color),
                     0 -5px 1px var(--sixth-color),
                     5px 0 1px var(--seventh-color);
    }
    100% {
        text-shadow: -1px 1px 8px var(--first-color),
                     1px -1px 8px var(--second-color),
                     5px 0 1px var(--third-color),
                     0 -5px 1px var(--fourth-color),
                     -5px 0 1px var(--fifth-color),
                     0 5px 1px var(--sixth-color),
                     -5px 0 1px var(--seventh-color);
    }
}

@keyframes rgbColor {
    0% {
        color: rgb(255, 255, 255);
    }

    33% {
        color: rgb(255, 0, 0);
    }

    66% {
        color: rgb(0, 255, 0);
    }

    100% {
        color: rgb(0, 0, 255);
    }
}
</style>