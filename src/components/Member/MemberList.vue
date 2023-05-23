<template>
    <section class="blog">
        <h1>MemberList</h1>
        <div class="wrapper-memberlist">
            <div class="container-fluid">
                <div id="tboard">
                    <div class="member-list">
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Order</th>
                                <th scope="col">MemberId</th>
                                <th scope="col">Password</th>
                                <th scope="col">Nickname</th>
                                <th scope="col">EmailId</th>
                                <th scope="col">EmailDomain</th>
                                <th scope="col">Phonenumber</th>
                                <th scope="col">Created</th>
                                <th scope="col">Modified</th>
                                <th scope="col">Role</th>
                                <th scope="col">Update/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template>
                                <member-item v-for="(m, i) in members" v-on:dm="deleteMember" :member="m" :index="i"
                                    :key="m.memberId"></member-item>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import MemberItem from "@/components/Member/MemberItem.vue";
import { apiInstance } from '@/api/lib/index';
import {mapActions} from 'vuex';
const memberStore = "memberStore";
const http = apiInstance();
export default {
    name: "MemberList",
    components: {
        MemberItem
    },
    data() {
        return {
            members: [], // members에 list넣어줌
        };
    },
    created() {
        this.memberList();
    },
    methods: {
        ...mapActions(memberStore,["tokenRegeneration"]),
        deleteMember() {
            this.memberList();
        },
        memberList() {
            console.log("memberlist 실행");
            http
                .get("/memberlist")
                .then(({ data }) => {
                    console.log("memberlist 실행됨");
                    this.members = data;
                    console.log(data);
                })
                .catch((error) => {
                    console.log("memberlist 실행 에러");
                    console.log(error);
                    if (this.$store.state.memberStore.isValidToken == false){
                        alert("토큰 만료. 엑세스 토큰 재발급.");
                        this.tokenRegeneration();                          
                    }
                });
        },
    },
};
</script>
<style>
h1 {
    padding: 40px;
    text-align: center;
}

.wrapper-memberlist {
    padding: 100px;
    min-height: 100vh;

}

.member-list {
    text-align: center;
    padding: 15px;
}

.container-fluid {
    margin-top: 15px;
}
</style>
