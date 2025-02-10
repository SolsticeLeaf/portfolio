<script setup lang="ts">
import TechIcon from "~/components/utilities/TechIcon.vue";
const { locale } = useI18n()
const route = useRoute()

const { data: project, status: status } = useFetch('/api/getProjectData', {
  key: 'projects',
  query: {
    id: route.params.project
  },
  default: () => {},
  cache: "no-cache",
  server: false
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
      <div v-else class="wrapper blur__glass">
        <div class="content__info">
          <div class="content__info__main">
            <div class="content__image__tablet">
              <nuxt-img :src="project.imageLink" class="content__image__tablet__img" />
            </div>
            <div class="content__info__main__title">
              {{ project.title }}
            </div>
            <div class="content__info__main__lang transparent__glass">
              <div v-for="lang in project.languages" class="content__info__main__lang__content">
                <div class="content__info__main__lang__content__item">
                  <TechIcon class="content__info__main__lang__content__item__icon" :icon="lang.icon"/>
                  <p class="content__info__main__lang__content__item__label">{{ lang.name }}</p>
                </div>
              </div>
            </div>
            <div class="content__info__main__tech">
              <div class="content__info__main__tech__background">
                <Vue3Marquee pause-on-hover clone :duration="30" class="content__info__tech__text">
                  <div class="content__info__main__tech__label" v-for="tech in project.techs">
                    <TechIcon class="content__info__main__tech__label__icon" :icon="tech.icon"/>
                    {{ tech.name }}
                  </div>
                </Vue3Marquee>
              </div>
            </div>
          </div>
          <div class="content__description__tablet">
            <h1 class="content__description__tablet__text">
              {{ getDescription(project.description) }}
            </h1>
          </div>
          <div class="content__info__buttons">
            <div class="content__info__buttons__button" v-for="source in project.mainSources" :key="source.name">
              <UButton variant="soft"
                       color="cyan"
                       block
                       :to="source.link"
                       target="_blank"
                       rel="noopener noreferrer"
                       size="xl"
                       class="p-5"
                       :ui="{ rounded: 'rounded-full'}">
                <icons :icon="source.icon" :color="source.color"/>
                <p>{{ getButtonName(source.name) }}</p>
              </UButton>
            </div>
            <UButton variant="soft"
                     block
                     color="red"
                     :to="getProjectsPath"
                     rel="noopener noreferrer"
                     size="xl"
                     class="content__info__buttons__button p-5"
                     :ui="{ rounded: 'rounded-full'}">
              <icons icon="fa-solid fa-chevron-left" color="red"/>
              {{ $t('back_button') }}
            </UButton>
          </div>
        </div>
        <div class="content__description__desktop">
          <h1 class="content__description__desktop__text">
            {{ getDescription(project.description) }}
          </h1>
        </div>
        <div class="content__image__desktop">
          <nuxt-img :src="project.imageLink" class="content__image__desktop__img" />
        </div>
      </div>
    </Suspense>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables.scss' as *;

//* {
//  border: 1px solid white !important;
//}

.wrapper {
  width: 95vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-align-items: center;

  @media screen and (max-width: $screen-md) {
    flex-direction: column;
    height: auto;
    max-height: fit-content;
  }
}

.content {

  &__info {
    display: flex;
    flex-direction: column;
    width: 30%;
    max-width: 30%;
    height: 100%;

    @media screen and (max-width: $screen-md) {
      width: 100%;
      max-width: 100%;
      height: fit-content;
    }

    &__main {
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &__title {
        text-align: center;
        font-size: 2.3vw;
        background: -webkit-linear-gradient(0deg, rgb(0, 225, 255) 35%, rgb(3, 255, 247) 51%, rgb(5, 247, 255) 86%, rgb(2, 216, 254) 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        line-height: 5vw;

        @media screen and (max-width: $screen-md) {
          font-size: 5vw;
          padding-bottom: 1rem;
        }

        @media screen and (max-width: $screen-sm) {
          font-size: 7.5vw;
          line-height: 8vw;
        }
      }

      &__lang {
        display: flex;
        border-radius: 3rem;
        height: 5vh;
        width: 100%;
        flex-direction: row;
        overflow-x: scroll;
        overflow-y: hidden;
        justify-content: center;
        align-items: center;
        align-content: center;
        text-align: center;
        padding: 1vh 0;
        column-gap: 1vw;

        @media screen and (max-width: $screen-sm) {
          height: 8vh;
        }

        &__content {
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

            &__label {
              @media screen and (max-width: $screen-md) {
                font-size: 2.2vw;
              }

              @media screen and (max-width: $screen-sm) {
                font-size: 3vw;
              }
            }

            &__icon {
              height: 1.5vw;
              padding: 0 0.5vw;

              @media screen and (max-width: $screen-md) {
                height: 4vw;
              }

              @media screen and (max-width: $screen-sm) {
                height: 2.5vh;
              }
            }
          }
        }
      }

      &__tech {
        width: 100%;
        display: flex;
        padding: 1rem 0;
        justify-content: center;

        &__background {
          max-width: 100%;
          height: 4.5vh;
          border-radius: 2vw;
          background: -webkit-linear-gradient(0deg, rgb(16, 143, 227) 19%, rgb(1, 218, 185) 100%);
          overflow: hidden;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        &__text {
          border-radius: 2vw;
        }

        &__label {
          display: flex;
          flex-direction: row;
          height: 4.3vh;
          padding: 0 1.5rem;
          font-weight: bold;
          font-size: 0.8vw;
          color: #1c1c1c;
          align-items: center;

          @media screen and (max-width: $screen-md) {
            font-size: 2.2vw;
          }

          @media screen and (max-width: $screen-sm) {
            font-size: 3.5vw;
          }

          &__icon {
            padding-right: 0.2rem;
            height: 1.5vw;

            @media screen and (max-width: $screen-md) {
              height: 4vw;
            }

            @media screen and (max-width: $screen-sm) {
              height: 5vw;
            }
          }
        }
      }
    }

    &__buttons {
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 2vw;
      row-gap: 2vh;

      @media screen and (max-width: $screen-md) {
        padding-top: 3vh;
      }
    }
  }

  &__description {

    &__desktop {
      width: 40%;
      overflow-y: scroll;
      padding: 0 1.8vw;
      font-size: 1.2em;
      height: fit-content;
      max-height: 100%;

      @media screen and (max-width: $screen-md) {
        display: none;
      }

      &__text {
        height: 100%;
        white-space: pre-line;
        overflow-y: scroll;
      }
    }

    &__tablet {
      display: none;
      height: 100%;

      @media screen and (max-width: $screen-md) {
        display: flex;
      }

      &__text {
        height: 100%;
        white-space: pre-line;
        overflow-y: scroll;
      }
    }

  }

  &__image {

    &__desktop {
      width: 30%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      vertical-align: center;

      &__img {
        width: 100%;
      }

      @media screen and (max-width: $screen-md) {
        display: none;
      }
    }

    &__tablet {
      width: 30%;
      height: 100%;
      display: none;
      align-items: center;
      justify-content: center;
      vertical-align: center;

      &__img {
        width: 100%;
      }

      @media screen and (max-width: $screen-md) {
        display: flex;
      }

      @media screen and (max-width: $screen-sm) {
        width: 50%;
      }
    }
  }
}


.projects {
  &__message {
    font-size: 2vw;
    font-weight: bold;
    padding: 1rem;

    &__indicator {
      width: 14rem;
    }

    @media screen and (max-width: $screen-md) {
      font-size: 2rem;
    }

    @media screen and (max-width: $screen-sm) {
      font-size: 1rem;
    }
  }
}

</style>