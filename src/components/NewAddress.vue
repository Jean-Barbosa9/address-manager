<template>
  <div class="add-address card my-5">
    <h3 class="card-header title-2">Adicione novos endereços:</h3>
    <AddressForm class="card-body" usage="new-address" v-on:new-address="handleAddress"/>
  </div>
</template>

<script>
import AddressForm from "./AddressForm";
import { mapActions } from "vuex";

export default {
  name: "AddAddress",
  components: {
    AddressForm
  },
  methods: {
    ...mapActions(["addAddress", "saveAddress"]),
    handleAddress(address) {
      this.addAddress(address);
      this.saveAddress("Endereço adicionado com sucesso");
    }
  }
};
</script>

<style>
</style>
