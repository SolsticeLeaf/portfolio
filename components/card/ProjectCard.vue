<script>

import FlexButton from "~/components/utilities/FlexButton.vue";

export default {
  name: "ProjectCard",
  components: {FlexButton},
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
    <div class="card blur__glass">
      <div class="card__image">
        <nuxt-img loading="lazy" class="card__image__content" :src="getImageUrl(imageLink)"/>
      </div>
      <div class="card__info">
        <div class="card__info__title">
          <h4 class="card__info__title__text">{{ this.title }}</h4>
        </div>
        <div class="card__info__description">
          <p class="card__info__description__text">{{ getDescription(description) }}</p>
        </div>
      </div>
      <div class="card__links">
        <div class="card__links__button" v-for="source in sources" :key="source.name">
          <FlexButton :text="getName(source.name)"
                      :text-bold="true"
                      text-color="--text-color-light"
                      :icon="source.icon"
                      :color="source.color"
                      :customColor="false"
                      :link="source.link"
                      class="main__content__button__btn"
                      :outline="false" />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use '../../assets/scss/screens' as *;

//* {
//  border: 1px solid deepskyblue !important;
//}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}

::-webkit-scrollbar-thumb {
  border-radius: 3rem;
  background-color: var(--scrollbar-background);
  box-shadow: 0 0 1px var(--scrollbar-shadow);
}

.card {
  height: fit-content;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: $screen-md) {
    width: auto;
  }

  @media screen and (max-width: $screen-sm) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__image {
    display: flex;
    height: 100%;
    align-items: center;
    align-content: center;
    justify-content: center;
    width: 25%;

    @media screen and (max-width: $screen-md) {
      height: auto;
    }

    @media screen and (max-width: $screen-sm) {
      display: flex;
      justify-items: center;
      align-items: center;
      width: 100%;
      height: 8rem;
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
    width: 55%;
    margin-left: 1rem;
    margin-right: 1rem;

    @media screen and (max-width: $screen-sm) {
      margin: 0;
      width: auto;
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
        background: var(--card-gradient);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
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
        max-height: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-clamp: 3;
        -webkit-line-clamp: 3;

        @media screen and (max-width: $screen-md) {
          line-clamp: 4;
          -webkit-line-clamp: 4;
        }

        @media screen and (max-width: $screen-sm) {
          -webkit-box-orient: vertical;
          overflow-y: hidden;
          line-clamp: 3;
          -webkit-line-clamp: 3;
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
      gap: 0.5rem;
    }

    &__button {
      width: 100%;
      height: fit-content;

      @media screen and (max-width: $screen-sm) {
        width: 90%;
      }
    }

    &__text {
      color: var(--text-color-light);
    }
  }
}

</style>
