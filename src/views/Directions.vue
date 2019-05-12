<template>
  <div>
    <h1 class="title-1">
      Rota para
      <strong>{{this.address.title}}</strong>
    </h1>
    <p>
      <strong>Endereço:</strong>
      {{this.address.street}}, {{this.address.number}} - {{this.address.city}} / {{this.address.state}}
    </p>
    <p>Ponto de partida: latitude {{this.geoLoc.lat}}, longitude {{this.geoLoc.long}}</p>
    <!-- TODO: Aqui posso colocar um mapa incorporado à página, usando Maps JavaScript API -->
    <div id="map">
      <img
        src="https://developers.google.com/maps/documentation/urls/images/dir-bicycling-seattle.png"
        alt="Representação de onde o mapa será renderizado"
        title="Representação de onde o mapa será renderizado"
      >
    </div>
    <span
      class="alert position-fixed centered"
      v-if="alert.type !== null"
      v-bind:class="{'alert-danger':alert.type == 'error', 'alert-success':alert.type == 'success',}"
    >{{alert.message}}</span>
  </div>
</template>

<script>
export default {
  name: "Directions",
  data() {
    return {
      id: this.$router.history.current.params.id,
      address: {},
      geoLoc: {
        lat: "",
        long: ""
      },
      alert: {
        type: null,
        message: ""
      },
      imgSrc: ""
    };
  },
  created() {
    this.getAddress();
    this.getGeolocation();
  },
  methods: {
    getAddress() {
      const addresses = JSON.parse(atob(localStorage.addresses));
      this.address = addresses.filter(address => address.id == this.id)[0];
    },
    getGeolocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position =>
            (this.geoLoc = {
              lat: position.coords.latitude,
              long: position.coords.longitude
            })
        );
      } else {
        this.alert = {
          type: "error",
          message:
            "Desculpe seu navegador não suporta a verificação da sua geolocalização."
        };
      }
    }
  }
};
</script>

<style scoped>
/* Apenas para a simulação de onde entrará o mapa */
#map img {
  max-width: 100%;
}
</style>
