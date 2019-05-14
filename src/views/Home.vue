<template>
  <div>
    <NewAddress v-if="!isEditing" v-on:new-address="addNewAddress"/>
    <EditAddress
      v-if="isEditing"
      v-bind:address="editAddress"
      v-on:close-editing="closeEditing"
      v-on:edit-address="onEditAddress"
    />
    <span
      class="alert position-fixed centered"
      v-if="alert.type !== null"
      v-bind:class="{'alert-danger':alert.type == 'error', 'alert-success':alert.type == 'success',}"
    >{{alert.message}}</span>
    <Addresses
      v-bind:addresses="allAddresses"
      v-on:open-editing="openEditing"
      v-on:close-editing="closeEditing"
      v-on:edit-address="editAddress"
      v-on:delete-address="showDeleteModal"
    />
    <div
      v-if="willDelete"
      class="lightbox position-fixed centered"
      @click="() => willDelete = false"
    >
      <div class="lightbox__modal position-absolute centered">
        <p class="lightbox__message py-3 text-center">
          Tem certeza que deseja excluir o endereço
          <strong>{{delAddress.title}}</strong>?
        </p>
        <div class="btn-group d-flex justify-content-center">
          <button class="btn btn-primary col-lg">cancelar</button>
          <button class="btn btn-danger col-lg" @click="deleteAddress">deletar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Dependencies
import uuid from "uuid";

// Components importings
// import Header from "../components/layouts/Header";
import NewAddress from "../components/NewAddress";
import EditAddress from "../components/EditAddress";
import Addresses from "../components/Addresses";
import { mapGetters, mapActions } from "vuex";

// Using bootstrap style
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default {
  name: "Home",
  components: {
    NewAddress,
    EditAddress,
    Addresses
  },
  computed: mapGetters(["allAddresses"]),
  data() {
    return {
      alert: {
        type: null,
        message: ""
      },
      isEditing: false,
      willDelete: false,
      delAddress: {
        id: "",
        title: ""
      },
      editAddress: {
        id: "",
        title: "",
        zipCode: "",
        city: "",
        state: "",
        street: "",
        neighborhood: "",
        number: "",
        complement: ""
      }
    };
  },
  created() {
    if (localStorage.addresses) this.fetchAddresses();
  },
  methods: {
    ...mapActions(["fetchAddresses"]),
    openEditing(address) {
      this.isEditing = true;
      this.editAddress = address;
      window.scrollTo(0, 0);
    },
    closeEditing() {
      this.isEditing = false;
    },
    addNewAddress(address) {
      address.id = uuid.v4();
      this.allAddresses.unshift(address);
      this.saveAddresses("Endereço adicionado com sucesso!");
    },
    onEditAddress(payload) {
      this.allAddresses = this.allAddresses.map(address => {
        return address.id === payload.id ? payload : address;
      });

      this.closeEditing();
      this.saveAddresses("Endereço editado com sucesso!");
    },
    showDeleteModal(address) {
      this.isEditing = false;
      this.willDelete = true;
      this.delAddress = {
        id: address.id,
        title: address.title
      };
    },
    deleteAddress() {
      this.willDelete = false;
      this.allAddresses = this.allAddresses.filter(
        address => address.id !== this.delAddress.id
      );
      this.saveAddresses("Endereço deletado com sucesso!");
    },
    getAddresses() {
      return JSON.parse(atob(localStorage.addresses));
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
