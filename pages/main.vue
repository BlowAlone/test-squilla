<template>
  <v-layout justify-center align-center>
    <v-flex xs12 md10 v-if="isUserAuthenticated">
      <v-card>
        <v-card-title class="headline">
          Таблица предложений для заемщиков денежных средств
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="offers"
            item-key="id"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  @click="newItem(defaultOffer)"
                  >Добавить</v-btn
                >
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              <p>Похоже, данных больше нет :(</p>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex v-else>
      <div class="text-center">
        Похоже вы не авторизованы. Вернитесь на страницу входа и выполните вход
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    headers: [
      { text: "Минимальная сумма", value: "min" },
      { text: "Максимальная сумма", value: "max" },
      { text: "Процентная ставка", value: "percent" },
      { text: "Частота выплат", value: "freq" },
      { text: "Действия", value: "actions", sortable: false }
    ]
  }),

  computed: {
    ...mapGetters(["defaultOffer", "isUserAuthenticated"]),
    ...mapState({
      offers: state => state.offers
    })
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapMutations({
      setOffer: "SET_OFFER",
      setNewOffer: "SET_NEW_OFFER"
    }),
    ...mapActions(["deleteOffer", "getOffers"]),
    initialize() {
      if (!this.isUserAuthenticated) {
        this.$router.push("/");
      }
      this.getOffers();
    },
    newItem(item) {
      this.setNewOffer();
      this.editItem(item);
    },
    editItem(item) {
      this.setOffer(item);
      this.$router.push("/add");
    },

    deleteItem(item) {
      confirm("Вы действительно хотите удалить данное предложение?") &&
        this.deleteOffer(item);
    }
  }
};
</script>
