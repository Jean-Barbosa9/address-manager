<template>
  <header class="header">
    <img class="logo" alt="Vue logo" src="../assets/logo.png">
    <h1 class="title">Gerenciador de Endereços</h1>
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
  height: 50px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  background: rgba(173, 228, 204, 0.7);
}
</style>