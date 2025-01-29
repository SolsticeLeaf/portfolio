<script>
export default {
  name: "TyperUtil",
  props: ['words'],
  data: function() {
    return {
      typeValue: "",
      typeStatus: false,
      displayTextArray: this.words,
      typingSpeed: 80,
      erasingSpeed: 100,
      newTextDelay: 1000,
      displayTextArrayIndex: 0,
      charIndex: 0,
    };
  },
  created() {
    setTimeout(this.typeText, this.newTextDelay + 200);
  },
  methods: {
    typeText() {
      if (this.charIndex < this.displayTextArray[this.displayTextArrayIndex].length) {
        if (!this.typeStatus) this.typeStatus = true;
        this.typeValue += this.displayTextArray[this.displayTextArrayIndex].charAt(
            this.charIndex
        );
        this.charIndex += 1;
        setTimeout(this.typeText, this.typingSpeed);
      } else {
        this.typeStatus = false;
        setTimeout(this.eraseText, this.newTextDelay);
      }
    },
    eraseText() {
      if (this.charIndex > 0) {
        if (!this.typeStatus) this.typeStatus = true;
        this.typeValue = this.displayTextArray[this.displayTextArrayIndex].substring(
            0,
            this.charIndex - 1
        );
        this.charIndex -= 1;
        setTimeout(this.eraseText, this.erasingSpeed);
      } else {
        this.typeStatus = false;
        this.displayTextArrayIndex += 1;
        if (this.displayTextArrayIndex >= this.displayTextArray.length)
          this.displayTextArrayIndex = 0;
        setTimeout(this.typeText, this.typingSpeed + 1000);
      }
    },
  },
}
</script>

<template>
  <div>
    <h1>
      <span class="typed-text">{{ typeValue }}</span>
      <span class="blinking-cursor">|</span>
      <span class="cursor" :class="{ typing: typeStatus }"></span>
    </h1>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/variables.scss" as *;

h1 {
  font-size: 1.3vw;
  font-weight: normal;
  font-family: $font-family-primary;

  span.typed-text {
    color: $color-primary-7;
  }

  @media screen and (max-width: $screen-md) {
    font-size: 1em;
  }
}

.typed-text {
  margin-right: -1.5%;
}

.blinking-cursor {
  font-size: 1.8vw;
  line-height: 1;
  color: $color-primary-1;
  -webkit-animation: 1s blink step-end infinite;
  -moz-animation: 1s blink step-end infinite;
  -o-animation: 1s blink step-end infinite;
  animation: 1s blink step-end infinite;

  @media screen and (max-width: $screen-md) {
    font-size: 1.4em;
    font-weight: bold;
  }
}

@keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: $color-primary-1;
  }
}

@-moz-keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: $color-primary-1;
  }
}

@-webkit-keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: $color-primary-1;
  }
}

@-ms-keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: $color-primary-1;
  }
}

@-o-keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: $color-primary-1;
  }
}
</style>
