<script setup lang="ts">
import initialConfig from "@/config/initial.config";
import iconsConfig from "~/config/icons.config";

const { t, locale } = useI18n();
const colorMode = useColorMode();
const route = useRoute();
const getSystemTheme = (): string => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const toggleTheme = (): void => {
  if (colorMode.preference === "system") {
    colorMode.preference = colorMode.value === "light" ? "dark" : "light";
  } else if (colorMode.preference !== getSystemTheme()) {
    const value = colorMode.preference === "light" ? "dark" : "light";
    colorMode.preference = value;
  } else {
    colorMode.preference = "system";
  }
};

function isActive(path: string): boolean {
  const currentLocale = locale.value;
  const currentPath = route.path.replace(/\/\s*$/, "");
  if (path === `/${currentLocale}`) {
    return currentPath === path;
  } else {
    return currentPath.includes(path)
  }
}

const homePath = computed(() => {
  return `/${locale.value}`;
})
const links = computed((): any => {
  const currentLocale = locale.value;
  const alternateLocale = currentLocale === 'en' ? 'ru' : 'en';
  const currentPath = route.path;
  const alternatePath = currentPath.replace(`/${currentLocale}`, `/${alternateLocale}`)
  return [
    {
      label: 'nav_home',
      icon: iconsConfig.nav_home,
      type: 'path',
      action: `/${currentLocale}`
    },
    {
      label: 'nav_projects',
      icon: iconsConfig.nav_projects,
      type: 'path',
      action: `/${currentLocale}/projects`
    },
    {
      icon: iconsConfig.nav_donate,
      type: 'path',
      action: `/${currentLocale}/donate`
    },
    {
      icon: computed(() => {
        if (colorMode.preference === 'system') { return iconsConfig.nav_theme_system; }
        return colorMode.preference === 'dark' ? iconsConfig.nav_theme_dark : iconsConfig.nav_theme_light;
      }).value,
      type: 'action',
      action: toggleTheme
    },
    {
      label: locale.value.toUpperCase(),
      icon: iconsConfig.nav_lang,
      type: 'path',
      action: alternatePath
    }
  ];
})
</script>

<template>
  <nav id="navbar" class="glass">
    <NuxtLink :to="homePath" class="nav__logo">
      <h1 class="nav__logo__name">
        {{ initialConfig.siteName }}
      </h1>
    </NuxtLink>
    <div class="nav">
      <div v-for="link in links" :key="link.icon" class="nav__links">
        <NuxtLink v-if="link.type === 'path'" :to="link.action" :class="`nav__links__default ${isActive(link.action) ? 'active' : ''}`">
          <Icon :name="link.icon" class="nav__links__default__icon" />
          <p v-if="link.label" class="nav__links__default__label">{{ t(link.label) }}</p>
        </NuxtLink>
        <div v-else class="nav__links__default" @click="link.action">
          <Icon :name="link.icon" class="nav__links__default__icon" />
          <p v-if="link.label" class="relative nav__links__default__label">{{ t(link.label) }}</p>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use '/assets/scss/screens.scss' as *;

.glass {
  filter: none !important;
  -webkit-filter: none !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.active {
  color: #502da1 !important;
  font-weight: bold;
  border-bottom: 1px solid;
}

.dark .active {
  color: #FCF58D !important;
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

  @media screen and (max-width: $screen-sm) {
    padding: 0;
    justify-content: center;
  }

  .nav {
    width: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 1.2rem;

    &__links {
      height: 60%;

      &__default {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 0.2rem;
        height: 100%;
        text-decoration: none;
        color: #2C2044;

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
            padding: 0 1rem;
          }
        }
      }

      .dark &__default {
        color: #ffffff;
      }

      &__default:hover {
        color: #40267d;
        cursor: pointer;
      }

      .dark &__default:hover {
        color: #c6c071;
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
    text-decoration: none;

    &__name {
      background: -webkit-linear-gradient(0deg, #A782FF 10%, #9870cc 50%, #4d2e8c 90%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .dark &__name {
      background: -webkit-linear-gradient(0deg, #dcc944 10%, #FCF58D 50%, #a960f5 90%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    @media screen and (max-width: $screen-sm) {
      display: none;
    }
  }
}
</style>

