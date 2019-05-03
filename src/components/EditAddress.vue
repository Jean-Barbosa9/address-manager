<template>
  <div class="add-address card my-5">
    <h3 class="card-header title-2">Editando {{address.title}}</h3>
    <AddressForm
      class="card-body"
      usage="edit-address"
      v-bind:address="address"
      v-on:edit-address="editAddress"
    />
  </div>
</template>

<script>
import AddressForm from "./AddressForm";

export default {
  name: "EditAddress",
  props: ["address"],
  components: {
    AddressForm
  },
  methods: {
    editAddress(address) {
      this.$emit("edit-address", address);
    }
  }
};
</script>

<style>
</style>
