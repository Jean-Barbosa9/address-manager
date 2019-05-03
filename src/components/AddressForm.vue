<template>
  <div class="address-form" v-bind:usage="usage">
    <form class="mb-3" @submit="leftZeros" ref="getForm">
      <div class="form-group row px-3 align-items-center">
        <label class="font-weight-bold" for="zipCode">
          CEP:
          <span class="text-danger">*</span>
        </label>
        <input
          id="zipCode"
          type="text"
          class="form-control col-sm mx-2"
          placeholder="ex.: 00000000"
          maxlength="8"
          pattern="[0-9\-]*"
          required="required"
          ref="zipCode"
          v-model="zipCode"
          v-on:input="isFullfilled()"
          autofocus
        >
        <a
          href="http://www.buscacep.correios.com.br/sistemas/buscacep/"
          title="Descubra seu CEP clicando aqui"
          class="form-link"
          rel="noreferrer noopener"
          target="_blank"
        >Não sei meu cep</a>
      </div>
      <span
        class="form-text text-danger error-message"
        v-if="errorMessage.length"
      >{{ errorMessage }}</span>
      <button type="submit" class="btn btn-block btn-secondary" v-on:click="leftZeros">Buscar CEP</button>
    </form>
    <form @submit="sendAddress" v-if="addressFound" ref="sendForm">
      <div class="form-group">
        <label for="contact" class="font-weight-bold">Contato:</label>
        <input
          ref="contact"
          name="contact"
          type="text"
          class="form-control"
          v-model="contact"
          required="required"
        >
      </div>
      <div class="row">
        <div class="form-group col-sm">
          <label for="city" class="font-weight-bold">Cidade:</label>
          <input name="city" type="text" class="form-control" v-model="city" required="required">
        </div>
        <div class="form-group col-sm">
          <label for="state" class="font-weight-bold">Estado:</label>
          <input name="state" type="text" class="form-control" v-model="state" required="required">
        </div>
      </div>
      <div class="form-group">
        <label for="neighborhood" class="font-weight-bold">Bairro:</label>
        <input
          type="text"
          class="form-control"
          name="neighborhood"
          v-model="neighborhood"
          required="required"
        >
      </div>
      <div class="form-group">
        <label for="street" class="font-weight-bold">Logradouro:</label>
        <input type="text" class="form-control" name="street" v-model="street" required="required">
      </div>
      <div class="form-group">
        <label for="number" class="font-weight-bold">Número:</label>
        <input type="text" class="form-control" name="number" v-model="number" required="required">
      </div>
      <div class="form-group">
        <label for="complement" class="font-weight-bold">Complemento:</label>
        <input type="text" class="form-control" name="complement" v-model="complement">
      </div>
      <button class="btn btn btn-block btn-primary" type="submit">Criar novo endereço</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddressForm",
  props: ["usage"],
  data() {
    return {
      addressFound: false,
      errorMessage: "",
      contact: "",
      zipCode: "",
      state: "",
      city: "",
      neighborhood: "",
      street: "",
      number: null,
      complement: ""
    };
  },
  methods: {
    getAddress(zipCode) {
      fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
        .then(res => res.json())
        .then(address => {
          if (!address.erro) {
            const { localidade, uf, logradouro, bairro } = address;
            this.addressFound = true;
            this.city = localidade;
            this.state = uf;
            this.neighborhood = bairro;
            this.street = logradouro;
            return address;
          } else {
            this.errorMessage =
              "Desculpe, não foi possível encontrar esse CEP. Por favor, verifique o número digitado e tente novamente.";
            setTimeout(() => {
              this.errorMessage = "";
            }, 5000);
          }
        })
        .then(address => {
          if (!address.erro) this.$refs.contact.focus();
        })
        .catch(console.error);
    },

    isFullfilled() {
      if (this.zipCode.length == 8) {
        this.getAddress(this.zipCode);
      }
    },

    leftZeros(e) {
      e.preventDefault();
      for (var i = 0, len = 8 - this.zipCode.length; i < len; i++) {
        this.zipCode = "0" + this.zipCode;
      }
      this.getAddress(this.zipCode);
    },

    sendAddress(e) {
      e.preventDefault();

      const newAddress = {
        contact: this.contact,
        zipCode: this.zipCode,
        state: this.state,
        city: this.city,
        neighborhood: this.neighborhood,
        street: this.street,
        number: this.number,
        complement: this.complement
      };

      this.$emit(this.usage, newAddress);

      // resetting form to initial state
      this.zipCode = this.state = this.city = this.neighborhood = this.street = this.number = this.complemen =
        "";
      this.addressFound = false;
      this.$refs.zipCode.focus();
    }
  }
};
</script>

<style scoped>
.error-message {
  display: block;
  margin-bottom: 20px;
  font-size: 12px;
  color: red;
}
</style>
