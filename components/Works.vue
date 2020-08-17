<template>
  <v-container fluid>
    <h1>Works</h1>
    <h3>同人誌やポートフォリオにしたいですね. </h3>
    <v-row dense class="my-6">
       <v-col cols="12" sm="8" offset-sm="2">
         <v-card class="mb-6">
           <v-container fluid>
             <v-row>
               <v-col
                 v-for="card in cards"
                 :key="card.title"
                 class="d-flex child-flex"
                 cols="4"
               >
                 <v-card flat>
                   <v-img
                     :src="card.src"
                     :lazy-src="card.src"
                     aspect-ratio="1"
                     class="grey lighten-2"
                     gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.1)"
                   >
                     <template>
                       <v-card-text>
                         <h2>{{card.title}}</h2>
                       </v-card-text>
                     </template>
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
                   <!--
                   <template>
                     <v-card-actions>
                      <v-spacer></v-spacer>
                     </v-card-actions>
                     <v-card-text>
                       <a :href="card.url">Link</a>
                     </v-card-text>
                   </template>
                  -->
                 </v-card>
               </v-col>
             </v-row>
           </v-container>
         </v-card>
       </v-col>
     </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      cards: [
        { title: 'Perfect Blue', src: '/mochiduko-20/doraemon-namecard.png',
        url: 'https://www.pixiv.net/users/415546', flex: 6 },
        { title: 'DORA THE PAST', src: '/mochiduko-20/doraemon-namecard.png',
        url: 'https://www.deviantart.com/motttey', flex: 6 },
        { title: 'a',  src: '/mochiduko-20/doraemon-namecard.png',
        url: 'https://weibo.com/7310121728', flex: 6 },
        { title: 'b', src: '/mochiduko-20/doraemon-namecard.png',
        url: 'https://www.pixiv.net/users/415546', flex: 6 },
        { title: 'c', src: '/mochiduko-20/doraemon-namecard.png',
        url: 'https://www.deviantart.com/motttey', flex: 6 },
        { title: 'd',  src: '/mochiduko-20/doraemon-namecard.png',
        url: 'https://weibo.com/7310121728', flex: 6 },
        { title: 'e', src: '/mochiduko-20/doraemon-namecard.png',
        url: 'https://www.pixiv.net/users/415546', flex: 6 },
        { title: 'f', src: '/mochiduko-20/doraemon-namecard.png',
        url: 'https://www.deviantart.com/motttey', flex: 6 },
        { title: 'g',  src: '/mochiduko-20/doraemon-namecard.png',
        url: 'https://weibo.com/7310121728', flex: 6 },
      ],
    }),
  }
</script>
