<template>
    <div class="chromatic-aberration">
        <div class="aberration-layer red-shift"></div>
        <div class="aberration-layer blue-shift"></div>
        <div class="aberration-layer green-shift"></div>
    </div>
</template>

<style scoped>
.chromatic-aberration {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    pointer-events: none;
    z-index: 10;
}

.aberration-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    mix-blend-mode: screen;
    opacity: 0.7;
}

.red-shift {
    background: 
        radial-gradient(ellipse at center, transparent 30%, rgba(255, 0, 100, 0.1) 70%),
        linear-gradient(45deg, transparent 48%, rgba(255, 0, 100, 0.05) 49%, rgba(255, 0, 100, 0.05) 51%, transparent 52%);
    animation: red-aberration 4s ease-in-out infinite;
}

.blue-shift {
    background: 
        radial-gradient(ellipse at center, transparent 30%, rgba(0, 100, 255, 0.1) 70%),
        linear-gradient(-45deg, transparent 48%, rgba(0, 100, 255, 0.05) 49%, rgba(0, 100, 255, 0.05) 51%, transparent 52%);
    animation: blue-aberration 3.5s ease-in-out infinite reverse;
}

.green-shift {
    background: 
        radial-gradient(ellipse at center, transparent 40%, rgba(0, 255, 100, 0.08) 80%);
    animation: green-aberration 5s ease-in-out infinite alternate;
}

@keyframes red-aberration {
    0%, 100% {
        transform: translateX(0px) translateY(0px);
        filter: hue-rotate(0deg);
    }
    25% {
        transform: translateX(1px) translateY(-0.5px);
        filter: hue-rotate(2deg);
    }
    50% {
        transform: translateX(-0.5px) translateY(1px);
        filter: hue-rotate(-1deg);
    }
    75% {
        transform: translateX(0.5px) translateY(-1px);
        filter: hue-rotate(1deg);
    }
}

@keyframes blue-aberration {
    0%, 100% {
        transform: translateX(0px) translateY(0px);
        filter: hue-rotate(0deg);
    }
    30% {
        transform: translateX(-1px) translateY(0.5px);
        filter: hue-rotate(-2deg);
    }
    60% {
        transform: translateX(0.5px) translateY(-1px);
        filter: hue-rotate(1deg);
    }
}

@keyframes green-aberration {
    0%, 100% {
        transform: translateX(0px) translateY(0px);
        opacity: 0.8;
    }
    50% {
        transform: translateX(0.3px) translateY(-0.3px);
        opacity: 0.6;
    }
}
</style>