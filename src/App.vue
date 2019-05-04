<template>
  <div class="address-manager">
    <Header/>
    <div class="container">
      <NewAddress v-if="!isEditing" v-on:new-address="addNewAddress"/>
      <EditAddress
        v-if="isEditing"
        v-bind:address="editAddress"
        v-on:close-editing="closeEditing"
        v-on:edit-address="onEditAddress"
      />
      <span
        class="alert"
        v-if="alert.type !== null"
        v-bind:class="{'alert-danger':alert.type == 'error', 'alert-success':alert.type == 'success',}"
      >{{alert.message}}</span>
      <Addresses
        v-bind:addresses="addresses"
        v-on:open-editing="openEditing"
        v-on:edit-address="editAddress"
        v-on:delete-address="deleteAddress"
      />
    </div>
  </div>
</template>

<script>
// Dependencies
import uuid from "uuid";

// Components importings
import Header from "./components/layouts/Header";
import NewAddress from "./components/NewAddress";
import EditAddress from "./components/EditAddress";
import Addresses from "./components/Addresses";

// Using bootstrap style
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { setTimeout } from "timers";

export default {
  name: "app",
  components: {
    Header,
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
          zipCode: "22290070",
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
          zipCode: "20511000",
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
          zipCode: "22640904",
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
    },
    closeEditing() {
      this.isEditing = false;
      let editAddressKeys = Object.keys(this.editAddress);
      editAddressKeys.forEach(field => (this.editAddress[field] = ""));
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
    deleteAddress(id) {
      this.addresses = this.addresses.filter(address => address.id !== id);
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
* {
  /* box-sizing: border-box; */
  margin: 0;
  padding: 0;
}

body {
  font-family: "Open Sans", Arial, Helvetica, sans-serif, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  line-height: 1.4;
}

.logo {
  max-width: 40px;
}

.card-header {
  text-align: center;
  font-weight: bold;
}

.app-title {
  margin: 0;
  padding: 0 10px;
  font-family: "Wendy One", Arial, Helvetica, sans-serif, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 1em;
  text-align: center;
  text-transform: uppercase;
  flex: 0 1 60%;
}

.title-1 {
  font-size: 1.2em;
}

.title-2 {
  font-size: 1em;
}

.title-3 {
  font-size: 0.8em;
}

.alert {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px 9999px rgba(0, 0, 0, 0.5);
  z-index: 1;
}

@media screen and (min-width: 440px) {
  .app-title {
    font-size: 1.5em;
    flex-basis: 80%;
  }
}

@media screen and (min-width: 1025px) {
  .app-title {
    font-size: 2.5em;
    flex-basis: 100%;
  }

  .title-1 {
    font-size: 2em;
  }

  .title-2 {
    font-size: 1.5em;
  }

  .title-3 {
    font-size: 1em;
  }
}
</style>
