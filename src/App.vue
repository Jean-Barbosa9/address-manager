<template>
  <div class="address-manager">
    <Header/>
    <div class="container">
      <NewAddress v-on:new-address="addNewAddress"/>
      <Addresses v-bind:addresses="addresses"/>
    </div>
  </div>
</template>

<script>
// Components importings
import Header from "./components/layouts/Header";
import NewAddress from "./components/NewAddress";
import Addresses from "./components/Addresses";

export default {
  name: "app",
  components: {
    Header,
    NewAddress,
    Addresses
  },
  data() {
    return {
      addresses: [
        {
          id: 1,
          zipCode: "20231050",
          city: "Rio de Janeiro",
          state: "RJ",
          street: "Rua André Cavalcanti",
          neighborhood: "Centro",
          number: "171",
          complement: "Sobrado"
        },
        {
          id: 2,
          zipCode: "01001000",
          city: "São Paulo",
          state: "SP",
          street: "Avenida Paulista",
          neighborhood: "Centro",
          number: "4000",
          complement: "Bloco 1 Sl 302"
        },
        {
          id: 3,
          zipCode: "20535220",
          city: "Rio de Janeiro",
          state: "RJ",
          street: "Rua Jair Caldas Corrêa",
          neighborhood: "Alto da Boa Vista",
          number: "5",
          complement: "Casa"
        }
      ]
    };
  },
  methods: {
    addNewAddress(address) {
      // Verificar se o CEP que está sendo inserido já existe. Caso positivo, retornar mensagem perguntando se deseja atualizar o endereço existente

      // Instalar uuid para melhorar a criação de ids
      const newId = this.addresses[this.addresses.length - 1].id++;
      address.id = newId;

      this.addresses.unshift(address);
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
  max-width: 50px;
}

.title {
  font-size: 1em;
}

.form {
  width: 70vw;
  margin: 40px auto 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px;
}

.form__group--flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

@media screen and (min-width: 1025px) {
  .title {
    font-size: 1.5em;
  }

  .form {
    width: 50vw;
  }
}
</style>
