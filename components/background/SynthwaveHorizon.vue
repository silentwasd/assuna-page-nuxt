<template>
    <div class="synthwave-horizon">
        <div class="mountain-range back"></div>
        <div class="mountain-range mid"></div>
        <div class="mountain-range front"></div>
        <div class="horizon-line"></div>
        <div class="retro-sun"></div>
    </div>
</template>

<style scoped>
.synthwave-horizon {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100dvw;
    height: 60dvh;
    pointer-events: none;
    z-index: -2;
    overflow: hidden;
}

.mountain-range {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6;
}

.back {
    background: 
        polygon(0% 100%, 0% 70%, 15% 60%, 25% 65%, 40% 50%, 55% 55%, 70% 45%, 85% 50%, 100% 40%, 100% 100%);
    background-color: rgba(138, 43, 226, 0.3);
    clip-path: polygon(0% 100%, 0% 70%, 15% 60%, 25% 65%, 40% 50%, 55% 55%, 70% 45%, 85% 50%, 100% 40%, 100% 100%);
    animation: mountain-sway 20s ease-in-out infinite;
}

.mid {
    background-color: rgba(255, 20, 147, 0.4);
    clip-path: polygon(0% 100%, 0% 80%, 20% 70%, 35% 75%, 50% 60%, 65% 65%, 80% 55%, 95% 60%, 100% 50%, 100% 100%);
    animation: mountain-sway 15s ease-in-out infinite reverse;
    opacity: 0.7;
}

.front {
    background-color: rgba(255, 0, 255, 0.5);
    clip-path: polygon(0% 100%, 0% 85%, 25% 75%, 45% 80%, 60% 70%, 75% 75%, 90% 65%, 100% 70%, 100% 100%);
    animation: mountain-sway 12s ease-in-out infinite;
    opacity: 0.8;
}

.horizon-line {
    position: absolute;
    bottom: 35%;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(0, 255, 255, 0.8) 20%,
        rgba(255, 0, 255, 0.8) 50%,
        rgba(255, 20, 147, 0.8) 80%,
        transparent 100%
    );
    animation: horizon-glow 4s ease-in-out infinite alternate;
    box-shadow: 
        0 0 5px rgba(0, 255, 255, 0.5),
        0 0 10px rgba(255, 0, 255, 0.3);
}

.retro-sun {
    position: absolute;
    bottom: 45%;
    left: 50%;
    width: 120px;
    height: 120px;
    transform: translateX(-50%);
    background: 
        radial-gradient(
            circle at center,
            rgba(255, 255, 0, 0.9) 0%,
            rgba(255, 165, 0, 0.8) 30%,
            rgba(255, 20, 147, 0.6) 60%,
            transparent 80%
        );
    border-radius: 50%;
    animation: sun-pulse 8s ease-in-out infinite, sun-float 12s ease-in-out infinite;
}

.retro-sun::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    transform: translate(-50%, -50%);
    background: 
        repeating-conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(255, 255, 0, 0.2) 1deg,
            transparent 2deg,
            transparent 8deg,
            rgba(255, 165, 0, 0.1) 9deg,
            transparent 10deg
        );
    border-radius: 50%;
    animation: sun-rays 20s linear infinite;
}

@keyframes mountain-sway {
    0%, 100% {
        transform: translateX(0px) scaleY(1);
        filter: hue-rotate(0deg);
    }
    50% {
        transform: translateX(5px) scaleY(1.02);
        filter: hue-rotate(5deg);
    }
}

@keyframes horizon-glow {
    0%, 100% {
        opacity: 0.8;
        box-shadow: 
            0 0 5px rgba(0, 255, 255, 0.5),
            0 0 10px rgba(255, 0, 255, 0.3);
    }
    50% {
        opacity: 1;
        box-shadow: 
            0 0 8px rgba(0, 255, 255, 0.7),
            0 0 15px rgba(255, 0, 255, 0.5);
    }
}

@keyframes sun-pulse {
    0%, 100% {
        transform: translateX(-50%) scale(1);
        opacity: 0.9;
    }
    50% {
        transform: translateX(-50%) scale(1.1);
        opacity: 1;
    }
}

@keyframes sun-float {
    0%, 100% {
        bottom: 45%;
    }
    50% {
        bottom: 48%;
    }
}

@keyframes sun-rays {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}
</style>