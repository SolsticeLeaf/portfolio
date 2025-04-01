<script setup lang="ts">
import config from "~/config/initial.config";

const { locale, getLocaleMessage } = useI18n()

onMounted(() => {
  useHead({
    title: getLocaleMessage(locale.value)["donate_error"] + " | " + config.siteName
  });
})

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
          <h6 class="card__title">
            {{ $t('donate_error') }}
          </h6>
          <div class="card__bottom">
            <a :href="getProjectsPath" class="card__bottom__button">
              <el-button class="card__bottom__button" color="red" round>
                <icons icon="fa-solid fa-xmark" class="card__bottom__button__text icon_padding_right" />
                <p class="card__bottom__button__text">{{ $t('donate_button_home') }}</p>
              </el-button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use 'assets/scss/screens' as *;

.wrapper {
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;

  @media screen and (max-width: $screen-sm) {
    padding: 1rem;
  }
}

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
    padding-bottom: 1rem;
    color: var(--text-color-primary)
  }

  &__bottom {
    display: flex;
    width: 100%;
    justify-content: center;
    justify-items: center;

    &__button {
      width: 100%;
      height: 2.5rem;

      &__text {
        color: var(--text-color-light);
      }
    }
  }
}

</style>
