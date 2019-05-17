<template>
  <div class="addresses card" v-bind:usage="usage" v-if="allAddresses.length > 0">
    <div
      class="card-header d-flex align-items-center"
      v-bind:class="{'justify-content-between':shareButton, 'justify-content-center':!shareButton}"
    >
      <h4 class="title-2">{{listTitle}}</h4>
      <button
        v-if="shareButton"
        type="button"
        class="btn btn-darker border-dark px-3 py-2 float-right"
        title="Compartilhar lista de endereços"
        @click="shareAddresses"
      >
        <i class="fas fa-share-alt"></i>
        compartilhar
      </button>
    </div>
    <strong v-if="userShareLink && shareButton" class="text-center p-3 text-dark">
      Compartilhe sua lista:
      <router-link :to="userShareLink">{{hostname}}{{userShareLink}}</router-link>
    </strong>
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
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "Addresses",
  props: ["usage"],
  computed: {
    ...mapGetters(["allAddresses", "linkToShare"]),
    ...mapState(["uid"])
  },
  created() {
    if (this.usage == "shared-addresses") {
      this.fetchSharedAddresses(atob(this.$route.params.id));
      this.listTitle = "Lista compartilhada comigo";
    }
  },
  mounted() {
    this.userShareLink = this.linkToShare;
    this.hostname = location.href;
    this.$store.watch(
      (state, getters) => (this.userId = getters.uid),
      (newValue, oldValue) => {
        if (newValue != null) {
          if (this.usage == "my-addresses") {
            this.fetchAddresses(newValue);
            this.listTitle = "Seus endereços salvos";
            this.shareButton = true;
          }
        }
      }
    );
  },
  data() {
    return {
      listTitle: "",
      shareButton: false,
      loading: false,
      willDelete: {
        status: false,
        id: "",
        title: ""
      },
      hostname: "",
      userShareLink: null,
      userId: null
    };
  },
  components: {
    AddressItem
  },
  methods: {
    ...mapActions([
      "deleteAddress",
      "saveAddress",
      "fetchAddresses",
      "fetchSharedAddresses",
      "shareLink"
    ]),
    showLoading(payload) {
      if (payload && !this.loading) {
        this.loading = true;
      } else {
        this.loading = false;
      }
    },
    delAddress() {
      this.deleteAddress(this.willDelete.id);
    },
    showDeleteModal(address) {
      this.willDelete = {
        status: true,
        id: address.id,
        title: address.title
      };
      this.$emit("close-editing");
    },
    shareAddresses() {
      this.userShareLink = `compartilhado/${btoa(this.userId)}`;
      this.shareLink(this.userShareLink);
    }
  }
};
</script>

<style>
</style>
