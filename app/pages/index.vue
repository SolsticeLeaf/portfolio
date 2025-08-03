<script setup lang="ts">
import Separator from '~/components/utilities/Separator.vue';
</script>

<template>
  <ClientOnly>
    <div class="wrapper">
      <div class="hero">
        <section class="main">
          <div class="main__left">
            <NuxtImg class="main__left__img" src="https://s3.sleaf.dev/portfolio/astronaut.webp" loading="lazy" decoding="async" placeholder />
          </div>
          <div class="main__right">
            <h1 class="main__right__title">Hello, remember no-ai coding?</h1>
            <h4 class="main__right__text">
              {{
                'Your new coding bestie, now available in your favourite terminal. Your tools, your code, and your workflows, wired into your LLM of choice. This is artificial intelligence made glamourous.\n\nAvailable now for macOS, Linux, Windows, and BSD.'
              }}
            </h4>
          </div>
        </section>
        <Separator />
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  z-index: 1;
  width: 100%;
  height: 300vh;
  align-items: center;
}

.hero {
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 80%;
  align-items: center;
  padding-top: 40vh;
}

.main {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  color: #ffffff;
  justify-content: center;
  padding-bottom: 5rem;

  &__left {
    display: flex;

    &__img {
      width: 30rem;
      height: 30rem;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    align-self: flex-end;
    gap: 1rem;
    width: 50%;

    &__title {
      font-family: 'Mori-SemiBold', Helvetica, Arial, sans-serif;
      font-size: 5rem;
      font-style: normal;
      font-variation-settings: 'ital' 0, 'wght' 790;
      font-weight: 400;
      height: fit-content;
    }

    &__text {
      display: flex;
      font-family: 'Mori-Regular', Helvetica, Arial, sans-serif;
      font-size: 1.5rem;
      font-style: normal;
      font-variation-settings: 'ital' 0, 'wght' 790;
      font-weight: bold;
      height: fit-content;
      white-space: pre-line;
      width: 100%;
      text-wrap: balance;
      word-break: break-all;
    }
  }
}
</style>
