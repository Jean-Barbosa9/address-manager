<template>
  <div>
    <NewAddress/>
    <Addresses usage="my-addresses" v-on:open-editing="openEditing"/>
  </div>
</template>

<script>
// Dependencies
import { mapGetters, mapActions } from "vuex";
import "firebase/firestore";

// Components importings
import NewAddress from "../components/NewAddress";
import Addresses from "../components/Addresses";

// Using bootstrap style
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default {
  name: "Home",
  components: {
    NewAddress,
    Addresses
  },
  computed: mapGetters(["allAddresses", "editingAddress", "alert"]),
  methods: {
    ...mapActions(["willEdit"]),
    openEditing(address) {
      this.willEdit(address);
      this.isEditing = true;
      window.scrollTo(0, 0);
    },
    closeEditing() {
      this.isEditing = false;
    }
  }
};
</script>

<style>
</style>
