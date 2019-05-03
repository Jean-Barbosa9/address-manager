<template>
  <div class="addresses card" v-bind:addresses="addresses" v-if="this.addresses.length > 0">
    <h4 class="card-header title-2">Endereços salvos</h4>
    <div class="card-body row">
      <div class="address col-sm" v-for="address in addresses" :key="address.id">
        <AddressItem
          v-bind:address="address"
          v-on:edit-address="$emit('edit-address', address.id)"
          v-on:delete-address="$emit('delete-address', address.id)"
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
