<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md8
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
              <v-row>
                <h2>{{ category }}</h2>
              </v-row>
              <v-row>
                <v-data-table
                  :headers="headers"
                  :items="links"
                  :items-per-page="15"
                  item-key="id"
                  class="link-table"
                  v-if="links.length > 0"
                >
                  <template v-slot:[`item.title`]="{ item }">
                    <a :href="item.url" target="_blank">
                      {{ item.title }}
                    </a>
                  </template>
                </v-data-table>
              </v-row>
            </div>
          </v-col>
        </v-row>
        <v-row>
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
        </v-row>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "linkTable",
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
      this.$axios.$get(process.env.GOOGLE_API_URL)
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

    console.log(this.categoryLinks)
  }
}
</script>
