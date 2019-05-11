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
          <svg
            class="octicon octicon-mark-github v-align-middle"
            height="32"
            viewBox="0 0 16 16"
            version="1.1"
            width="32"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
            ></path>
          </svg>
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
export default {
  name: "Footer"
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
