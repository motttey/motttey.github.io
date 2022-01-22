<template>
  <v-container fluid id="Works">
    <h1>Works</h1>
    <h3>同人誌とかをまとめてポートフォリオにしたいですね。</h3>
    <v-row>
      <v-col cols="12" sm="12">
        <v-sheet
          color="transparent"
          elevation="10"
        >
          <v-slide-group
            class="pa-4"
            v-model="model"
            show-arrows
            center-active
            @change="onChange"
          >
            <v-slide-item
              v-for="card in cards"
              class="mx-3"
              :key="card.title"
              v-slot:default="{ active, toggle }"
            >
              <v-card flat hover
                @click="toggle">
                  <v-img
                    :src="card.src"
                    :lazy-src="card.src"
                    max-width="200px"
                    aspect-ratio="1"
                    class="grey lighten-4"
                    gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.1)"
                  >
                    <template>
                      <v-card-text>
                        <h2>{{ card.title }}</h2>
                      </v-card-text>
                    </template>
                </v-img>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row dense class="my-6">
       <v-col cols="12" sm="6" offset-sm="3">
         <v-card flat>
           <a :href="maincard.url" target="_blank">
             <v-img
               :src="maincard.src"
               :lazy-src="maincard.src"
               aspect-ratio="auto"
               max-height="600px"
               class="grey lighten-2"
               gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.1)"
             >
               <template v-slot:placeholder>
                 <v-row
                   class="fill-height ma-0"
                   align="center"
                   justify="center"
                 >
                   <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                 </v-row>
               </template>
             </v-img>
           </a>
           <v-card-text class="text--primary">
            <div class="my-2">
              <a :href="maincard.url" target="_blank">
                <h1>{{ maincard.title }}</h1>
              </a>
            </div>
            <div><h3>{{ maincard.year }}</h3></div>
            <div>{{ maincard.description }}</div>
          </v-card-text>
        </v-card>
       </v-col>
     </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      model: null,
      maincard: new Object(),
      cards: [
        { title: 'Perfect Blue', year: 2017, src: '/perfectblue.jpg',
        url: 'https://motitago.booth.pm/items/746036', description: '青色のイラストをメインにしたイラスト集です. C93にて頒布. B5 フルカラー / 32ページ (本文28ページ)', flex: 6 },
        { title: 'DORA THE PAST', year: 2016, src: '/dorathepast.jpg',
        url: 'https://www.deviantart.com/motttey', description: '[SOLD OUT] 2008-2016あたりに描いてきたドラえもん関連イラストの総集編 + 描き下しイラストな画集っぽい感じの本です. C91にて頒布 B5 96ページ, 収録作品数189', flex: 6 },
        { title: 'パラレルソレイユ 9',  year: 2017, src: '/parallel9.jpg',
        url: 'https://booth.pm/ja/items/723395', description: 'ひぐちあき様主催の藤子ファンの藤子ファンによる藤子ファンのための同人誌です. 表紙イラストを担当し, 喪黒さんを描かせていただきました. C93頒布. カラーページ込みA5 102ページ', flex: 6 },
        { title: 'モチヅ庫 10th Special Site', src: '/10th.png',
        url: 'https://motttey.github.io/10th/', description: 'pixivに登録して10年たった記念に作ったサイトです. pixivのイラストをタグで検索できたり, 投稿数の統計とかもみれます. お祝いのコメントも入力できるのでお待ちしてます. ', flex: 6 },
        { title: 'TBD', src: '/doraemon-namecard.webp', url: 'https://www.deviantart.com/motttey', description: 'hogehoge', flex: 6 },
      ],
    }),
    mounted: function(){
      this.maincard = this.cards[0];
    },
    methods: {
      onChange(v){
        this.maincard = this.cards[v];
      }
    }
  }
</script>
