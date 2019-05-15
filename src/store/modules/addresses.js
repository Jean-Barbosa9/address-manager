import uuid from "uuid";

// aqui serão feitas as solicitações ao Firestore

const state = {
  alert: {
    type: null,
    message: ""
  },
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
  ],
  teste: ""
};

const getters = {
  alert: state => state.alert,
  allAddresses: state => state.addresses,
  editingAddress: state => state.editingAddress
};

const actions = {
  fetchAddresses({ commit }) {
    const localAddresses = JSON.parse(atob(localStorage.addresses));
    commit("setAddresses", localAddresses);
  },
  willEdit({ commit }, id) {
    commit("setEditAddress", id);
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
  },
  saveAddress({ commit }, message) {
    commit("localSave", message);
  },
  test({ commit }, data) {
    commit("testing", data);
  }
};

const mutations = {
  setAddresses: (state, addresses) => (state.addresses = addresses),
  setEditAddress: (state, id) =>
    (state.editingAddress = state.addresses.filter(
      address => address.id == id
    )),
  newAddress: (state, address) => {
    state.addresses.unshift(address);
  },
  addressChanged: (state, payload) =>
    (state.addresses = state.addresses.map(address =>
      address.id === payload.id ? payload : address
    )),
  addressRemoved: (state, id) =>
    (state.addresses = state.addresses.filter(address => address.id !== id)),
  localSave: (state, message) => {
    localStorage.setItem("addresses", btoa(JSON.stringify(state.addresses)));
    state.alert = {
      type: "success",
      message: message
    };

    setTimeout(() => {
      state.alert = {
        type: null,
        message: ""
      };
    }, 2000);
  },
  testing: (state, data) => (state.teste = data)
};

export default {
  state,
  getters,
  actions,
  mutations
};
