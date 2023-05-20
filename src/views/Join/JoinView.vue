<template>
    <section id="join-section">
        <h2>Sign In</h2>
        <div class="wrapper-join">
            <div class="join-wrap">
                <label class="label-memberId">MemberId : </label>
                <input class="input-memberId" type="text" name="memberId" width="50" v-model="memberId" />
                <!-- v-on:keyup="checkIdCondition(memberId)" -->
                <span class="btn-checkId-wrapper">
                    <b-button class="btn-checkId" variant="btn btn-danger" v-on:click="checkId(memberId)">Check Id
                    </b-button>
                </span>
            </div>

            <!-- <div class="join-id-condition">
                <div v-if="idCondition == '0'"></div>
                <div v-if="idCondition == '1'">
                    <p style="color: green">올바른 아이디입니다.</p>
                </div>
                <div v-if="idCondition == '-1'">
                    <p style="color: red">올바른 아이디가 아닙니다.</p>
                </div>
            </div> -->


            <div class="join-wrap">
                <label class="label-nickname">nickname : </label>
                <input class="input-nickname" type="text" name="nickname" width="50" v-model="nickname" />
                <!-- <span class="btn-duplicatedNicknameCheck-wrapper">
                    <b-button class="btn-duplicatedNicknameCheck" variant="btn btn-danger"
                        v-on:click="duplicatedNicknameCheck(nickname)">Check Nickname
                    </b-button>
                </span> -->
            </div>

            <!-- <div class="join-nickname-dupl">
                <div v-if="duplicatedNickname"></div>
                <div v-if="duplicatedNickname == '1'">
                    <p style="color: green">올바른 아이디입니다.</p>
                </div>
                <div v-if="duplicatedNickname == '-1'">
                    <p style="color: red"></p>
                </div>
            </div> -->

            <div class="join-wrap">
                <label class="label-password">password : </label>
                <input class="input-password" type="password" name="password" width="50" v-model="password"
                    v-on:keyup="checkPasswordCondition(password)" />
            </div>

            <div class="join-password-condition">
                <div v-if="passwordCondition == '0'"></div>
                <div v-if="passwordCondition == '1'">
                    <p style="color: green">사용할 수 있는 비밀번호입니다.</p>
                </div>
                <div v-if="passwordCondition == '-1'">
                    <p style="color: red">
                        비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.
                    </p>
                </div>
                <div v-if="passwordCondition == '-2'">
                    <p style="color: red">비밀번호는 8자리이상입니다.</p>
                </div>
            </div>

            <div class="join-wrap">
                <label class="label-password-again">password again : </label>
                <input class="input-password-again" type="password" name="password-again" width="50"
                    v-model="password_again" v-on:keyup="checkPasswordAgain(password, password_again)" />
            </div>

            <div class="class join-passwordIdentify">
                <div v-if="passwordIdentify == '0'"></div>
                <div v-if="passwordIdentify == '1'">
                    <p style="color: green">비밀번호가 일치합니다.</p>
                </div>
                <div v-if="passwordIdentify == '-1'">
                    <p style="color: red">비밀번호가 일치하지 않습니다.</p>
                </div>
            </div>

            <div class="join-wrap">
                <label class="label-emailId">emailId : </label>
                <input class="input-emailId" type="text" name="emailId" width="50" v-model="emailId" />
            </div>

            <div class="join-wrap">
                <label class="label-emailDomain">emailDomain : </label>
                <input class="input-emailDomain" type="text" name="emailDomain" width="50" v-model="emailDomain" />
            </div>

            <div class="join-wrap">
                <label class="label-phoneNumber">phoneNumber : </label>
                <input class="input-phoneNumber" type="text" name="phoneNumber" width="50" v-model="phoneNumber" />
                <p>{{ phoneNumberCondition }}</p>
            </div>

            <div class="btn-join-wrapper">
                <b-button class="btn-join" variant="outline-danger" @click.self.prevent="join()">Sign In
                </b-button>
            </div>
        </div>
    </section>
</template>

<script>
import http from "@/api/http.js";
export default {
    name: "JoinView",
    data() {
        return {
            message: "",
            idCondition: "",
            duplicatedId: "",
            //duplicatedNickname: "",
            passwordCondition: "",
            passwordIdentify: "",
            //phoneNumberCondition: "",
        };
    },
    methods: {
        join() {
            if (this.idCondition == 1
                && this.passwordCondition == 1
                && this.duplicatedId == 1
                && this.passwordIdentify == 1) {
                let data = {
                    memberId: this.memberId,
                    nickname: this.memberId,
                    password: this.password,
                    emailId: this.emailId,
                    emailDomain: this.emailDomain,
                    phoneNumber: this.phoneNumber,
                    password_again: this.password_again,
                };
                // 데이터는 이미 data(not this.data)를 담아서 백으로 보냄
                http
                    .post(`/join`, data)
                    .then(({ data }) => {
                        console.log(data); // 1: 성공시
                        if (data != null) {
                            alert("회원가입이 완료되었습니다.");
                            this.$router.push(`/`);
                        } else {
                            alert("중복된 회원입니다."); // 임시
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("중복된 회원입니다."); // 임시
                    });
            }
            else {
                alert("회원가입 조건을 다시 확인해주세요.");
            }
        },
        checkIdCondition(memberId) {
            //console.log(memberId);
            // 대문자, 소문자, 숫자로만 아이디
            this.memberId = memberId;
            // 0 : 아무것도 입력안함
            if (memberId.length == 0) {
                this.idCondition = "0";
                return;
            }

            for (let i = 0; i < memberId.length; i++) {
                if ("0" <= memberId.charAt(i) && memberId.charAt(i) <= "9") {
                    continue;
                }
                if ("a" <= memberId.charAt(i) && memberId.charAt(i) <= "z") {
                    continue;
                }
                if ("A" <= memberId.charAt(i) && memberId.charAt(i) <= "Z") {
                    continue;
                }
                // -1 : 특수문자 들어감
                this.idCondition = "-1";
                return;
            }
            this.idCondition = "1";// 정상
        },
        checkPasswordCondition(password) {
            this.password = password;
            if (password.length == 0) {
                // 0: 아무것도 입력 안함.
                this.passwordCondition = "0";
                return;
            }
            // -2 : 비밀번호는 8자리이상입니다.
            if (0 < password.length && password.length < 8) {
                this.passwordCondition = "-2";
                return;
            }
            if (password.length >= 8) {
                // 8이상 : 사용할 수 있는 비밀번호 입니다.
                for (let i = 0; i < password.length; i++) {
                    if ("0" <= password.charAt(i) && password.charAt(i) <= "9") {
                        continue;
                    }
                    if ("a" <= password.charAt(i) && password.charAt(i) <= "z") {
                        continue;
                    }
                    if ("A" <= password.charAt(i) && password.charAt(i) <= "Z") {
                        continue;
                    }
                    // -1 : 비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.
                    this.passwordCondition = "-1";
                    return;
                }
                // 1 : 사용가능
                this.passwordCondition = "1";
            }
        },

        checkPasswordAgain(password, password_again) {
            // 둘중에 하나가 입력된것이 없을때
            if (password.length == 0 || password_again == 0 || password.length < 8
                || password_again < 8) {
                this.passwordIdentify = "0";
                return;
            }
            // 비밀번호 불일치
            if (password != password_again) {
                this.passwordIdentify = "-1";
                return;
            }
            // 1: 사용가능
            this.passwordIdentify = "1";
        },

        // 아이디 특수문자도 걸러냄
        checkId(str) {
            // 1. 아이디 조건 체크
            this.memberId = str;
            // 아무것도 입력안함
            if (str.length == 0) {
                this.idCondition = "0";
                alert("아이디를 입력해주세요.")
                return;
            }

            for (let i = 0; i < str.length; i++) {
                if ("0" <= str.charAt(i) && str.charAt(i) <= "9") {
                    continue;
                }
                if ("a" <= str.charAt(i) && str.charAt(i) <= "z") {
                    continue;
                }
                if ("A" <= str.charAt(i) && str.charAt(i) <= "Z") {
                    continue;
                }
                this.idCondition = "-1"; // 특수문자 들어감
                alert("특수문자는 사용할 수 없습니다.")
                return;
            }
            this.idCondition = "1";// 정상

            // 2. idCondition == 1 && id 중복체크
            http.get(`/check/${str}`)
                .then(({ data }) => {
                    console.log(data.memberId);

                    // if (str.length == 0) {
                    //     this.duplicatedId = '-2';
                    // }
                    if (str == data.memberId) {
                        this.duplicatedId = '-1'
                        alert("중복된 아이디 입니다.");
                    }
                    else {
                        // 1: 사용가능
                        this.duplicatedId = '1'
                        alert("사용할 수 있는 아이디입니다.");
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // duplicatedNicknameCheck(str) {
        //     console.log(this.memberId);
        //     // 닉네임 중복체크
        //     http.get(`/check/${this.memberId}`)
        //         .then(({ data }) => {
        //             console.log(data.nickname, str);
        //             if (str == data.nickname) {
        //                 this.duplicatedNickname = '-1';
        //                 alert("중복된 닉네임 입니다.");
        //             }
        //             else {
        //                 this.duplicatedNickname = '1';
        //                 alert("사용할 수 있는 닉네임입니다.");
        //             }
        //         }).catch(function (error) {
        //             console.log(error);
        //             alert("닉네임을 입력해주세요."); // 임시
        //         });
        // },

    },
    computed: {
        memberIdLength(memberId) {
            return this.memberId.length;
        },
    },
};
</script>

<style>
.wrapper-join {
    max-width: 380px;
    display: flex;
    flex-direction: column;
    min-height: 50vh;
    /* border: 1px solid black; */
    box-sizing: border-box;
    margin: 0 auto;
    /*상하 간격같음*/
    /* width: 750px; */
    /* padding-top: 130px; */
    /* min-height: 100vh; */
    /*  */
}

.join-wrap {
    margin: 15px;
}

.label-memberId,
.label-nickname,
.label-password,
.label-password-again,
.label-emailId,
.label-emailDomain,
.label-phoneNumber,
.label-createdAt,
.label-modifiedAt,
.label-memberRole {
    width: 100%;
    padding-right: 5px;
    padding-bottom: 5px;
}

.input-memberId,
.input-nickname,
.input-password,
.input-password-again,
.input-emailId,
.input-emailDomain,
.input-phoneNumber,
.input-createdAt,
.input-modifiedAt,
.input-memberRole {
    width: 100%;
    border: 1px solid gray;
    padding: 5px;
    border-radius: 5px;
    margin-right: 5px;
    margin-bottom: 7px;
}

.join {
    margin: 10px;
}

.btn-join-wrapper {
    margin-left: 15px;
    margin-right: 15px;
}

.btn-checkId {
    height: 75%;
    width: 100%;
}

.btn-duplicatedNicknameCheck {
    height: 75%;
    width: 100%;
}

.btn-join {
    margin-top: 50px;
    width: 100%;
}
</style>
