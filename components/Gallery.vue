<template>
  <v-container fluid>
    <h1>Gallery</h1>
    <h3>これまでに描いたイラストなどです. </h3>
    <v-row dense class="mb-6">
      <v-col cols="9">
        <!-- TODO: 相対パスにした方が良い, styleをCSS移行 -->
        <!--
        <iframe src="https://motttey.github.io/gallery/index.html"
          id="GalleryFrame" width="100%" height="700px" frameborder="0">
        </iframe>
        -->
        <div id="canvas_holder" > </div>
      </v-col>
      <v-col cols="3">
        <v-card id="target_image">
          <v-img
            :src="target_illust.src"
            class="white--text align-end"
            aspect-ratio="1"
            height="200px"
          >
            <v-card-title v-text="target_illust.title"></v-card-title>
          </v-img>

          <v-card-actions>
           <v-spacer></v-spacer>
          </v-card-actions>

          <v-card-text>
            <h2>{{target_illust.tags_text}}</h2>
            <a :href="target_illust.url">Pixiv</a>
          </v-card-text>
        </v-card>
      </v-col>


    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      target_illust: {
        title: 'dora1',
        tags_text: '#doraemon',
        src: '/mochiduko-20/doraemon-namecard.png',
        url: 'https://www.pixiv.net/users/415546', flex: 12 },
    }),
  }
</script>

<style>
#canvas_holder {
  height: 650px;
}
#target_image {
  top: 25%;
}
</style>
