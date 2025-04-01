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
      icon: computed(() => {
        if (colorMode.preference === 'system') { return 'i-heroicons-computer-desktop'; }
        return colorMode.value === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun';
      }).value,
      click: changeTheme
    },
    {
      label: locale.value.toUpperCase(),
      icon: 'i-heroicons-globe-alt',
      to: alternatePath
    }
  ];
})
</script>

<template>
  <ClientOnly>
    <nav id="navbar" class="glass">
      <ULink to="/" class="nav__logo">
        <h1 class="nav__logo__name">
          {{ $t(siteName) }}
        </h1>
      </ULink>
      <UHorizontalNavigation :links="links" class="nav__links" >
        <template #icon="{ link }">
          <UIcon :name="link.icon" class="nav__links__icon" />
        </template>
        <template #default="{ link }">
          <p v-if="link.label" class="group-hover:sky relative nav__links__label">{{ $t(link.label) }}</p>
        </template>
      </UHorizontalNavigation>
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
  border-radius: 2rem;
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

  .nav__links {
    width: fit-content;
    height: inherit;
    padding: 0 !important;
    margin: 0 !important;

    &__label {
      color: var(--text-navigation);

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
