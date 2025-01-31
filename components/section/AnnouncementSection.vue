<script setup lang="ts">
import {Vue3Marquee} from "vue3-marquee";
const { isDesktop } = useDevice();
const { locale } = useI18n()
const { data: announcements, status: status } = await useFetch('/api/getAnnouncementsData');
import initialConfig from "~/config/initial.config.js";

const duration = ref(0);
const isLoaded = ref(false);

onMounted(() => {
  const config = initialConfig.announcements
  if (isDesktop) {
    duration.value = config.desktopSpeed;
    isLoaded.value = true;
  } else {
    duration.value = config.otherSpeed;
    isLoaded.value = true;
  }
});

function isShow(): boolean {
  return (status.value === "success") && (announcements.value !== null && announcements.value.length > 0)
}

function getLocaled(value: any): string {
  const currentLocale = locale.value;
  const localed = value[currentLocale]
  if (localed) {
    return localed
  }
  return value["en"]
}
</script>

<template>
  <ClientOnly>
    <Suspense>
      <div class="announcements" v-if="isShow()">
        <Vue3Marquee v-if="isLoaded" pause-on-hover clone :duration="duration">
          <div class="announcements__text" v-for="announcement in announcements" v-bind:key="announcement">
            {{ getLocaled(announcement) }}
          </div>
        </Vue3Marquee>
      </div>
    </Suspense>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use "assets/scss/variables" as *;

.announcements {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2vw;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 50;
  background: -webkit-linear-gradient(0deg, rgb(229, 3, 254) 19%, rgb(132, 2, 254) 100%);

  .announcements__text {
    padding-left: 20rem;
    font-weight: bold;
    font-size: 1vw;

    @media screen and (max-width: $screen-md) {
      padding-left: 10rem;
      font-size: 1rem;
    }

    @media screen and (max-width: $screen-sm) {
      font-size: 1rem;
    }
  }

  @media screen and (max-width: $screen-md) {
    height: 7vw;
  }

  @media screen and (max-width: $screen-sm) {
    height: 2.2rem;
  }
}
</style>