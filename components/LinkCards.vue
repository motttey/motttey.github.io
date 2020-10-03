<template>
  <v-container fluid id="LinkCards">
    <h1>My Links</h1>
    <h3>各種SNSのアカウントです. </h3>

    <v-row dense class="mb-6">
      <v-col cols="12" sm="10" offset-sm="1">
        <v-container fluid>
          <v-row>
            <v-col
              :cols="card.flex"
              v-for="card in cards"
              :key="card.tditle">
              <v-card>
                <a :href="card.url" target="_blank">
                  <v-img
                    :src="card.src"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
                    height="200px"
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
        { title: 'pixiv', src: 'https://embed.pixiv.net/decorate.php?illust_id=57813951',
        url: 'https://www.pixiv.net/users/415546', flex: 12 },
        { title: 'deviantART', src: 'https://embed.pixiv.net/decorate.php?illust_id=49554002',
        url: 'https://www.deviantart.com/motttey', flex: 6 },
        { title: 'weibo',  src: 'https://embed.pixiv.net/decorate.php?illust_id=56608401',
        url: 'https://weibo.com/7310121728', flex: 6 },
        { title: 'twitter',  src: 'https://embed.pixiv.net/decorate.php?illust_id=79403135',
        url: 'https://twitter.com/mt_tg', flex: 12 },
        { title: 'Instagram',  src: 'https://embed.pixiv.net/decorate.php?illust_id=49339965',
        url: 'https://www.instagram.com/tagosaku_mochiduki', flex: 6 },
        { title: 'Blog',  src: 'https://embed.pixiv.net/decorate.php?illust_id=83975466',
        url: 'http://motttey.hatenablog.com/', flex: 6 },
      ],
    }),
  }
</script>
