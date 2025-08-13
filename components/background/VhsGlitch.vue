<template>
    <div class="vhs-glitch">
        <div class="glitch-layer" v-for="n in 3" :key="n" :class="`glitch-${n}`"></div>
        <div class="static-burst"></div>
        <div class="tape-roll"></div>
    </div>
</template>

<style scoped>
.vhs-glitch {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    pointer-events: none;
    z-index: 20;
    opacity: 0;
    animation: glitch-trigger 15s infinite;
}

.glitch-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    mix-blend-mode: difference;
}

.glitch-1 {
    background: 
        repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 2px,
            rgba(255, 0, 255, 0.8) 2px,
            rgba(255, 0, 255, 0.8) 4px,
            transparent 4px,
            transparent 8px
        );
    animation: glitch-horizontal 0.1s steps(2) infinite;
}

.glitch-2 {
    background: 
        repeating-linear-gradient(
            0deg,
            transparent 0px,
            transparent 1px,
            rgba(0, 255, 255, 0.6) 1px,
            rgba(0, 255, 255, 0.6) 3px,
            transparent 3px,
            transparent 6px
        );
    animation: glitch-vertical 0.15s steps(3) infinite;
}

.glitch-3 {
    background: 
        radial-gradient(
            ellipse at random,
            rgba(255, 255, 0, 0.4) 0%,
            transparent 40%
        );
    animation: glitch-burst 0.2s steps(4) infinite;
}

.static-burst {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
        url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
    animation: static-flash 0.05s steps(10) infinite;
}

.tape-roll {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
        repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.8) 0px,
            rgba(0, 0, 0, 0.8) 20px,
            rgba(255, 255, 255, 0.1) 20px,
            rgba(255, 255, 255, 0.1) 22px,
            rgba(0, 0, 0, 0.8) 22px,
            rgba(0, 0, 0, 0.8) 24px
        );
    animation: tape-stutter 0.3s steps(5) infinite;
}

@keyframes glitch-trigger {
    0%, 95% {
        opacity: 0;
    }
    95.1%, 96% {
        opacity: 1;
    }
    96.1%, 97% {
        opacity: 0;
    }
    97.1%, 97.5% {
        opacity: 0.8;
    }
    97.6%, 98% {
        opacity: 0;
    }
    98.1%, 98.3% {
        opacity: 1;
    }
    98.4%, 100% {
        opacity: 0;
    }
}

@keyframes glitch-horizontal {
    0% {
        transform: translateX(0px) scaleX(1);
    }
    25% {
        transform: translateX(-2px) scaleX(1.01);
    }
    50% {
        transform: translateX(1px) scaleX(0.99);
    }
    75% {
        transform: translateX(-1px) scaleX(1.02);
    }
    100% {
        transform: translateX(0px) scaleX(1);
    }
}

@keyframes glitch-vertical {
    0% {
        transform: translateY(0px) scaleY(1);
    }
    33% {
        transform: translateY(1px) scaleY(1.01);
    }
    66% {
        transform: translateY(-2px) scaleY(0.98);
    }
    100% {
        transform: translateY(0px) scaleY(1);
    }
}

@keyframes glitch-burst {
    0% {
        transform: scale(1) rotate(0deg);
        filter: hue-rotate(0deg);
    }
    25% {
        transform: scale(1.02) rotate(1deg);
        filter: hue-rotate(90deg);
    }
    50% {
        transform: scale(0.98) rotate(-1deg);
        filter: hue-rotate(180deg);
    }
    75% {
        transform: scale(1.01) rotate(0.5deg);
        filter: hue-rotate(270deg);
    }
    100% {
        transform: scale(1) rotate(0deg);
        filter: hue-rotate(360deg);
    }
}

@keyframes static-flash {
    0% { opacity: 0.8; }
    10% { opacity: 0.2; }
    20% { opacity: 0.9; }
    30% { opacity: 0.1; }
    40% { opacity: 0.7; }
    50% { opacity: 0.3; }
    60% { opacity: 0.8; }
    70% { opacity: 0.2; }
    80% { opacity: 0.6; }
    90% { opacity: 0.4; }
    100% { opacity: 0.9; }
}

@keyframes tape-stutter {
    0% {
        transform: translateY(0px);
        filter: brightness(1);
    }
    20% {
        transform: translateY(-10px);
        filter: brightness(1.2);
    }
    40% {
        transform: translateY(5px);
        filter: brightness(0.8);
    }
    60% {
        transform: translateY(-3px);
        filter: brightness(1.1);
    }
    80% {
        transform: translateY(2px);
        filter: brightness(0.9);
    }
    100% {
        transform: translateY(0px);
        filter: brightness(1);
    }
}
</style>