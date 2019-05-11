<template>
  <div class="addresses card" v-bind:addresses="addresses" v-if="this.addresses.length > 0">
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
      <div class="address col-sm" v-for="address in addresses" :key="address.id">
        <AddressItem
          v-bind:address="address"
          v-on:open-editing="$emit('open-editing', address)"
          v-on:delete-address="$emit('delete-address', address)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AddressItem from "./AddressItem.vue";

export default {
  name: "Addresses",
  props: ["addresses"],
  components: {
    AddressItem
  }
};
</script>

<style>
</style>
