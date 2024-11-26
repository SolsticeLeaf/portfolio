<template>
  <ClientOnly>
    <div class="project-card">
      <b-container>
        <b-card class="bg-dark">
          <b-card-body>
            <b-row>
              <b-col class="project-card__image">
                <img class="card-image" :src="getImageUrl(imageLink)" height="200" />
              </b-col>
              <b-col class="project-card__information">
                <b-card-title>{{ this.title }}</b-card-title>
                <b-card-text>{{ this.description }}</b-card-text>
                <b-row class="project-card__links">
                  <b-col class="text-center" v-for="source in sources" :key="source.name">
                    <a
                        :href="source.link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                      <icons :icon="source.icon" :color="source.iconColor"/>
                      {{$t(source.name)}}
                    </a>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-container>
    </div>
    <b-modal v-model="isActive" :id="title">
      <ContentRenderer :value="mdData"/>
    </b-modal>
  </ClientOnly>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    title: {
      type: String
    },
    description: {
      type: String
    },
    imageLink: {
      type: String
    },
    sources: {
      type: Array
    },
  },
  data: function () {
    return {
      isActive: false,
      mdData: null,
    }
  },
  async fetch() {
    const { data } = await useAsyncData('home', () => queryContent(link).findOne())
    this.mdData = data;
  },
  methods: {
    getImageUrl(path) {
      return new URL(path, import.meta.url).href
    },
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/style/scss/variables.scss';

.project-card {
  .b-card {
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  }
  .b-card-title {
    white-space: nowrap;
  }
  .card-title {
    color: $color-primary-9;
  }
  .card-image {
    display: block;
    height: 8rem;
    max-width: 15rem;
    margin-left: auto;
    margin-right: auto;
    width: auto;
  }
  &__information {
    align-content: center;
  }
  &__image {
    max-width: 15rem;
    margin-right: 2rem;
  }
  &__links {
    background: #1d2125;
    border: 1px solid #1d2125;
    border-radius: 1rem;
    width: 100%;
    .col {
      white-space: nowrap;
    }
    a {
      text-decoration: none;
      color: $text-color-light;
      &:hover {
        color: darken($text-color-light, 20%);
      }
    }
  }
}
</style>
