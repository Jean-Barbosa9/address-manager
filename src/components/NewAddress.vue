<template>
  <div class="add-address card my-5">
    <h3 class="card-header title-2">Adicione novos endereços:</h3>
    <AddressForm class="card-body" usage="new-address" v-on:new-address="addNewAddress"/>
  </div>
</template>

<script>
import AddressForm from "./AddressForm";

export default {
  name: "AddAddress",
  components: {
    AddressForm
  },
  methods: {
    addNewAddress(address) {
      this.$emit("new-address", address);
    }
  }
};
</script>

<style>
</style>
