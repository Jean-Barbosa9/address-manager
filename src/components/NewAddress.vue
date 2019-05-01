<template>
  <div class="add-address">
    <form class="add-address__form form" v-on:submit="addNewAddress">
      <div class="form__group">
        <label for="zipCode" class="form__label form__label--required">
          CEP:
          <span>*</span>
        </label>
        <input
          type="text"
          class="form__input"
          placeholder="Informe somente os dígitos, ex.: 00000000"
          maxlength="8"
          pattern="[0-9\-]*"
          required="required"
          v-model="insertedZipCode"
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
      <button type="button" v-on:click="leftZeros()">Buscar CEP</button>
      <div class="form__group form__group--complete-address" v-if="addressFound">
        <div class="form__group form__group--flex">
          <div class="form__group">
            <label for="city" class="form__label">Cidade:</label>
            <input name="city" type="text" class="form__input" v-model="city">
          </div>
          <div class="form__group">
            <label for="state" class="form__label">Estado:</label>
            <input name="state" type="text" class="form__input" v-model="state">
          </div>
        </div>
        <div class="form__group">
          <label for="neighborhood" class="form__label">Bairro:</label>
          <input type="text" class="form__input" name="neighborhood" v-model="neighborhood">
        </div>
        <div class="form__group">
          <label for="street" class="form__label">Logradouro:</label>
          <input type="text" class="form__input" name="street" v-model="street">
        </div>
        <div class="form__group">
          <label for="number" class="form__label">Número:</label>
          <input type="number" class="form__input" name="number" v-model="number">
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
  name: "AddAddress",
  data() {
    return {
      addressFound: false,
      errorMessage: "",
      insertedZipCode: "",
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
      if (this.insertedZipCode.length == 8) {
        this.getAddress(this.insertedZipCode);
      }
    },

    leftZeros() {
      console.log(this);
      for (var i = 0, len = 8 - this.insertedZipCode.length; i < len; i++) {
        this.insertedZipCode = "0" + this.insertedZipCode;
      }
      this.getAddress(this.insertedZipCode);
    },

    addNewAddress(e) {
      e.preventDefault();
      console.log(e);
    }
  }
};
</script>

<style>
.error-message {
  display: block;
  max-width: 300px;
  font-size: 12px;
  color: red;
}

.form__group--flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
