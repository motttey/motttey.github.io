<template>
  <v-card id="NameCard" dark: false>
    <v-card-title primary-title>
      <div>
        <div id="card-main">
          <h2 class="mb-0">Tagosaku Mochiduki</h2>
          <h5 class="mb-0">Hyper Draemon Creator</h5>
        </div>
        <div id="card-links">
          <h6>
            <font-awesome-icon :icon="['fab','twitter']" />
            @mt_tg
          </h6>
          <h6>
            <font-awesome-icon :icon="['fas','image']" />
            https://www.pixiv.net/users/415546
          </h6>
          <h6>
            <font-awesome-icon :icon="['fas','home']" />
            https://motttey.github.io/
          </h6>
          <h6>
            <font-awesome-icon :icon="['fas','envelope']" />
            motitago@gmail.com
          </h6>
        </div>
        <img id="profile-img"
          src="/mochiduko-20/doraemon-namecard.png"
          alt="Doraemon"
          class="mb-5"
        >
      </div>
    </v-card-title>
  </v-card>
</template>

<style>

#profile-img {
  height: 100%;
  top: 0;
  left: 35%;
  z-index: -1;
  position: absolute;
}

#card-main {
  position: absolute;
  top: 15%;
  left: 5%;
}

#card-links {
  position: absolute;
  bottom: 10%;
  left: 5%;
}

#NameCard > div {
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

#NameCard:before {
  content: '';
  position: absolute;

  transform-origin: center;
  transform: rotate(-64deg);

  width: 720px;
  height: calc(20% + 360px);
  /* height: calc(100%); */

  top: 20%;
  left: 35%;

  z-index: 0;
  background: linear-gradient(45deg, #00B8D4, #000000);
}

</style>
