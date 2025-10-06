<!-- pages/index.vue -->
<template>
  <DecoratorRgbBorder>
    <DecoratorOpacityBackground :opacity="0.8">
      <BlockHello class="p-5 md:p-10" />
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