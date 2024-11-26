<template>
  <ClientOnly>
    <nav id="navbar">
      <div class="nav__brand">
        <ul>
          <li>
            <NuxtLink to="/" class="siteName">
              {{ $t(siteName) }}
            </NuxtLink>
            <p class="abbr">
              <span class="line">Knowledge Integration Intelligent</span>
              <span class="line">Network Systems Engineering</span>
            </p>
          </li>
        </ul>
      </div>
      <div class="nav__btn justify-content-center align-content-center"></div>
      <div class="nav__links">
        <ul>
          <li v-for="item in menuItems" :key="item.path">
            <NuxtLink
                :to="item.path"
                active-class="active-menu-link"
                class="nav__btn__link"
            >
              {{ $t(item.name) }}
            </NuxtLink>
          </li>
          <li @click="changeLocale()">
            <icons icon="fa-solid fa-globe" />
          </li>
        </ul>
      </div>
      <b-container fluid class="nav_mobile_setting align-content-center justify-content-center text-center">
        <NuxtLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            active-class="active-menu-link"
            class="nav__btn__link__mobile m-2"
        >
          {{ $t(item.name) }}
        </NuxtLink>
      </b-container>
    </nav>
  </ClientOnly>
</template>

<script>
import initialConfig from "~/config/initial.config";

export default {
  name: "NavigationBase",
  data() {
    return {
      siteName: initialConfig.siteName,
      menuItems: [
        {
          name: "nav_home",
          path: "/",
        },
        {
          name: "nav_projects",
          path: "/projects",
        },
      ],
    };
  },
  methods: {
    changeLocale() {
      if (this.$i18n.locale !== "ru") this.$i18n.setLocale("ru");
      else this.$i18n.setLocale("en");
    },
  },
};
</script>

<style scoped lang="scss">
@import "assets/style/scss/variables";
.active-menu-link {
  color: #007bff;
  font-weight: bold;
}

.abbr {
  text-align: justify;
  width: fit-content;
  line-height: 1.3;
  max-height: 12px;
  position: relative;
  display: inline-block;
  margin: 0 auto;
  font-style: italic;
  font-size: 10px;
  color: #949494;
}

.line {
  width: fit-content;
  position: relative;
  display: inline-block;
  line-height: 1.3;
  max-height: 12px;
  text-align: justify;
}

.nav__btn__link__mobile {
  font-size: 3vh;
}
.nav__btn__link__mobile:hover {
  color: #007bff;
}
.nav_mobile_setting {
  display: none;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 7%;

.nav__brand {
  width: 60px;
a {
  text-decoration: none;
  font-size: 5vh;
  background: -webkit-linear-gradient(0deg, rgb(2, 127, 252) 35%, rgb(3, 209, 255) 51%, rgb(5, 209, 255) 86%, rgb(2, 254, 216) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 20px;
}
}
li {
  text-decoration: none;
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  font-weight: bold;
a:hover,
a:active {
  color: $color-primary-1;
  font-style: italic;
  text-decoration: none;
}
}
.nav__brand {
  cursor: pointer;
a:hover {
  color: $text-color-light;
}
}
a {
  text-decoration: none;
  color: $text-color-light;
}
.nav__links {
@media screen and (max-width: $screen-sm) {
  display: none;
}
}
.nav__btn {
  display: none;
}
@media screen and (max-width: $screen-sm) {
  .nav__btn {
    display: block;
  }
  .nav__brand {
    display: none;
  }
  .nav_mobile_setting {
    display: block;
  }
}
}
@media screen and (max-width: $screen-sm) {
  .nav__btn {
&__checkbox {
   text-align: center;
   align-items: center;
   justify-items: center;
   display: none;
 }
&__button {
   background-color: $color-primary-1;
   height: 2rem;
   width: 2rem;
   top: 5rem;
   right: 2rem;
   border-radius: 50%;
   z-index: 2000;
   box-shadow: rgba($color-primary-1, 0.3) 0px 7px 29px 0px;
   text-align: center;
   justify-content: center;
   align-content: center;
   cursor: pointer;
  svg {
    margin: auto auto;
  }
}
&__background {
   height: 2rem;
   width: 2rem;
   border-radius: 50%;
   position: fixed;
   top: 5rem;
   right: 2.5rem;
   background-image: radial-gradient($text-color-dark, $color-primary-1);
   z-index: 1000;
   transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);
   text-align: center;
   justify-content: center;
   align-content: center;
 }
&__nav {
   height: 100vh;
   position: fixed;
   top: 0;
   right: -30%;
   z-index: 1500;
   opacity: 0;
   width: 0;
   transition: all 0.8s cubic-bezier(0.6, -0.55, 0.265, 1.55);
 }
&__list {
   position: absolute;
   top: 50%;
   left: 15%;
   transform: translate(-50%, -50%);
   list-style: none;
   text-align: center;
   display: flex;
   flex-direction: column;
 // width: 100%;
 }
&__item {
   margin: 1rem;
 }
&__link {
   font-size: 2rem;
   font-weight: bold;
   color: $text-color-light;
   text-decoration: none;
&:hover,
&:active {
   color: $color-primary-1;
 }
}
&__checkbox:checked ~ &__background {
   transform: scale(80);
 }
&__checkbox:checked ~ &__nav {
   opacity: 1;
   width: 100%;
 }
&__icon {
   position: relative;
   margin-top: 1.5rem;
   margin-left: 0.7rem;
&,
&::before,
&::after {
   width: 1.5rem;
   height: 2px;
   background-color: $text-color-light;
   display: inline-block;
 }
&,
&::before,
&::after {
   content: '';
   position: absolute;
   left: 0;
   transition: all 0.2s;
 }
&::before {
   top: -0.4rem;
 }
&::after {
   top: 0.4rem;
 }
}
&__button:hover &__icon::before {
                   top: -0.6rem;
                 }
&__button:hover &__icon::after {
                   top: 0.6rem;
                 }
&__checkbox:checked + &__button &__icon {
   background-color: transparent;
 }
&__checkbox:checked + &__button &__icon::before {
   top: 0;
   transform: rotate(135deg);
 }
&__checkbox:checked + &__button &__icon::after {
   top: 0;
   transform: rotate(-135deg);
 }
}
}
</style>
