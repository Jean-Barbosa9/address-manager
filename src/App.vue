<template>
  <div class="address-manager">
    <Header/>
    <div class="container py-4">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
// Components importings
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";

// Using bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default {
  name: "app",
  components: {
    Header,
    Footer
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  font-family: "Open Sans", Arial, Helvetica, sans-serif, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  line-height: 1.4;
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

.title-1 {
  font-size: 1.2em;
}

.title-2 {
  font-size: 1em;
}

.title-3 {
  font-size: 0.8em;
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
}

.lightbox__modal {
  width: 80vw;
  height: auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 20px 0 #ffffff;
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
    flex-basis: 100%;
  }

  .title-1 {
    font-size: 2em;
  }

  .title-2 {
    font-size: 1.5em;
  }

  .title-3 {
    font-size: 1em;
  }

  .lightbox__modal {
    width: 50vw;
  }

  .loading {
    max-width: 40vw;
  }
}
</style>
