<template>
    <body>
        <section id="member-detail">
            <h2>MemberDetails</h2>
            <div class="wrapper-detail">
                <div class = "detail-wrap">
                    <label class="label-memberId">MemberId : </label>
                    <input class="input-memberId" type="text" name="memberId" readonly="readonly" width="50"
                                    v-model="member.memberId" />
                </div>
                <div class = "detail-wrap">
                    <label class="label-nickname">nickname : </label>
                    <input class="input-nickname" type="text" name="nickname" readonly="readonly" width="50" v-model="member.nickname" />
                </div>
                
                <div class = "detail-wrap">
                    <label class="label-password">password : </label>
                    <input class="input-password" type="password" name="password" readonly="readonly" width="50" v-model="member.password" />   
                </div>
                    <div class = "detail-wrap">
                        <label class="label-emailId">emailId : </label>
                        <input class="input-emailId" type="text" name="emailId" readonly="readonly" width="50" v-model="member.emailId" />
                        
                    </div>
                    <div class = "detail-wrap">
                        <label class="label-emailDomain">emailDomain : </label>
                        <input class="input-emailDomain" type="text" name="emailDomain" readonly="readonly" width="50"
                                v-model="member.emailDomain" />
                    </div>
                    <div class = "detail-wrap">
                        <label class="label-phoneNumber">phoneNumber : </label>
                        <input class="input-phoneNumber" type="text" name="phoneNumber" readonly="readonly" width="50"
                                v-model="member.phoneNumber" />
                    </div>

                    <div class = "detail-wrap">
                        <label class="label-createdAt">createdAt : </label>
                        <input class="input-createdAt" type="text" name="createdAt" readonly="readonly" width="50"
                                v-model="member.createdAt" />
                        
                    </div>
                    <div class = "detail-wrap">
                        <label class="label-modifiedAt">modifiedAt : </label>
                        <input class="input-modifiedAt" type="text" name="modifiedAt" readonly="readonly" width="50"
                                v-model="member.modifiedAt" />
                        
                    </div>

                    <div class = "detail-wrap">
                        <label class="label-memberRole">memberRole : </label>
                        <input class="input-memberRole" type="text" name="memberRole" readonly="readonly" width="50"
                                v-model="member.memberRole" />
                        
                    </div> 
                </div>
        </section>
    </body>
</template>

<script>
//import http from '@/api/http.js';
import { apiInstance } from "@/api/lib/index.js";

const http = apiInstance();

export default {
    name: 'MemberDetail',
    data() {
        return {
            member: [],
        };
    },
    created() {
        let memberId = this.$route.params.memberId;
        console.log(memberId);
        this.memberDetail(memberId);
    },
    methods: {
        memberDetail(id) {
            http
                .get(`/memberdetail/${id}`)
                .then(({ data }) => {
                    console.log(data);
                    this.member = data;
                })
                .catch((error) => {
                    console.log(error)
                })
        },
    },
};
</script>

<style scoped>
.wrapper-detail{
    display: flex;
    flex-direction: column;
    min-height: 80%;
    align-items:center;
}
.detail-wrap{
    margin: 15px;
}
.label-memberId, .label-nickname, .label-password, .label-emailId, .label-emailDomain, .label-phoneNumber, .label-createdAt, .label-modifiedAt, .label-memberRole {
    padding-right: 5px;
}
.input-memberId, .input-nickname, .input-password, .input-emailId, .input-emailDomain, .input-phoneNumber, .input-createdAt, .input-modifiedAt, .input-memberRole{
   border: 1px solid gray;
   border-radius: 5px;
}

</style>