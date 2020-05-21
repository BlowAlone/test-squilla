import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const generateID = () => `f${(~~(Math.random() * 1e8)).toString(16)}`;
const store = () =>
  new Vuex.Store({
    state: {
      offers: [],
      offer: null,
      newOffer: false,
      id: generateID(),
      frequencies: ["Единовременно", "Каждые две недели", "Ежемесячно"],
      authUser: null
    },
    getters: {
      defaultOffer: state => {
        return {
          id: state.id,
          min: 0,
          max: 0,
          percent: 0,
          freq: "Eдиновременно"
        };
      },
      isUserAuthenticated: state => !!state.authUser
    },
    mutations: {
      SET_OFFERS(state, offers) {
        Object.assign(state, { offers });
      },
      SET_OFFER(state, offer) {
        Object.assign(state, { offer });
      },
      RESET_OFFER(state) {
        state.offer = null;
        state.newOffer = false;
      },
      ADD_OFFER(state, offer) {
        state.offers.push(offer);
      },
      UPDATE_OFFER(state, newOffer) {
        let index = state.offers.findIndex(elem => elem.id === newOffer.id);
        state.offers.splice(index, 1, newOffer);
      },
      REMOVE_OFFER(state, offer) {
        state.offers = state.offers.filter(elem => elem.id !== offer.id);
      },
      SET_ERROR(state, error) {
        console.error(error);
      },
      SET_NEW_OFFER(state) {
        state.newOffer = true;
      },
      RESET_NEW_OFFER(state) {
        state.newOffer = false;
        state.id = generateID();
      },
      SET_USER(state, user) {
        state.authUser = user;
      }
    },
    actions: {
      async getOffers({ commit }) {
        try {
          const offers = await this.$axios.$get("http://localhost:3001/offers");
          commit("SET_OFFERS", offers);
        } catch (error) {
          commit("SET_ERROR", error);
        }
      },
      async updateOffer({ commit }, offer) {
        try {
          await this.$axios.$patch(
            `http://localhost:3001/offers/${offer.id}`,
            offer
          );
          commit("UPDATE_OFFER", offer);
        } catch (error) {
          commit("SET_ERROR", error);
        }
      },
      async addOffer({ commit }, offer) {
        try {
          await this.$axios.$post(`http://localhost:3001/offers`, offer);
          commit("RESET_NEW_OFFER");
          commit("ADD_OFFER", offer);
        } catch (error) {
          commit("SET_ERROR", error);
        }
      },
      async deleteOffer({ commit }, offer) {
        try {
          await this.$axios.$delete(
            `http://localhost:3001/offers/${offer.id}`,
            offer
          );
          commit("REMOVE_OFFER", offer);
        } catch (error) {
          commit("SET_ERROR", error);
        }
      },
      async login({ commit }, { username, password }) {
        try {
          const { data } = await this.$axios.post("/api/login", {
            username,
            password
          });
          commit("SET_USER", data);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            throw new Error("Bad credentials");
          }
          throw error;
        }
      },

      async logout({ commit }) {
        await this.$axios.post("/api/logout");
        commit("SET_USER", null);
      }
    }
  });

export default store;
