<template>
  <v-app dark>
    <!--
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    -->
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      :src="img_source"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          position='50% 60%'
          gradient="to top right, rgba(2,136,209,.7), rgba(0,0,0,1.0)"
        >
        </v-img>
      </template>

      <!--
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      -->

      <v-toolbar-title class="title" v-text="title" />

      <v-spacer />

      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>

    </v-app-bar>
    <!-- 背景画像の付け方 -->
    <v-content class="bg-img">
    </v-content>

    <v-content class="bg">
    </v-content>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      fixed
      temporary
      dark
      src="/mochiduko-20/drawer-bg.png"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          link
        >
          <!-- アイコンを画像にする -->
          <v-list-item-content v-scroll-to="item.to">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-footer
      :absolute="!fixed"
      app
      color="rgba(2,136,209,.5)"
    >
      <span>&copy; {{ new Date().getFullYear() }} Tagosaku Mochiduki</span>
    </v-footer>
  </v-app>
</template>

<style>
  @media (max-width: 600px) {
      .bg-img {
        background-size: 150px auto;
      }
  }

  .bg-img {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-position: 0% 80%;
    background-size: 300px auto;
    background-image: url("~@/static/site-bg.png");
  }

  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-size: cover;
    background: rgb(0,0,0);
    background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 100%);
  }

  a, a:hover {
    text-decoration: none;
  }

  /* 無理やり... */
  .v-application .title {
      font-family: "M Plus 1p" !important;
      font-weight: bold;
  }
</style>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          title: 'Top',
          to: '#NameCard'
        },
        {
          title: 'Gallery',
          to: '#Gallery'
        },
        {
          title: 'Works',
          to: '#Works'
        },
        {
          title: 'Link',
          to: '#LinkCards'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      // 画像にするかもしれない...
      title: 'モチヅ庫 \'20',
      img_source: 'https://embed.pixiv.net/decorate.php?illust_id=76601058'
    }
  }
}
</script>
