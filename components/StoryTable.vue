<template>
  <v-data-table
    dense
    :headers="headers"
    :items="stories"
    :items-per-page="50"
    item-key="id"
    class="story-table"
    v-if="stories.length > 0"
    :search="search"
    :custom-filter="filterText"
    loading="true"
    loading-text="Loading data..."
    no-data-text="There is a no data."
  >
    <template v-slot:top>
     <v-text-field
       v-model="search"
       label="Search (partial match))"
       class="mx-4"
     ></v-text-field>
    </template>
    <template  v-slot:[`item.tags`]="{ item }">
      <v-chip
        v-for="(tag, index) in item.tags"
        v-bind:key="index"
      > {{ tag }} </v-chip>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "StoryTable",
  props: {
    stories: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {
      search: ''
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
          text: "あらすじ",
          value: "abstract"
        },
        {
          text: "巻数",
          value: "volume"
        },
        {
          text: "タグ",
          value: "tags"
        }
      ]
    }
  },
  methods: {
    filterText (value, search, item) {
      return value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().indexOf(search) !== -1
    },
  }
}
</script>

<style>
.theme--dark.v-data-table {
  background-color: rgba(30, 30, 30, 0.5);
}
</style>
