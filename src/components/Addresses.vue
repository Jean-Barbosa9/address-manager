<template>
  <div class="addresses" v-bind:addresses="addresses">
    <div class="address" v-for="address in addresses" :key="address.id">
      <AddressItem v-bind:address="address"/>
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
