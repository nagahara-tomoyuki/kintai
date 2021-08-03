<template>
  <div class="page">
    {{ user }}
    <p v-if="user.login" class="text">ログインに成功！</p>
    <div id="time"></div>
    <nuxt-link to="/mainLogin" class="link"> ログインはこちら </nuxt-link>
  </div>
</template>
 
<script>
import firebase from "~/plugins/firebase";

export default {
  computed: {
    user() {
      return this.$store.getters["user"];
    },
  },
};
</script>