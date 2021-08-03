<template>
  <div>
    <h1>test Realtime Database</h1>
    <nuxt-link to="/mainKintai">KINTAI</nuxt-link>
    <nuxt-link to="/firestore">Store</nuxt-link>
    <div id="time"></div>

    <table>
      <tr>
        <th>Name</th>
        <td><input type="text" v-model="mydata.name" /></td>
      </tr>
      <tr>
        <th>Mail</th>
        <td><input type="text" v-model="mydata.mail" /></td>
      </tr>
      <tr>
        <th>Age</th>
        <td><input type="number" id="age" v-model="mydata.age" /></td>
      </tr>
      <tr>
        <th></th>
        <td><button @click="add">追加</button></td>
      </tr>
    </table>
    <hr />
    <ol id="list">
      wait.....
    </ol>
    <h2>test firestore</h2>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      mydata: {
        name: "",
        mail: "",
        age: "",
      },
    };
  },
  methods: {
    add() {
      firebase.database().ref("people").push().set(this.mydata);
    },
  },
  mounted() {
    var database = firebase.database();
    var people = database.ref("people/");
    //firebase.database().ref('people')
    people.on("value", (snapshot) => {
      let data = snapshot.val();
      let result = "";
      for (let i in data) {
        let person = data[i];
        result +=
          "<li>" +
          "name: " +
          person.name +
          " , " +
          "[mail: " +
          person.mail +
          " , " +
          person.age +
          "歳]";
      }
      document.querySelector("#list").innerHTML = result;
    });
  },
};
</script>