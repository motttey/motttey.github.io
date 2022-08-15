<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-card id="NameCard" dark: false>
      <v-card-title primary-title>
        <div>
          <div id="card-main">
            <h1 class="mb-3">Tagosaku Mochiduki</h1>
            <h4 class="mb-0">Hyper Doraemon Creator</h4>
          </div>
          <div id="card-links">
            <h5>
              <a href="https://twitter.com/mt_tg">
                <font-awesome-icon :icon="['fab','twitter']" />
                @mt_tg
              </a>
            </h5>
            <h5>
              <a href="https://www.pixiv.net/users/415546">
                <font-awesome-icon :icon="['fas','image']" />
                https://www.pixiv.net/users/415546
              </a>
            </h5>
            <h5>
              <a href="https://motttey.github.io/">
                <font-awesome-icon :icon="['fas','home']" />
                https://motttey.github.io/
              </a>
            </h5>
            <h5>
              <font-awesome-icon :icon="['fas','envelope']" />
              motitago@gmail.com
            </h5>
          </div>
          <img id="profile-img"
            src="/doraemon-namecard.webp"
            alt="Doraemon"
            class="mb-5"
          >
        </div>
      </v-card-title>
    </v-card>
  </v-layout>
</template>

<style>

#card-links a {
  text-decoration: none;
  color: #263238;
}

#profile-img {
  height: 100%;
  top: 0;
  left: 35%;
  z-index: -1;
  opacity: 0.9;
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
  margin: 20px 0px;
  overflow: hidden;
  position: relative;

  width: 100%;
  max-height: 600px;
  max-width: 910px;

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

/* Sassとかでxs取得するように書き換えたい*/
@media (max-width: 600px) {
  #card-main {
    height: 100px;
    top: 5%;
  }

  #card-main h1 {
    font-size: 2rem;
  }

  #card-main h4 {
    font-size: 1.3rem;
  }

  #card-links h5 {
    font-size: 1rem;
  }

  #profile-img {
    height: 80%;
    left: 20%;
    top: 20%;
  }

  #card-links {
    bottom: 5%;
  }
}

</style>
