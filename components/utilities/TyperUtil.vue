<script setup lang="ts">

const props = defineProps({
  words: {
    type: Array<string>,
    required: true
  }
});

const typeValue = ref('');
const typeStatus = ref(false);
const typingSpeed = 80;
const erasingSpeed = 100;
const newTextDelay = 1000;
const displayTextArrayIndex = ref(0);
const charIndex = ref(0);

const typeText = () => {
  if (charIndex.value < props.words[displayTextArrayIndex.value].length) {
    if (!typeStatus.value) typeStatus.value = true;
    typeValue.value += props.words[displayTextArrayIndex.value].charAt(
        charIndex.value
    );
    charIndex.value += 1;
    setTimeout(typeText, typingSpeed);
  } else {
    typeStatus.value = false;
    setTimeout(eraseText, newTextDelay);
  }
};

const eraseText = () => {
  if (charIndex.value > 0) {
    if (!typeStatus.value) typeStatus.value = true;
    typeValue.value = props.words[displayTextArrayIndex.value].substring(0, charIndex.value - 1);
    charIndex.value -= 1;
    setTimeout(eraseText, erasingSpeed);
  } else {
    typeStatus.value = false;
    displayTextArrayIndex.value += 1;
    if (displayTextArrayIndex.value >= props.words.length)
      displayTextArrayIndex.value = 0;
    setTimeout(typeText, typingSpeed + 1000);
  }
};

onMounted(() => {
  setTimeout(typeText, newTextDelay + 200);
})
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
  //font-family: 'Roboto Mono', monospace;

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
