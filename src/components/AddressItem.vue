<template>
  <div class="address-item card mb-4" v-bind:address="address">
    <div class="card-body" @click="loadDetails">
      <strong>{{address.title}}</strong>
      <i class="fas posar" v-bind:class="{'fa-chevron-down':!show,'fa-chevron-up':show}"/>
      <br>

      <div class="address-details" v-if="show">
        <p>
          {{address.street}}, {{address.number}} - {{address.complement}}
          <br>
          {{address.neighborhood}} - {{address.zipCode}}
          <br>
          {{address.city}} / {{address.state}}
        </p>
        <p class="my-3">
          <span v-if="distance.error">Erro ao consultar a distância até este endereço.</span>
          <strong v-if="!distance.error">{{distance.measure}} distante da sua posição</strong>
        </p>
        <span v-if="weather.error">Erro ao consultar o clima neste local</span>
        <p v-if="!weather.error">
          <strong>Clima no local:</strong>
          <br>
          <span>
            <img v-bind:src="weather.icon" alt="Ícone da clima" class="m-2" height="40px">
            {{parseInt(weather.the_temp)}}º
            <br>
            mín: {{parseInt(weather.min_temp)}}º
            <br>
            máx: {{parseInt(weather.max_temp)}}º
          </span>
        </p>
        <div class="btn-group">
          <div
            class="btn btn-dark"
            @click="redirectToMap"
            v-bind:title="`Ver rota para ${address.title}`"
          >
            <i class="fas fa-route"/>
          </div>
          <div class="btn btn-primary" @click="$router.push(`/edit/${address.id}`)">
            <i class="fas fa-edit"/>
          </div>
          <div
            class="btn btn-danger"
            @click="$emit('delete-address',address)"
            v-bind:title="`Deletar ${address.title}`"
          >
            <i class="fas fa-trash-alt"/>
          </div>
        </div>
        <button type="button" class="d-none my-2 btn btn-block btn-darker border-dark">
          <i class="fas fa-share-alt"></i> compartilhar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import variables from "../variables.js";

export default {
  name: "AddressItem",
  props: ["address"],
  data() {
    return {
      loading: false,
      show: false,
      navGeoLoc: false,
      coords: {
        current: {
          latitude: null,
          longitude: null
        },
        selected: {
          lat: null,
          lng: null
        }
      },
      distance: {
        error: false,
        measure: null
      },
      weather: {
        error: false,
        the_temp: "",
        min_temp: "",
        max_temp: "",
        icon: "",
        stateTranslate: {
          LightCloud: "Sol entre nuvens"
        }
      }
    };
  },
  created() {
    if (navigator.geolocation) {
      this.navGeoLoc = true;
      this.getGetCurrentGeoLocation();
    }
  },
  methods: {
    teste() {
      console.log(this.$route);
      this.$router.path = "/edit/1";
    },
    loadDetails() {
      this.$emit("loading", !this.show);
      this.showDetails();
    },
    showDetails() {
      this.show = !this.show;
      if (this.show) this.getAddressGeoLocation();
    },
    getGetCurrentGeoLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        this.coords.current = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
      });
    },
    async getAddressGeoLocation() {
      const { number, street, city } = this.address,
        formatedStreet = street.split(/[\s]+/g).join("+"),
        query = `query=${city.split(/[\s]+/g).join("+")}`;
      let apiKey;

      if (location.port) {
        apiKey = variables.apiKeys.development;
      } else {
        apiKey = variables.apiKeys.production;
      }

      const data = await (await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${number}+${formatedStreet}&key=${apiKey}`
      )).json();
      if (!data.results.length) {
        this.distance.error = this.weather.error = true;
        this.$emit("loading", false);
      } else {
        const { lat, lng } = data.results[0].geometry.location; //destination
        const { latitude, longitude } = this.coords.current; //Origin

        this.coords.selected = { lat, lng };
        this.distance.measure = this.getStraightDistance(
          latitude,
          longitude,
          lat,
          lng
        );
        this.getWeather(query);
      }
    },
    getStraightDistance(latOrig, lonOrig, latDest, lonDest) {
      const earthRadius = 6371,
        degLat = this.getRadiusFromDegrees(latDest - latOrig),
        degLon = this.getRadiusFromDegrees(lonDest - lonOrig),
        angle =
          Math.sin(degLat / 2) * Math.sin(degLat / 2) +
          Math.cos(this.getRadiusFromDegrees(latOrig)) *
            Math.cos(this.getRadiusFromDegrees(latDest)) *
            Math.sin(degLon / 2) *
            Math.sin(degLon / 2),
        curvature = 2 * Math.atan2(Math.sqrt(angle), Math.sqrt(1 - angle)),
        distance = earthRadius * curvature;

      if (distance < 1) {
        return `${parseInt(distance * 100)}m`;
      } else {
        return `${distance.toFixed(2).replace(".", ",")}km`;
      }
    },
    getRadiusFromDegrees(deg) {
      return deg * (Math.PI / 180);
    },
    async getWeather(query) {
      const resWoeid = await (await fetch(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/api/location/search/?${query}`
        )).json(),
        woeid = resWoeid[0].woeid;

      const weatherData = await (await fetch(
        `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`
      )).json();
      const {
        the_temp,
        min_temp,
        max_temp,
        weather_state_abbr
      } = weatherData.consolidated_weather[0];
      this.weather = {
        the_temp,
        min_temp,
        max_temp,
        icon: `https://www.metaweather.com/static/img/weather/ico/${weather_state_abbr}.ico`
      };

      this.$emit("loading", false);
    },
    redirectToMap() {
      const { latitude, longitude } = this.coords.current;
      if (latitude && longitude) {
        window.open(
          `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=+${
            this.address.zipCode
          }&travelmode=driving`
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/custom-bootstrap.scss";

.card-body {
  position: relative;
  cursor: pointer;
}

.posar {
  position: absolute;
  right: 20px;
}

.fa {
  &-chevron-down {
    top: 50%;
    transform: translateY(-50%);
  }

  &-chevron-up {
    top: 20px;
    transform: translateY(0);
  }
}

.btn-group {
  display: flex;
  width: 100%;
  padding-top: 20px;
  justify-content: center;
  float: none;
}

@media screen and (min-width: 1025px) {
  .fa {
    &-route:after,
    &-edit:after,
    &-trash-alt:after {
      padding-left: 1ch;
      font-family: $font-family-base;
    }

    &-route:after {
      content: "rota";
    }

    &-edit:after {
      content: "editar";
    }

    &-trash-alt:after {
      content: "deletar";
    }
  }
}
</style>
