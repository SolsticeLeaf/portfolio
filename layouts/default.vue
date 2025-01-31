<script>
import NavigationSection from "~/components/section/NavigationSection.vue";
import AnnouncementSection from "~/components/section/AnnouncementSection.vue";
import initialConfig from "@/config/initial.config.ts";

export default {
  name: "default",
  components: { AnnouncementSection, NavigationSection },

  data() {
    return {
      nickname: initialConfig.nickname,
      repeatCols: 2,
      repeatRows: 4
    };
  },
  mounted() {
    this.calculateRepeatCount();
    window.addEventListener('resize', this.calculateRepeatCount);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.calculateRepeatCount);
  },
  methods: {
    calculateRepeatCount() {
      const screenHeight = window.innerHeight;
      const row = document.querySelector('.background__text__row');
      const clientHeight = row.clientHeight;
      if (clientHeight > 0) {
        this.repeatRows = Math.ceil(screenHeight/clientHeight) - 1;
      }
    }
  }
};
</script>

<template>
  <div>
    <div class="background__blur">
      <div class="background__text">
        <div v-for="(row, rowIndex) in repeatRows" :key="'row-' + rowIndex" class="background__text__row">
          <span
              v-for="(col, colIndex) in repeatCols"
              :id="'row-' + rowIndex + 'col-' + colIndex"
              :key="'col-' + colIndex"
              class="background__text__word">
            {{ $t(nickname) }}
          </span>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="top_footer">
        <NavigationSection/>
      </div>
      <slot/>
      <div class="top_footer">
        <AnnouncementSection/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables.scss' as *;

.body {
  border: 3px solid red !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
}

.top_footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
  height: 12vh;
  border: 1px solid white !important;
}

.background {
  &__blur {
    background-color: transparent;
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: row;
    filter: blur(12.1px);
    -webkit-filter: blur(12.1px);
    justify-content: center;
    align-items: center;
    @media screen and (max-width: $screen-xss) {
      display: none;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: var(--text-size, 6vw);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: default;

    @media screen and (max-width: $screen-xss) {
      display: none;
    }

    &__row {
      display: flex;
      justify-content: space-evenly;
      white-space: nowrap;
      width: 100%;
      word-spacing: 0.2vw;
    }

    &__word {
      font-size: 6vw;
      padding: 0 1.5vw;
      display: inline-flex;
      color: transparent !important;
      -webkit-text-stroke: 1px $color-primary-2;

    }
  }
}
</style>
