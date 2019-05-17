import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const state = {
  isAuthenicated: false,
  user: {
    uid: null,
    email: null
  },
  redirectTo: null
};

const getters = {
  isAuthenicated: state => state.isAuthenicated,
  email: state => state.user.email,
  uid: state => state.user.uid,
  redirectTo: state => state.redirectTo
};

const actions = {
  login({ commit }, userData) {
    const { email, password } = userData;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        commit("signUser", userData);
      })
      .catch(error => {
        commit("alert", {
          type: "error",
          message: error.message,
          timeout: 5000
        });
      });
  },
  createUser({ commit }, userData) {
    const { email, password } = userData;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        commit("signUser", userData);
      })
      .catch(error => {
        if (error.type == "auth/weak-password") {
          commit("alert", {
            type: "error",
            message: "A senha deve conter no mínimo 6 caracteres",
            timeout: 5000
          });
        }
      });
  },
  watchUserAuth({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit("signUser", user);
      } else {
        commit("logoff");
      }
    });
  },
  logout({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit("logoff");
      })
      .catch(error => {
        commit("alert", {
          type: "error",
          message: error.message,
          timeout: 5000
        });
      });
  },
  redirect({ commit }, route) {
    commit("redirectTo", route);
  },
  showAlert({ commit }, alert) {
    commit("alert", alert);
  }
};

const mutations = {
  signUser: (state, userData) => {
    state.user = { email: userData.email, uid: userData.uid };
    state.isAuthenicated = true;
  },
  logoff: state => {
    state.isAuthenicated = false;
    state.user = { email: null, uid: null };
  },
  redirectTo: (state, route) => (state.redirectTo = route),
  alert: (state, alert) => {
    state.alert = alert;
    setTimeout(() => {
      state.alert = {
        type: null,
        message: ""
      };
    }, alert.timeout);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
