<template>
  <div class="address-item card" v-bind:address="address">
    <div class="card-body">
      <p>
        <strong>CEP:</strong>
        {{address.zipCode}}
        <strong>Cidade:</strong>
        {{address.city}}
        <strong>Estado:</strong>
        {{address.state}}
        <strong>Bairro:</strong>
        {{address.neighborhood}}
        <strong>Logradouro:</strong>
        {{address.street}}
        <strong>Número:</strong>
        {{address.number}}
        <strong>Complemento:</strong>
        {{address.complement}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressItem",
  props: ["address"]
};
</script>

<style>
</style>
