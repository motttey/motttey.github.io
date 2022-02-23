<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm6
      md6
    >
      <h1>リンク集</h1>
      <v-data-table
        :headers="headers"
        :items="links"
        :items-per-page="15"
        item-key="id"
        class="link-table"
      >
        <template v-slot:[`item.title`]="{ item }">
          <a :href="item.url" target="_blank">
            {{ item.title }}
          </a>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import links from "static/links"

export default {
  name: "linkTable",
  data: () => ({
    links: links.data,
  }),
  methods: {
    async getLinks() {
      this.links = await this.$axios.$get('/links')
    }
  },
  computed: {
    headers() {
      return [
        {
          text: "タイトル",
          value: "title"
        },
        {
          text: "紹介",
          value: "description"
        }
      ]
    }
  },
  mounted: function() {
    this.getLinks()
  }
}
</script>
