<template>
    <div class="film-grain">
        <canvas ref="grainCanvas" class="grain-canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
const grainCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    if (!grainCanvas.value) return;
    
    const canvas = grainCanvas.value;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const generateGrain = () => {
        if (!ctx) return;
        
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const noise = Math.random() * 255;
            const alpha = Math.random() * 0.15;
            
            data[i] = noise;     // Red
            data[i + 1] = noise; // Green  
            data[i + 2] = noise; // Blue
            data[i + 3] = alpha * 255; // Alpha
        }
        
        ctx.putImageData(imageData, 0, 0);
    };
    
    const animate = () => {
        generateGrain();
        setTimeout(() => requestAnimationFrame(animate), 100);
    };
    
    animate();
});
</script>

<style scoped>
.film-grain {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    pointer-events: none;
    z-index: 8;
    opacity: 0.25;
    mix-blend-mode: multiply;
}

.grain-canvas {
    width: 100%;
    height: 100%;
    filter: contrast(1.2) brightness(1.1);
}
</style>