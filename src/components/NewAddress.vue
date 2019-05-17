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
    ...mapGetters(["uid", "isAuthenicated"])
  },
  methods: {
    ...mapActions(["addAddress", "showAlert"]),
    handleAddress(address) {
      if (!this.isAuthenicated) {
        this.showAlert({
          type: "error",
          message: "Para criar novos endereços, você precisa estar logado",
          timeout: 5000
        });
      } else {
        address.createdBy = this.uid;
        this.addAddress(address);
      }
    }
  }
};
</script>

<style>
</style>
