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
    </v-flex>
  </v-layout>
</template>

<script>
import NameCard from '~/components/NameCard.vue'
import TimeLine from '~/components/TimeLine.vue'

export default {
  components: {
    NameCard,
    TimeLine
  }
}
</script>
