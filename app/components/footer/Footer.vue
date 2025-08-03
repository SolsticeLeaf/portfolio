<script setup lang="ts">
import iconsConfig from '~~/config/icons.config';
import Waves from '@@/public/waves.svg?component';
import initialConfig from '~~/config/initial.config';

const { t } = useI18n();

const year = new Date().getFullYear();
</script>

<template>
  <footer>
    <Waves class="waves" />
    <div class="text">
      <p>{{ `Copyright © ${year} by SolsticeLeaf.` }}</p>
      <NuxtLink class="text__mail" :href="`mailto:${initialConfig.mail}`">
        <Icon :name="iconsConfig.email" class="text__mail__icon" />
        <p class="text__mail__text">{{ initialConfig.mail }}</p>
      </NuxtLink>
      <p class="null">{{ `${t('welcome')}, /dev/null™` }}</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.waves {
  width: auto;
  height: 40rem;
  display: flex;
  position: absolute;
  z-index: 1;
}

footer {
  display: flex;
  width: 100%;
  height: 40rem !important;
  justify-content: center;

  .text {
    display: flex;
    flex-direction: column;
    margin-top: 16rem;
    padding: 0 6rem;
    width: 100%;
    height: 24rem;
    z-index: 2;
    align-items: start;
    justify-content: center;
    gap: 1rem;

    &__mail {
      display: flex;
      flex-direction: row;
      gap: 0.2rem;
      text-decoration: none;

      &__text {
        color: #ff00e6 !important;
        font-family: 'Mori-Regular', Helvetica, Arial, sans-serif;
        font-size: 1.5rem;
        font-style: normal;
        font-variation-settings: 'ital' 0, 'wght' 790;
        font-weight: bold;
      }

      &__icon {
        color: #ff00e6;
        width: 1.5rem;
        height: 1.5rem;
      }

      &:hover {
        cursor: pointer;
      }
    }

    p {
      font-family: 'Mori-Regular', Helvetica, Arial, sans-serif;
      font-size: 1.5rem;
      font-style: normal;
      font-variation-settings: 'ital' 0, 'wght' 790;
      font-weight: bold;
      color: #2e2e2e;
    }

    .null {
      color: #636363;
      font-weight: 400;
    }
  }
}
</style>
