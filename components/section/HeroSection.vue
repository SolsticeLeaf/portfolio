<script setup lang="ts">
import TyperUtil from "~/components/utilities/TyperUtil.vue";
import initialConfig from "~/config/initial.config";
import toolsConfig from "~/config/tools.config";
import {Vue3Marquee} from "vue3-marquee";
import TechIcon from "~/components/utilities/TechIcon.vue";
import AnnouncementSection from "~/components/section/AnnouncementSection.vue";

const nickname = initialConfig.nickname;
const avatar = initialConfig.hero.avatar_url;
const links = initialConfig.socialLinks;
const tools = toolsConfig.tools;

const buttonColor = ref('');
const secondaryButtonColor = ref('');

const updateColors = () => {
  if (document.body) {
    const style = getComputedStyle(document.body);
    buttonColor.value = style.getPropertyValue('--button-color').trim();
    secondaryButtonColor.value = style.getPropertyValue('--secondary-button-color').trim();
  }
};

onMounted(() => {
  updateColors();
  const observer = new MutationObserver(() => { updateColors(); });
  observer.observe(document.body, { attributes: true});
  onBeforeUnmount(() => { observer.disconnect(); });
});
</script>

<template>
  <ClientOnly>
    <div class="displayed">
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
              <Vue3Marquee pause-on-hover :duration="60" class="stack__background__text">
                <div class="stack__text" v-for="tool in tools">
                  <TechIcon class="stack__background__text__icon" :icon="tool"/>
                  {{ tool }}
                </div>
              </Vue3Marquee>
            </div>
          </div>
          <h6 class="main__content__social">
            {{$t('main_follow')}}
            <a class="main__content__social-icons">
              <icons :href="link.url" v-for="link in links" :key="link.icon" :icon="'fa-brands fa-'+link.icon" class="social-icon github" />
            </a>
          </h6>
          <div class="main__content__button">
            <a href="mailto:me@sleaf.dev" class="main__content__button__solid">
              <el-button class="main__content__button__solid" :color="buttonColor" round size="large">
                <icons class="main__content__button__solid__text icon_padding_right" icon="fas fa-envelope"/>
                <p class="main__content__button__solid__text">{{ $t('main_email') }}</p>
              </el-button>
            </a>
            <a href='https://discord.com/users/SolsticeLeaf' target="_blank" rel="noopener noreferrer" class="main__content__button__outline">
              <el-button class="main__content__button__outline" :color="secondaryButtonColor" round size="large">
                <icons class="main__content__button__outline__text icon_padding_right" icon="fa-brands fa-discord"/>
                <p class="main__content__button__outline__text">{{ $t('main_discord') }}</p>
              </el-button>
            </a>
          </div>
        </div>
      </div>
      <div class="image">
        <div class="image__content">
          <NuxtImg
              id="hero-avatar"
              :src="avatar"
              alt="SolsticeLeaf"
              fit="cover"
              height="80%"
              loading="eager"
          />
        </div>
      </div>
    </div>
    <div class="announcements">
      <AnnouncementSection />
    </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use '@/assets/scss/screens' as *;

//* {
//  border: 1px solid white !important;
//}

.blur__glass {
  @media screen and (max-width: $screen-sm) {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }
}

.displayed {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: space-between;
}

.announcements {
  display: flex;
  width: 100vw;
}

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
      font-size: 1rem;
      color: var(--text-color-gray) !important;

      @media screen and (max-width: $screen-sm) {
        font-size: 0.9rem;
      }
    }

    &__hey {
      font-size: 1rem;
    }

    &__title {
      font-size: 2.5rem;
      max-height: 100%;
      line-height: 2.5rem;

      @media screen and (max-width: $screen-md) {
        font-size: 2rem;
        line-height: 2rem;
      }

      &__second {
        color: var(--username);
        font-weight: bold;
      }
    }

    &__social {
      font-size: 1rem;
    }

    &__social-icons {
      max-height: 100%;
      vertical-align: middle;

      .social-icon {
        vertical-align: center;
        font-size: 1.7rem;
        margin: auto 1%;
      }

      .github:hover, .medium:hover {
        color: var(--color-gray);
      }

      .NuxtLinkedin:hover {
        color: var(--link-hover);
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
        height: 2.5rem;

        &__text {
          color: var(--solid-button-text) !important;
          font-size: 1rem !important;

          @media screen and (max-width: $screen-md) {
            font-size: 1rem !important;
            line-height: 1rem !important;
          }
        }

        @media screen and (max-width: $screen-md) {
          height: 3rem;
        }
      }

      &__outline {
        margin-left: 2%;
        height: 2.5rem;

        &__text {
          color: var(--outline-button-text) !important;
          font-size: 1rem !important;

          @media screen and (max-width: $screen-md) {
            font-size: 1rem !important;
            line-height: 1rem !important;
          }
        }

        @media screen and (max-width: $screen-md) {
          height: 3rem;
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
      color: var(--color-typer-text);
      font-style: italic;

      .Typist .Cursor {
        color: var(--color-typer-cursor);
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

    @media screen and (max-width: $screen-sm) {
      width: 8em;
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
    max-width: 25rem;
    max-height: 100%;
    border-radius: 2rem;
    background: var(--stack-gradient);
    overflow: hidden;
    margin-top: 3%;
    margin-bottom: 3%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 0.1rem 0;

    &__text {
      border-radius: 2rem;

      &__icon {
        padding-right: 0.5rem;
        height: 1.5rem;
      }
    }

    @media screen and (max-width: $screen-md) {
      max-width: 20rem;
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
      border-radius: 2em;
    }
  }

  &__text {
    display: flex;
    flex-direction: row;
    height: 100%;
    max-height: 100%;
    padding: 0 1rem;
    font-weight: bold;
    font-size: 1rem;
    color: var(--text-stack);
    align-items: center;

    @media screen and (max-width: $screen-md) {
      font-size: 1rem;
      padding: 0 2rem;
    }

    &__icon {
      padding-right: 0.2rem;
      height: 1.3rem;

      @media screen and (max-width: $screen-md) {
        height: 1rem;
      }
    }
  }
}
</style>
