<script setup lang="ts">
import ProjectCard from "@/components/card/ProjectCard.vue";
const { data: projects, status: status } = useFetch('/api/getProjectsData');

const hasProjects = computed(() => {
  const items = projects.value
  return (items !== null && items.length > 0);
})

const isPending = computed(() => {
  return status.value === "pending";
})
</script>

<template>
  <ClientOnly>
    <Suspense>
      <div class="wrapper blur__glass">
        <div class="projects">
          <div v-if="isPending" class="projects__message">
            <UProgress size="xl" animation="carousel" class="projects__message__indicator" />
          </div>
          <div v-else class="projects">
            <div v-if="!hasProjects" class="projects__message">
              <h1>
                {{ $t('empty') }}
              </h1>
            </div>
            <div v-else class="projects__card" v-for="item in projects ?? []" :key="item.title">
              <ProjectCard
                  v-bind:title="item.title"
                  :description="item.description"
                  :image-link="item.imageLink"
                  :sources="item.sources"
              />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  </ClientOnly>
</template>

<style scoped lang="scss">

@use '@/assets/scss/variables.scss' as *;

//* {
//  border: 1px solid white !important;
//}

.wrapper {
  clip-path: inset(0 round 3rem);
  overflow-y: scroll;

  @media screen and (max-width: $screen-md) {
    width: fit-content;
    padding: 0;
  }
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}

::-webkit-scrollbar-thumb {
  border-radius: 3rem;
  background-color: rgba(0, 0, 0, .5);
  box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}

.projects {
  height: fit-content;
  display: flex;
  flex-direction: column;

  &__card {
    margin: 1rem;
  }

  &__message {
    font-size: 2vw;
    font-weight: bold;
    padding: 1rem;

    &__indicator {
      width: 14rem;
    }

    @media screen and (max-width: $screen-md) {
      font-size: 2rem;
    }

    @media screen and (max-width: $screen-sm) {
      font-size: 1rem;
    }
  }
}


</style>