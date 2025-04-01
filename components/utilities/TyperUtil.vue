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
    <h6>
      <span class="typed-text">{{ typeValue }}</span>
      <span class="blinking-cursor">|</span>
      <span class="cursor" :class="{ typing: typeStatus }"></span>
    </h6>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/screens.scss" as *;

h6 {
  font-weight: normal;
  font-family: 'Roboto Mono', monospace;

  span.typed-text {
    color: var(--color-typer-text);
  }
}

.typed-text {
  margin-right: -1.5%;
}

.blinking-cursor {
  font-size: 1.8rem;
  line-height: 1;
  color: var(--co);
  -webkit-animation: 1s blink step-end infinite;
  -moz-animation: 1s blink step-end infinite;
  -o-animation: 1s blink step-end infinite;
  animation: 1s blink step-end infinite;

  @media screen and (max-width: $screen-md) {
    font-weight: bold;
  }
}

@keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: var(--color-typer-cursor);
  }
}

@-moz-keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: var(--color-typer-cursor);
  }
}

@-webkit-keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: var(--color-typer-cursor);
  }
}

@-ms-keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: var(--color-typer-cursor);
  }
}

@-o-keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: var(--color-typer-cursor);
  }
}
</style>
