import axios from "axios";
import { defineStore } from "pinia";
import type { Router } from "vue-router";

export const useAuthStore = defineStore("auth", {
  actions: {
    async setCSRFToken() {
      await axios.get("http://localhost:8000/api/set-csrf-token", {
        withCredentials: true,
      });
    },

    async test(email: String, password: String, router = null) {
      const data = await axios
        .post("http://localhost:8000/test", {
          email: email,
          pasword: password,
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(data);
    },
    async login(email: String, password: String, router: Router) {
      const headers = {
        "X-CSRFToken": get_csrf_token(),
      };

      await axios
        .post(
          "http://localhost:8000/api/login",
          {
            email: email,
            password: password,
          },
          {
            headers: headers,
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response);
          localStorage.setItem("loggedIn", "true");
          router.push({ name: "home" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async logout(router: Router) {
      try {
        const headers = {
          "X-CSRFToken": get_csrf_token(),
        };

        await axios
          .post(
            "http://localhost:8000/api/logout",
            {},
            {
              headers: headers,
              withCredentials: true,
            }
          )
          .then((response) => {
            localStorage.removeItem("loggedIn");
            router.push({ name: "login" });
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async register(email: String, password: String, router: Router) {
      const headers = {
        "X-CSRFToken": get_csrf_token(),
      };

      await axios
        .post(
          "http://localhost:8000/api/register",
          {
            email: email,
            password: password,
          },
          {
            headers: headers,
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response);
          router.push({ name: "login" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  async getUser() {
    const headers = {
      "X-CSRFToken": get_csrf_token(),
    };

    await axios
      .get("http://localhost:8000/api/register", {
        headers: headers,
        withCredentials: true,
      })
      .then((response) => {
        localStorage.setItem("loggedIn", "true");
      })
      .catch((error) => {
        console.log(error);
      });
  },
});

export function get_csrf_token() {
  const name = "csrftoken";
  let cookieValue = null;

  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  if (cookieValue === null) {
    throw "Missing CSRF cookie.";
  }
  return cookieValue;
}
