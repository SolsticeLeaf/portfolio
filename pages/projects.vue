<script setup lang="ts">
import ProjectCard from "@/components/card/ProjectCard.vue";
const { data: projects } = await useFetch('/api/getProjectsData').then(res => {
  console.log("Loaded projects: " + res.data.value.length)
  return res
});

function hasProjects() {
  const items = projects.value
  return (items !== null && items.length > 0);
}
</script>

<template>
  <ClientOnly>
    <Suspense>
      <div class="wrapper blur__glass">
        <div class="projects">
          <div class="projects__card" v-if="hasProjects()" v-for="item in projects" :key="item.title">
            <ProjectCard
                v-bind:title="item.title"
                :description="item.description"
                :image-link="item.imageLink"
                :sources="item.sources"
            />
          </div>
          <div class="projects__empty" v-if="!hasProjects()">
            <h1>
              {{ $t('empty') }}
            </h1>
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
    width: 100%;
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

  &__empty {
    font-size: 2vw;
    font-weight: bold;

    @media screen and (max-width: $screen-md) {
      font-size: 2rem;
    }

    @media screen and (max-width: $screen-sm) {
      font-size: 1rem;
    }
  }
}


</style>