<script setup lang="ts">
import HeroSection from "~/components/section/HeroSection.vue";
import config from "~/config/initial.config";

onMounted(() => {
  useHead({
    title: config.nickname
  });
})
</script>

<template>
  <HeroSection />
</template>

<style scoped lang="scss">
</style>
