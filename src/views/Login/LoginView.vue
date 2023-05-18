<template>
    <section id="login-view">
        <h2>Get your Plan</h2>
        <div class="wrapper">
            <div class="login_border">
                <div class="login-label-wrap">
                    <label class="login-label">Log in</label>
                </div>
                <div class="input_wrap">
                    <div class="input_item">
                        <label for="id" class="icon_id">UserId</label>
                        <input type="text" class="input_item_memberId" id="memberId" v-model="memberId"
                            placeholder="UserId" />
                    </div>
                    <div class="input_item">
                        <label for="password" class="icon_password">Password</label>
                        <input type="password" class="input_item_password" id="password" v-model="password"
                            placeholder="Password" />
                    </div>
                </div>
                <div class="check_wrap">
                    <span class="check_item">
                        <input type="checkbox" class="checkbox_id" id="rmm_check">
                        <label for="rmm_check">save Id</label>
                    </span>
                </div>
                <div class="text-center">
                    <button class="btn-login" @click.self.prevent="login()">Log In</button>
                </div>
                <div class="text-center">
                    <button class="btn-join-login" v-on:click="join()">Sign Up</button>
                </div>

            </div>

        </div>
    </section>
</template>

<script>
//import http from '@/api/http.js'
import {mapState, mapActions} from "vuex";

const memberStore = "memberStore";

export default {
    name: "LoginView",

    components: {

    },
    data() {
        return {
            memberId: '',
            password: '',
        }
    },
    computed:{
        ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
    },
    methods: {
        ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
        async confirm(){
            await this.userConfirm(this.user);
            let token = sessionStorage.getItem("access-token");
            // console.log ("token : " + token);
            if (this.isLogin){
                await this.getUserInfo(token);
                this.$router.push({name: "home"});
            }
        },
        login() {

            // let data = {
            //     memberId: this.memberId,
            //     password: this.password
            // }

            // http.post("/login", data)
            //     .then(({ data }) => {
            //         console.log({ data });
            //         this.member = data;
            //         if (data == "") { // 정보가 없거나 비밀번호 틀림
            //             alert("회원가입 또는 로그인 정보를 다시 확인해주세요.")
            //         }
            //         else { // 정상
            //             this.$router.push(`/`);
            //             alert("환영합니다.");
            //         }
            //     }).catch(function (error) {
            //         console.log(error);
            //     });

            //console.log(this.memberId,this.password);
            // let root = "http://localhost:3000"

            // axios.post(root + "/login", data)
            //     .then(({ data }) => {
            //         console.log({ data });
            //         this.member = data;
            //         if (data == "") { // 정보가 없거나 비밀번호 틀림
            //             alert("회원가입 또는 로그인 정보를 다시 확인해주세요.")
            //         }
            //         else { // 정상
            //             this.$router.push(`/`);
            //             alert("환영합니다.");
            //         }
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
        },
        join() {
            this.$router.push(`/join`);
        },
    },
}
</script>
<style>
h2 {
    padding: 40px;
    padding-top: 60px;
    line-height: 26px;
    text-align: center;
}

.wrapper {
    width: 380px;
    min-height: 50vh;
    margin: 0 auto;
}

.login-label-wrap {
    text-align: center;
    margin: 2px;
}

.login-label {
    font-size: 25px;
    margin-bottom: 3px;
}

.login_wrap {
    padding: 0 20px 0px;
}

.login_border {
    padding-top: 30px;
}

.icon_id {
    position: absolute;
    top: 12px;
    left: 13px;
    overflow: hidden;
    height: 40px;
    background-size: 192px 84px;
    background-repeat: no-repeat;
    background-image: url(@/assets/img/login/icon-login.png);
}

.icon_password {
    position: absolute;

    top: 12px;
    left: 13px;
    overflow: hidden;
    height: 40px;
    background-size: 192px 84px;
    background-repeat: no-repeat;
    background-image: url(@/assets/img/login/icon-login.png);
}

.input_item input {
    width: 100%;
    height: 45px;
    line-height: 23px;
    border: 1px solid gray;
    border-radius: 4px;
    padding: 9px 15px 11px 35px;
    font-family: inherit;
    margin-bottom: 1px;
}

.input_item_memberId,
.input_item_password {
    margin: 2px;
}



.check_wrap {
    line-height: 30px;
    margin: 2px;
}

.btn-login {
    margin-top: 3px;
    width: 100%;
    height: 35px;
    background-color: red;
    font-size: 16px;
    font-weight: 700;
    border: 1px solid black;
    border-radius: 4px;
    color: white;
}


.btn-join-login {
    width: 100%;
    margin-top: 65px;
    height: 35px;
    background-color: white;
    font-size: 16px;
    color: red;
    border: 1px solid red;
    border-radius: 4px;
}

.checkbox_id {
    margin-right: 5px;
}
</style>