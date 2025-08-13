<template>
    <div class="floating-geometry">
        <!-- Triangles -->
        <div class="shape triangle" v-for="n in 8" :key="`tri-${n}`" 
             :style="getShapeStyle(n, 'triangle')">
        </div>
        
        <!-- Diamonds -->
        <div class="shape diamond" v-for="n in 6" :key="`dia-${n}`" 
             :style="getShapeStyle(n + 8, 'diamond')">
        </div>
        
        <!-- Hexagons -->
        <div class="shape hexagon" v-for="n in 4" :key="`hex-${n}`" 
             :style="getShapeStyle(n + 14, 'hexagon')">
        </div>
        
        <!-- Circles -->
        <div class="shape circle" v-for="n in 10" :key="`cir-${n}`" 
             :style="getShapeStyle(n + 18, 'circle')">
        </div>
    </div>
</template>

<script setup lang="ts">
const getShapeStyle = (index: number, type: string) => {
    const seed = index * 73.205;
    const x = (seed * 9301 + 49297) % 233280 / 233280 * 100;
    const y = (seed * 9301 + 49297) % 233281 / 233281 * 100;
    
    let size, duration, delay;
    switch(type) {
        case 'triangle':
            size = 15 + (index % 4) * 10;
            duration = 12 + (index % 6);
            delay = index * 1.5;
            break;
        case 'diamond':
            size = 12 + (index % 3) * 8;
            duration = 15 + (index % 5);
            delay = index * 2;
            break;
        case 'hexagon':
            size = 20 + (index % 2) * 15;
            duration = 20 + (index % 4);
            delay = index * 3;
            break;
        case 'circle':
            size = 8 + (index % 5) * 6;
            duration = 10 + (index % 7);
            delay = index * 1;
            break;
    }
    
    return {
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
    };
};
</script>

<style scoped>
.floating-geometry {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    pointer-events: none;
    z-index: -3;
    overflow: hidden;
}

.shape {
    position: absolute;
    animation: float-drift linear infinite, shape-pulse ease-in-out infinite alternate;
    filter: drop-shadow(0 0 5px rgba(255, 0, 255, 0.3));
}

.triangle {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid rgba(0, 255, 255, 0.4);
    animation-name: float-drift, triangle-spin, shape-pulse;
}

.diamond {
    background: rgba(255, 0, 255, 0.3);
    border: 1px solid rgba(255, 0, 255, 0.6);
    transform: rotate(45deg);
    animation-name: float-drift, diamond-wobble, shape-pulse;
}

.hexagon {
    background: rgba(255, 255, 0, 0.2);
    border: 1px solid rgba(255, 255, 0, 0.5);
    clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
    animation-name: float-drift, hexagon-rotate, shape-pulse;
}

.circle {
    background: radial-gradient(
        circle,
        rgba(0, 255, 255, 0.4) 0%,
        rgba(255, 0, 255, 0.2) 50%,
        transparent 100%
    );
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-radius: 50%;
    animation-name: float-drift, circle-phase, shape-pulse;
}

@keyframes float-drift {
    0% {
        transform: translateX(0px) translateY(0px);
    }
    25% {
        transform: translateX(20px) translateY(-30px);
    }
    50% {
        transform: translateX(-15px) translateY(-60px);
    }
    75% {
        transform: translateX(25px) translateY(-90px);
    }
    100% {
        transform: translateX(-10px) translateY(-120px);
    }
}

@keyframes triangle-spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes diamond-wobble {
    0%, 100% {
        transform: rotate(45deg) scale(1);
    }
    25% {
        transform: rotate(50deg) scale(1.1);
    }
    50% {
        transform: rotate(40deg) scale(0.9);
    }
    75% {
        transform: rotate(48deg) scale(1.05);
    }
}

@keyframes hexagon-rotate {
    0% {
        transform: rotate(0deg);
        filter: hue-rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
        filter: hue-rotate(360deg);
    }
}

@keyframes circle-phase {
    0%, 100% {
        transform: scale(1);
        opacity: 0.4;
    }
    50% {
        transform: scale(1.3);
        opacity: 0.8;
    }
}

@keyframes shape-pulse {
    0%, 100% {
        filter: drop-shadow(0 0 5px rgba(255, 0, 255, 0.3)) brightness(0.8);
    }
    50% {
        filter: drop-shadow(0 0 10px rgba(255, 0, 255, 0.6)) brightness(1.2);
    }
}
</style>