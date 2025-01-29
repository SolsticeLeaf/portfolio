<script>
import TyperUtil from "~/components/utils/TyperUtil.vue";
import initialConfig from "~/config/initial.config.ts";
import toolsConfig from "~/config/tools.config.ts";
import {Vue3Marquee} from "vue3-marquee";

export default {
  name: "HeroSection",
  components: {
    Vue3Marquee,
    TyperUtil
  },
  data: function () {
    return {
      nickname: initialConfig.nickname,
      main_avatar: initialConfig.hero.avatar_url,
      main_socialLinks: initialConfig.socialLinks,
      tools: toolsConfig.tools
    }
  }
}
</script>

<template>
  <ClientOnly>
    <div id="hero" class="wrapper blur__glass">
      <div class="main">
        <div class="main__content">
          <h6 class="main__content__hey">{{$t('main_hey')}}</h6>
          <h1>
            <span class="main__content__title">
              <span class="main__content__title__first">{{ $t('main_title') }}</span>
              <span class="main__content__title__second">{{ $t(nickname) }}</span>
            </span>
          </h1>
          <h2>
            <TyperUtil class="type-writer" :words="$tm('main_typer')" />
          </h2>
          <p class="main__content__spell">{{ $t('main_spell') }}</p>
          <div class="stack">
            <div class="stack__background">
              <Vue3Marquee pause-on-hover :duration="120" class="stack__background__text">
                <div class="stack__text" v-for="tool in tools">
                  {{tool}}
                </div>
              </Vue3Marquee>
            </div>
          </div>
          <h6 class="main__content__social">
            {{$t('main_follow')}}
            <a class="main__content__social-icons">
              <icons :href="link.url" v-for="link in main_socialLinks" :key="link.icon" :icon="'fa-brands fa-'+link.icon" class="social-icon github" />
            </a>
          </h6>
          <div class="main__content__button">
            <a href="mailto:solsticeleaf@kiinse.dev" class="main__content__button__solid">
              <UButton variant="solid" class="main__content__button__style" size="xl" :ui="{ rounded: 'rounded-full' }">
                <template #leading>
                  <icons color="sky" icon="fas fa-envelope"/>
                </template>
                <p class="main__content__button__solid__text">{{ $t('main_email') }}</p>
              </UButton>
            </a>
            <a href='https://discord.com/users/SolsticeLeaf' target="_blank" rel="noopener noreferrer" class="main__content__button__outline">
              <UButton variant="outline" class="main__content__button__style" size="xl" :ui="{ rounded: 'rounded-full'}">
                <template #leading>
                  <icons icon="fa-brands fa-discord" color="#ffffff"/>
                </template>
                <p class="main__content__button__outline__text">{{ $t('main_discord') }}</p>
              </UButton>
            </a>
          </div>
        </div>
      </div>
      <div class="image">
        <div class="image__content">
          <NuxtImg
              id="hero-avatar"
              :src="this.main_avatar"
              alt="SolsticeLeaf"
              fit="cover"
              height="80%"
              loading="eager"
          />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as mixins;
@use '@/assets/scss/variables.scss' as *;

//* {
//  border: 1px solid white !important;
//}

.main {
  display: flex;
  width: fit-content;
  align-content: center;
  max-height: 100% !important;

  @media screen and (max-width: $screen-md) {
    height: 100%;
    width: 100%;
  }

  &__content {
    margin-left: auto;
    margin-right: 0;
    width: fit-content;
    height: 100%;
    align-content: center;

    @media screen and (max-width: $screen-md) {
      height: 100%;
      width: 100%;
      align-items: center;
      align-content: center;
      justify-content: center;
    }

    &__spell {
      font-size: 0.8vw;

      @media screen and (max-width: $screen-md) {
        font-size: 0.8em;
      }
    }

    &__hey {
      font-size: 1vw;

      @media screen and (max-width: $screen-md) {
        font-size: 1em;
      }
    }

    &__title {
      font-size: 2vw;
      max-height: 100%;
      line-height: 2.5vw;

      @media screen and (max-width: $screen-md) {
        font-size: 2em;
        line-height: 1.3em;
      }

      &__second {
        color: $color-primary-7;
        font-weight: bold;
      }
    }

    .know-more {
      @include mixins.anchor($color-primary-1);
    }

    &__social {
      font-size: 0.8vw;

      @media screen and (max-width: $screen-md) {
        font-size: 1em;
      }
    }

    &__social-icons {
      max-height: 100%;
      vertical-align: middle;

      .social-icon {
        vertical-align: center;
        font-size: 1.3vw;
        margin: auto 1%;

        @media screen and (max-width: $screen-md) {
          font-size: 1.4em;
        }
      }

      .github:hover, .medium:hover {
        color: #6e6e6e;
      }

      .NuxtLinkedin:hover {
        color: #0077b5;
      }
    }

    &__button {
      margin-top: 3%;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      &__style {
        max-height: 2vw;

        @media screen and (max-width: $screen-md) {
          max-height: 3rem;
          height: 3rem;
          width: 9rem;
          align-items: center;
          align-content: center;
          justify-content: center;
          margin: 0.2rem;
        }

        @media screen and (max-width: $screen-sm) {
          max-width: fit-content;
        }
      }


      &__solid {

        &__text {
          color: #1c1c1c !important;
          font-size: 0.8vw !important;

          @media screen and (max-width: $screen-md) {
            font-size: 0.8rem !important;
            line-height: 0.8rem !important;
          }
        }
      }

      &__outline {
        margin-left: 2%;

        &__text {
          color: $text-color-light !important;
          font-size: 0.8vw !important;

          @media screen and (max-width: $screen-md) {
            font-size: 0.8rem !important;
            line-height: 0.8rem !important;
          }
        }
      }

      @media screen and (max-width: $screen-md) {
        margin-top: 2rem;
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        align-content: center;
        justify-content: center;
      }
    }

    .type-writer {
      max-height: 100%;
      color: $color-primary-7;
      font-style: italic;

      .Typist .Cursor {
        color: $color-primary-1;
      }
    }
  }
}

.image {
  display: flex;
  width: fit-content;
  height: inherit;

  &__content {
    height: 100%;
    width: 25vw;
    text-align: center;
    align-items: center;
    margin-left: 0;
    margin-right: auto;
    display: flex;

    @media screen and (max-width: $screen-md) {
      width: 12em;
    }
  }

  .image__content > img {
    border-radius: 25%;
    max-height: 100%;
    max-width: 100%;
    flex-shrink: 1;
    flex-basis: auto;

    @media screen and (max-width: $screen-md) {
      display: block;
    }
  }

  @media screen and (max-width: $screen-md) {
    display: grid;
    height: 100%;
    width: 100%;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
}

.stack {
  text-align: center;
  align-items: center;
  width: 100%;

  @media screen and (max-width: $screen-md) {
    display: grid;
    align-items: center;
    align-content: center;
    justify-content: center;
    width: 100%;
  }

  &__background {
    max-width: 21vw;
    max-height: 100%;
    border-radius: 2vw;
    background: -webkit-linear-gradient(0deg, rgb(16, 143, 227) 19%, rgb(1, 218, 185) 100%);
    margin-top: 3%;
    margin-bottom: 3%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &__text {
      border-radius: 2vw;

      @media screen and (max-width: $screen-md) {
        border-radius: 2em;
      }
    }

    @media screen and (max-width: $screen-md) {
      max-width: 20rem;
      height: 2.3rem;
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
      border-radius: 2em;
    }

    @media screen and (max-width: $screen-sm) {
      max-width: 15rem;
    }
  }

  &__text {
    padding-left: 2vw;
    font-weight: bold;
    font-size: 0.8vw;
    color: #1c1c1c;

    @media screen and (max-width: $screen-md) {
      font-size: 1em;
    }
  }
}
</style>
