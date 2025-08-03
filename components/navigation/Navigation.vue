<script setup lang="ts">
import Logo from '~/public/logo.svg?component';
import initialConfig from '@/config/initial.config';
import iconsConfig from '~/config/icons.config';
import NavItems from './NavItems.vue';

const { locale } = useI18n();
const route = useRoute();

const homePath = computed(() => {
  return `/${locale.value}`;
});

const links = computed((): any => {
  const currentLocale = locale.value;
  const alternateLocale = currentLocale === 'en' ? 'ru' : 'en';
  const currentPath = route.path;
  const alternatePath = currentPath.replace(`/${currentLocale}`, `/${alternateLocale}`);
  return [
    {
      label: 'nav_home',
      icon: iconsConfig.nav_home,
      postfix: '',
      vif: true,
      type: 'path',
      action: `/${currentLocale}`,
    },
    {
      label: 'nav_projects',
      icon: iconsConfig.nav_projects,
      postfix: '',
      vif: true,
      type: 'path',
      action: `/${currentLocale}/projects`,
    },
    {
      icon: iconsConfig.nav_donate,
      vif: true,
      type: 'path',
      action: `/${currentLocale}/donate`,
    },
    {
      label: locale.value.toUpperCase(),
      icon: iconsConfig.nav_lang,
      vif: true,
      type: 'path',
      action: alternatePath,
    },
  ];
});
</script>

<template>
  <nav id="navbar">
    <div class="wrapper glass">
      <Suspense>
        <NuxtLink :to="homePath" class="logo">
          <Logo class="logo__name" />
        </NuxtLink>
      </Suspense>
      <div class="nav">
        <Suspense>
          <KeepAlive>
            <NavItems :links="links" />
          </KeepAlive>
        </Suspense>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use '/assets/scss/screens.scss' as *;

.glass {
  filter: none !important;
  -webkit-filter: none !important;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(44, 32, 68, 0.11);
}

nav {
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  width: 50%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  justify-content: space-between;
  padding: 1rem 2rem;
  z-index: 100;

  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 2rem;
    padding: 1rem 1.5rem;
    width: 100%;
  }

  .nav {
    width: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 1.2rem;
  }

  .logo {
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
      fill: #ffffff;
      transition: fill 0.4s ease;

      &:hover {
        fill: rgb(0, 255, 178) !important;
      }
    }
  }
}
</style>
