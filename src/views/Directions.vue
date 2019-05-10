<template>
  <div>
    <h1 class="title-1">
      Aqui será criado o componente que renderizará o mapa com a rota da localização atual do usuário para o endereço
      <strong>{{this.address.title}}</strong>
    </h1>
    <p>
      <strong>Rota para:</strong>
      {{this.address.street}}, {{this.address.number}} - {{this.address.city}} / {{this.address.state}}
    </p>
    <div id="map">
      <img v-bind:src="renderResponsiveImage()">
    </div>
  </div>
</template>

<script>
export default {
  name: "Directions",
  data() {
    return {
      id: this.$router.history.current.params.id,
      address: {},
      imgSrc: ""
    };
  },
  created() {
    this.getAddress();
  },
  methods: {
    getAddress() {
      const addresses = JSON.parse(atob(localStorage.addresses));
      this.address = addresses.filter(address => address.id == this.id)[0];
    },
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
