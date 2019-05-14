// aqui serão feitas as solicitações ao Firestore

const state = {
  addresses: [
    {
      id: 3,
      title: "Shopping Rio Sul",
      zipCode: "22290-070",
      city: "Rio de Janeiro",
      state: "RJ",
      street: "Avenida Lauro Sodré",
      neighborhood: "Botafogo",
      number: "445",
      complement: "Parte DC01, Shop 401"
    },
    {
      id: 2,
      title: "Shopping Tijuca",
      zipCode: "20511-000",
      city: "Rio de Janeiro",
      state: "RJ",
      street: "Avenida Maracanã",
      neighborhood: "Tijuca",
      number: "987",
      complement: "7º piso"
    },
    {
      id: 1,
      title: "Shopping Downtown",
      zipCode: "22640-904",
      city: "Rio de Janeiro",
      state: "RJ",
      street: "Avenida das Américas",
      neighborhood: "Centro",
      number: "500",
      complement: "Bloco 6 2º piso"
    }
  ]
};

const getters = {
  allAddresses: state => state.addresses
};

const actions = {
  fetchAddresses({ commit }) {
    const localAddresses = JSON.parse(atob(localStorage.addresses));
    commit("setAddresses", localAddresses);
  }
};

const mutations = {
  setAddresses: (state, addresses) => (state.addresses = addresses)
};

export default {
  state,
  getters,
  actions,
  mutations
};
