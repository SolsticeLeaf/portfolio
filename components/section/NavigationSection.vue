<script setup lang="ts">
import initialConfig from "@/config/initial.config";

const colorMode = useColorMode();
const { locale } = useI18n()
const route = useRoute()
const siteName = initialConfig.siteName;

function setTheme(theme: 'light' | 'dark') {
  colorMode.value = theme;
  colorMode.preference = theme;
  document.body.setAttribute("data-theme", theme);
}

function changeTheme() {
  const preferences = colorMode.preference;
  const mode = colorMode.value;
  const preferTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  if (preferences === 'system') {
    setTheme(preferTheme === 'dark' ? 'light' : 'dark');
  } else if (preferTheme !== mode) {
    setTheme(preferTheme);
  } else {
    colorMode.preference = 'system';
    colorMode.value = preferTheme;
    document.body.setAttribute("data-theme", preferTheme);
  }
}

function isActive(path: string): boolean {
  const currentLocale = locale.value;
  const currentPath = route.path.replace(/\/\s*$/, "");
  if (path === `/${currentLocale}`) {
    return currentPath === path;
  } else {
    return currentPath.includes(path)
  }
}

const links = computed((): any => {
  const currentLocale = locale.value;
  const alternateLocale = currentLocale === 'en' ? 'ru' : 'en';
  const currentPath = route.path;
  const alternatePath = currentPath.replace(`/${currentLocale}`, `/${alternateLocale}`)
  return [
    {
      label: 'nav_home',
      icon: 'i-heroicons-home',
      type: 'path',
      action: `/${currentLocale}`
    },
    {
      label: 'nav_projects',
      icon: 'i-heroicons-queue-list',
      type: 'path',
      action: `/${currentLocale}/projects`
    },
    {
      icon: 'i-heroicons-heart',
      type: 'path',
      action: `/${currentLocale}/donate`
    },
    {
      icon: computed(() => {
        if (colorMode.preference === 'system') { return 'i-heroicons-computer-desktop'; }
        return colorMode.value === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun';
      }).value,
      type: 'action',
      action: changeTheme
    },
    {
      label: locale.value.toUpperCase(),
      icon: 'i-heroicons-globe-alt',
      type: 'path',
      action: alternatePath
    }
  ];
})
</script>

<template>
  <ClientOnly>
    <nav id="navbar" class="glass">
      <a href="/" class="nav__logo">
        <h1 class="nav__logo__name">
          {{ $t(siteName) }}
        </h1>
      </a>
      <div class="nav">
        <div v-for="link in links" :key="link.icon" class="nav__links">
          <nuxt-link v-if="link.type === 'path'" :to="link.action" :class="isActive(link.action) ? 'nav__links__active' : 'nav__links__default'">
            <UIcon :name="link.icon" :class="isActive(link.action) ? 'nav__links__active__icon' : 'nav__links__default__icon'" />
            <p v-if="link.label" :class="isActive(link.action) ? 'nav__links__active__label' : 'nav__links__default__label'">{{ $t(link.label) }}</p>
          </nuxt-link>
          <div v-else class="nav__links__default" @click="link.action">
            <UIcon :name="link.icon" class="nav__links__default__icon" />
            <p v-if="link.label" class="relative nav__links__default__label">{{ $t(link.label) }}</p>
          </div>
        </div>
      </div>
    </nav>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use '../../assets/scss/screens' as *;

//* {
//  border: 1px solid deepskyblue !important;
//}

:root {
  color-scheme: dark;
}

.glass {
  filter: none !important;
  -webkit-filter: none !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

nav {
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  width: 100%;
  padding-left: 6rem;
  padding-right: 6rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  justify-content: space-between;

  @media screen and (max-width: $screen-xss) {
    justify-content: center;
  }

  .nav {
    width: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 1rem;

    &__links {
      height: 60%;

      &__default {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 0.2rem;
        height: 100%;
        color: var(--text-navigation);

        &__label {
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
          }
        }
      }

      &__active {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        height: 100%;
        border-bottom: 2px var(--nav-active) solid;
        color: var(--text-navigation);
        gap: 0.2rem;

        &__label {
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
          }
        }
      }

      &__default:hover {
        cursor: pointer;
        color: var(--nav-hover);
      }

      &__active:hover {
        cursor: pointer;
        color: var(--nav-hover);
      }
    }
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
    font-weight: bold;

    &__name {
      position: relative !important;
      background: var(--logo-gradient);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    @media screen and (max-width: $screen-xss) {
      display: none;
    }
  }
}
</style>
