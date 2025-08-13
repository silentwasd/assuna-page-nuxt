<template>
    <div class="retro-color-filter">
        <div class="vintage-overlay"></div>
        <div class="color-temperature"></div>
        <div class="phosphor-glow"></div>
    </div>
</template>

<style scoped>
.retro-color-filter {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    pointer-events: none;
    z-index: -1;
}

.vintage-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(
            ellipse at center,
            rgba(255, 20, 147, 0.03) 0%,
            rgba(138, 43, 226, 0.05) 50%,
            rgba(75, 0, 130, 0.08) 100%
        );
    mix-blend-mode: overlay;
    animation: vintage-pulse 6s ease-in-out infinite alternate;
}

.color-temperature {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
        linear-gradient(
            180deg,
            rgba(255, 140, 0, 0.02) 0%,
            rgba(255, 20, 147, 0.03) 30%,
            rgba(138, 43, 226, 0.04) 60%,
            rgba(25, 25, 112, 0.05) 100%
        );
    mix-blend-mode: multiply;
    animation: warm-cool-shift 8s ease-in-out infinite;
}

.phosphor-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(
            circle at 30% 40%,
            rgba(0, 255, 127, 0.02) 0%,
            transparent 50%
        ),
        radial-gradient(
            circle at 70% 60%,
            rgba(255, 20, 147, 0.02) 0%,
            transparent 50%
        ),
        radial-gradient(
            circle at 50% 30%,
            rgba(0, 191, 255, 0.015) 0%,
            transparent 50%
        );
    mix-blend-mode: screen;
    animation: phosphor-drift 12s ease-in-out infinite;
}

@keyframes vintage-pulse {
    0%, 100% {
        opacity: 0.8;
        transform: scale(1);
    }
    50% {
        opacity: 1;
        transform: scale(1.01);
    }
}

@keyframes warm-cool-shift {
    0%, 100% {
        filter: hue-rotate(0deg) saturate(1.1);
        opacity: 0.7;
    }
    25% {
        filter: hue-rotate(5deg) saturate(1.2);
        opacity: 0.8;
    }
    50% {
        filter: hue-rotate(-3deg) saturate(1.05);
        opacity: 0.9;
    }
    75% {
        filter: hue-rotate(2deg) saturate(1.15);
        opacity: 0.75;
    }
}

@keyframes phosphor-drift {
    0%, 100% {
        transform: translateX(0px) translateY(0px);
        filter: brightness(1);
    }
    25% {
        transform: translateX(2px) translateY(-1px);
        filter: brightness(1.1);
    }
    50% {
        transform: translateX(-1px) translateY(2px);
        filter: brightness(0.9);
    }
    75% {
        transform: translateX(1px) translateY(-2px);
        filter: brightness(1.05);
    }
}
</style>