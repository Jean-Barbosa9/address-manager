<template>
  <div class="addresses card" v-if="this.allAddresses.length > 0">
    <div class="card-header">
      <h4 class="title-2 mb-0 d-inline-block">Endereços salvos</h4>
      <button
        type="button"
        class="d-none btn btn-darker px-3 py-2 float-right"
        title="Compartilhar lista de endereços"
      >
        <i class="fas fa-share-alt"></i>
      </button>
    </div>
    <div class="card-body row">
      <div class="address col-sm" v-for="address in this.allAddresses" :key="address.id">
        <AddressItem
          v-bind:address="address"
          v-on:open-editing="$emit('open-editing', address)"
          v-on:delete-address="showDeleteModal"
          v-on:loading="showLoading"
        />
      </div>
    </div>
    <img
      v-if="loading"
      class="position-fixed centered loading"
      src="../assets/spinner.gif"
      alt="Loading..."
    >
    <div
      v-if="willDelete.status"
      class="lightbox position-fixed centered"
      @click="() => willDelete.status = false"
    >
      <div class="lightbox__modal position-absolute centered">
        <p class="lightbox__message py-3 text-center">
          Tem certeza que deseja excluir o endereço
          <strong>{{willDelete.title}}</strong>?
        </p>
        <div class="btn-group d-flex justify-content-center">
          <button class="btn btn-primary col-lg">cancelar</button>
          <button class="btn btn-danger col-lg" @click="delAddress">deletar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddressItem from "./AddressItem.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Addresses",
  computed: mapGetters(["allAddresses"]),
  created() {
    if (localStorage.addresses) this.fetchAddresses();
  },
  data() {
    return {
      loading: false,
      willDelete: {
        status: false,
        id: "",
        title: ""
      }
    };
  },
  components: {
    AddressItem
  },
  methods: {
    ...mapActions(["fetchAddresses", "deleteAddress", "saveAddress"]),
    showLoading(payload) {
      if (payload && !this.loading) {
        this.loading = true;
      } else {
        this.loading = false;
      }
    },
    delAddress() {
      this.deleteAddress(this.willDelete.id);
      this.saveAddress("Endereço deletado com sucesso!");
    },
    showDeleteModal(address) {
      this.willDelete = {
        status: true,
        id: address.id,
        title: address.title
      };
      this.$emit("close-editing");
    }
  }
};
</script>

<style>
</style>
