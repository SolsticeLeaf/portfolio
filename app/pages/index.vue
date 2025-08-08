<script setup lang="ts">
import Calendar from '~/components/gitlab/Calendar.vue';
import Separator from '~/components/utilities/Separator.vue';

const config = useAppConfig();
</script>

<template>
  <div class="wrapper">
    <div class="hero">
      <section class="main-section">
        <div class="main-section__left">
          <NuxtImg class="main-section__left__img" :src="config.images.astronautImg" loading="lazy" decoding="async" placeholder />
        </div>
        <div class="main-section__right">
          <h1 class="main-section__right__title">Hello, remember no-ai coding?</h1>
          <h4 class="main-section__right__text">
            {{
              'Your new coding bestie, now available in your favourite terminal. Your tools, your code, and your workflows, wired into your LLM of choice. This is artificial intelligence made glamourous.\n\nAvailable now for macOS, Linux, Windows, and BSD.'
            }}
          </h4>
        </div>
      </section>
      <Separator />
      <div class="calendar-section">
        <Calendar />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  z-index: 1;
  width: 100%;
  align-items: center;
}

.hero {
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 80%;
  align-items: center;
}

.main-section {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 95vh;
  color: #ffffff;
  justify-content: center;

  &__left {
    display: flex;
    align-items: baseline;
    align-self: flex-end;

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

.calendar-section {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
}
</style>
