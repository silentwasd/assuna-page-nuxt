<template>
    <div class="soviet-wave-gradient">
        <div class="gradient-layer primary"></div>
        <div class="gradient-layer secondary"></div>
        <div class="gradient-layer accent"></div>
    </div>
</template>

<style scoped>
.soviet-wave-gradient {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    pointer-events: none;
    z-index: -5;
    overflow: hidden;
}

.gradient-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    mix-blend-mode: overlay;
}

.primary {
    background: 
        linear-gradient(
            135deg,
            rgba(25, 25, 112, 0.8) 0%,
            rgba(75, 0, 130, 0.6) 25%,
            rgba(138, 43, 226, 0.4) 50%,
            rgba(255, 20, 147, 0.6) 75%,
            rgba(220, 20, 60, 0.8) 100%
        );
    animation: soviet-shift 15s ease-in-out infinite alternate;
}

.secondary {
    background: 
        radial-gradient(
            ellipse at 30% 70%,
            rgba(0, 0, 139, 0.3) 0%,
            rgba(72, 61, 139, 0.2) 40%,
            transparent 70%
        ),
        radial-gradient(
            ellipse at 70% 30%,
            rgba(139, 0, 139, 0.3) 0%,
            rgba(255, 0, 255, 0.2) 40%,
            transparent 70%
        );
    animation: soviet-drift 20s ease-in-out infinite;
}

.accent {
    background: 
        conic-gradient(
            from 45deg at 50% 50%,
            rgba(255, 0, 128, 0.1) 0deg,
            rgba(128, 0, 255, 0.15) 90deg,
            rgba(0, 128, 255, 0.1) 180deg,
            rgba(255, 128, 0, 0.12) 270deg,
            rgba(255, 0, 128, 0.1) 360deg
        );
    animation: soviet-rotate 25s linear infinite, soviet-breathe 8s ease-in-out infinite alternate;
}

@keyframes soviet-shift {
    0%, 100% {
        transform: translateX(0px) translateY(0px) scale(1);
        filter: hue-rotate(0deg) saturate(1);
    }
    25% {
        transform: translateX(-20px) translateY(10px) scale(1.02);
        filter: hue-rotate(10deg) saturate(1.1);
    }
    50% {
        transform: translateX(15px) translateY(-15px) scale(0.98);
        filter: hue-rotate(-5deg) saturate(1.2);
    }
    75% {
        transform: translateX(-10px) translateY(20px) scale(1.01);
        filter: hue-rotate(15deg) saturate(0.9);
    }
}

@keyframes soviet-drift {
    0%, 100% {
        transform: translate(0px, 0px) rotate(0deg);
        opacity: 0.6;
    }
    25% {
        transform: translate(30px, -20px) rotate(2deg);
        opacity: 0.8;
    }
    50% {
        transform: translate(-25px, 15px) rotate(-1deg);
        opacity: 0.7;
    }
    75% {
        transform: translate(20px, -30px) rotate(1.5deg);
        opacity: 0.9;
    }
}

@keyframes soviet-rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes soviet-breathe {
    0%, 100% {
        opacity: 0.4;
        transform: scale(1);
    }
    50% {
        opacity: 0.6;
        transform: scale(1.05);
    }
}
</style>