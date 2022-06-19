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
          <h1>コミックス概説</h1>
        </v-row>
        <v-row>
          <v-col>
            <!-- ストーリーの一覧 -->
            <v-row>
              <StoryTable
                v-if="stories"
                :stories="stories"
              />
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import StoryTable from '~/components/StoryTable.vue'

export default {
  name: "Stories",
  components: {
    StoryTable
  },
  head: () => ({
    title: " - Stories"
  }),
  data: () => ({
    stories: []
  }),
  methods: {
    async getStories() {
      this.$axios.$get(process.env.STORIES_API_URL)
        .then((res) => {
          this.stories = res
        })
        .catch((error) => {
          console.log(error)
        });
    }
  },
  created () {
    this.getStories()
  }
}
</script>
