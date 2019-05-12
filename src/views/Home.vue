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
      v-bind:addresses="addresses"
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

// Using bootstrap style
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default {
  name: "Home",
  components: {
    // Header,
    NewAddress,
    EditAddress,
    Addresses
  },
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
      },
      addresses: [
        {
          id: 3,
          title: "Shopping Rio Sul",
          zipCode: "22290-070",
          city: "Rio de Janeiro",
          state: "RJ",
          street: "Avenida Lauro Sodré",
          neighborhood: "Botafogo",
          number: "445",
          complement: "Parte DC01, Shop 401"
        },
        {
          id: 2,
          title: "Shopping Tijuca",
          zipCode: "20511-000",
          city: "Rio de Janeiro",
          state: "RJ",
          street: "Avenida Maracanã",
          neighborhood: "Tijuca",
          number: "987",
          complement: "7º piso"
        },
        {
          id: 1,
          title: "Shopping Downtown",
          zipCode: "22640-904",
          city: "Rio de Janeiro",
          state: "RJ",
          street: "Avenida das Américas",
          neighborhood: "Centro",
          number: "500",
          complement: "Bloco 6 2º piso"
        }
      ]
    };
  },
  created() {
    if (localStorage.addresses) this.addresses = this.getAddresses();
  },
  methods: {
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
      this.addresses.unshift(address);
      this.saveAddresses("Endereço adicionado com sucesso!");
    },
    onEditAddress(payload) {
      this.addresses = this.addresses.map(address => {
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
      this.addresses = this.addresses.filter(
        address => address.id !== this.delAddress.id
      );
      this.saveAddresses("Endereço deletado com sucesso!");
    },
    getAddresses() {
      return JSON.parse(atob(localStorage.addresses));
    },
    saveAddresses(message) {
      localStorage.setItem("addresses", btoa(JSON.stringify(this.addresses)));
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
