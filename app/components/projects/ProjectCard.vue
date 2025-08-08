<script setup lang="ts">
const config = useAppConfig();
const { t, locale } = useI18n();

defineProps({
  project: {
    type: Object,
    required: true,
  },
  isSmall: {
    type: Boolean,
    defailt: false,
  },
});

function getDescription(description: any): string {
  const currentLocale = locale.value;
  const localed = description[currentLocale];
  if (localed) {
    return localed;
  }
  return description['en'];
}
</script>

<template>
  <div class="card"></div>
</template>

<style scoped lang="scss">
@use '../../assets/scss/screens' as *;

.card {
  height: fit-content;
  display: flex;
  height: 18rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px red solid;
}
</style>
