<template>
    <div class="laser-beams">
        <!-- Horizontal scanning beams -->
        <div class="laser horizontal" v-for="n in 3" :key="`h-${n}`" 
             :style="getHorizontalBeamStyle(n)"></div>
        
        <!-- Vertical scanning beams -->
        <div class="laser vertical" v-for="n in 2" :key="`v-${n}`" 
             :style="getVerticalBeamStyle(n)"></div>
        
        <!-- Diagonal cross beams -->
        <div class="laser diagonal-left"></div>
        <div class="laser diagonal-right"></div>
        
        <!-- Pulse beams from corners -->
        <div class="pulse-beam top-left"></div>
        <div class="pulse-beam top-right"></div>
        <div class="pulse-beam bottom-left"></div>
        <div class="pulse-beam bottom-right"></div>
    </div>
</template>

<script setup lang="ts">
const getHorizontalBeamStyle = (index: number) => {
    const top = 20 + index * 30;
    const duration = 4 + index * 1.5;
    const delay = index * 2;
    
    return {
        top: `${top}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`
    };
};

const getVerticalBeamStyle = (index: number) => {
    const left = 25 + index * 50;
    const duration = 6 + index * 2;
    const delay = index * 3;
    
    return {
        left: `${left}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`
    };
};
</script>

<style scoped>
.laser-beams {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
}

.laser {
    position: absolute;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(0, 255, 255, 0.8) 50%,
        transparent 100%
    );
    animation: laser-scan linear infinite;
    mix-blend-mode: screen;
}

.horizontal {
    width: 100%;
    height: 2px;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(0, 255, 255, 0.6) 30%,
        rgba(255, 0, 255, 0.8) 50%,
        rgba(255, 0, 255, 0.6) 70%,
        transparent 100%
    );
    animation: horizontal-scan 6s ease-in-out infinite;
    box-shadow: 
        0 0 5px rgba(0, 255, 255, 0.5),
        0 0 10px rgba(255, 0, 255, 0.3);
}

.vertical {
    width: 2px;
    height: 100%;
    background: linear-gradient(
        180deg,
        transparent 0%,
        rgba(255, 0, 255, 0.6) 30%,
        rgba(0, 255, 255, 0.8) 50%,
        rgba(0, 255, 255, 0.6) 70%,
        transparent 100%
    );
    animation: vertical-scan 8s ease-in-out infinite;
    box-shadow: 
        0 0 5px rgba(255, 0, 255, 0.5),
        0 0 10px rgba(0, 255, 255, 0.3);
}

.diagonal-left {
    width: 100%;
    height: 1px;
    top: 0;
    left: 0;
    background: linear-gradient(
        45deg,
        transparent 0%,
        rgba(255, 255, 0, 0.4) 50%,
        transparent 100%
    );
    transform: rotate(45deg);
    transform-origin: top left;
    animation: diagonal-sweep 12s ease-in-out infinite;
}

.diagonal-right {
    width: 100%;
    height: 1px;
    top: 0;
    right: 0;
    background: linear-gradient(
        -45deg,
        transparent 0%,
        rgba(255, 255, 0, 0.4) 50%,
        transparent 100%
    );
    transform: rotate(-45deg);
    transform-origin: top right;
    animation: diagonal-sweep 12s ease-in-out infinite reverse;
}

.pulse-beam {
    width: 200px;
    height: 200px;
    background: radial-gradient(
        circle,
        rgba(255, 0, 255, 0.3) 0%,
        rgba(0, 255, 255, 0.2) 30%,
        transparent 70%
    );
    border-radius: 50%;
    animation: corner-pulse 5s ease-in-out infinite;
}

.top-left {
    top: -100px;
    left: -100px;
    animation-delay: 0s;
}

.top-right {
    top: -100px;
    right: -100px;
    animation-delay: 1.25s;
}

.bottom-left {
    bottom: -100px;
    left: -100px;
    animation-delay: 2.5s;
}

.bottom-right {
    bottom: -100px;
    right: -100px;
    animation-delay: 3.75s;
}

@keyframes horizontal-scan {
    0%, 100% {
        transform: translateX(-100%);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    50% {
        transform: translateX(0%);
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateX(100%);
        opacity: 0;
    }
}

@keyframes vertical-scan {
    0%, 100% {
        transform: translateY(-100%);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    50% {
        transform: translateY(0%);
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(100%);
        opacity: 0;
    }
}

@keyframes diagonal-sweep {
    0%, 100% {
        opacity: 0;
        transform: rotate(45deg) translateX(-50%);
    }
    50% {
        opacity: 0.6;
        transform: rotate(45deg) translateX(50%);
    }
}

@keyframes corner-pulse {
    0%, 100% {
        transform: scale(0.5);
        opacity: 0;
    }
    50% {
        transform: scale(1.5);
        opacity: 0.8;
    }
}
</style>