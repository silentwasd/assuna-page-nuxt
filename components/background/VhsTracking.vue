<template>
    <div class="vhs-tracking">
        <div class="tracking-lines"></div>
        <div class="noise-overlay"></div>
    </div>
</template>

<style scoped>
.vhs-tracking {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    pointer-events: none;
    z-index: 5;
    mix-blend-mode: multiply;
}

.tracking-lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
        0deg,
        transparent 0px,
        transparent 2px,
        rgba(255, 0, 255, 0.03) 2px,
        rgba(255, 0, 255, 0.03) 4px,
        transparent 4px,
        transparent 6px,
        rgba(0, 255, 255, 0.03) 6px,
        rgba(0, 255, 255, 0.03) 8px
    );
    animation: vhs-tracking 3s ease-in-out infinite alternate;
}

.noise-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.15;
    background-image: 
        radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0);
    background-size: 3px 3px;
    animation: film-grain 0.2s steps(8) infinite;
}

@keyframes vhs-tracking {
    0% {
        transform: translateY(0px);
        filter: hue-rotate(0deg);
    }
    25% {
        transform: translateY(-2px);
        filter: hue-rotate(5deg);
    }
    50% {
        transform: translateY(1px);
        filter: hue-rotate(-3deg);
    }
    75% {
        transform: translateY(-1px);
        filter: hue-rotate(2deg);
    }
    100% {
        transform: translateY(0px);
        filter: hue-rotate(0deg);
    }
}

@keyframes film-grain {
    0% { transform: translate(0, 0); }
    10% { transform: translate(-1px, 1px); }
    20% { transform: translate(1px, -1px); }
    30% { transform: translate(-1px, -1px); }
    40% { transform: translate(1px, 1px); }
    50% { transform: translate(-1px, 0); }
    60% { transform: translate(1px, 0); }
    70% { transform: translate(0, -1px); }
    80% { transform: translate(0, 1px); }
    90% { transform: translate(-1px, 1px); }
    100% { transform: translate(1px, -1px); }
}
</style>