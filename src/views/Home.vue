<template>
  <div>
    <NewAddress v-if="!isEditing" v-on:save="saveAddresses"/>
    <EditAddress
      v-bind:address="editingAddress"
      v-if="isEditing"
      v-on:save="saveAddresses"
      v-on:close-editing="closeEditing"
    />
    <span
      class="alert position-fixed centered"
      v-if="alert.type !== null"
      v-bind:class="{'alert-danger':alert.type == 'error', 'alert-success':alert.type == 'success',}"
    >{{alert.message}}</span>
    <Addresses
      v-bind:addresses="allAddresses"
      v-on:save="saveAddresses"
      v-on:open-editing="openEditing"
    />
    <!-- v-on:close-editing="isEditing = false" -->
  </div>
</template>

<script>
// Dependencies
// import uuid from "uuid";
import { mapGetters, mapActions } from "vuex";

// Components importings
// import Header from "../components/layouts/Header";
import NewAddress from "../components/NewAddress";
import EditAddress from "../components/EditAddress";
import Addresses from "../components/Addresses";

// Using bootstrap style
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default {
  name: "Home",
  components: {
    NewAddress,
    EditAddress,
    Addresses
  },
  computed: mapGetters(["allAddresses", "editingAddress"]),
  data() {
    return {
      alert: {
        type: null,
        message: ""
      },
      isEditing: false
      // editAddress: {
      //   id: "",
      //   title: "",
      //   zipCode: "",
      //   city: "",
      //   state: "",
      //   street: "",
      //   neighborhood: "",
      //   number: "",
      //   complement: ""
      // }
    };
  },
  methods: {
    ...mapActions(["willEdit"]),
    openEditing(address) {
      this.willEdit(address);
      this.isEditing = true;
      window.scrollTo(0, 0);
    },
    closeEditing() {
      this.isEditing = false;
    },
    saveAddresses(message) {
      localStorage.setItem(
        "addresses",
        btoa(JSON.stringify(this.allAddresses))
      );
      this.alert = {
        type: "success",
        message: message
      };

      setTimeout(() => {
        this.alert = {
          type: null,
          message: ""
        };
      }, 2000);
    }
  }
};
</script>

<style>
</style>
