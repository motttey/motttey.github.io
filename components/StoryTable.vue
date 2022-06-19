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
        v-for="(tag, index) in item.tags.split(',')"
        v-bind:key="index"
        small
      > {{ tag }} </v-chip>
    </template>
    <template  v-slot:[`item.gadgets`]="{ item }">
      <v-chip
        v-for="(gadget, index) in item.gadgets.split(',')"
        v-bind:key="index"
        small
      > {{ gadget }} </v-chip>
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
          text: "ひみつ道具",
          value: "gadgets"
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
