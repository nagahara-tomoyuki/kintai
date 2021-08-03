<template>
  <div class="register">
    <h1>アカウント登録</h1>
    <p class="text">
      {{ myData }}
    </p>
    
    <div id="time"></div>
    <form class="form" @submit.prevent>
      <label class="label">
        <span class="label"> email </span>
        <input class="input" type="text" v-model="typingEmail" />
      </label>
      <label class="label">
        <span class="label"> password </span>
        <input class="input" type="password" v-model="typingPassword" />
      </label>
      <button class="button" type="submit" @click="register">Register</button>
    </form>
    <nuxt-link to="/mainLogin" class="link"> ログインはこちら </nuxt-link>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      typingEmail: "",
      typingPassword: "",
      myData: {
        userid: "",
        name: "",
        email: "",
        login: false,
      },
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.typingEmail, this.typingPassword)
        .then((user) => {
          alert("登録成功");
          this.myData = user;
          console.log(user);
          console.log("USER: " + user + "ユーザーID:" + user.uid);
        })
        .catch(function (error) {
          console.log({ code: error.code, message: error.message });
          alert("登録失敗");
        });
    },
  },
};
</script>

<style>
.register {
  text-align: center;
}
</style>