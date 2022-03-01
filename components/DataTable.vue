<template>
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
</template>


<script>
export default {
  props: {
    links: {
      type: Array,
      default: () => [],
      required: true
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
  }
}
</script>
