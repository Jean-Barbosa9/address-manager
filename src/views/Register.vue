<template>
  <div class="card">
    <h2 class="card-header title-2">Cadastre-se com e-mail e senha</h2>
    <div class="card-body">
      <AuthForm usage="sign-up"/>
    </div>
  </div>
</template>

<script>
import AuthForm from "../components/layouts/AuthForm";
import { mapGetters } from "vuex";

export default {
  name: "Register",
  components: {
    AuthForm
  },
  computed: mapGetters(["isAuthenicated"]),
  created() {
    if (this.isAuthenicated) this.$router.push("/");
  }
};
</script>

<style>
</style>
