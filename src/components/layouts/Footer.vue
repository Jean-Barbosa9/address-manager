<template>
  <footer class="footer container-fluid py-5">
    <ul
      class="d-flex flex-column flex-lg-row justify-content-around align-items-center mb-0 list-unstyled"
    >
      <li class="footer__item py-3">
        <span class="item-label">see project at</span>
        <a
          href="https://github.com/Jean-Barbosa9/address-manager"
          target="_blank"
          rel="noreferrer noopener"
          title="Link para o Github do projeto"
        >
          <GithubIcon/>
        </a>
      </li>
      <li class="footer__item py-3">
        <span class="item-label">hosted by</span>
        <img
          src="https://www.gstatic.com/devrel-devsite/v3ed7096711d03089d65cf308a7b610abaf4e02b3070bb2c72f086df06f85ccaf/firebase/images/lockup.png?dcb_=0.6269571042494801"
          alt="Logo do Firebase"
        >
      </li>
      <li class="footer__item py-3">
        <span class="item-label">powered by</span>
        <img class="logo" alt="Vue logo" src="../../assets/logo.png">
        <strong>Vuejs</strong>
      </li>
    </ul>
  </footer>
</template>

<script>
import GithubIcon from "../GithubIcon";
export default {
  name: "Footer",
  components: {
    GithubIcon
  }
};
</script>

<style scoped>
.footer {
  background: #e5e5e5;
}

.footer__item img {
  max-height: 40px;
}

.item-label {
  margin-right: 1ch;
  font-size: 10px;
  color: #bbbbbb;
  font-weight: 700;
  vertical-align: bottom;
  text-transform: uppercase;
}
</style>
