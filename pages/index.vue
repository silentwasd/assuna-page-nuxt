<!-- pages/index.vue -->
<template>
  <DecoratorRgbBorder>
    <DecoratorOpacityBackground :opacity="0.8">
      <BlockHello class="p-5 md:p-10" />
    </DecoratorOpacityBackground>
  </DecoratorRgbBorder>

  <!-- 📼 Блок: Каталог кассет -->
  <DecoratorRgbBorder>
    <DecoratorOpacityBackground :opacity="0.8">
      <div class="p-5 md:p-10 font-orbitron text-black">
        <h2 class="text-xl md:text-2xl retro-text mb-4 text-gray-900 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          📼 Моя коллекция кассет
        </h2>
        <p class="mb-4 text-gray-800 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
          За 900 лет я повидала многое, но больше всего меня очаровали винтажные аудиокассеты!
          Особенно японские — с нежными обложками и чистым звуком. BASF, TDK, Sony... Фыр-фыр!
        </p>
        <NuxtLink
            to="/cassettes"
            class="inline-block px-5 py-2.5 bg-pink-900/70 hover:bg-pink-800/80 border border-pink-500 rounded font-orbitron text-pink-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
        >
          🦊 Посмотреть коллекцию
        </NuxtLink>
      </div>
    </DecoratorOpacityBackground>
  </DecoratorRgbBorder>

  <DecoratorRgbBorder>
    <DecoratorOpacityBackground :opacity="0.8">
      <BlockRadio />
    </DecoratorOpacityBackground>
  </DecoratorRgbBorder>

  <DecoratorRgbBorder>
    <DecoratorOpacityBackground :opacity="0.8">
      <BlockSocial class="p-5 md:p-10" />
    </DecoratorOpacityBackground>
  </DecoratorRgbBorder>

  <DecoratorRgbBorder>
    <DecoratorOpacityBackground :opacity="0.8">
      <BlockTime class="p-5 md:p-10" />
    </DecoratorOpacityBackground>
  </DecoratorRgbBorder>
</template>