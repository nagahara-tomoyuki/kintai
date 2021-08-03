<template>
  <div>
    <p>
      <!--<button @click="AuthCheck">ID情報を確認する</button
      >←先ずはココを押してください
    </p>-->
    </p>

    <p>{{ I_Data.id }}</p>
    <!-- <p>{{ items }}</p> -->

    <div class="page">
      <div id="time"></div>
      <button type="button" @click="work_start">出勤</button>
      <button type="button" @click="work_end">退勤</button>
      <button type="button" @click="CheckData">データ取得</button>
      <ul>
        <!-- <li v-for="data in items">{{ data.date }}</li> -->
      </ul>
      <table border="6">
        <tbody>
          <tr>
            <!-- <th>日付</th> -->
            <th>出勤時間</th>
            <th>退勤時間</th>
          </tr>
          <tr v-if="this.flag">
            <!-- <td> -->
              <!-- <div v-for="(item, index) in items" :key="index"> -->
                <!-- {{ item.date }} -->
              <!-- </div> -->
            <!-- </td> -->
            <td>
              <div v-for="(item, index) in itemsFiltersukkin" :key="index">
                {{ item.date + " " + item.time }}
              </div>
            </td>
            <td>
              <div v-for="(item, index) in itemsFiltertaikin" :key="index">
                {{ item.date + " " + item.time }}
              </div>
            </td>
          </tr>
          <div id="check"></div>
        </tbody>
      </table>
    </div>

    <button @click="logOut">ログアウト</button>
    <nuxt-link to="/test">test</nuxt-link>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      // items: [{ name: "" }, { type: "" }, { date: "" }, { time: "" }],
      items: [],
      flag: false,
      I_Data: {
        id: "",
        name: "",
      }, //I_Data
    }; //return
  }, //data

  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("ログアウトしました");
          this.$router.push("/");
        }) //then
        .catch((error) => {
          alert(error);
        }); //catch
    }, //logOut

    CheckData() {
      firebase
        .database()
        .ref("work")
        .child(this.I_Data.id)
        //.equalTo(this.I_Data.id)
        .on("value", (snapshot) => {
          var box = snapshot.val();
          // console.log("ID:  " + this.I_Data.id, snapshot);
          // for (var j in items) {
            this.items = [''];
          // }
          for (var i in box) {
            if (this.I_Data.id == box[i]["name"]) {
              var new_item = {
                name: box[i]["name"],
                type: box[i]["type"],
                date: box[i]["date"],
                time: box[i]["time"],
              };
              this.items.push(new_item);
            } else {
              this.items[0] = "no";
            }
          }
           console.log(this.items);
          // document.querySelector("#check").innerHTML = "<td>" + this.items['date'] + "</td>";
        });
      this.flag = Boolean("true");
    },
    work_start() {
      //write_rec("出勤");
      //var rec_name = this.I_Data.id,
      var rec_type = "出勤";
      var rec_date = new Date().toLocaleDateString();
      var rec_time = new Date().toLocaleTimeString();
      //var Ref = firebase.database().ref("work");
      //Ref.child(this.I_Data.id) //下と全く同じ内容
      firebase
        .database()
        .ref("work/" + this.I_Data.id)
        .push({
          name: this.I_Data.id,
          type: rec_type,
          date: rec_date,
          time: rec_time,
        })
        .then(() => {
          alert("出勤しました");
        });
    },
    work_end() {
      //write_rec("退勤");
      //var rec_name = this.I_Data.id,
      var rec_type = "退勤";
      var rec_date = new Date().toLocaleDateString();
      var rec_time = new Date().toLocaleTimeString();
      //var Ref = firebase.database().ref("work");
      //Ref.child(this.I_Data.id)
      firebase
        .database()
        .ref("work/" + this.I_Data.id)
        .push({
          name: this.I_Data.id,
          type: rec_type,
          date: rec_date,
          time: rec_time,
        })
        .then(() => {
          alert("退勤しました");
        });
    },
  }, //methods

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.I_Data.id = user.uid;
      }
    });
    console.log(this.items)
  },
  computed: {
    itemsFiltersukkin: function () {
      return this.items.filter((e) => {
        return e.type === "出勤";
      });
    },
    itemsFiltertaikin: function () {
      return this.items.filter((e) => {
        return e.type === "退勤";
      });
    },
    itemsFilterdate: function () {
      return this.items.filter((e) => {
        return e.date === "items.date";
      });
    },
  },
};

var time_dsp = function () {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var dayOfWeek = date.getDay();
  var dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
  var result =
    year +
    "/" +
    month +
    "/" +
    day +
    "(" +
    dayOfWeekStr +
    ") " +
    hour +
    ":" +
    minute +
    ":" +
    second;
  if (typeof document !== "undefined") {
    document.getElementById("check").innerHTML = result;
  }
  setInterval(time_dsp, 1000);
};
</script>