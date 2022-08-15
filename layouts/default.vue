<template>
  <v-app dark>
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

      <v-toolbar-title
        class="title font-weight-bold"
        v-text="title"
        @click="$router.push('/')"
        style="cursor:pointer;"
      />

      <v-spacer />

      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>

    </v-app-bar>

    <v-main class="bg">
    </v-main>

    <v-main class="bg-img">
    </v-main>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      fixed
      temporary
      dark
      src="/drawer-bg.webp"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          link
        >
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
        background-size: 125px auto;
      }
  }

  .bg-img {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-position: 100% 100%;
    background-size: 250px auto;
    background-image: url("~@/static/site-bg.webp");
    filter: blur(1.5px);
    background-color: rgba(0, 0, 0, 0.5);
    background-blend-mode: darken;
  }

  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-size: cover;
    background:
      linear-gradient(120deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)),
      linear-gradient(185deg, rgba(0, 40, 141, 0.5), rgba(255, 255, 255, 0)),
      linear-gradient(340deg, rgba(0, 91, 140, 0.5), rgba(255, 255, 255, 0));
  }

  a, a:hover {
    text-decoration: none;
  }

  .v-application .title {
      font-family: "M Plus 1p" !important;
      font-weight: bold;
  }

  .theme--dark.v-data-table {
    background-color: rgba(30, 30, 30, 0.5);
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
      title: 'モチヅ庫',
      img_source: 'http://embed.pixiv.net/decorate.php?illust_id=76601058'
    }
  },
  head: () => ({
    title: "Top"
  })
}
</script>
