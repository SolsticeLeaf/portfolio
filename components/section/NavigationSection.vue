<script setup lang="ts">
import initialConfig from "@/config/initial.config";

const { t, locale } = useI18n()
const route = useRoute()
const siteName = initialConfig.siteName;
const getSystemTheme = (): string => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const theme = ref<string>(localStorage.getItem("theme") || getSystemTheme());

const setTheme = (newTheme: string) => {
  localStorage.setItem("theme", newTheme);
  theme.value = newTheme;
  if (newTheme === "system") {
    document.documentElement.setAttribute("data-theme", getSystemTheme());
  } else {
    document.documentElement.setAttribute("data-theme", newTheme);
  }
};
const toggleTheme = (): void => {
  const currentTheme = theme.value;
  if (currentTheme === "system") {
    setTheme(getSystemTheme() === "light" ? "dark" : "light");
  } else if (currentTheme !== getSystemTheme()) {
    setTheme(currentTheme === "light" ? "dark" : "light");
  } else {
    setTheme("system");
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
      icon: 'pixelarticons:home',
      type: 'path',
      action: `/${currentLocale}`
    },
    {
      label: 'nav_projects',
      icon: 'pixelarticons:shopping-bag',
      type: 'path',
      action: `/${currentLocale}/projects`
    },
    {
      icon: 'pixelarticons:heart',
      type: 'path',
      action: `/${currentLocale}/donate`
    },
    {
      icon: computed(() => {
        if (theme.value === 'system') { return 'pixelarticons:monitor'; }
        return theme.value === 'dark' ? 'pixelarticons:moon-star' : 'pixelarticons:sun-alt';
      }).value,
      type: 'action',
      action: toggleTheme
    },
    {
      label: locale.value.toUpperCase(),
      icon: 'pixelarticons:sliders',
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
        {{ t(siteName) }}
      </h1>
    </NuxtLink>
    <div class="nav">
      <div v-for="link in links" :key="link.icon" class="nav__links">
        <NuxtLink v-if="link.type === 'path'" :to="link.action" :class="isActive(link.action) ? 'nav__links__active' : 'nav__links__default'">
          <Icon :name="link.icon" :class="isActive(link.action) ? 'nav__links__active__icon' : 'nav__links__default__icon'" />
          <p v-if="link.label" :class="isActive(link.action) ? 'nav__links__active__label' : 'nav__links__default__label'">{{ t(link.label) }}</p>
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
            padding: 0 1rem;
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
        text-decoration: none;
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
            padding: 0 1rem;
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
    text-decoration: none;

    &__name {
      position: relative !important;
      background: var(--logo-gradient);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    @media screen and (max-width: $screen-sm) {
      display: none;
    }
  }
}
</style>

