<template>
  <div class="address-item card mb-4" v-bind:address="address">
    <div class="card-body" @click="showDetails">
      <strong>{{address.contact}}</strong>
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
          <i class="fas fa-edit btn btn-primary" @click="$emit('edit-address',address.id)"></i>
          <i class="fas fa-trash-alt btn btn-danger" @click="$emit('delete-address',address.id)"></i>
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
</style>
