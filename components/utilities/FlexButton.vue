<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  textInvertedColor: {
    type: Boolean,
    default: false
  },
  textBold: {
    type: Boolean,
    default: true
  },
  customColor: {
    type: Boolean,
    default: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '--button-color'
  },
  textColor: {
    type: String,
    default: '--text-color-primary'
  },
  link: {
    type: String,
    default: '#'
  },
  outline: {
    type: Boolean,
    default: false
  }
});

const buttonStyle = computed(() => ({
  backgroundColor: props.outline ? 'transparent' : props.customColor ?  `var(${props.color})` : props.color,
  border: `2px solid ${props.customColor ? `var(${props.color})` : props.color}`,
  color: props.outline ? props.customColor ? `var(${props.color})` : props.color : 'white'
}));

const textStyle = computed(() => ({
  color: props.textInvertedColor ? 'white' : `var(${props.textColor})`,
  fontWeight: props.textBold ? 'bold' : 'normal',
  mixBlendMode: props.textInvertedColor ? 'difference' : 'none'
}))
</script>

<template>
  <NuxtLink :to="props.link" class="button" :style="buttonStyle">
    <Icon :name="props.icon" class="button__img" :style="textStyle"></Icon>
    <p :style="textStyle">{{ props.text }}</p>
  </NuxtLink>
</template>

<style scoped lang="scss">

* {
  cursor: pointer;
  user-select: none;
}

.button {
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 2rem;
  transition: background-color 0.3s, transform 0.2s, color 0.3s;

  &__img {
    font-size: 1.5rem;
  }
}

.button:hover {
  opacity: 0.8;
}

.button:active {
  transform: scale(0.95);
}
</style>
