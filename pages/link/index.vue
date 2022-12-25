<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm9
      md9
    >
      <v-container fluid>
        <v-row>
          <h1>リンク集</h1>
        </v-row>
        <v-row>
          <v-col>
            <div
              v-for="(links, category) in categoryLinks"
              v-bind:key="category"
            >
              <v-divider class="my-3"></v-divider>
              <v-row v-if="links.length > 0">
                <h2>{{ category }}</h2>
              </v-row>
              <v-row>
                <LinkTable :links="links" />
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import LinkTable from '~/components/LinkTable.vue'

export default {
  name: "Links",
  components: {
    LinkTable
  },
  head: () => ({
    title: " Links"
  }),
  data: () => ({
    links: [],
    categoryLinks: {
      "official": [],
      "fanart": []
    }
  }),
  // asyncDataに書き直す
  methods: {
    async getLinks() {
      this.$axios.$get(process.env.LINKS_API_URL)
        .then((res) => {
          this.links = res
          res.forEach((link, i) => {
            if (Object.keys(this.categoryLinks).includes(link["category"])) {
              this.categoryLinks[link["category"]].push(link)
            }
          });
        })
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
          text: "カテゴリ",
          value: "category"
        },
        {
          text: "紹介",
          value: "description"
        }
      ]
    }
  },
  created () {
    this.getLinks()
  }
}
</script>
