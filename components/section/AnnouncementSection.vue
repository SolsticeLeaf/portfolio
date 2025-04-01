<script setup lang="ts">
import {Vue3Marquee} from "vue3-marquee";
const { isDesktop } = useDevice();
const { locale } = useI18n()
import initialConfig from "~/config/initial.config.js";
const { data: announcements, status: status } = useFetch('/api/getAnnouncementsData', {
  key: 'announcements',
  default: () => [],
  cache: "no-cache",
  server: false
});

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

const isShow = computed(() => {
  return (status.value === "success") && (announcements.value !== null && announcements.value.length > 0)
})

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
      <div class="announcements" v-if="isShow">
        <Vue3Marquee v-if="isLoaded" pause-on-hover clone :duration="duration">
          <p class="announcements__text" v-for="announcement in announcements" v-bind:key="announcement">
            {{ getLocaled(announcement) }}
          </p>
        </Vue3Marquee>
      </div>
    </Suspense>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use '../../assets/scss/screens' as *;

.announcements {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 50;
  background: var(--announcements-gradient);

  .announcements__text {
    padding-left: 20rem;
    font-weight: bold;
    color: var(--text-announcements);

    @media screen and (max-width: $screen-md) {
      padding-left: 10rem;
    }
  }
}
</style>
