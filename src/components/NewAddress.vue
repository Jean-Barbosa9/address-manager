<template>
  <div class="add-address card my-5">
    <h3 class="card-header title-2">Adicione novos endereços:</h3>
    <AddressForm class="card-body" usage="new-address" v-on:new-address="handleAddress"/>
  </div>
</template>

<script>
import AddressForm from "./layouts/AddressForm";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddAddress",
  components: {
    AddressForm
  },
  computed: {
    ...mapGetters(["email"])
  },
  methods: {
    ...mapActions(["addAddress"]),
    handleAddress(address) {
      address.createdBy = this.email;
      this.addAddress(address);
    }
  }
};
</script>

<style>
</style>
