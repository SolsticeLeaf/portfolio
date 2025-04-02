<script setup lang="ts">
import TyperUtil from "~/components/utilities/TyperUtil.vue";
import initialConfig from "~/config/initial.config";
import toolsConfig from "~/config/tools.config";
import { Vue3Marquee } from "vue3-marquee";
import TechIcon from "~/components/utilities/TechIcon.vue";
import AnnouncementSection from "~/components/section/AnnouncementSection.vue";
import FlexButton from "~/components/utilities/FlexButton.vue";

const { t, tm } = useI18n()
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
  <div class="displayed">
    <div id="hero" class="wrapper blur__glass">
      <div class="main">
        <div class="main__content">
          <h6 class="main__content__hey">{{ t("main_hey") }}</h6>
          <div class="main__content__title">
            <h1 class="main__content__title__first">{{ t("main_title") }}</h1>
            <h1 class="main__content__title__second">{{ t(nickname) }}</h1>
          </div>
          <Suspense>
            <TyperUtil class="type-writer" :words="tm('main_typer')" />
            <template #fallback>
              <div class="skeleton-typer"/>
            </template>
          </Suspense>
          <label class="main__content__spell">{{ t("main_spell") }}</label>
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
            {{ t("main_follow") }}
            <a class="main__content__social__icons">
              <a v-for="link in links" :key="link.icon" :href="link.url">
                <Icon :name="link.icon" class="main__content__social__icons__icon"/>
              </a>
            </a>
          </p>
          <div class="main__content__buttons">
            <FlexButton :text="t('main_email')"
                        :text-bold="true"
                        text-color="--solid-button-text"
                        icon="ic:baseline-mail"
                        color="--button-color"
                        link="mailto:me@sleaf.dev"
                        class="main__content__button__btn"
                        :outline="false" />
            <FlexButton :text="t('main_discord')"
                        :text-bold="false"
                        text-color="--outline-button-text"
                        icon="ic:baseline-discord"
                        color="--button-color"
                        link="https://discord.com/users/SolsticeLeaf"
                        class="main__content__button__btn"
                        :outline="true" />
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
</template>

<style scoped lang="scss">
@use "../../assets/scss/screens" as *;

//* {
//  border: 1px solid deepskyblue !important;
//}

.wrapper {
  @media screen and (max-width: $screen-sm) {
    width: 90%;
  }
}

.blur__glass {
  @media screen and (max-width: $screen-sm) {
    background: transparent;
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

  @media screen and (max-width: $screen-xss) {
    height: fit-content;
    max-height: fit-content;
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
      align-items: center;
      justify-content: center;
      gap: 1rem;

      &__second {
        color: var(--username);
        font-weight: bold;
      }
    }

    &__social {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;

      &__icons {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        max-height: 100%;
        vertical-align: middle;

        &__icon {
          color: var(--text-color-primary);
          font-size: 1.7rem;
        }:hover { color: var(--color-gray); }
      }
    }

    &__buttons {
      display: flex;
      flex-direction: row;
      margin-top: 3%;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      gap: 0.5rem;

      &__btn {
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
