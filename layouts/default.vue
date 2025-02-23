<script setup lang="ts">
import {Vue3Marquee} from "vue3-marquee";
import NavigationSection from "~/components/section/NavigationSection.vue";
import AnnouncementSection from "~/components/section/AnnouncementSection.vue";
import initialConfig from "@/config/initial.config";

const colorMode = useColorMode();
const nickname = initialConfig.nickname;
const repeatRows = ref(4);

const matchMedia = computed(() => {
  return window.matchMedia('(prefers-color-scheme: dark)')
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

const changeColorMode = (event:  MediaQueryListEvent) => {
  if (colorMode.preference === 'system') {
    colorMode.value = event.matches ? "dark" : "light";
    document.body.setAttribute("data-theme", colorMode.value);
  }
}

function calculateDirection(index: any) : 'normal' | 'reverse' {
  if (index % 2 === 0) { return "reverse"; }
  return "normal";
}
const resizeEvent = function() {
  const row = document.querySelector('.background__text__row');
  const screenHeight = window.innerHeight;
  const clientHeight = row!.clientHeight;
  if (clientHeight > 0) {
    repeatRows.value = Math.ceil(screenHeight / clientHeight) - 1;
  }
}

onMounted(() => {
  document.body.setAttribute("data-theme", getTheme.value);
  matchMedia.value.addEventListener('change', changeColorMode);
  window.addEventListener('resize', resizeEvent);
  nextTick(() => {
    resizeEvent();
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeEvent);
  matchMedia.value.removeEventListener('change', changeColorMode);
})
</script>

<template>
  <div>
    <div class="background__blur">
      <div class="background__text">
        <div v-for="(rowIndex) in repeatRows" :key="'row-' + rowIndex" class="background__text__row">
          <Vue3Marquee :duration="60" clone :direction='calculateDirection(rowIndex)' >
            <div class="background__text__word">
              {{ $t(nickname) }}
            </div>
          </Vue3Marquee>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="footer__top">
        <NavigationSection/>
      </div>
      <slot/>
      <div class="footer__bottom"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/screens' as *;

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;

  @media screen and (max-width: $screen-sm) {
    height: fit-content;
  }
}

.footer {

  &__top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100vw;
    height: 12vh;
  }

  &__bottom {
    display: flex;
    width: 100vw;
    height: 8vh;
  }
}

.background {
  &__blur {
    background-color: transparent;
    width: 100%;
    height: 100%;
    position: absolute;
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
    font-size: var(--text-size, 6vw);
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
      word-spacing: 0.2vw;
    }

    &__word {
      font-size: 6vw;
      padding: 0 1.5vw;
      display: inline-flex;
      color: transparent !important;
      -webkit-text-stroke: var(--text-stroke) var(--background-word);
    }
  }
}
</style>
