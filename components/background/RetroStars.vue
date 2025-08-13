<template>
    <div class="retro-stars">
        <div class="stars-layer far" v-for="n in 50" :key="`far-${n}`" 
             :style="getStarStyle(n, 'far')"></div>
        <div class="stars-layer medium" v-for="n in 30" :key="`med-${n}`" 
             :style="getStarStyle(n, 'medium')"></div>
        <div class="stars-layer close" v-for="n in 20" :key="`close-${n}`" 
             :style="getStarStyle(n, 'close')"></div>
    </div>
</template>

<script setup lang="ts">
const getStarStyle = (index: number, layer: string) => {
    const seed = index * 137.508; // Golden angle for distribution
    const x = (seed * 9301 + 49297) % 233280 / 233280 * 100;
    const y = (seed * 9301 + 49297) % 233280 / 233281 * 100;
    
    let size, opacity, duration;
    switch(layer) {
        case 'far':
            size = '1px';
            opacity = 0.3 + (index % 3) * 0.1;
            duration = 8 + (index % 5);
            break;
        case 'medium':
            size = '2px';
            opacity = 0.5 + (index % 4) * 0.1;
            duration = 6 + (index % 4);
            break;
        case 'close':
            size = '3px';
            opacity = 0.7 + (index % 3) * 0.1;
            duration = 4 + (index % 3);
            break;
    }
    
    return {
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        animationDelay: `${(index * 0.5) % duration}s`,
        animationDuration: `${duration}s`
    };
};
</script>

<style scoped>
.retro-stars {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    pointer-events: none;
    z-index: -4;
    overflow: hidden;
}

.stars-layer {
    position: absolute;
    border-radius: 50%;
    background: 
        radial-gradient(
            circle at center,
            rgba(255, 255, 255, 1) 0%,
            rgba(0, 255, 255, 0.8) 30%,
            rgba(255, 0, 255, 0.6) 60%,
            transparent 100%
        );
    box-shadow: 
        0 0 3px rgba(255, 255, 255, 0.8),
        0 0 6px rgba(0, 255, 255, 0.4),
        0 0 9px rgba(255, 0, 255, 0.2);
    animation: star-twinkle linear infinite;
}

.far {
    animation-name: star-twinkle, star-drift-far;
}

.medium {
    animation-name: star-twinkle, star-drift-medium;
}

.close {
    animation-name: star-twinkle, star-drift-close;
    filter: hue-rotate(45deg);
}

@keyframes star-twinkle {
    0%, 100% {
        opacity: 0.3;
        transform: scale(1);
    }
    25% {
        opacity: 0.8;
        transform: scale(1.2);
    }
    50% {
        opacity: 1;
        transform: scale(0.9);
    }
    75% {
        opacity: 0.6;
        transform: scale(1.1);
    }
}

@keyframes star-drift-far {
    0% {
        transform: translateX(0px) translateY(0px);
    }
    100% {
        transform: translateX(-20px) translateY(10px);
    }
}

@keyframes star-drift-medium {
    0% {
        transform: translateX(0px) translateY(0px);
    }
    100% {
        transform: translateX(-40px) translateY(20px);
    }
}

@keyframes star-drift-close {
    0% {
        transform: translateX(0px) translateY(0px);
    }
    100% {
        transform: translateX(-60px) translateY(30px);
    }
}
</style>