<template>
  <v-container fluid>
     <v-row dense>
       <v-col
         v-for="card in cards"
         :key="card.title"
         :cols="card.flex"
       >
         <v-card>

           <!--
           <v-img
             :src="card.src"
             class="white--text align-end"
             gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
             height="200px"
           >
           </v-img>
           -->
           <v-card-title v-text="card.title"></v-card-title>

           <v-card-actions>
             <v-spacer></v-spacer>
           </v-card-actions>

           <v-card-text>
             <a :href="card.src">Link</a>
           </v-card-text>
           
         </v-card>
       </v-col>
     </v-row>
   </v-container>
 </v-card>
</template>
<script>
  export default {
    data: () => ({
      cards: [
        { title: 'pixiv', url: 'https://www.pixiv.net/users/415546', flex: 12 },
        { title: 'deviantART', url: 'https://www.deviantart.com/motttey', flex: 6 },
        { title: 'weibo', url: 'https://weibo.com/7310121728', flex: 6 },
      ],
    }),
  }
</script>
