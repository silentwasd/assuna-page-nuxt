<template>
    <div class="energy-orbs">
        <!-- Large energy orbs -->
        <div class="orb large" v-for="n in 4" :key="`large-${n}`" 
             :style="getOrbStyle(n, 'large')">
            <div class="orb-core"></div>
            <div class="orb-ring ring-1"></div>
            <div class="orb-ring ring-2"></div>
        </div>
        
        <!-- Medium energy orbs -->
        <div class="orb medium" v-for="n in 6" :key="`medium-${n}`" 
             :style="getOrbStyle(n + 4, 'medium')">
            <div class="orb-core"></div>
            <div class="orb-ring ring-1"></div>
        </div>
        
        <!-- Small energy orbs -->
        <div class="orb small" v-for="n in 12" :key="`small-${n}`" 
             :style="getOrbStyle(n + 10, 'small')">
            <div class="orb-core"></div>
        </div>
        
        <!-- Energy trails -->
        <div class="energy-trail" v-for="n in 8" :key="`trail-${n}`" 
             :style="getTrailStyle(n)"></div>
    </div>
</template>

<script setup lang="ts">
const getOrbStyle = (index: number, size: string) => {
    const seed = index * 91.123;
    const x = (seed * 9301 + 49297) % 233280 / 233280 * 90 + 5;
    const y = (seed * 9301 + 49297) % 233281 / 233281 * 90 + 5;
    
    let orbSize, duration, delay;
    switch(size) {
        case 'large':
            orbSize = 80 + (index % 3) * 20;
            duration = 8 + (index % 4);
            delay = index * 2;
            break;
        case 'medium':
            orbSize = 40 + (index % 4) * 10;
            duration = 6 + (index % 3);
            delay = index * 1.5;
            break;
        case 'small':
            orbSize = 20 + (index % 3) * 8;
            duration = 4 + (index % 2);
            delay = index * 0.8;
            break;
    }
    
    return {
        left: `${x}%`,
        top: `${y}%`,
        width: `${orbSize}px`,
        height: `${orbSize}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
    };
};

const getTrailStyle = (index: number) => {
    const seed = index * 42.857;
    const x = (seed * 9301 + 49297) % 233280 / 233280 * 100;
    const y = (seed * 9301 + 49297) % 233281 / 233281 * 100;
    const rotation = index * 45;
    
    return {
        left: `${x}%`,
        top: `${y}%`,
        transform: `rotate(${rotation}deg)`,
        animationDelay: `${index * 1.2}s`
    };
};
</script>

<style scoped>
.energy-orbs {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    pointer-events: none;
    z-index: -3;
    overflow: hidden;
}

.orb {
    position: absolute;
    border-radius: 50%;
    animation: orb-float ease-in-out infinite alternate, orb-pulse ease-in-out infinite;
}

.orb-core {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40%;
    height: 40%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.9) 0%,
        rgba(0, 255, 255, 0.7) 30%,
        rgba(255, 0, 255, 0.5) 70%,
        transparent 100%
    );
    animation: core-pulse 2s ease-in-out infinite alternate;
}

.orb-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid;
    animation: ring-rotate linear infinite;
}

.ring-1 {
    width: 70%;
    height: 70%;
    border-color: rgba(0, 255, 255, 0.4);
    animation-duration: 4s;
}

.ring-2 {
    width: 90%;
    height: 90%;
    border-color: rgba(255, 0, 255, 0.3);
    animation-duration: 6s;
    animation-direction: reverse;
}

.large {
    background: radial-gradient(
        circle,
        rgba(255, 0, 255, 0.1) 0%,
        rgba(0, 255, 255, 0.2) 30%,
        rgba(255, 20, 147, 0.1) 60%,
        transparent 100%
    );
    box-shadow: 
        0 0 20px rgba(255, 0, 255, 0.3),
        inset 0 0 20px rgba(0, 255, 255, 0.2);
}

.medium {
    background: radial-gradient(
        circle,
        rgba(0, 255, 255, 0.15) 0%,
        rgba(255, 255, 0, 0.1) 40%,
        rgba(255, 0, 255, 0.08) 70%,
        transparent 100%
    );
    box-shadow: 
        0 0 15px rgba(0, 255, 255, 0.4),
        inset 0 0 15px rgba(255, 255, 0, 0.2);
}

.small {
    background: radial-gradient(
        circle,
        rgba(255, 255, 0, 0.2) 0%,
        rgba(255, 0, 255, 0.15) 50%,
        transparent 80%
    );
    box-shadow: 
        0 0 10px rgba(255, 255, 0, 0.5),
        inset 0 0 10px rgba(255, 0, 255, 0.3);
}

.energy-trail {
    position: absolute;
    width: 200px;
    height: 2px;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(0, 255, 255, 0.6) 30%,
        rgba(255, 0, 255, 0.8) 50%,
        rgba(255, 255, 0, 0.6) 70%,
        transparent 100%
    );
    animation: trail-streak 3s ease-in-out infinite;
}

@keyframes orb-float {
    0%, 100% {
        transform: translateY(0px) translateX(0px);
    }
    50% {
        transform: translateY(-20px) translateX(10px);
    }
}

@keyframes orb-pulse {
    0%, 100% {
        opacity: 0.6;
        transform: scale(1);
    }
    50% {
        opacity: 1;
        transform: scale(1.1);
    }
}

@keyframes core-pulse {
    0%, 100% {
        opacity: 0.8;
        transform: translate(-50%, -50%) scale(1);
    }
    50% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.2);
    }
}

@keyframes ring-rotate {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

@keyframes trail-streak {
    0%, 100% {
        opacity: 0;
        transform: translateX(-100px) scale(1);
    }
    50% {
        opacity: 0.8;
        transform: translateX(100px) scale(1.2);
    }
}
</style>