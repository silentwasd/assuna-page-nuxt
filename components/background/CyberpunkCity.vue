<template>
    <div class="cyberpunk-city">
        <div class="city-skyline">
            <div class="building building-1"></div>
            <div class="building building-2"></div>
            <div class="building building-3"></div>
            <div class="building building-4"></div>
            <div class="building building-5"></div>
            <div class="building building-6"></div>
            <div class="building building-7"></div>
            <div class="building building-8"></div>
        </div>
        <div class="neon-glow"></div>
        <div class="distant-lights"></div>
    </div>
</template>

<style scoped>
.cyberpunk-city {
    position: fixed;
    inset: 0;
    background: linear-gradient(180deg, 
        #0a0a0f 0%,
        #1a1a2e 30%,
        #16213e 60%,
        #0f0f23 100%);
    overflow: hidden;
    z-index: -10;
}

.city-skyline {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
}

.building {
    background: linear-gradient(180deg, 
        rgba(20, 20, 40, 0.9) 0%,
        rgba(10, 10, 25, 0.95) 100%);
    position: relative;
    border-radius: 2px 2px 0 0;
}

.building::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
        transparent 0%,
        rgba(0, 255, 255, 0.6) 50%,
        transparent 100%);
    animation: building-pulse 4s ease-in-out infinite;
}

.building::after {
    content: '';
    position: absolute;
    width: 30%;
    height: 40%;
    background: rgba(255, 20, 147, 0.3);
    top: 20%;
    left: 35%;
    opacity: 0;
    animation: window-flicker 6s ease-in-out infinite;
}

.building-1 {
    width: 60px;
    height: 200px;
    animation-delay: 0s;
}

.building-2 {
    width: 80px;
    height: 280px;
    animation-delay: 0.5s;
}

.building-3 {
    width: 45px;
    height: 160px;
    animation-delay: 1s;
}

.building-4 {
    width: 90px;
    height: 320px;
    animation-delay: 1.5s;
}

.building-5 {
    width: 55px;
    height: 220px;
    animation-delay: 2s;
}

.building-6 {
    width: 70px;
    height: 180px;
    animation-delay: 2.5s;
}

.building-7 {
    width: 65px;
    height: 260px;
    animation-delay: 3s;
}

.building-8 {
    width: 50px;
    height: 140px;
    animation-delay: 3.5s;
}

.neon-glow {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: linear-gradient(0deg, 
        rgba(255, 20, 147, 0.1) 0%,
        rgba(0, 255, 255, 0.05) 50%,
        transparent 100%);
    animation: neon-flicker 3s ease-in-out infinite alternate;
}

.distant-lights {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 20px;
    background-image: 
        radial-gradient(circle at 10% 50%, rgba(255, 20, 147, 0.4) 1px, transparent 2px),
        radial-gradient(circle at 25% 50%, rgba(0, 255, 255, 0.3) 1px, transparent 2px),
        radial-gradient(circle at 40% 50%, rgba(255, 20, 147, 0.2) 1px, transparent 2px),
        radial-gradient(circle at 60% 50%, rgba(0, 255, 255, 0.4) 1px, transparent 2px),
        radial-gradient(circle at 75% 50%, rgba(255, 20, 147, 0.3) 1px, transparent 2px),
        radial-gradient(circle at 90% 50%, rgba(0, 255, 255, 0.2) 1px, transparent 2px);
    background-size: 100px 20px;
    animation: distant-twinkle 8s linear infinite;
}

@keyframes building-pulse {
    0%, 100% {
        opacity: 0.3;
    }
    50% {
        opacity: 0.8;
    }
}

@keyframes window-flicker {
    0%, 90%, 100% {
        opacity: 0;
    }
    5%, 85% {
        opacity: 0.6;
    }
    10%, 80% {
        opacity: 0;
    }
    15%, 75% {
        opacity: 0.4;
    }
}

@keyframes neon-flicker {
    0% {
        opacity: 0.6;
        filter: blur(1px);
    }
    100% {
        opacity: 1;
        filter: blur(0px);
    }
}

@keyframes distant-twinkle {
    0% {
        opacity: 0.6;
    }
    25% {
        opacity: 0.4;
    }
    50% {
        opacity: 0.8;
    }
    75% {
        opacity: 0.5;
    }
    100% {
        opacity: 0.6;
    }
}
</style>