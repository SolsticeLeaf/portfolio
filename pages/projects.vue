<script setup lang="ts">
import ProjectCard from "@/components/card/ProjectCard.vue";
const { data: projects, status: status } = useFetch('/api/getProjectsData', {
  key: 'projects',
  default: () => [],
  cache: "no-cache",
  server: false
});
const hasProjects = computed(() => {
  const items = projects.value
  return (items !== null && items.length > 0);
})

const isPending = computed(() => {
  return status.value === "pending";
})

const getSortedProjects = computed(() => {
  const items = projects.value
  if (!hasProjects) return []
  items.sort((a: any, b: any) => a.title.localeCompare(b.title));
  return items;
})
</script>

<template>
  <ClientOnly>
    <Suspense>
      <div v-if="!hasProjects" class="blur__glass">
        <div v-if="isPending" class="projects__message">
          <UProgress size="xl" animation="carousel" class="projects__message__indicator" />
        </div>
        <div v-else class="projects__message">
          <h1>
            {{ $t('empty') }}
          </h1>
        </div>
      </div>
      <div v-else class="wrapper blur__glass">
        <div class="projects">
          <div class="projects">
            <div class="projects__card" v-for="item in getSortedProjects" :key="item.title">
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
  flex-direction: column;

  @media screen and (max-width: $screen-md) {
    width: fit-content;
    padding: 0;
  }

  @media screen and (max-width: $screen-sm) {
    height: fit-content;
    max-height: fit-content;
    overflow-y: visible;
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

  @media screen and (max-width: $screen-sm) {
    height: fit-content;
    max-height: fit-content;
    overflow-y: visible;
  }

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