// import uuid from "uuid";
import firebase from "firebase/app";
import "firebase/firestore";

const state = {
  alert: {
    type: null,
    message: "",
    timeout: null
  },
  linkToShare: "",
  editingAddress: {
    id: null,
    createdBy: null,
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
    // {
    //   id: 3,
    //   createdBy: "jeanbarbosa9@gmail.com",
    //   title: "Shopping Rio Sul",
    //   zipCode: "22290-070",
    //   city: "Rio de Janeiro",
    //   state: "RJ",
    //   street: "Avenida Lauro Sodré",
    //   neighborhood: "Botafogo",
    //   number: "445",
    //   complement: "Parte DC01, Shop 401"
    // },
    // {
    //   id: 2,
    //   createdBy: "jeanbarbosa9@gmail.com",
    //   title: "Shopping Tijuca",
    //   zipCode: "20511-000",
    //   city: "Rio de Janeiro",
    //   state: "RJ",
    //   street: "Avenida Maracanã",
    //   neighborhood: "Tijuca",
    //   number: "987",
    //   complement: "7º piso"
    // },
    // {
    //   id: 1,
    //   createdBy: "jeanbarbosa9@gmail.com",
    //   title: "Shopping Downtown",
    //   zipCode: "22640-904",
    //   city: "Rio de Janeiro",
    //   state: "RJ",
    //   street: "Avenida das Américas",
    //   neighborhood: "Centro",
    //   number: "500",
    //   complement: "Bloco 6 2º piso"
    // }
  ]
};

const getters = {
  alert: state => state.alert,
  allAddresses: state => state.addresses,
  editingAddress: state => state.editingAddress,
  linkToShare: state => state.linkToShare
};

const actions = {
  getLocalAddresses({ commit }) {
    const localAddresses = JSON.parse(atob(localStorage.addresses));
    commit("setAddresses", localAddresses);
  },
  fetchAddresses({ commit }, uid) {
    const userAddresses = firebase
      .firestore()
      .collection("addresses")
      .where("createdBy", "==", uid);
    userAddresses.get().then(querySnapshot => {
      const userSycedAddresses = [];
      querySnapshot.forEach(doc => {
        const {
          createdBy,
          title,
          zipCode,
          city,
          state,
          street,
          neighborhood,
          number,
          complement
        } = doc.data();

        userSycedAddresses.push({
          id: doc.id,
          createdBy,
          title,
          zipCode,
          city,
          state,
          street,
          neighborhood,
          number,
          complement
        });
      });
      commit("setAddresses", userSycedAddresses);
    });
  },
  willEdit({ commit }, id) {
    commit("setEditAddress", id);
  },
  addAddress({ commit }, address) {
    address.createdBy = firebase
      .firestore()
      .collection("addresses")
      .doc()
      .set(address)
      .then(res => {
        commit("alert", {
          type: "success",
          message: "Endereço adicionado com sucesso",
          timeout: 1500
        });
      });
    commit("newAddress", address);
  },
  editAddress({ commit }, payload) {
    firebase
      .firestore()
      .collection("addresses")
      .doc(payload.id)
      .update(payload)
      .then(res => {
        commit("addressChanged", payload);
        commit("alert", {
          type: "success",
          message: "Endereço atualizado com sucesso!",
          timeout: 1500
        });
      })
      .catch(error => {
        commit("alert", {
          type: "error",
          message: "Você não tem permissão para alterar este registro",
          timeout: 5000
        });
      });
  },
  deleteAddress({ commit }, id) {
    firebase
      .firestore()
      .collection("addresses")
      .doc(id)
      .delete()
      .then(res => {
        commit("addressRemoved", id);
        commit("alert", {
          type: "success",
          message: "Endereço removido com sucesso",
          timeout: 1500
        });
      })
      .catch(error => {
        commit("alert", {
          type: "error",
          message: "Você não tem permissão para excluir este endereço",
          timeout: 5000
        });
      });
  },
  saveAddress({ commit }, message) {
    commit("localSave", message);
  },
  shareLink({ commit }, link) {
    commit("hasLink", link);
  },
  fetchSharedAddresses({ commit }, uid) {
    const userAddresses = firebase
      .firestore()
      .collection("addresses")
      .where("createdBy", "==", uid);
    userAddresses.get().then(querySnapshot => {
      const sharedWithMe = [];
      querySnapshot.forEach(doc => {
        const {
          createdBy,
          title,
          zipCode,
          city,
          state,
          street,
          neighborhood,
          number,
          complement
        } = doc.data();

        sharedWithMe.push({
          id: doc.id,
          createdBy,
          title,
          zipCode,
          city,
          state,
          street,
          neighborhood,
          number,
          complement
        });
      });
      commit("setAddresses", sharedWithMe);
    });
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
      message: message,
      timeout: 2000
    };
  },

  alert: (state, alert) => {
    state.alert = alert;
    setTimeout(() => {
      state.alert = {
        type: null,
        message: ""
      };
    }, alert.timeout);
  },
  hasLink: (state, link) => (state.linkToShare = link)
};

export default {
  state,
  getters,
  actions,
  mutations
};
