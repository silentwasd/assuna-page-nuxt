<template>
    <div class="crt-container">
        <div class="crt-curvature">
            <slot></slot>
        </div>
        <div class="crt-bezel"></div>
    </div>
</template>

<style scoped>
.crt-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.crt-curvature {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: 
        perspective(1000px) 
        rotateX(0.3deg) 
        rotateY(0deg) 
        scale3d(0.99, 0.99, 1);
    border-radius: 15px;
    overflow: hidden;
    position: relative;
}

.crt-curvature::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 65%,
            rgba(0, 0, 0, 0.1) 80%,
            rgba(0, 0, 0, 0.4) 100%
        );
    pointer-events: none;
    z-index: 15;
}

.crt-curvature::after {
    content: '';
    position: absolute;
    top: -2%;
    left: -2%;
    right: -2%;
    bottom: -2%;
    background: 
        linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.03) 0%,
            transparent 50%,
            rgba(255, 255, 255, 0.03) 100%
        );
    border-radius: 20px;
    pointer-events: none;
    z-index: 16;
    animation: crt-flicker 8s ease-in-out infinite;
}

.crt-bezel {
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: 
        radial-gradient(
            ellipse at center,
            rgba(40, 40, 40, 0.6) 0%,
            rgba(20, 20, 20, 0.7) 70%,
            rgba(0, 0, 0, 0.8) 100%
        );
    border-radius: 20px;
    z-index: -1;
    box-shadow: 
        inset 0 0 15px rgba(255, 255, 255, 0.08),
        0 0 30px rgba(0, 0, 0, 0.6);
}

@keyframes crt-flicker {
    0%, 100% {
        opacity: 1;
        transform: scale(1);
    }
    2% {
        opacity: 0.95;
        transform: scale(1.001);
    }
    4% {
        opacity: 1;
        transform: scale(1);
    }
    96% {
        opacity: 1;
        transform: scale(1);
    }
    98% {
        opacity: 0.97;
        transform: scale(0.999);
    }
}
</style>