<template>
  <div class="add-address">
    <AddressForm usage="new-address" v-on:add-address="addNewAddress"/>
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
      console.log(address);
    }
  }
};
</script>

<style>
</style>
