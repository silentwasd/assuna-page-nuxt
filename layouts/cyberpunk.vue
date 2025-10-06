<!-- layouts/cyberpunk.vue -->
<script setup lang="ts">
</script>

<template>
  <BackgroundCrtCurvature>
    <div class="overflow-hidden relative w-dvh h-dvh">
      <Head>
        <!-- Заголовок будет браться из страницы (pages/*.vue) -->
      </Head>

      <!-- Minimalistic Cyberpunk City Background -->
      <BackgroundCyberpunkCity />

      <!-- VHS Effects Layer -->
      <BackgroundRetroColorFilter />
      <BackgroundVhsTracking />
      <BackgroundFilmGrain />
      <BackgroundVhsScanLines />
      <BackgroundChromaticAberration />
      <BackgroundVhsGlitch />

      <ScrollbarSolidPink />

      <div class="overflow-auto w-full h-full">
        <div class="container mx-auto max-w-4xl flex flex-col gap-5 md:gap-10 px-2.5 py-2.5 md:px-0 md:py-10">
          <!-- Переключатель языка — отображается на всех страницах -->
          <BlockSwitchLanguage class="z-10" />

          <!-- Основной контент страницы (из <NuxtPage />) -->
          <slot />
        </div>
      </div>
    </div>
  </BackgroundCrtCurvature>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Amaranth:ital,wght@0,400;0,700;1,400;1,700&family=Caveat:wght@400..700&family=Dela+Gothic+One&display=swap&family=Oswald:wght@200..700&display=swap&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Orbitron:wght@400;700;900&display=swap');

.font-amaranth {
  font-family: 'Amaranth', serif;
}

.font-caveat {
  font-family: 'Caveat', sans-serif;
}

.font-gothic {
  font-family: 'Dela Gothic One', serif;
  text-shadow:
      0 0 2px currentColor,
      0 0 4px currentColor;
  animation: phosphor-flicker 3s ease-in-out infinite alternate;
}

.font-oswald {
  font-family: 'Oswald', sans-serif;
  text-shadow:
      0 0 1px rgba(255, 20, 147, 0.6),
      0 0 3px rgba(255, 20, 147, 0.3);
}

.font-josefin {
  font-family: 'Josefin Sans', sans-serif;
}

.font-orbitron {
  font-family: 'Orbitron', monospace;
  text-shadow:
      0 0 1px rgba(0, 255, 255, 0.8),
      0 0 3px rgba(0, 255, 255, 0.4);
  letter-spacing: 0.1em;
  animation: crt-glow 2s ease-in-out infinite alternate;
}

.retro-text {
  background: linear-gradient(45deg, #ff1493, #00ffff, #ff1493);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: retro-gradient 4s ease infinite;
  filter: drop-shadow(0 0 3px rgba(255, 20, 147, 0.7));
}

.vhs-text {
  position: relative;
  color: #00ff41;
  text-shadow:
      0 0 2px #00ff41,
      0 0 4px #00ff41;
}

.vhs-text::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  color: #ff0040;
  mix-blend-mode: difference;
  animation: vhs-text-glitch 0.3s infinite linear alternate-reverse;
}

.vhs-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  color: #00ffff;
  mix-blend-mode: difference;
  animation: vhs-text-glitch 0.2s infinite linear alternate;
}

@keyframes phosphor-flicker {
  0%, 100% {
    text-shadow:
        0 0 2px currentColor,
        0 0 4px currentColor;
    opacity: 1;
  }
  50% {
    text-shadow:
        0 0 1px currentColor,
        0 0 3px currentColor;
    opacity: 0.95;
  }
}

@keyframes crt-glow {
  0%, 100% {
    text-shadow:
        0 0 1px rgba(0, 255, 255, 0.8),
        0 0 3px rgba(0, 255, 255, 0.4);
  }
  50% {
    text-shadow:
        0 0 2px rgba(0, 255, 255, 0.9),
        0 0 4px rgba(0, 255, 255, 0.5);
  }
}

@keyframes retro-gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes vhs-text-glitch {
  0% {
    transform: translateX(0px);
    opacity: 0.8;
  }
  20% {
    transform: translateX(-1px);
    opacity: 0.6;
  }
  40% {
    transform: translateX(1px);
    opacity: 0.9;
  }
  60% {
    transform: translateX(-0.5px);
    opacity: 0.7;
  }
  80% {
    transform: translateX(0.5px);
    opacity: 0.8;
  }
  100% {
    transform: translateX(0px);
    opacity: 0.85;
  }
}
</style>