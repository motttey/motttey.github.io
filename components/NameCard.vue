<template>
  <v-card id="NameCard" dark: false>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">Tagosaku Mochiduki</h3>
        <h5 class="mb-0">Hyper Draemon Creator</h5>
        <h5>
          <font-awesome-icon :icon="['fab','twitter']" />
          @mt_tg
        </h5>
        <h5>
          <font-awesome-icon :icon="['fas','home']" />
          https://motttey.github.io/
        </h5>
        <h5>
          <font-awesome-icon :icon="['fas','envelope']" />
          motitago@gmail.com
        </h5>
      </div>
    </v-card-title>
  </v-card>
</template>

<style>
#NameCard > div{
  height: 360px;
  width: 720px;
  box-shadow: 0 2.5rem 2rem -2rem hsl(200 50% 20% / 40%);
  color: #263238;
  background: none;
  overflow: hidden;
  z-index: 1;
}

#NameCard {
  overflow: hidden;
  z-index: 1;
  background: #E3F2FD;
}

#NameCard:before{
  content: '';
  position: absolute;

  transform-origin: center;
  transform: rotate(-72deg);

  width: 720px;
  height: calc(20% + 360px);
  /* height: calc(100%); */

  top: 20%;
  left: 30%;

  z-index: -1;
  background: linear-gradient(45deg, #00B8D4, #000000);
}

</style>
