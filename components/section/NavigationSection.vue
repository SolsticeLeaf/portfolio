<script setup lang="ts">
import initialConfig from "@/config/initial.config.ts";

const { locale } = useI18n()
const route = useRoute()
const siteName = initialConfig.siteName;

const links = computed((): [any] => {
  const currentLocale = locale.value;
  const alternateLocale = currentLocale === 'en' ? 'ru' : 'en';
  const currentPath = route.path;
  const alternatePath = currentPath.replace(`/${currentLocale}`, `/${alternateLocale}`)
  return [
    {
      label: 'nav_home',
      icon: 'i-heroicons-home',
      to: `/${currentLocale}/`
    },
    {
      label: 'nav_projects',
      icon: 'i-heroicons-queue-list',
      to: `/${currentLocale}/projects/`
    },
    {
      icon: 'i-heroicons-heart',
      to: `/${currentLocale}/donate/`
    },
    {
      label: alternateLocale.toUpperCase(),
      icon: 'i-heroicons-globe-alt',
      to: alternatePath
    }
  ];
})
</script>

<template>
  <ClientOnly>
    <nav id="navbar">
      <ULink to="/" class="nav__logo">
        <a class="nav__logo__name">
          {{ $t(siteName) }}
        </a>
      </ULink>
      <UHorizontalNavigation :links="links" class="nav__links" >
        <template #icon="{ link }">
          <UIcon :name="link.icon" class="nav__links__icon" />
        </template>
        <template #default="{ link }">
          <span v-if="link.label" class="group-hover:sky relative nav__links__label">{{ $t(link.label) }}</span>
        </template>
      </UHorizontalNavigation>
    </nav>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use "assets/scss/variables" as *;

//* {
//  border: 1px solid deepskyblue !important;
//}

nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  vertical-align: middle;
  width: 100%;
  padding: 1.5vw 7%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  @media screen and (max-width: $screen-xss) {
    justify-content: center;
  }

  .nav__logo {
    width: fit-content;
    height: 100%;
    max-height: 100%;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &__name {
      position: relative !important;
      font-size: 2vw;
      background: -webkit-linear-gradient(0deg, rgb(2, 127, 252) 35%, rgb(3, 209, 255) 51%, rgb(5, 209, 255) 86%, rgb(2, 254, 216) 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 2vw;

      @media screen and (max-width: $screen-md) {
        font-size: 2em;
        line-height: 2em;
      }
    }

    @media screen and (max-width: $screen-xss) {
      display: none;
    }
  }

  .nav__links {
    width: fit-content;
    height: inherit;
    padding: 0 !important;
    margin: 0 !important;

    &__label {
      font-size: 0.7vw;

      @media screen and (max-width: $screen-md) {
        font-size: 1.3em;
      }

      @media screen and (max-width: $screen-sm) {
        display: none;
      }
    }

    &__icon {
      width: 1.2rem;
      height: 1.2rem;

      @media screen and (max-width: $screen-md) {
        width: 1.6rem;
        height: 1.6rem;
      }

      @media screen and (max-width: $screen-sm) {
        padding: 0 1.6rem;
        color: $p-color-dark;
      }
    }
  }
}
</style>
