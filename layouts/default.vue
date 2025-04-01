<script setup lang="ts">
import { Vue3Marquee } from "vue3-marquee";
import NavigationSection from "~/components/section/NavigationSection.vue";
import initialConfig from "@/config/initial.config";

const colorMode = useColorMode();
const nickname = initialConfig.nickname;
const repeatRows = ref(4);

const matchMedia = computed(() => {
  return window.matchMedia("(prefers-color-scheme: dark)");
});
const getTheme = computed(() => {
  const mode = colorMode.value;
  if (!mode || mode === "system") {
    if (matchMedia.value.matches) {
      return "light";
    } else {
      return "dark";
    }
  }
  return mode;
});

const changeColorMode = (event: MediaQueryListEvent) => {
  if (colorMode.preference === "system") {
    colorMode.value = event.matches ? "dark" : "light";
    document.body.setAttribute("data-theme", colorMode.value);
  }
};

function calculateDirection(index: any): "normal" | "reverse" {
  if (index % 2 === 0) {
    return "reverse";
  }
  return "normal";
}

const resizeEvent = function () {
  const row = document.querySelector(".background__text__row");
  const screenHeight = window.innerHeight;
  const clientHeight = row?.clientHeight || 0;
  if (clientHeight > 0) {
    repeatRows.value = Math.ceil(screenHeight / clientHeight) - 1;
  }
};

onMounted(() => {
  document.body.setAttribute("data-theme", getTheme.value);
  matchMedia.value.addEventListener("change", changeColorMode);
  window.addEventListener("resize", resizeEvent);
  nextTick(() => {
    resizeEvent();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeEvent);
  matchMedia.value.removeEventListener("change", changeColorMode);
});
</script>

<template>
  <ClientOnly>
    <div>
      <div class="background__blur">
        <div class="background__text">
          <div v-for="(rowIndex) in repeatRows" :key="'row-' + rowIndex" class="background__text__row">
            <Suspense>
              <Vue3Marquee :duration="60" clone :direction="calculateDirection(rowIndex)">
                <div class="background__text__word">
                  {{ $t(nickname) }}
                </div>
              </Vue3Marquee>
              <template #fallback>
                <div class="skeleton-marquee"/>
              </template>
            </Suspense>
          </div>
        </div>
      </div>
      <div id="body" class="body">
        <div class="footer__top">
          <Suspense>
            <KeepAlive>
              <NavigationSection />
            </KeepAlive>
            <template #fallback>
              <div class="skeleton-nav"/>
            </template>
          </Suspense>
        </div>
        <div class="footer__blank" />
        <Suspense>
          <slot />
        </Suspense>
      </div>
    </div>
  </ClientOnly>
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

    @media screen and (max-width: $screen-xss) {
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
