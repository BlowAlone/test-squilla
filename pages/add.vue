<template>
  <v-layout justify-center align-center>
    <v-flex class="text-center" xs12 md10>
      <v-card v-if="offer">
        <v-card-title>
          <span class="headline">Добавить/редактировать предложение</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="offer.min"
                  :rules="rules.isNatural"
                  label="Минимальная сумма"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="offer.max"
                  :rules="rules.isNatural"
                  label="Максимальная сумма"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="offer.percent"
                  :rules="rules.isNatural"
                  label="Процентная ставка"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="frequencies"
                  v-model="offer.freq"
                  label="Частота выплат"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn v-if="!newOffer" color="red darken-1" text @click="remove"
            >Удалить</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">Отмена</v-btn>
          <v-btn v-if="!newOffer" color="blue darken-1" text @click="save"
            >Сохранить</v-btn
          >
          <v-btn v-else color="blue darken-1" text @click="add">Добавить</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      rules: {
        isNatural: [
          val =>
            !isNaN(Math.abs(val.toString())) &&
            parseInt(val.toString(), 10) === Math.abs(val.toString()) &&
            Math.abs(val.toString()).toString() === val.toString()
        ]
      }
    };
  },
  mounted() {
    if (!this.offer) {
      this.$router.push("/main");
    }
  },
  computed: {
    ...mapState({
      offer: state => state.offer,
      frequencies: state => state.frequencies,
      newOffer: state => state.newOffer
    })
  },
  methods: {
    ...mapMutations({
      setOffer: "SET_OFFER",
      resetOffer: "RESET_OFFER"
    }),
    ...mapActions(["updateOffer", "addOffer", "deleteOffer"]),
    cancel() {
      this.$router.push("/main");
      this.resetOffer();
      console.log("cancel");
    },
    save() {
      this.updateOffer(this.offer);
      this.$router.push("/main");
      this.resetOffer();
      console.log("save");
    },
    add() {
      this.addOffer(this.offer);
      this.$router.push("/main");
      this.resetOffer();
      console.log("save");
    },
    remove() {
      this.deleteOffer(this.offer);
      this.$router.push("/main");
      this.resetOffer();
      console.log("remove");
    }
  }
};
</script>
