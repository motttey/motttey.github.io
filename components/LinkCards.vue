<template>
  <v-container fluid id="LinkCards">
    <h1>My Links</h1>
    <h3>パーソナリティを知ってください. </h3>

    <v-row dense class="mb-6">
      <v-col cols="12" sm="10" offset-sm="1">
        <v-container fluid>
          <v-row>
            <v-col :cols="card.flex"
              v-for="card in cards"
              :key="card.tditle">
              <v-card>
                <v-img
                  :src="card.src"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
                  height="200px"
                >
                  <v-btn
                    text
                    color="#0288D1"
                    :href="card.url"
                  >
                    <h2>{{ card.title }}</h2>
                  </v-btn>
                </v-img>

                <!--
                <v-card-actions>
                  <v-card-text>
                    <a :href="card.url"><h1> {{ card.title }} </h1></a>
                  </v-card-text>
                </v-card-actions>
                -->
              </v-card>
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
        { title: 'pixiv', src: '/mochiduko-20/doraemon-namecard.png',
        url: 'https://www.pixiv.net/users/415546', flex: 12 },
        { title: 'deviantART', src: '/mochiduko-20/doraemon-namecard.png',
        url: 'https://www.deviantart.com/motttey', flex: 6 },
        { title: 'weibo',  src: '/mochiduko-20/doraemon-namecard.png',
        url: 'https://weibo.com/7310121728', flex: 6 },
        { title: 'twitter',  src: '/mochiduko-20/doraemon-namecard.png',
        url: 'https://twitter.com/mt_tg', flex: 12 },
        { title: 'Instagram',  src: '/mochiduko-20/doraemon-namecard.png',
        url: 'https://www.instagram.com/tagosaku_mochiduki', flex: 6 },
        { title: 'Blog',  src: '/mochiduko-20/doraemon-namecard.png',
        url: 'http://motttey.hatenablog.com/', flex: 6 },
      ],
    }),
  }
</script>
