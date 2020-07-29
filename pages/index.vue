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
    </v-flex>
  </v-layout>
</template>

<script>
import NameCard from '~/components/NameCard.vue'

export default {
  components: {
    NameCard
  }
}
</script>
