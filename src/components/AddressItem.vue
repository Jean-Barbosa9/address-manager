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
        <div class="btn-group float-right">
          <i
            class="fas fa-edit btn btn-primary"
            v-bind:title="'Editar ' + address.title"
            @click="$emit('open-editing',address)"
          ></i>
          <i
            class="fas fa-trash-alt btn btn-danger"
            v-bind:title="'Deletar ' + address.title"
            @click="$emit('delete-address',address.id)"
          ></i>
        </div>
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
      show: false
    };
  },
  methods: {
    showDetails() {
      this.show = !this.show;
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

.fa-edit:after {
  content: "editar";
}

.fa-trash-alt:after {
  content: "deletar";
}

.btn-group {
  padding-top: 20px;
}

.fa-edit:after,
.fa-trash-alt:after {
  padding-left: 1ch;
  font-family: "Open Sans", Arial, Helvetica, sans-serif, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

@media screen and (max-width: 1024px) {
  .btn-group {
    width: 100%;
    display: flex;
    justify-content: center;
    float: none;
  }
}
</style>
