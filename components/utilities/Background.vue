<script setup lang="ts">
let ticking = false;

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      let translateFactor = 3;
      let blurFactor = 0.03;

      if (scrollY < 0) {
        translateFactor = 1;
        blurFactor = 0;
      }

      const translateY = scrollY / translateFactor;
      const background = document.querySelector('.background') as HTMLElement;
      const video = document.querySelector('.background__video') as HTMLElement;
      const overlap = document.querySelector('.overlap') as HTMLElement;

      if (background && video && overlap) {
        background.style.filter = `blur(${Math.min(100, scrollY * blurFactor)}px)`;
        video.style.transform = `translateY(${translateY}px)`;
        overlap.style.transform = `translateY(${translateY}px)`;
      }

      ticking = false;
    });
    ticking = true;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="background">
    <video class="background__video" autoplay loop muted playsinline>
      <source src="public/background.webm" type="video/webm" />
      <source src="public/background.mp4" type="video/mp4" />
    </video>
    <div class="overlap" />
  </div>
</template>

<style scoped lang="scss">
.background {
  display: flex;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

.background__video {
  display: flex;
  z-index: -2;
  width: 100%;
  transition: transform 0.3s ease-out;
}

.overlap {
  filter: blur(80px);
  background-color: #6b50ff;
  width: 200vw;
  height: 25vw;
  position: absolute;
  z-index: 0;
  top: 42vw;
  transition: transform 0.3s ease-out;
}
</style>
