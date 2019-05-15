import uuid from "uuid";

// aqui serão feitas as solicitações ao Firestore

const state = {
  editingAddress: {
    id: null,
    title: "",
    zipCode: "",
    city: "",
    state: "",
    street: "",
    neighborhood: "",
    number: null,
    complement: ""
  },
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
  allAddresses: state => state.addresses,
  editingAddress: state => state.editingAddress
};

const actions = {
  fetchAddresses({ commit }) {
    const localAddresses = JSON.parse(atob(localStorage.addresses));
    commit("setAddresses", localAddresses);
  },
  willEdit({ commit }, address) {
    commit("setEditAddress", address);
  },
  addAddress({ commit }, address) {
    address.id = uuid.v4();
    commit("newAddress", address);
  },
  editAddress({ commit }, payload) {
    commit("addressChanged", payload);
  },
  deleteAddress({ commit }, id) {
    commit("addressRemoved", id);
  }
};

const mutations = {
  setAddresses: (state, addresses) => (state.addresses = addresses),
  setEditAddress: (state, address) => (state.editingAddress = address),
  newAddress: (state, address) => {
    state.addresses.unshift(address);
  },
  addressChanged: (state, payload) =>
    (state.addresses = state.addresses.map(address =>
      address.id === payload.id ? payload : address
    )),
  addressRemoved: (state, id) =>
    (state.addresses = state.addresses.filter(address => address.id !== id))
};

export default {
  state,
  getters,
  actions,
  mutations
};
