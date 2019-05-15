<template>
  <div>
    <NewAddress/>
    <span
      class="alert position-fixed centered"
      v-if="this.alert.type !== null"
      v-bind:class="{'alert-danger':this.alert.type == 'error', 'alert-success':this.alert.type == 'success',}"
    >{{alert.message}}</span>
    <Addresses v-bind:addresses="allAddresses" v-on:open-editing="openEditing"/>
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
  created() {
    const fsAddresses = []; // entrará como data do componente que fará a consulta no firestore
    //Método para consultar os dados no firebase
    this.$firestore
      .collection("addresses")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const {
            zipCode,
            title,
            city,
            state,
            neighborhood,
            street,
            number,
            complement
          } = doc.data();
          const data = {
            id: doc.id,
            zipCode,
            title,
            city,
            state,
            neighborhood,
            street,
            number,
            complement
          };
          fsAddresses.push(data);
        });
        console.log("fsAddresses: ", fsAddresses);
      });
  },
  methods: {
    ...mapActions(["willEdit", "test"]),
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
