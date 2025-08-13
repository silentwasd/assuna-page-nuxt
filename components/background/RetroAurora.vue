<template>
    <div class="retro-aurora">
        <div class="aurora-wave wave-1"></div>
        <div class="aurora-wave wave-2"></div>
        <div class="aurora-wave wave-3"></div>
        <div class="aurora-wave wave-4"></div>
        <div class="aurora-shimmer"></div>
    </div>
</template>

<style scoped>
.retro-aurora {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 60dvh;
    pointer-events: none;
    z-index: -4;
    overflow: hidden;
}

.aurora-wave {
    position: absolute;
    width: 120%;
    height: 100%;
    left: -10%;
    opacity: 0.6;
    mix-blend-mode: screen;
}

.wave-1 {
    background: linear-gradient(
        180deg,
        rgba(0, 255, 127, 0.4) 0%,
        rgba(0, 255, 255, 0.3) 30%,
        rgba(138, 43, 226, 0.2) 60%,
        transparent 100%
    );
    animation: aurora-flow-1 15s ease-in-out infinite;
    transform-origin: top center;
}

.wave-2 {
    background: linear-gradient(
        180deg,
        rgba(255, 20, 147, 0.3) 0%,
        rgba(255, 0, 255, 0.4) 25%,
        rgba(0, 191, 255, 0.2) 55%,
        transparent 100%
    );
    animation: aurora-flow-2 18s ease-in-out infinite reverse;
    transform-origin: top center;
}

.wave-3 {
    background: linear-gradient(
        180deg,
        rgba(255, 215, 0, 0.2) 0%,
        rgba(255, 69, 0, 0.3) 35%,
        rgba(255, 0, 255, 0.3) 65%,
        transparent 100%
    );
    animation: aurora-flow-3 12s ease-in-out infinite;
    transform-origin: top center;
}

.wave-4 {
    background: linear-gradient(
        180deg,
        rgba(0, 255, 255, 0.2) 0%,
        rgba(75, 0, 130, 0.4) 40%,
        rgba(255, 20, 147, 0.2) 70%,
        transparent 100%
    );
    animation: aurora-flow-4 20s ease-in-out infinite reverse;
    transform-origin: top center;
}

.aurora-shimmer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
        repeating-linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.02) 1%,
            transparent 2%,
            transparent 8%,
            rgba(0, 255, 255, 0.03) 9%,
            transparent 10%
        );
    animation: shimmer-drift 8s linear infinite;
}

@keyframes aurora-flow-1 {
    0%, 100% {
        transform: translateX(-5%) scaleY(1) skewX(0deg);
        filter: hue-rotate(0deg);
    }
    25% {
        transform: translateX(3%) scaleY(1.1) skewX(2deg);
        filter: hue-rotate(15deg);
    }
    50% {
        transform: translateX(-2%) scaleY(0.9) skewX(-1deg);
        filter: hue-rotate(-10deg);
    }
    75% {
        transform: translateX(4%) scaleY(1.05) skewX(1.5deg);
        filter: hue-rotate(20deg);
    }
}

@keyframes aurora-flow-2 {
    0%, 100% {
        transform: translateX(2%) scaleY(1) skewX(1deg);
        filter: hue-rotate(0deg) brightness(0.8);
    }
    30% {
        transform: translateX(-4%) scaleY(1.2) skewX(-2deg);
        filter: hue-rotate(25deg) brightness(1.1);
    }
    60% {
        transform: translateX(1%) scaleY(0.8) skewX(1deg);
        filter: hue-rotate(-15deg) brightness(0.9);
    }
}

@keyframes aurora-flow-3 {
    0%, 100% {
        transform: translateX(1%) scaleY(1) skewX(-0.5deg);
        filter: hue-rotate(0deg);
    }
    40% {
        transform: translateX(-3%) scaleY(1.3) skewX(1deg);
        filter: hue-rotate(30deg);
    }
    80% {
        transform: translateX(2%) scaleY(0.7) skewX(-1.5deg);
        filter: hue-rotate(-20deg);
    }
}

@keyframes aurora-flow-4 {
    0%, 100% {
        transform: translateX(-1%) scaleY(1) skewX(0.5deg);
        filter: hue-rotate(0deg) saturate(1);
    }
    20% {
        transform: translateX(2%) scaleY(1.4) skewX(-1deg);
        filter: hue-rotate(35deg) saturate(1.2);
    }
    50% {
        transform: translateX(-3%) scaleY(0.6) skewX(2deg);
        filter: hue-rotate(-25deg) saturate(0.8);
    }
    80% {
        transform: translateX(1%) scaleY(1.1) skewX(-0.5deg);
        filter: hue-rotate(10deg) saturate(1.1);
    }
}

@keyframes shimmer-drift {
    0% {
        transform: translateX(-10%);
        opacity: 0.3;
    }
    50% {
        opacity: 0.6;
    }
    100% {
        transform: translateX(10%);
        opacity: 0.3;
    }
}
</style>