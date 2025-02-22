<script setup lang="ts">
import initialConfig from "@/config/initial.config";

const colorMode = useColorMode()
const { locale } = useI18n()
const route = useRoute()
const siteName = initialConfig.siteName;

function changeTheme() {
  const preferences = colorMode.preference;
  if (preferences === 'system') {
    colorMode.value = 'light';
    colorMode.preference = 'light';
    document.body.setAttribute("data-theme", "light");
  } else if (preferences === 'light') {
    colorMode.value = 'dark';
    colorMode.preference = 'dark';
    document.body.setAttribute("data-theme", "dark");
  } else if (preferences === 'dark') {
    colorMode.preference = 'system';
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      document.body.setAttribute("data-theme", "light");
      colorMode.value = 'light';
    } else {
      document.body.setAttribute("data-theme", "dark");
      colorMode.value = 'dark';
    }
  }
}

const getThemeIcon = computed(() => {
  const mode = colorMode.value;
  if (colorMode.preference === 'system') {
    return 'i-heroicons-computer-desktop';
  } else if (mode === 'dark') {
    return 'i-heroicons-moon';
  } else if (mode === 'light') {
    return 'i-heroicons-sun';
  }
});
const links = computed((): any => {
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
      icon: getThemeIcon.value,
      click: changeTheme,
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
@use '@/assets/scss/screens' as *;

//* {
//  border: 1px solid deepskyblue !important;
//}

:root {
  color-scheme: dark;
}

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
      background: var(--logo-gradient);
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
      font-size: 1rem;
      color: var(--text-navigation);

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
      color: var(--text-navigation);

      @media screen and (max-width: $screen-md) {
        width: 1.6rem;
        height: 1.6rem;
      }

      @media screen and (max-width: $screen-sm) {
        padding: 0 1.6rem;
        color: var(--text-navigation);
      }
    }
  }
}
</style>
