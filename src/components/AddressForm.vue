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
          v-bind:class="{'is-invalid':errorMessage}"
          class="form-control col-sm mx-2"
          placeholder="00000-000"
          maxlength="9"
          pattern="[0-9\-]{9}"
          required="required"
          ref="zipCode"
          v-model="zipCode"
          v-on:input="isFullfilled"
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
      <button
        type="submit"
        class="btn btn-block btn-secondary"
        v-on:click="leftZeros"
      >Buscar endereço</button>
    </form>
    <form @submit="sendAddress" v-if="addressFound" ref="sendForm">
      <div class="form-group">
        <label for="title" class="font-weight-bold">Título:</label>
        <input
          ref="title"
          name="title"
          type="text"
          class="form-control"
          v-model="title"
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
      <div class="btn-group d-flex justify-content-center">
        <button type="button" class="btn btn-danger col-lg" @click="closeForms">Cancelar</button>
        <button class="btn btn-primary col-lg" type="submit">Salvar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AddressForm",
  props: ["usage", "address"],
  computed: mapGetters(["editingAddress"]),
  data() {
    return {
      addressFound: false,
      errorMessage: "",
      id: "",
      title: "",
      zipCode: "",
      state: "",
      city: "",
      neighborhood: "",
      street: "",
      number: null,
      complement: ""
    };
  },
  created() {
    if (this.usage == "edit-address") {
      this.addressFound = true;
      this.id = this.editingAddress.id;
      this.title = this.editingAddress.title;
      this.zipCode = this.editingAddress.zipCode;
      this.state = this.editingAddress.state;
      this.city = this.editingAddress.city;
      this.neighborhood = this.editingAddress.neighborhood;
      this.street = this.editingAddress.street;
      this.number = this.editingAddress.number;
      this.complement = this.editingAddress.complement;
    }
  },
  methods: {
    openEdit() {},
    closeForms() {
      this.addressFound = false;
      this.$emit("close-editing");
    },
    getAddress(zipCode) {
      fetch(`https://viacep.com.br/ws/${zipCode.replace(/\D/g, "")}/json/`)
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
          if (!address.erro) this.$refs.title.focus();
        })
        .catch(error => {
          throw error;
        });
    },

    isFullfilled(e) {
      let zipCodeFormated = this.zipCode;
      this.zipCode = zipCodeFormated;

      if (zipCodeFormated.length == 9) {
        this.getAddress(zipCodeFormated);
      }
      this.maskZip(e);
    },

    maskZip(e) {
      //TODO: Melhorar esse método para fique mais reutilizável e genérico. O ideal é que seja inclusive como um componente
      const zipCode = e.currentTarget != undefined ? e.currentTarget.value : e;

      if (zipCode[5] && zipCode[5] != "-") {
        let zipCodeListed = [];
        for (let i = 0; i < zipCode.length; i++) {
          zipCodeListed.push(zipCode[i]);
        }
        zipCodeListed.splice(5, 0, "-");
        return (this.zipCode = zipCodeListed.join(""));
      }
    },

    leftZeros(e) {
      e.preventDefault();
      this.closeForms();
      if (this.zipCode != "") {
        for (
          var i = 0, len = 8 - this.zipCode.replace(/\D/g, "").length;
          i < len;
          i++
        ) {
          this.zipCode = this.maskZip("0" + this.zipCode.replace(/\D/, ""));
        }
        this.getAddress(this.zipCode);
      } else {
        this.errorMessage = "Preencha o CEP, por favor";
        this.$refs.zipCode.focus();
        setTimeout(() => (this.errorMessage = ""), 1500);
      }
    },
    sendAddress(e) {
      e.preventDefault();

      const newAddress = {
        id: this.id,
        title: this.title,
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
      this.closeForms();
      this.title = this.zipCode = this.state = this.city = this.neighborhood = this.street = this.number = this.complemen =
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
