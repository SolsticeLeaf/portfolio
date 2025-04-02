<script setup lang="ts">
import config from "@/config/initial.config";
import TechIcon from "~/components/utilities/TechIcon.vue";
import { Vue3Marquee } from "vue3-marquee";
import FlexButton from "~/components/utilities/FlexButton.vue";
const { t, locale } = useI18n();
const route = useRoute();

const { data: project, status: status } = useFetch('/api/getProjectData', {
  key: 'projects',
  query: {
    id: route.params.project
  },
  default: () => {},
  cache: "no-cache",
  server: false,
  onResponse: (response) => {
    const item = response.response._data;
    if (item != null) {
      useHead({
        title: item.title + " | " + config.siteName,
        meta: [{
          name: 'description',
          content: getDescription(item.description),
        }]
      });
    } else {
      useHead({ title: "ERROR | " + config.siteName });
    }
  }
});

const isPending = computed(() => {
  return status.value === "pending";
});

const isSuccess = computed(() => {
  return status.value === "success" && project.value.title != null;
});

const getProjectsPath = computed(() => {
  const currentLocale = locale.value;
  return `/${currentLocale}/projects`;
});

function getDescription(description: any): string {
  const currentLocale = locale.value;
  const localed = description[currentLocale];
  if (localed) {
    return localed;
  }
  return description["en"];
}

function getButtonName(name: any): string {
  const currentLocale = locale.value;
  const localed = name[currentLocale];
  if (localed) {
    return localed;
  }
  return name["en"];
}
</script>

<template>
  <ClientOnly>
    <div v-if="!isSuccess" class="blur__glass">
      <div v-if="isPending" class="projects__message">
        <Icon name="codex:loader" class="loading-indicator" />
      </div>
      <div v-else class="projects__message">
        <h1>
          {{ t('notFound') }}
        </h1>
      </div>
    </div>
    <div v-else class="wrapper">
      <div class="screen-md">
        <div class="blur__glass info__buttons">
          <FlexButton v-for="source in project.mainSources"
                      :key="source.name"
                      :text="getButtonName(source.name)"
                      :text-bold="true"
                      text-color="--text-color-light"
                      :icon="source.icon"
                      :color="source.color"
                      :customColor="false"
                      :link="source.link"
                      class="info__buttons__btn"
                      :outline="false" />
          <FlexButton :text="t('back_button')"
                      :text-bold="true"
                      text-color="--text-color-light"
                      icon="ic:baseline-arrow-back"
                      color="#D30000"
                      :customColor="false"
                      :link="getProjectsPath"
                      class="info__buttons__btn"
                      :outline="false" />
        </div>
      </div>
      <div class="content blur__glass">
        <FlexButton :text="t('back_button')"
                    :text-bold="true"
                    text-color="--text-color-primary"
                    icon="ic:baseline-arrow-back"
                    color="transparent"
                    :customColor="false"
                    :link="getProjectsPath"
                    class="back-button"
                    :outline="false" />
        <h1 class="content__title">{{ project.title }}</h1>
        <p class="content__description">{{ getDescription(project.description) }}</p>
      </div>
      <div class="info blur__glass">
        <Suspense>
          <nuxt-img loading="lazy" class="info__logo" :src="project.imageLink" />
          <template #fallback>
            <div class="skeleton-image" />
          </template>
        </Suspense>
        <div class="info__marquee transparent__glass">
          <Suspense>
            <Vue3Marquee pause-on-hover clone :duration="30" class="info__marquee__container">
              <div class="info__marquee__container__item" v-for="lang in project.languages" :key="lang.name">
                <Suspense>
                  <TechIcon class="data-marquee-icon" :icon="lang.icon" />
                  <template #fallback>
                    <div class="skeleton-icon" />
                  </template>
                </Suspense>
                <p>{{ lang.name }}</p>
              </div>
            </Vue3Marquee>
            <template #fallback>
              <div class="skeleton-marquee" />
            </template>
          </Suspense>
        </div>
        <div class="info__marquee tech__background">
          <Suspense>
            <Vue3Marquee direction="reverse" pause-on-hover clone :duration="30" class="info__marquee__container">
              <div class="info__marquee__container__item" v-for="tech in project.techs" :key="tech.name">
                <Suspense>
                  <TechIcon class="data-marquee-icon" :icon="tech.icon" />
                  <template #fallback>
                    <div class="skeleton-icon" />
                  </template>
                </Suspense>
                <p>{{ tech.name }}</p>
              </div>
            </Vue3Marquee>
            <template #fallback>
              <div class="skeleton-marquee" />
            </template>
          </Suspense>
        </div>
        <div class="desktop">
          <div class="info__buttons">
            <FlexButton v-for="source in project.mainSources"
                        :key="source.name"
                        :text="getButtonName(source.name)"
                        :text-bold="true"
                        text-color="--text-color-light"
                        :icon="source.icon"
                        :color="source.color"
                        :customColor="false"
                        :link="source.link"
                        class="info__buttons__btn"
                        :outline="false" />
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use '../../assets/scss/screens' as *;

.wrapper {
  width: 60%;
  height: 100%;
  display: flex;
  gap: 1rem;

  @media screen and (max-width: $screen-lg) {
    width: 80%;
  }

  @media screen and (max-width: $screen-md) {
    width: 95%;
  }
}

.desktop {
  width: 100%;
}

.blur__glass {
  @media screen and (max-width: $screen-md) {
    background: transparent;
  }
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}

::-webkit-scrollbar-thumb {
  border-radius: 3rem;
  background-color: var(--scrollbar-background);
  box-shadow: 0 0 1px var(--scrollbar-shadow);
}

.back-button {
  width: fit-content;
  padding: 0;
}

.content {
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 70%;

  @media screen and (max-width: $screen-md) {
    width: auto;
  }

  &__title {
    background: var(--card-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &__description {
    white-space: pre-line;
  }
}

.tech__background {
  filter: none !important;
  -webkit-filter: none !important;
  border-radius: 3rem;
  border: 1px solid var(--glass-border);
  background: var(--card-stack-gradient);
  color: var(--text-card-stack);
  font-weight: bold;
}

.info {
  display: flex;
  flex-direction: column;
  width: 30%;
  height: fit-content;
  align-items: center;
  gap: 0.5rem;

  @media screen and (max-width: $screen-md) {
    width: auto;
  }

  &__logo {
    width: 100%;
    height: fit-content;

    @media screen and (max-width: $screen-md) {
      width: 50%;
    }
  }

  &__marquee {
    display: flex;
    flex-direction: row;
    border-radius: 3rem;
    height: 1rem;
    width: 100%;
    overflow-x: scroll;
    scrollbar-width: none;
    overflow-y: hidden;
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
    text-align: center;
    column-gap: 1rem;
    padding: 1rem 0;

    &__container {
      display: flex;
      flex-direction: row;

      &__item {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        align-content: center;
        text-align: center;
        border-radius: 3rem;
      }
    }
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    gap: 0.5rem;
    filter: none !important;
    -webkit-filter: none !important;
    border-radius: 2rem;
    border: 1px solid var(--glass-border);
    background: var(--glass-background);
    padding: 1rem;

    @media screen and (max-width: $screen-md) {
      background: transparent;
    }

    &__btn {
      @media screen and (max-width: $screen-sm) {
        height: 4rem;
      }
    }
  }
}

.skeleton-image {
  width: 100%;
  height: 10rem;
  background: #e0e0e0;
  animation: pulse 1.5s infinite;
}

.skeleton-marquee {
  width: 100%;
  height: 2.8rem;
  background: #e0e0e0;
  animation: pulse 1.5s infinite;
}

.skeleton-icon {
  width: 1.5rem;
  height: 1.5rem;
  background: #e0e0e0;
  animation: pulse 1.5s infinite;
}
</style>
