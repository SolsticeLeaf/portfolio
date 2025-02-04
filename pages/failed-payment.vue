<script setup lang="ts">
const { locale } = useI18n()

const getProjectsPath = computed(() => {
  const currentLocale = locale.value;
  return `/${currentLocale}/`
})
</script>

<template>
  <ClientOnly>
    <div class="wrapper">
      <div class="card">
        <div class="blur__glass">
          <div class="card__title">
            {{ $t('donate_error') }}
          </div>
          <div class="card__bottom">
            <UButton color="red"
                     block
                     :to="getProjectsPath"
                     variant="soft"
                     :ui="{ rounded: 'rounded-full' }"
                     class="card__bottom__button"
            >
              <UIcon name="i-heroicons-x-mark-20-solid" class="w-5 h-5" />
              {{ $t('donate_button_home') }}
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables.scss' as *;

.donate-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: auto;
}

.card {
  display: flex;
  flex-direction: column;

  &__title {
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
    padding-bottom: 1rem;
  }

  &__bottom {

    &__button {
      display: flex;
      justify-content: center;
    }

  }
}

</style>