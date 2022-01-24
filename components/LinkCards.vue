<template>
  <v-container fluid id="LinkCards">
    <h1>Links</h1>
    <h3>各種SNSのアカウントです。</h3>

    <v-row dense class="mb-6">
      <v-col cols="12" sm="8" offset-sm="2">
        <v-container fluid>
          <v-row>
            <v-col
              :cols="card.flex"
              v-for="card in cards"
              :key="card.tditle">
              <v-hover v-slot="{ hover }">
                <v-card
                  :class="{ 'on-hover': hover }"
                >
                  <a :href="card.url" target="_blank">
                    <v-img
                      :src="card.src"
                      :elevation="hover ? 12 : 2"
                      class="white--text align-end"
                      position='50% 80%'
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
                      height="250px"
                      aspect-ratio="1"
                    >
                      <v-btn
                        text
                        color="#0288D1"
                      >
                        <h2>{{ card.title }}</h2>
                      </v-btn>
                    </v-img>
                  </a>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
       </v-col>
     </v-row>
   </v-container>
 </v-card>
</template>
<script>
  export default {
    data: () => ({
      cards: [
        { title: 'pixiv', src: process.env.PIXIV_API_URL +  '?illust_id=56266129',
        url: 'https://www.pixiv.net/users/415546', flex: 12 },
        { title: 'deviantART', src: process.env.PIXIV_API_URL +  '?illust_id=49554002',
        url: 'https://www.deviantart.com/motttey', flex: 6 },
        { title: 'weibo',  src: process.env.PIXIV_API_URL + '?illust_id=56608401',
        url: 'https://weibo.com/7310121728', flex: 6 },
        { title: 'twitter',  src: process.env.PIXIV_API_URL + '?illust_id=79403135',
        url: 'https://twitter.com/mt_tg', flex: 12 },
        { title: 'Instagram',  src: process.env.PIXIV_API_URL + '?illust_id=49339965',
        url: 'https://www.instagram.com/tagosaku_mochiduki', flex: 6 },
        { title: 'Blog',  src: process.env.PIXIV_API_URL + '?illust_id=83975466',
        url: 'http://motttey.hatenablog.com/', flex: 6 },
        { title: 'Skeb',  src: process.env.PIXIV_API_URL + '?illust_id=86992637',
        url: 'https://skeb.jp/@mt_tg', flex: 12 },
      ],
    }),
  }
</script>

<style scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
 }
</style>
