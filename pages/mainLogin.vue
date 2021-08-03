<template>
  <div class="login">
    <h1>ログイン画面</h1>
    <p class="text">
      <!-- {{ myData }}<button @click="checkUid">uidを見る</button> -->
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
      <button class="button" type="submit" @click="login">Login</button>
    </form>
    <nuxt-link to="/mainSignup" class="link"> 新規登録はこちら </nuxt-link>
  </div>
</template>
 
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      typingEmail: "",
      typingPassword: "",
      myData: {},
    };
  },
  methods: {
    // checkUid(){
      // firebase.auth().onAuthStateChanged(this.typingEmail, th.typingPassword)
    // },
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.typingEmail, this.typingPassword)
        .then((user) => {
          console.log("OK");
          alert("ログイン出来ました");
          this.myData = user;
          this.$router.push("/mainKintai");
          //console.log("ユーザー: " + myData + "ユーザーID:" + user.uid);
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>


<style>
.login {
  text-align: center;
}
</style>
