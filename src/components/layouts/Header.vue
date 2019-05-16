<template>
  <header class="header bg-secondary">
    <nav class="navbar px-0 container-fluid">
      <h1 class="app-title">
        <router-link to="/" class="text-dark">Gerenciador de Endereços</router-link>
      </h1>
      <button
        type="button"
        class="navbar-toggler mr-3"
        data-toggle="collapse"
        data-target="#navbarMain"
      >
        <i class="fas fa-bars"/>
      </button>
      <div class="collapse navbar-collapse" id="navbarMain">
        <ul class="navbar-nav container-fluid align-items-end">
          <li v-if="!isAuthenicated" class="nav-item">
            <router-link to="/login" class="nav-link text-primary">Logar</router-link>
          </li>
          <li v-if="!isAuthenicated" class="nav-item">
            <router-link to="/cadastro" class="nav-link text-primary">Cadastrar</router-link>
          </li>
          <li v-if="isAuthenicated" class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li v-if="isAuthenicated" class="nav-item">
            <router-link to="/about" class="nav-link">Sobre a aplicação</router-link>
          </li>
          <li v-if="isAuthenicated" class="nav-item">
            <span @click="logout" class="nav-link text-primary">Deslogar</span>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  computed: mapGetters(["isAuthenicated"]),
  methods: {
    ...mapActions(["logout"])
  }
};
</script>

<style>
.header {
  display: flex;
  width: 100vw;
  padding: 10px;
  justify-content: center;
  align-items: center;
}
</style>