<template>
  <div class="auth-form" v-bind:usage="usage">
    <form class="mb-3" @submit="onSubmit">
      <div class="form-group row px-3 align-items-center">
        <label class="font-weight-bold" for="email">e-mail:</label>
        <input type="email" class="form-control" required="required" v-model="email" autofocus>
      </div>
      <div class="form-group row px-3 align-items-center">
        <label class="font-weight-bold" for="password">senha:</label>
        <input
          type="password"
          class="form-control"
          minlength="6"
          required="required"
          v-model="password"
        >
      </div>
      <button type="submit" class="btn btn-block btn-primary">{{buttonAction}}</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AuthForm",
  props: ["usage"],
  data() {
    return {
      email: "",
      password: "",
      buttonAction: ""
    };
  },
  created() {
    if (this.usage == "sign-in") {
      this.buttonAction = "Entrar";
    } else {
      this.buttonAction = "Cadastrar";
    }
  },
  methods: {
    ...mapActions(["login", "createUser"]),
    onSubmit(e) {
      e.preventDefault();
      const userData = { email: this.email, password: this.password };

      if (this.usage == "sign-in") {
        this.login(userData);
      } else {
        this.createUser(userData);
      }
    }
  }
};
</script>
