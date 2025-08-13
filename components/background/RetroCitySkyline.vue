<template>
    <div class="retro-city">
        <div class="building" v-for="n in 15" :key="n" :style="getBuildingStyle(n)">
            <div class="building-lights"></div>
            <div class="antenna" v-if="n % 4 === 0"></div>
        </div>
        <div class="city-glow"></div>
    </div>
</template>

<script setup lang="ts">
const getBuildingStyle = (index: number) => {
    const seed = index * 31.416;
    const height = 20 + (seed * 9301 + 49297) % 233280 / 233280 * 40;
    const width = 3 + (index % 4) * 2;
    const left = index * 6.5;
    const delay = index * 0.3;
    
    return {
        height: `${height}%`,
        width: `${width}%`,
        left: `${left}%`,
        animationDelay: `${delay}s`
    };
};
</script>

<style scoped>
.retro-city {
    position: fixed;
    bottom: 25%;
    left: 0;
    width: 100dvw;
    height: 35%;
    pointer-events: none;
    z-index: -2;
    overflow: hidden;
}

.building {
    position: absolute;
    bottom: 0;
    background: linear-gradient(
        180deg,
        rgba(25, 25, 112, 0.9) 0%,
        rgba(72, 61, 139, 0.8) 50%,
        rgba(138, 43, 226, 0.7) 100%
    );
    border-top: 1px solid rgba(0, 255, 255, 0.3);
    animation: building-pulse 8s ease-in-out infinite alternate;
    box-shadow: 
        inset 0 0 20px rgba(255, 0, 255, 0.1),
        0 0 10px rgba(0, 255, 255, 0.2);
}

.building-lights {
    position: absolute;
    top: 10%;
    left: 10%;
    right: 10%;
    bottom: 10%;
    background: 
        repeating-linear-gradient(
            0deg,
            transparent 0%,
            transparent 85%,
            rgba(255, 255, 0, 0.6) 85%,
            rgba(255, 255, 0, 0.6) 90%,
            transparent 90%,
            transparent 95%,
            rgba(0, 255, 255, 0.4) 95%,
            rgba(0, 255, 255, 0.4) 100%
        ),
        repeating-linear-gradient(
            90deg,
            transparent 0%,
            transparent 70%,
            rgba(255, 0, 255, 0.3) 70%,
            rgba(255, 0, 255, 0.3) 80%,
            transparent 80%,
            transparent 100%
        );
    animation: lights-flicker 4s ease-in-out infinite;
}

.antenna {
    position: absolute;
    top: -15px;
    left: 50%;
    width: 2px;
    height: 15px;
    background: linear-gradient(
        180deg,
        rgba(255, 0, 0, 0.8) 0%,
        rgba(255, 0, 255, 0.6) 100%
    );
    transform: translateX(-50%);
    animation: antenna-blink 2s ease-in-out infinite;
}

.antenna::before {
    content: '';
    position: absolute;
    top: -3px;
    left: 50%;
    width: 6px;
    height: 6px;
    background: radial-gradient(
        circle,
        rgba(255, 0, 0, 1) 0%,
        transparent 70%
    );
    border-radius: 50%;
    transform: translateX(-50%);
    animation: antenna-pulse 1s ease-in-out infinite;
}

.city-glow {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(
        180deg,
        transparent 0%,
        rgba(255, 0, 255, 0.1) 50%,
        rgba(0, 255, 255, 0.2) 100%
    );
    animation: glow-shift 6s ease-in-out infinite alternate;
}

@keyframes building-pulse {
    0%, 100% {
        transform: scaleY(1);
        filter: brightness(0.8);
    }
    50% {
        transform: scaleY(1.02);
        filter: brightness(1.1);
    }
}

@keyframes lights-flicker {
    0%, 100% {
        opacity: 0.8;
    }
    25% {
        opacity: 1;
    }
    50% {
        opacity: 0.6;
    }
    75% {
        opacity: 0.9;
    }
}

@keyframes antenna-blink {
    0%, 80% {
        opacity: 1;
    }
    90%, 100% {
        opacity: 0.3;
    }
}

@keyframes antenna-pulse {
    0%, 100% {
        transform: translateX(-50%) scale(1);
        opacity: 1;
    }
    50% {
        transform: translateX(-50%) scale(1.5);
        opacity: 0.7;
    }
}

@keyframes glow-shift {
    0%, 100% {
        opacity: 0.6;
        filter: hue-rotate(0deg);
    }
    50% {
        opacity: 0.9;
        filter: hue-rotate(30deg);
    }
}
</style>