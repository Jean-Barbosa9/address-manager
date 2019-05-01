<template>
  <div>
    <Header/>
    <NewAddress/>
  </div>
</template>

<script>
// Components importings
import Header from "./components/layouts/Header";
import NewAddress from "./components/NewAddress";

export default {
  name: "app",
  components: {
    Header,
    NewAddress
  }
};
</script>

<style>
* {
  /* box-sizing: border-box; */
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
  max-width: 50px;
}

.title {
  font-size: 1em;
}

.form {
  width: 70vw;
  margin: 40px auto 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px;
}

@media screen and (min-width: 1025px) {
  .title {
    font-size: 1.5em;
  }

  .form {
    width: 50vw;
  }
}
</style>
