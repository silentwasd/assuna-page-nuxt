<script setup lang="ts">

</script>

<template>
    <div class="background">
        <div class="line"></div>
    </div>
</template>

<style scoped>
.line {
    position: fixed;
    left: 0;
    top: 0;
    width: 100dvw;
    height: 100dvh;
    pointer-events: none;
    opacity: 0.8;
    z-index: 12;
}

.line::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background: 
        repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 2px,
            rgba(0, 0, 0, 0.3) 2px,
            rgba(0, 0, 0, 0.3) 3px,
            transparent 3px,
            transparent 6px
        ),
        repeating-linear-gradient(
            to bottom,
            rgba(255, 0, 255, 0.02) 0px,
            rgba(255, 0, 255, 0.02) 1px,
            rgba(0, 255, 255, 0.02) 1px,
            rgba(0, 255, 255, 0.02) 2px
        );
    will-change: transform, opacity;
    animation: enhanced-flicker 0.16s linear infinite, brightness-wave 4s ease-in-out infinite;
}

.line::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background: 
        linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 0.1) 25%,
            transparent 50%,
            rgba(0, 0, 0, 0.1) 75%,
            transparent 100%
        );
    animation: rolling-bars 8s linear infinite;
}

@keyframes enhanced-flicker {
    0% {
        transform: translateX(0px);
        opacity: 1;
    }
    20% {
        transform: translateX(0.5px);
        opacity: 0.95;
    }
    40% {
        transform: translateX(-0.3px);
        opacity: 1;
    }
    60% {
        transform: translateX(0.2px);
        opacity: 0.98;
    }
    80% {
        transform: translateX(-0.1px);
        opacity: 1;
    }
    100% {
        transform: translateX(0px);
        opacity: 0.97;
    }
}

@keyframes brightness-wave {
    0%, 100% {
        filter: brightness(1) contrast(1);
    }
    25% {
        filter: brightness(1.1) contrast(1.05);
    }
    50% {
        filter: brightness(0.95) contrast(1.1);
    }
    75% {
        filter: brightness(1.05) contrast(0.95);
    }
}

@keyframes rolling-bars {
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(100vh);
    }
}
</style>