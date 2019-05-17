<template></template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Shared",
  created() {
    this.fetchSharedAddresses(btoa(this.$route.params.id));
  },
  methods: {
    ...mapActions(["fetchSharedAddresses"])
  },
  data() {
    return {
      sharedAddresses: []
    };
  }
};
</script>

<style>
</style>
