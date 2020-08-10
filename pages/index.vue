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
      <gallery />
      <v-divider></v-divider>
      <works />
      <v-divider></v-divider>
      <link-cards />
      <v-divider></v-divider>
      <contact-info />
    </v-flex>
  </v-layout>
</template>

<script>
import NameCard from '~/components/NameCard.vue'
import TimeLine from '~/components/TimeLine.vue'
import Gallery from '~/components/Gallery.vue'
import Works from '~/components/Works.vue'
import LinkCards from '~/components/LinkCards.vue'
import ContactInfo from '~/components/ContactInfo.vue'

export default {
  components: {
    NameCard,
    TimeLine,
    LinkCards,
    Gallery,
    Works,
    ContactInfo
  }
}
</script>
