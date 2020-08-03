<template>
  <v-card id="NameCard" dark: false>
    <v-card-title primary-title>
      <div>
        <div id="card-main">
          <h1 class="mb-3">Tagosaku Mochiduki</h1>
          <h4 class="mb-0">Hyper Draemon Creator</h4>
        </div>
        <div id="card-links">
          <h5>
            <font-awesome-icon :icon="['fab','twitter']" />
            @mt_tg
          </h5>
          <h5>
            <font-awesome-icon :icon="['fas','image']" />
            https://www.pixiv.net/users/415546
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
  top: 12.5%;
  left: 5%;
}

#card-links {
  position: absolute;
  bottom: 10%;
  left: 5%;
}

#NameCard > div {
  height: 550px;
  width: 910px;
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

  top: 20%;
  left: 52.5%;

  z-index: 0;
  background: linear-gradient(45deg, #0288D1, #FAFAFA);
}

</style>
