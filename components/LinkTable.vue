<template>
  <v-data-table
    dense
    :headers="headers"
    :items="links"
    :items-per-page="15"
    item-key="id"
    class="link-table"
    :search="search"
    :custom-filter="filterText"
    :loading="loading"
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
    <template v-slot:[`item.title`]="{ item }">
      <a
        :href="item.url"
        target="_blank"
        class="font-weight-bold"
      >
        {{ item.title }}
      </a>
    </template>
  </v-data-table>
</template>


<script>
export default {
  name: "LinkTable",
  props: {
    links: {
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
    loading() {
      return this.links.length > 0
    },
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
