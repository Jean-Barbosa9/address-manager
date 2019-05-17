<template>
  <div class="about">
    <p>
      Olá seja bem vindo à
      <strong class="text-primary">versão {{version}}</strong> do gerenciador de endereços. Essa é uma aplicação desenvolvida para atender aos pré requisitos do desafio de front da Estante Virtual.
    </p>
    <p>
      Aqui é possível ver os endereços que você criar e/ou editar após se logar ou cadastrar através dos links disponíveis no menu (botão
      <span
        class="btn btn-darker"
      >
        <i class="fas fa-bars"/>
      </span> no cabeçalho da página).
    </p>
    <p>
      Em cada endereço, após ser adicionado ou editado será possível visualizar a distância da sua posição atual até lá e o clima no local. Também pode traçar uma rota até o referido endereço apenas clicando no botão
      <span
        class="btn btn-dark"
      >
        <i class="fas fa-route"/>
      </span> que estará no card com os detalhes do endereço ou ainda compartilhar sua lista de endereços ao clicar no botão
      <span class="btn btn-darker border-dark">
        <i class="fas fa-share-alt"/>
      </span> que fica ao lado do título da lista, para obter o link.
    </p>
    <p>
      Você pode visualizar o código fonte deste projeto apenas clicando no ícone do GitHub
      <span>
        <GithubIcon/>
      </span> no rodapé de qualquer página ou
      <a
        href="https://github.com/Jean-Barbosa9/address-manager"
        target="_blank"
        rel="noreferrer noopener"
        title="Link para o Github do projeto"
      >clicando aqui</a>.
    </p>
    <p>Há novas funcionalidades que estão no roadmap para as próximas versões, mas por enquanto é isso. Espero que goste e que seja útil de alguma forma para você, grande abraço!</p>
  </div>
</template>

<script>
import { version } from "../../package.json";
import GithubIcon from "../components/GithubIcon";
export default {
  name: "About",
  data() {
    return {
      version: version
    };
  },
  components: {
    GithubIcon
  }
};
</script>

<style>
</style>
