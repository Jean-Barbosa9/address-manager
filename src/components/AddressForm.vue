<template>
  <div class="address-form form" v-bind:usage="usage">
    <form class="form__get" @submit="leftZeros">
      <div class="form__group">
        <label for="zipCode" class="form__label form__label--required">
          CEP:
          <span>*</span>
        </label>
        <input
          id="zipCode"
          type="text"
          class="form__input"
          placeholder="ex.: 00000000"
          maxlength="8"
          pattern="[0-9\-]*"
          required="required"
          v-model="zipCode"
          v-on:input="isFullfilled()"
          autofocus
        >
        <a
          href="http://www.buscacep.correios.com.br/sistemas/buscacep/"
          title="Descubra seu CEP clicando aqui"
          class="form__link"
          rel="noreferrer noopener"
          target="_blank"
        >Não sei meu cep</a>
        <span class="error-message" v-if="errorMessage.length">{{ errorMessage }}</span>
      </div>
      <button type="submit" v-on:click="leftZeros">Buscar CEP</button>
    </form>
    <form class="form__send" @submit="sendAddress">
      <div class="form__group form__group--complete-address" v-if="addressFound">
        <div class="form__group form__group--flex">
          <div class="form__group">
            <label for="city" class="form__label">Cidade:</label>
            <input name="city" type="text" class="form__input" v-model="city" required="required">
          </div>
          <div class="form__group">
            <label for="state" class="form__label">Estado:</label>
            <input name="state" type="text" class="form__input" v-model="state" required="required">
          </div>
        </div>
        <div class="form__group">
          <label for="neighborhood" class="form__label">Bairro:</label>
          <input
            type="text"
            class="form__input"
            name="neighborhood"
            v-model="neighborhood"
            required="required"
          >
        </div>
        <div class="form__group">
          <label for="street" class="form__label">Logradouro:</label>
          <input type="text" class="form__input" name="street" v-model="street" required="required">
        </div>
        <div class="form__group">
          <label for="number" class="form__label">Número:</label>
          <input type="text" class="form__input" name="number" v-model="number" required="required">
        </div>
        <div class="form__group">
          <label for="complement" class="form__label">Complemento:</label>
          <input type="text" class="form__input" name="complement" v-model="complement">
        </div>
        <button class="form__submit" type="submit">Criar novo endereço</button>
      </div>
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
          } else {
            this.errorMessage =
              "Desculpe, não foi possível encontrar esse CEP. Por favor, verifique o número digitado e tente novamente.";
            setTimeout(() => {
              this.errorMessage = "";
            }, 5000);
          }
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
        zipCode: this.zipCode,
        state: this.state,
        city: this.city,
        neighborhood: this.neighborhood,
        street: this.street,
        number: this.number,
        complement: this.complement
      };

      this.$emit(this.usage, newAddress);

      document.querySelectorAll("form").reset();
      this.addressFound = false;
      document.querySelector("#zipCode").focus();
    }
  }
};
</script>

<style scoped>
.error-message {
  display: block;
  max-width: 300px;
  font-size: 12px;
  color: red;
}
</style>
