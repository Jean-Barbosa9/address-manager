<template>
  <header class="header">
    <nav class="navbar px-0">
      <router-link to="/">
        <h1 class="app-title">Gerenciador de Endereços</h1>
      </router-link>
      <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarMain">
        <i class="fas fa-bars"/>
      </button>
      <div class="collapse" id="navbarMain">
        <ul class="navbar-nav d-inline-block mx-3">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
        </ul>
        <ul class="navbar-nav d-inline-block">
          <li class="nav-item">
            <router-link to="/about" class="nav-link">Sobre a aplicação</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style>
.header {
  display: flex;
  width: 100vw;
  height: 70px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  background: rgba(173, 228, 204, 0.7);
}
</style>