import firebase from '~/plugins/firebase'
require('firebase/auth')
export const state = () => ({
    user: {
        uid: '',
        email: '',
        login: false,
    },
})

export const getters = {
    user: state => {
        return state.user
    }
}

export const actions = {
    login({ dispatch }, payload) {
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                console.log('成功！')
                //console.log('login seikou  ' + this.getters.user)
                dispatch('checkLogin')
            }).catch((error) => {
                alert(error)
            })
    },
    checkLogin({ commit }) {
        firebase.auth().onAuthStateChanged(function (datauser) {
            if (datauser) {
                //commit('getData', { uid: user.uid, email: user.email })
                //commit('switchLogin')
                this.user.uid = datauser.uid;
                this.user = datauser;
                console.log(this.user.uid);
            } else {
                console.log("error");
            }
        })
    },
    register({ dispatch, commit }, payload) {
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                console.log(user)
                //despatch('checkLogin')
                alert("登録成功")
            }).catch(function (error) {
                console.log({ 'code': error.code, 'message': error.message })
                alert("登録失敗")
            })
    },
    logOut({ commit }) {
        firebase.auth().signOut()
            .then(() => {
                commit('logOut')
                console.log('ログアウト')
                alert("ログアウトしました")
            })
            .catch((error) => {
                console.log(error)
            })
    },
}

export const mutations = {
    getData(state, payload) {
        state.user.uid = payload.uid
        state.user.email = payload.email
    },
    switchLogin(state) {
        state.user.login = true
    },
    logOut(state) {
        state.user = ''
    },
}