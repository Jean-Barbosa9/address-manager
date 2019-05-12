<template>
  <div>
    <h2 class="title-1">Página não encontrada</h2>
    <p>Componente que renderizará uma mensagem de que não foi encontrada a página que o usuário estava procurando</p>
    <img v-bind:src="renderResponsiveImage()">
  </div>
</template>

<script>
export default {
  name: "NotFound",
  methods: {
    renderResponsiveImage() {
      // apenas para simulação enquanto não faço o mapa de fato
      const width = document.documentElement.clientWidth,
        height = document.documentElement.clientHeight;
      return `https://via.placeholder.com/${width}x${height}`;
    }
  }
};
</script>

<style>
</style>
