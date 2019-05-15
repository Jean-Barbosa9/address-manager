<template>
  <div class="add-address card my-5">
    <h3 class="card-header title-2">Editando {{address.title}}</h3>
    <AddressForm
      class="card-body"
      usage="edit-address"
      v-on:edit-address="handleAddress"
      v-on:close-editing="$emit('close-editing')"
    />
  </div>
</template>

<script>
import AddressForm from "./AddressForm";
import { mapActions } from "vuex";

export default {
  name: "EditAddress",
  props: ["address"],
  components: {
    AddressForm
  },
  methods: {
    ...mapActions(["editAddress"]),
    handleAddress(address) {
      this.editAddress(address);
      this.$emit("save", "Endereço alterado com sucesso!");
    }
  }
};
</script>

<style>
</style>
