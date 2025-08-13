<template>
    <div class="retro-grid">
        <div class="grid-lines horizontal"></div>
        <div class="grid-lines vertical"></div>
        <div class="horizon-glow"></div>
    </div>
</template>

<style scoped>
.retro-grid {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    pointer-events: none;
    z-index: -3;
    transform: perspective(400px) rotateX(25deg);
    transform-origin: bottom center;
    overflow: hidden;
}

.grid-lines {
    position: absolute;
    width: 100%;
    height: 100%;
}

.horizontal {
    background-image: repeating-linear-gradient(
        0deg,
        transparent 0px,
        transparent 29px,
        rgba(255, 0, 255, 0.3) 30px,
        rgba(255, 0, 255, 0.3) 31px,
        transparent 32px,
        transparent 59px,
        rgba(0, 255, 255, 0.2) 60px,
        rgba(0, 255, 255, 0.2) 61px
    );
    animation: grid-move-horizontal 8s linear infinite;
}

.vertical {
    background-image: repeating-linear-gradient(
        90deg,
        transparent 0px,
        transparent 49px,
        rgba(255, 0, 255, 0.25) 50px,
        rgba(255, 0, 255, 0.25) 51px,
        transparent 52px,
        transparent 99px,
        rgba(0, 255, 255, 0.15) 100px,
        rgba(0, 255, 255, 0.15) 101px
    );
    animation: grid-move-vertical 12s linear infinite;
}

.horizon-glow {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;
    background: linear-gradient(
        180deg,
        transparent 0%,
        rgba(255, 0, 255, 0.1) 40%,
        rgba(255, 20, 147, 0.2) 70%,
        rgba(138, 43, 226, 0.3) 100%
    );
    animation: horizon-pulse 6s ease-in-out infinite alternate;
}

@keyframes grid-move-horizontal {
    0% {
        transform: translateY(0px);
    }
    100% {
        transform: translateY(60px);
    }
}

@keyframes grid-move-vertical {
    0% {
        transform: translateX(0px);
    }
    100% {
        transform: translateX(-100px);
    }
}

@keyframes horizon-pulse {
    0%, 100% {
        opacity: 0.7;
        filter: brightness(1);
    }
    50% {
        opacity: 1;
        filter: brightness(1.2);
    }
}
</style>