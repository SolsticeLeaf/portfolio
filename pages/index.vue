<script setup lang="ts">
import HeroSection from "~/components/section/HeroSection.vue";
import config from "~/config/initial.config";

useHead({
          title: config.nickname
        });
</script>

<template>
  <section>
    <HeroSection />
  </section>
</template>

<style scoped lang="scss">
</style>