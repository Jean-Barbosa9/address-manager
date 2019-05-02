<template>
  <div class="add-address">
    <AddressForm usage="new-address" v-on:new-address="addNewAddress"/>
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
