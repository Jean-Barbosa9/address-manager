<template>
  <div class="card">
    <h2 class="card-header title-2">Acesse com seu e-mail e senha</h2>
    <div class="card-body">
      <AuthForm usage="sign-in"/>
    </div>
  </div>
</template>

<script>
import AuthForm from "../components/layouts/AuthForm";
import { mapGetters } from "vuex";

export default {
  name: "Login",
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
