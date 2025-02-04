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
        <div class="card__links__button" v-for="source in sources" :key="source.name">
          <UButton variant="soft"
                   color="cyan"
                   block
                   :to="source.link"
                   rel="noopener noreferrer"
                   size="xl"
                   :padded=$device.isMobile
                   class="p-5"
                   :ui="{ rounded: 'rounded-full'}">
            <icons :icon="source.icon" :color="source.color"/>
            <p class="text-gray-300">{{ getName(source.name) }}</p>
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
    height: fit-content;
    flex-direction: column;
    padding: 1rem 0.5rem;
    justify-content: center;
    align-items: center;
  }

  &__image {
    display: flex;
    height: 100%;
    align-items: center;
    align-content: center;
    justify-content: center;
    width: 30%;

    @media screen and (max-width: $screen-sm) {
      display: grid;
      justify-items: center;
      align-items: center;
      width: 100%;
      height: 20vh;
    }

    &__content {
      max-width: 100%;
      max-height: 100%;

      @media screen and (max-width: $screen-sm) {
        height: inherit;
      }
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 50%;
    margin-left: 1vw;
    margin-right: 1vw;

    @media screen and (max-width: $screen-sm) {
      width: 100%;
    }

    &__title {
      display: block;
      height: fit-content;
      padding-bottom: 1.2rem;
      max-height: 35%;
      width: 100%;
      text-align: center;

      @media screen and (max-width: $screen-sm) {
        padding: 1rem 0;
      }

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

        @media screen and (max-width: $screen-sm) {
          font-size: 1.5rem;
          line-height: 1.5rem;
        }
      }
    }

    &__description {
      display: block;
      height: 65%;
      max-height: 65%;
      width: 100%;

      @media screen and (max-width: $screen-sm) {
        height: fit-content;
      }

      &__text {
        font-size: 0.8vw;
        max-height: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-clamp: 3;
        -webkit-line-clamp: 3;

        @media screen and (max-width: $screen-md) {
          font-size: 1rem;
        }

        @media screen and (max-width: $screen-sm) {
          font-size: 0.7rem;
          -webkit-box-orient: vertical;
          overflow-y: hidden;
          line-clamp: 4;
          -webkit-line-clamp: 4;
        }
      }
    }
  }

  &__links {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 20%;

    @media screen and (max-width: $screen-sm) {
      flex-direction: row;
      width: 100%;
      padding-top: 0.8rem;
      overflow-x: scroll;
    }
  }
}

</style>