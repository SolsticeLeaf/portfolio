<template>
  <ClientOnly>
    <div id="hero" class="wrapper">
      <b-container>
        <div class="hero">
          <b-row>
            <b-col sm class="hero__content">
              <div class="hero__mobile__image">
                <img
                    id="hero-avatar"
                    :src="this.hero_avatar"
                    alt="SolsticeLeaf"
                    loading="eager"
                />
              </div>
              <div>
                <h6>{{$t('hero_hey')}}</h6>
                <h1>
                  <span class="hero__content__title">
                    <span class="hero__content__title-first">{{ $t('hero_title') }}</span>
                    <span class="hero__content__title-second">{{$t(nickname)}}</span>
                  </span>
                </h1>
                <h2>
                  <div class="type-writer">
                    <TyperUtil :words="[
                    $t('hero_typer1'),
                    $t('hero_typer2'),
                    $t('hero_typer3'),
                    $t('hero_typer4')
                  ]" />
                  </div>
                </h2>
                <p>{{ $t('hero_spell') }}</p>
                <div class="stack__background">
                  <Vue3Marquee pause-on-hover clone duration="120">
                    <div className="stack__text" v-for="tool in tools">
                      {{tool}}
                    </div>
                  </Vue3Marquee>
                </div>
                <h6 class="hero__content__social">
                  {{$t('hero_follow')}}
                  <span class="hero__content__social-icons">
                    <a :href="link.url" v-for="link in hero_socialLinks" :key="link.icon">
                        <icons :icon="'fa-brands fa-'+link.icon" class="social-icon github" />
                    </a>
                  </span>
                </h6>
                <div class="hero__content__main-btns">
                  <a href="mailto:solsticeleaf@kiinse.dev">
                    <b-button :variant="'info'" size="lg">
                      <icons icon="fas fa-envelope" class="main-btn" />
                      {{ $t('hero_email') }}
                    </b-button>
                  </a>
                  <a href='https://discord.com/users/SolsticeLeaf' target="_blank" rel="noopener noreferrer" class="hero__content__main-btns-outline">
                    <b-button :variant="'outline-info'" size="lg">
                      <icons icon="fa-brands fa-discord" class="main-btn"/>
                    </b-button>
                  </a>
                </div>
              </div>
            </b-col>
            <b-col sm class="hero__image">
              <img
                  id="hero-avatar"
                  :src="this.hero_avatar"
                  alt="SolsticeLeaf"
                  loading="eager"
              />
            </b-col>
          </b-row>
        </div>
      </b-container>
    </div>
  </ClientOnly>
</template>

<script>
import TyperUtil from "~/components/Utils/TyperUtil.vue";
import initialConfig from "~/config/initial.config";
import toolsConfig from "~/config/tools.config";
import {Vue3Marquee} from "vue3-marquee";

export default {
  name: "HeroBase",
  components: {
    Vue3Marquee,
    TyperUtil
  },
  data: function () {
    return {
      nickname: initialConfig.nickname,
      hero_avatar: initialConfig.hero.avatar_url,
      hero_socialLinks: initialConfig.socialLinks,
      hero_buttons_conf: initialConfig.hero_buttons,
      tools: toolsConfig.tools
    }
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/style/scss/mixins.scss';
@import '@/assets/style/scss/variables.scss';

.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.stack {
  text-align: center;
  align-items: center;

  &__background {
    max-width: 300px;
    margin-bottom: 3%;
    border-radius: 40px;
    background: -webkit-linear-gradient(0deg, rgb(16, 143, 227) 19%, rgb(1, 218, 185) 100%);

    @media screen and (max-width: $screen-sm) {
      max-width: 400px;
      margin-right: 5%;
      margin-left: 5%;
    }
  }

  &__text {
    padding-left: 40px;
    font-weight: bold;
    font-size: 105%;
    color: #1c1c1c;

    @media screen and (max-width: $screen-sm) {
      padding-left: 30px;
    }
  }
}

.hero {
  margin: 5%;
  &__content {
    &__title-second {
      color: $color-primary-1;
      font-weight: bold;
    }
    .know-more {
      @include mixins.anchor($color-primary-1);
    }
    &__social-icons {
      .social-icon {
        font-size: 1.5rem;
        margin: auto 1%;
      }
      .twitter:hover {
        color: #1da1f2;
      }
      .github:hover,
      .medium:hover {
        color: #6e6e6e;
      }
      .NuxtLinkedin:hover {
        color: #0077b5;
      }
    }
    &__main-btns {
      button {
        color: #1c1c1c !important;
        margin-top: 5%;
      }
    }
    &__main-btns-outline {
      button {
        color: mixins.$text-color-light !important;
        margin-top: 5%;
        margin-left: 2%;
      }
    }
    .type-writer {
      height: 100%;
      color: $color-primary-7;
      .Typist .Cursor {
        color: $color-primary-1;
      }
    }
    @media screen and (max-width: $screen-sm) {
      text-align: center;
    }
  }
  &__image {
    text-align: center;
    align-items: center;
    img {
      border-radius: 25%;
      margin-top: -20%;
      width: 85%;
      height: auto;
    }
  }
  &__mobile__image {
    display: none;
    img {
      border-radius: 25%;
      margin-top: -15%;
      margin-bottom: 5%;
      width: 45%;
      height: auto;
    }
  }
  @media screen and (max-width: $screen-sm) {
    .hero__image {
      align-items: center;
      display: none;
    }
    .hero__mobile__image {
      display: block;
    }
  }
}
</style>
