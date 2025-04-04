<script setup lang="ts">
import { Vue3Marquee } from "vue3-marquee";
import initialConfig from "@/config/initial.config";
import NavigationSection from "~/components/section/NavigationSection.vue";

const { t } = useI18n()
const nickname = initialConfig.nickname;
const repeatRows = ref(4);

function calculateDirection(index: any): "normal" | "reverse" {
  return (index % 2 === 0) ? "reverse" : "normal";
}

const resizeEvent = function () {
  const row = document.querySelector(".background__text__row");
  const screenHeight = window.innerHeight;
  const clientHeight = row?.clientHeight || 0;
  if (clientHeight > 0) {
    repeatRows.value = Math.ceil(screenHeight / clientHeight) - 1;
  }
};

onBeforeMount(() => {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const theme = localStorage.getItem("theme");
  document.documentElement.setAttribute("data-theme", (!theme || theme === "system") ? systemTheme : theme);
  window.addEventListener("resize", resizeEvent);
  nextTick(() => {
    resizeEvent();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeEvent);
});
</script>

<template>
  <Body>
    <NuxtLayout>
      <div class="background__blur">
        <div class="background__text">
          <div v-for="(rowIndex) in repeatRows" :key="'row-' + rowIndex" class="background__text__row">
            <ClientOnly>
              <KeepAlive>
                <Suspense>
                  <Vue3Marquee :duration="60" clone :direction="calculateDirection(rowIndex)">
                    <div class="background__text__word">
                      {{ t(nickname) }}
                    </div>
                  </Vue3Marquee>
                  <template #fallback>
                    <div class="skeleton-marquee"/>
                  </template>
                </Suspense>
              </KeepAlive>
            </ClientOnly>
          </div>
        </div>
      </div>
      <div id="body" class="body">
        <div class="footer__top">
          <ClientOnly>
            <KeepAlive>
              <Suspense>
                <NavigationSection />
              </Suspense>
            </KeepAlive>
          </ClientOnly>
        </div>
        <div class="footer__blank" />
        <Suspense>
          <NuxtPage />
        </Suspense>
      </div>
    </NuxtLayout>
  </Body>
</template>

<style scoped lang="scss">
@use "@/assets/scss/screens" as *;

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  width: 100vw;
  max-width: 100vw;
}

.footer {
  &__top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    height: 6rem;
    z-index: 15;

    @media screen and (max-width: $screen-xss) {
      height: 4rem;
    }
  }

  &__blank {
    display: flex;
    width: 100%;
    height: 6rem;

    @media screen and (max-width: $screen-xss) {
      height: 4rem;
    }
  }

  &__bottom {
    display: flex;
    width: 100%;
    height: 8rem;
  }
}

.background {
  &__blur {
    background-color: transparent;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-direction: row;
    filter: var(--blur);
    -webkit-filter: var(--blur);
    justify-content: center;
    align-items: center;

    @media screen and (max-width: $screen-sm) {
      display: none;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: var(--text-size, 6rem);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: default;

    @media screen and (max-width: $screen-xss) {
      display: none;
    }

    &__row {
      display: flex;
      justify-content: space-evenly;
      white-space: nowrap;
      width: 100%;
      word-spacing: 0.2rem;
    }

    &__word {
      font-size: 7.5rem;
      padding: 0 1.5rem;
      display: inline-flex;
      color: transparent !important;
      -webkit-text-stroke: var(--text-stroke) var(--background-word);

      @media screen and (max-width: $screen-lg) {
        font-size: 5rem;
      }
    }
  }
}

.skeleton-marquee {
  width: 100%;
  height: 7.5rem;
  background: var(--background);
  animation: pulse 1.5s infinite;
}

.skeleton-nav {
  width: 100%;
  height: 6rem;
  background: var(--background);
  animation: pulse 1.5s infinite;
}
</style>
