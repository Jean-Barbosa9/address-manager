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
// Components importings
import Header from "./components/layouts/Header";
import NewAddress from "./components/NewAddress";
import EditAddress from "./components/EditAddress";
import Addresses from "./components/Addresses";

// Using bootstrap style
import "../node_modules/bootstrap/dist/css/bootstrap.css";

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
  methods: {
    addNewAddress(address) {
      // Verificar se o CEP que está sendo inserido já existe. Caso positivo, retornar mensagem perguntando se deseja atualizar o endereço existente

      // Instalar uuid para melhorar a criação de ids
      const newId = this.addresses.length > 0 ? this.addresses[0].id + 1 : 1;
      address.id = newId;
      this.addresses.unshift(address);
    },
    openEditing(address) {
      this.isEditing = true;
      this.editAddress = address;
    },
    closeEditing() {
      this.isEditing = false;
      let editAddressKeys = Object.keys(this.editAddress);
      editAddressKeys.forEach(field => (this.editAddress[field] = ""));
    },
    onEditAddress(payload) {
      this.addresses.map(address => {
        console.log("address: ", address);
        console.log("payload: ", payload);
        return address.id === payload.id ? payload : address;
      });
      this.closeEditing();
    },
    deleteAddress(id) {
      console.log(this.addresses);
      this.addresses = this.addresses.filter(address => address.id !== id);
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
