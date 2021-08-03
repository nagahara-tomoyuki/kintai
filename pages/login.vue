<template>
  <div class="login">
    <h1>ログイン画面</h1>
    <p class="text">
      {{ user }}
    </p>
    <form class="form" @submit.prevent>
      <label class="label">
        <span class="label"> email </span>
        <input class="input" type="text" v-model="email" />
      </label>
      <label class="label">
        <span class="label"> password </span>
        <input class="input" type="password" v-model="password" />
      </label>
      <button class="button" type="submit" @click="login">Login</button>
    </form>
    <nuxt-link to="/signup" class="link"> 新規登録はこちら </nuxt-link>
  </div>
</template>
 
<script>
export default { 
  computed: {
    user() {
      return this.$store.getters["user"];
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login(email, password) {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
      if (this.$store.getters["user"]) {
        this.$router.push("/kintai");
      }
    },
  },
};
</script>