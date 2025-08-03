<script setup lang="ts">
import { KeepAlive } from 'vue';
import Navigation from './components/navigation/Navigation.vue';
import Background from './components/utilities/Background.vue';
import Grain from './components/utilities/Grain.vue';
import Footer from './components/footer/Footer.vue';
</script>

<template>
  <Body>
    <NuxtLayout>
      <div id="body" class="body">
        <ClientOnly>
          <KeepAlive>
            <Suspense>
              <Navigation />
            </Suspense>
          </KeepAlive>
          <KeepAlive>
            <Background />
          </KeepAlive>
          <KeepAlive>
            <Grain />
          </KeepAlive>
        </ClientOnly>
        <Suspense>
          <NuxtPage />
        </Suspense>
        <Suspense>
          <Footer />
        </Suspense>
      </div>
    </NuxtLayout>
  </Body>
</template>

<style scoped lang="scss">
@use '@/assets/scss/screens' as *;

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  width: 100vw;
  max-width: 100vw;
}
</style>
