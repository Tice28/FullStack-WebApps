import axios from "axios";
import { defineStore } from "pinia";
import type { Router } from "vue-router";
import { get_csrf_token } from "./auth";

export const usePortfolioStore = defineStore("portfolio", {
  state: () => {
    return {
      // for initially empty lists
      holdingList: [] as Holding[],
      // for data that is not yet loaded
      holding: null as Holding | null,
    };
  },
  actions: {
    async getPortfolio() {
      const headers = {
        "X-CSRFToken": get_csrf_token(),
      };

      await axios
        .get("http://localhost:8000/api/stock-holdings", {
          headers: headers,
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addHolding() {},
    deleteHolding() {},
  },
});

interface Holding {
  id: number;
  purchase_date: string;
  purchase_price: string;
  shares_bought: string;
  ticker_symbol: string;
  user: number;
}
