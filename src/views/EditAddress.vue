<template>
  <div class="add-address card my-5">
    <h3 class="card-header title-2">Editando {{editingAddress.title}}</h3>
    <AddressForm
      class="card-body"
      usage="edit-address"
      v-on:edit-address="handleAddress"
      v-on:close-editing="$emit('close-editing')"
    />
  </div>
</template>

<script>
import AddressForm from "../components/layouts/AddressForm";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EditAddress",
  props: ["address"],
  computed: mapGetters(["editingAddress"]),
  created() {
    this.willEdit(this.$route.params.id);
  },
  components: {
    AddressForm
  },
  methods: {
    ...mapActions(["editAddress", "willEdit"]),
    handleAddress(address) {
      this.editAddress(address);
    }
  }
};
</script>

<style>
</style>
