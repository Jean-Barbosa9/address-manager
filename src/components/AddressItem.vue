<template>
  <div class="address-item card mb-4" v-bind:address="address">
    <div class="card-body" @click="showDetails">
      <strong>{{address.title}}</strong>
      <i class="fas posar" v-bind:class="{'fa-chevron-down':!show,'fa-chevron-up':show}"/>
      <br>
      <span class="address-details" v-if="show">
        {{address.street}}, {{address.number}} - {{address.complement}}
        <br>
        {{address.neighborhood}} - {{address.zipCode}}
        <br>
        {{address.city}} / {{address.state}}
        <br>
        <br>
        <strong v-if="distance">{{distance}} distante da sua posição</strong>
        <div class="btn-group">
          <div
            class="btn btn-primary"
            @click="redirectToMap"
            v-bind:title="`Ver rota para ${address.title}`"
          >
            <i class="fas fa-route"/>
          </div>
          <div
            class="btn btn-secondary"
            @click="$emit('open-editing',address)"
            v-bind:title="`Editar ${address.title}`"
          >
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
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressItem",
  props: ["address"],
  data() {
    return {
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
      distance: null
    };
  },
  created() {
    if (navigator.geolocation) {
      this.navGeoLoc = true;
      this.getGetCurrentGeoLocation();
    }
  },
  methods: {
    showDetails() {
      this.show = !this.show;
      this.getAddressGeoLocation();
    },
    getGetCurrentGeoLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        this.coords.current = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
      });
    },
    getAddressGeoLocation() {
      const { number, street } = this.address,
        streetFormated = street.split(/[\s]+/g).join("+");

      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${number}+${streetFormated}&key=AIzaSyATXPcAwIQfPl484iIOT1LFlGQEvun3k70`
      )
        .then(res => res.json())
        .then(data => {
          const { lat, lng } = data.results[0].geometry.location; //destination
          const { latitude, longitude } = this.coords.current; //Origin
          this.coords.selected = { lat, lng };

          this.distance = this.getStraightDistance(
            latitude,
            longitude,
            lat,
            lng
          );
        });
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

<style scoped>
.card-body {
  position: relative;
  cursor: pointer;
}

.posar {
  position: absolute;
  right: 20px;
}

.fa-chevron-down {
  top: 50%;
  transform: translateY(-50%);
}

.fa-chevron-up {
  top: 20px;
  transform: translateY(0);
}

.btn-group {
  display: flex;
  width: 100%;
  padding-top: 20px;
  justify-content: center;
  float: none;
}

@media screen and (min-width: 1025px) {
  .fa-route:after,
  .fa-edit:after,
  .fa-trash-alt:after {
    padding-left: 1ch;
    font-family: "Open Sans", Arial, Helvetica, sans-serif, -apple-system,
      BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  .fa-route:after {
    content: "rota";
  }

  .fa-edit:after {
    content: "editar";
  }

  .fa-trash-alt:after {
    content: "deletar";
  }
}
</style>
