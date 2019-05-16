<template>
  <div class="address-manager">
    <Header/>
    <div class="container py-4">
      <router-view/>
    </div>
    <Footer/>
    <span
      class="alert position-fixed centered"
      v-if="this.alert.type !== null"
      v-bind:class="{'alert-danger':this.alert.type == 'error', 'alert-success':this.alert.type == 'success',}"
    >{{alert.message}}</span>
  </div>
</template>

<script>
// Components importings
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";

// Using bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import firebase from "firebase/app";
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    Header,
    Footer
  },
  created() {
    this.watchUserAuth();
  },
  methods: {
    ...mapActions(["watchUserAuth"])
  },
  computed: {
    ...mapState(["isAuthenicated"]),
    ...mapMutations(["signUser"]),
    ...mapGetters(["alert", "email"])
  },
  mounted() {
    const regex = /compartilhado/;
    this.$store.subscribe((mutation, state) => {
      if (mutation.type == "logoff" && !regex.test(this.$route.path)) {
        this.$router.push("/sobre");
      } else if (mutation.type == "signUser") {
        if (this.$route.path === "/login" || this.$route.path === "/cadastro") {
          this.$router.push("/");
        }
      }
    });
  }
};
</script>

<style lang="scss">
@import "assets/custom-bootstrap.scss";

* {
  margin: 0;
  padding: 0;
}

body {
  font-family: $font-family-base;
  line-height: 1.4;
  overflow-x: hidden;
}

.logo {
  max-width: 40px;
}

.card-header {
  text-align: center;
  font-weight: bold;
}

.app-title {
  margin: 0;
  padding: 0 10px;
  font-family: "Wendy One", Arial, Helvetica, sans-serif, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 1em;
  color: #333333;
  text-align: center;
  text-transform: uppercase;
  flex: 0 1 60%;
}

.title {
  &-1 {
    font-size: 1.2em;
  }

  &-2 {
    font-size: 1em;
  }

  &-3 {
    font-size: 0.8em;
  }
}

.nav-link {
  cursor: pointer;
}

.centered {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.alert {
  box-shadow: 0 0 20px 9999px rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.lightbox {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);

  &__modal {
    width: 80vw;
    height: auto;
    padding: 30px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 20px 0 #ffffff;
  }
}

.loading {
  max-width: 70vw;
  box-shadow: 0 0 20px 9999px #ffffff;
}

@media screen and (min-width: 440px) {
  .app-title {
    font-size: 1.5em;
    flex-basis: 80%;
  }
}

@media screen and (min-width: 1025px) {
  .app-title {
    font-size: 2.5em;
  }

  .title {
    &-1 {
      font-size: 2em;
    }

    &-2 {
      font-size: 1.5em;
    }

    &-3 {
      font-size: 1em;
    }
  }

  .lightbox__modal {
    width: 50vw;
  }

  .loading {
    max-width: 40vw;
  }
}
</style>
