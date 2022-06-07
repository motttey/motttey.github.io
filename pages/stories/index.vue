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
              <StoryTable :stories="stories" />
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
  data: () => ({
    stories: [
      {
        "title": "未来の国からはるばると",
        "abstract": "「ドラえもん」連載第1回",
        "volume": 1,
        "tags": ["ドラえもん", "のび太"]
      }
    ]
  })
}
</script>
