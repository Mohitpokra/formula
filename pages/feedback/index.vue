<template>
  <div>
    <v-card color="secondary py-2" elevation="0">
      <v-card-title>Send us your feedback!</v-card-title>
      <v-card-text>
        Do you have any suggestion or found some bug ?
        <br />Let us know in the field below
      </v-card-text>
    </v-card>
    <div class="ma-2">
      <p class="title mt-4">
        How was your experience ?
        <v-rating v-model="rating"></v-rating>
      </p>
      <v-text-field :error="errors.name" v-model="name" label="Name" required></v-text-field>
      <p class="red--text" v-if="errors.name">{{errors.name}}</p>
      <v-text-field v-model="phone" :error="errors.phone" label="Phone" required></v-text-field>
      <p class="red--text" v-if="errors.phone">{{errors.phone}}</p>
      <v-textarea
        filled
        auto-grow
        v-model="feedback"
        label="Feedback"
        rows="4"
        row-height="30"
        shaped
        :error="errors.feedback"
      ></v-textarea>
      <p class="red--text" v-if="errors.feedback">{{errors.feedback}}</p>
      <v-btn block :loading="loading" :disabled="loading" color="primary" @click="submitFeedback">
        Submit
        <template v-slot:loader>
          <span class="custom-loader">
            <v-icon light>cached</v-icon>
          </span>
        </template>
      </v-btn>
    </div>
  </div>
</template>

<script>
import config from "../../config/frontend/index";
export default {
  asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error
  }) {
    store.commit("ui/setNavbarTitle", {
      title: "Feedback"
    });
  },
  data: () => ({
    errors: {},
    rating: 3,
    loading: false,
    valid: true,
    name: "",
    phone: "",
    feedback: ""
  }),
  mounted() {
    // Set bottomNav tab
    this.$store.commit("ui/setBottomNav", {
      number: 2
    });
  },
  methods: {
    submitFeedback() {
      this.loading = true;
      let data = {
        name: this.name,
        phone: this.phone,
        feedback: this.feedback,
        rating: this.rating
      };
      this.$axios
        .post(`${config.reqHost}/api/feedback`, data)
        .then(data => {
          this.errors = {};
          this.name="";
          this.phone="";
          this.feedback="";
          this.loading = false;
          this.$toasted.show("Thanks for your feedback !!", {
            theme: "bubble",
            icon: {
              name: "check",
              after: true
            },
            position: "top-right",
            duration: 2000
          });
        })
        .catch(err => {
          this.loading = false;
          if (err.response.status == 400) {
            this.errors = {};
            this.errors = err.response.data;
            this.$toasted.error("Kindly check the errors !!", {
              options: {
                type: "error"
              },
              position: "top-right",
              duration: 1000
            });
          } else {
            this.$toasted.error("Something went wrong !!", {
              options: {
                type: "error"
              },
              position: "top-right",
              duration: 2000
            });
          }
        });
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>