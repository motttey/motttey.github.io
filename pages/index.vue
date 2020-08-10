<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <name-card />
      <v-divider></v-divider>
      <time-line />
      <v-divider></v-divider>
      <link-cards />
      <!-- gallerywを移植する -->
    </v-flex>
  </v-layout>
</template>

<script>
import NameCard from '~/components/NameCard.vue'
import TimeLine from '~/components/TimeLine.vue'
import LinkCards from '~/components/LinkCards.vue'

export default {
  components: {
    NameCard,
    TimeLine,
    LinkCards
  }
}
</script>
