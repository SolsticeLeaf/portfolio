<script setup lang="ts">
import config from "@/config/initial.config"
import TechIcon from "~/components/utilities/TechIcon.vue";
import {Vue3Marquee} from "vue3-marquee";
const { locale } = useI18n()
const route = useRoute()

const { data: project, status: status } = useFetch('/api/getProjectData', {
  key: 'projects',
  query: {
    id: route.params.project
  },
  default: () => {},
  cache: "no-cache",
  server: false,
  onResponse: (response) => {
    const item = response.response._data
    if (item != null) {
      useHead({
                title: item.title + " | " + config.siteName,
                meta: [{
                  name: 'description',
                  content: getDescription(item.description),
                }]
      });
    } else {
      useHead({title: "ERROR | " + config.siteName});
    }
  }
});

const isPending = computed(() => {
  return status.value === "pending";
})

const isSuccess = computed(() => {
  return status.value === "success" && project.value.title != null;
})

const getProjectsPath = computed(() => {
  const currentLocale = locale.value;
  return `/${currentLocale}/projects`
})

function getDescription(description: any): string {
  const currentLocale = locale.value;
  const localed = description[currentLocale]
  if (localed) {
    return localed
  }
  return description["en"]
}

function getButtonName(name: any): string {
  const currentLocale = locale.value;
  const localed = name[currentLocale]
  if (localed) {
    return localed
  }
  return name["en"]
}
</script>

<template>
  <ClientOnly>
    <Suspense>
      <div v-if="!isSuccess" class="blur__glass">
        <div v-if="isPending" class="projects__message">
          <UProgress size="xl" animation="carousel" class="projects__message__indicator" />
        </div>
        <div v-else class="projects__message">
          <h1>
            {{ $t('notFound') }}
          </h1>
        </div>
      </div>
      <div v-else class="wrapper">
        <div class="screen-md">
          <div class="blur__glass info__buttons">
            <a :href="source.link" target="_blank" rel="noopener noreferrer" v-for="source in project.mainSources" :key="source.name">
              <el-button :color="source.color" round size="large" class="info__buttons__btn">
                <icons class="icon_padding_right" :icon="source.icon"/>
                <p>{{ getButtonName(source.name) }}</p>
              </el-button>
            </a>
            <a :href="getProjectsPath" rel="noopener noreferrer">
              <el-button color="red" round size="large" class="info__buttons__btn">
                <icons class="icon_padding_right" icon="fa-solid fa-chevron-left"/>
                <p>{{ $t('back_button') }}</p>
              </el-button>
            </a>
          </div>
        </div>
        <div class="content blur__glass">
          <a :href="getProjectsPath" rel="noopener noreferrer" class="desktop">
            <el-button type="danger" link size="large">
              <icons class="icon_padding_right" icon="fa-solid fa-chevron-left"/>
              <p>{{ $t('project_back_button') }}</p>
            </el-button>
          </a>
          <h1 class="content__title">{{ project.title }}</h1>
          <p class="content__description">{{ getDescription(project.description) }}</p>
        </div>
        <div class="info blur__glass">
          <nuxt-img loading="lazy" class="info__logo" :src="project.imageLink"/>
          <div class="info__marquee transparent__glass">
            <Vue3Marquee pause-on-hover clone :duration="30" class="info__marquee__container">
              <div class="info__marquee__container__item" v-for="lang in project.languages">
                <TechIcon class="data-marquee-icon" :icon="lang.icon"/>
                <p>{{ lang.name }}</p>
              </div>
            </Vue3Marquee>
          </div>
          <div class="info__marquee tech__background">
            <Vue3Marquee direction="reverse" pause-on-hover clone :duration="30" class="info__marquee__container">
              <div class="info__marquee__container__item" v-for="tech in project.techs">
                <TechIcon class="data-marquee-icon" :icon="tech.icon"/>
                <p>{{ tech.name }}</p>
              </div>
            </Vue3Marquee>
          </div>
          <div class="desktop">
            <div class="info__buttons">
              <a :href="source.link" target="_blank" rel="noopener noreferrer" v-for="source in project.mainSources" :key="source.name">
                <el-button :color="source.color" round size="large" class="info__buttons__btn">
                  <icons class="icon_padding_right" :icon="source.icon"/>
                  <p>{{ getButtonName(source.name) }}</p>
                </el-button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
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

a:hover, el-button:hover {
  cursor: pointer;
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

.content {
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 70%;

  @media screen and (max-width: $screen-md) {
    width: 100%;
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
    width: 100%;
  }

  &__logo {
    width: auto;
    height: fit-content;

    @media screen and (max-width: $screen-md) {
      width: 50%;
    }
  }

  &__marquee {
    display: flex;
    flex-direction: row;
    border-radius: 3rem;
    height: 2.8rem;
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
      width: 100%;

      @media screen and (max-width: $screen-sm) {
        height: 4rem;
      }
    }
  }
}

</style>
