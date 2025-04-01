<script setup lang="ts">
import TyperUtil from "~/components/utilities/TyperUtil.vue";
import initialConfig from "~/config/initial.config";
import toolsConfig from "~/config/tools.config";
import { Vue3Marquee } from "vue3-marquee";
import TechIcon from "~/components/utilities/TechIcon.vue";
import AnnouncementSection from "~/components/section/AnnouncementSection.vue";

const nickname = initialConfig.nickname;
const avatar = initialConfig.hero.avatar_url;
const links = initialConfig.socialLinks;
const tools = toolsConfig.tools;

const buttonColor = ref("");
const secondaryButtonColor = ref("");

const updateColors = () => {
  if (document.body) {
    const style = getComputedStyle(document.body);
    buttonColor.value = style.getPropertyValue("--button-color").trim();
    secondaryButtonColor.value = style.getPropertyValue("--secondary-button-color").trim();
  }
};

onMounted(() => {
  updateColors();
  const observer = new MutationObserver(() => {
    updateColors();
  });
  observer.observe(document.body, { attributes: true });
  onBeforeUnmount(() => {
    observer.disconnect();
  });
});
</script>

<template>
  <ClientOnly>
    <div class="displayed">
      <div id="hero" class="wrapper blur__glass">
        <div class="main">
          <div class="main__content">
            <h6 class="main__content__hey">{{ $t("main_hey") }}</h6>
            <div class="main__content__title">
              <h1 class="main__content__title__first">{{ $t("main_title") }}</h1>
              <h1 class="main__content__title__second">{{ $t(nickname) }}</h1>
            </div>
            <Suspense>
              <TyperUtil class="type-writer" :words="$tm('main_typer')" />
              <template #fallback>
                <div class="skeleton-typer"/>
              </template>
            </Suspense>
            <label class="main__content__spell">{{ $t("main_spell") }}</label>
            <div class="stack">
              <div class="stack__background">
                <Suspense>
                  <Vue3Marquee pause-on-hover :duration="60" class="stack__background__text">
                    <div class="stack__text" v-for="tool in tools" :key="tool">
                      <Suspense>
                        <TechIcon class="data-marquee-icon" :icon="tool" />
                        <template #fallback>
                          <div class="skeleton-icon" />
                        </template>
                      </Suspense>
                      <p>{{ tool }}</p>
                    </div>
                  </Vue3Marquee>
                  <template #fallback>
                    <div class="skeleton-marquee"/>
                  </template>
                </Suspense>
              </div>
            </div>
            <p class="main__content__social">
              {{ $t("main_follow") }}
              <a class="main__content__social-icons">
                <a v-for="link in links" :key="link.icon" :href="link.url">
                  <icons :icon="'fa-brands fa-' + link.icon" class="social-icon github" />
                </a>
              </a>
            </p>
            <div class="main__content__button">
              <a href="mailto:me@sleaf.dev" class="main__content__button__solid">
                <el-button class="main__content__button__solid" :color="buttonColor" round size="large">
                  <icons class="main__content__button__solid__text icon_padding_right" icon="fas fa-envelope" />
                  <p class="main__content__button__solid__text">{{ $t("main_email") }}</p>
                </el-button>
              </a>
              <a href="https://discord.com/users/SolsticeLeaf" target="_blank" rel="noopener noreferrer" class="main__content__button__outline">
                <el-button class="main__content__button__outline" :color="secondaryButtonColor" round size="large">
                  <icons class="main__content__button__outline__text icon_padding_right" icon="fa-brands fa-discord" />
                  <p class="main__content__button__outline__text">{{ $t("main_discord") }}</p>
                </el-button>
              </a>
            </div>
          </div>
        </div>
        <div class="image">
          <div class="image__content">
            <Suspense>
              <nuxt-img
                  id="hero-avatar"
                  :src="avatar"
                  alt="SolsticeLeaf"
                  fit="cover"
                  height="80%"
                  loading="eager"
              />
              <template #fallback>
                <div class="skeleton-avatar"/>
              </template>
            </Suspense>
          </div>
        </div>
      </div>
      <div class="announcements">
        <Suspense>
          <AnnouncementSection />
          <template #fallback>
            <div class="skeleton-announcement"/>
          </template>
        </Suspense>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use "../../assets/scss/screens" as *;

.blur__glass {
  @media screen and (max-width: $screen-sm) {
    background: transparent;
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }
}

.displayed {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  height: 80vh;
  max-height: 85vh;
  justify-content: center;

  @media screen and (max-width: $screen-sm) {
    height: fit-content;
  }
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

    &__title {
      display: flex;
      flex-direction: row;
      gap: 1rem;

      &__second {
        color: var(--username);
        font-weight: bold;
      }
    }

    &__social-icons {
      max-height: 100%;
      vertical-align: middle;

      .social-icon {
        vertical-align: center;
        font-size: 1.7rem;
        margin: auto 1%;
      }

      .github:hover,
      .medium:hover {
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
        max-height: 2rem;

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
        }

        @media screen and (max-width: $screen-md) {
          height: 3rem;
        }
      }

      @media screen and (max-width: $screen-md) {
        margin-top: 2rem;
        display: flex;
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
    width: 30rem;
    text-align: center;
    align-items: center;
    margin-left: 0;
    margin-right: auto;
    display: flex;

    @media screen and (max-width: $screen-lg) {
      width: 25rem;
    }

    @media screen and (max-width: $screen-md) {
      width: 12rem;
    }

    @media screen and (max-width: $screen-sm) {
      width: 8rem;
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
    color: var(--text-stack);
    align-items: center;

    @media screen and (max-width: $screen-md) {
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

.skeleton-typer {
  width: 100%;
  height: 2rem;
  background: #e0e0e0;
  animation: pulse 1.5s infinite;
}

.skeleton-marquee {
  width: 25rem;
  height: 2rem;
  background: #e0e0e0;
  animation: pulse 1.5s infinite;
}

.skeleton-icon {
  width: 1.5rem;
  height: 1.5rem;
  background: #e0e0e0;
  animation: pulse 1.5s infinite;
  margin-right: 0.5rem;
}

.skeleton-avatar {
  width: 30rem;
  height: 80%;
  background: #e0e0e0;
  border-radius: 25%;
  animation: pulse 1.5s infinite;
}

.skeleton-announcement {
  width: 100%;
  height: 10rem;
  background: #e0e0e0;
  animation: pulse 1.5s infinite;
}
</style>
