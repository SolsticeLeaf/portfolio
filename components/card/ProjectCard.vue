<script>
export default {
  name: "ProjectCard",
  props: {
    title: {
      type: String
    },
    description: {
      type: Object
    },
    imageLink: {
      type: String
    },
    sources: {
      type: Array
    }
  },

  methods: {

    getImageUrl(path) {
      return new URL(path, import.meta.url).href
    },

    getDescription(description) {
      const currentLocale = this.$i18n.locale;
      const localed = description[currentLocale]
      if (localed) {
        return localed
      }
      return description["en"]
    },

    getName(name) {
      const currentLocale = this.$i18n.locale;
      const localed = name[currentLocale]
      if (localed) {
        return localed
      }
      return name["en"]
    }
  }
}
</script>

<template>
  <ClientOnly>
    <div class="card transparent__glass">
      <div class="card__image">
        <NuxtImg class="card__image__content" :src="getImageUrl(imageLink)"/>
      </div>
      <UDivider orientation="vertical" />
      <div class="card__info">
        <div class="card__info__title">
          <h1 class="card__info__title__text">
            {{ this.title }}
          </h1>
        </div>
        <div class="card__info__description">
          <h1 class="card__info__description__text">
            {{ getDescription(description) }}
          </h1>
        </div>
      </div>
      <div class="card__links">
        <div class="card__links__button__glass" v-for="source in sources" :key="source.name">
          <UButton variant="ghost"
                   block
                   :to="source.link"
                   target="_blank"
                   rel="noopener noreferrer"
                   size="xl"
                   :padded=$device.isMobile
                   class="card__links__button__style"
                   :ui="{ rounded: 'rounded-full'}">
            <icons class="card__links__button__icon" :icon="source.icon" :color="source.color"/>
            <p class="card__links__button__text">{{ getName(source.name) }}</p>
          </UButton>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables.scss' as *;

//* {
//  border: 1px solid deepskyblue !important;
//}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}

::-webkit-scrollbar-thumb {
  border-radius: 3rem;
  background-color: rgb(174, 174, 174);
  box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}

.glass {
  padding: 2vw;

  @media screen and (max-width: $screen-md) {
    padding: 4vw;
  }

  @media screen and (max-width: $screen-sm) {
    display: none;
  }
}

.card {
  height: 12vw;
  width: 70vw;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: $screen-md) {
    height: 30vw;
    width: 100%;
  }

  @media screen and (max-width: $screen-sm) {
    height: 50vw;
    padding: 1rem 0.5rem;
  }

  &__image {
    display: flex;
    height: 100%;
    align-items: center;
    align-content: center;
    justify-content: center;
    width: 30%;

    &__content {
      max-width: 100%;
      max-height: 100%;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 50%;
    margin-left: 1vw;
    margin-right: 1vw;

    &__title {
      display: block;
      height: fit-content;
      padding-bottom: 1.2rem;
      max-height: 35%;
      width: 100%;
      text-align: center;

      &__text {
        overflow: hidden;
        font-size: 1.8vw;
        background: -webkit-linear-gradient(0deg, rgb(0, 225, 255) 35%, rgb(3, 255, 247) 51%, rgb(5, 247, 255) 86%, rgb(2, 216, 254) 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        line-height: 2vw;

        @media screen and (max-width: $screen-md) {
          font-size: 1.2rem;
          line-height: 1.2rem;
        }
      }
    }

    &__description {
      display: block;
      height: 65%;
      max-height: 65%;
      width: 100%;
      overflow-y: scroll;

      &__text {
        font-size: 0.8vw;

        @media screen and (max-width: $screen-md) {
          font-size: 1rem;
        }

        @media screen and (max-width: $screen-sm) {
          font-size: 0.7rem;
        }
      }
    }
  }

  &__links {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 20%;

    &__button {

      &__glass {
        filter: none !important;
        -webkit-filter: none !important;
        border-radius: 3rem;
        border: 1px solid rgba(0, 59, 64, 0.3);
        background: rgba(0, 59, 64, 0.2);

        @media screen and (max-width: $screen-sm) {
          max-width: fit-content;
        }

        @media screen and (max-width: $screen-sm) {
          max-width: 100%;
        }
      }

      &__icon {
        height: 0.8vw !important;

        @media screen and (max-width: $screen-md) {
          height: 0.8rem !important;
        }
      }

      &__text {
        font-size: 0.8vw !important;
        padding: 0.5em;

        @media screen and (max-width: $screen-md) {
          font-size: 0.7rem !important;
        }

        @media screen and (max-width: $screen-sm) {
          display: none !important;
        }
      }

    }
  }
}

</style>