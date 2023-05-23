<template>
  <body>
    <section id="member-detail">
            <h2>Member Update</h2>
            <div class="wrapper-detail">
                <div class = "detail-wrap">
                    <label class="label-memberId">MemberId : </label>
                    <input class="input-memberId" type="text" name="memberId" readonly="readonly" width="50"
                                    v-model="member.memberId" />
                </div>
                <div class = "detail-wrap">
                    <label class="label-nickname">nickname : </label>
                    <input class="input-nickname" type="text" name="nickname" width="50" v-model="member.nickname" />
                </div>
                
                <div class = "detail-wrap">
                    <label class="label-password">password : </label>
                    <input class="input-password" type="password" name="password" width="50" v-model="member.password" />   
                </div>
                    <div class = "detail-wrap">
                        <label class="label-emailId">emailId : </label>
                        <input class="input-emailId" type="text" name="emailId" width="50" v-model="member.emailId" />
                        
                    </div>
                    <div class = "detail-wrap">
                        <label class="label-emailDomain">emailDomain : </label>
                        <input class="input-emailDomain" type="text" name="emailDomain" width="50"
                                v-model="member.emailDomain" />
                    </div>
                    <div class = "detail-wrap">
                        <label class="label-phoneNumber">phoneNumber : </label>
                        <input class="input-phoneNumber" type="text" name="phoneNumber" width="50"
                                v-model="member.phoneNumber" />
                    </div>
                    
                    <div class="text-center">
                      <button type="button" class="btn-update btn btn-primary" v-on:click="adminUpdate()">
                        수정
                      </button>
                    </div>
                </div>
        </section>
  </body>
</template>

<script>
import { apiInstance } from '@/api/lib/index';
const http = apiInstance();

export default {
  name: "AdminUpdate",
  data() {
    return {
      member: [], // 한사람 정보
    };
  },
  created() {
    let memberId = this.$route.params.memberId;
    console.log(memberId);
    this.memberDetail(memberId);
  },
  methods: {
    memberDetail(id) { // update생성시
      http
        .get(`/memberdetail/${id}`)
        .then(({ data }) => {
          console.log(data);
          this.member = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    adminUpdate() { // 버튼 클릭시
      http
        .put(`/memberupdate`, this.member)
        .then(({ data }) => {
          if (data != null) {
            alert("회원정보를 수정하였습니다.");
            this.$router.push(`/admin/memberlist`);
          }
          else {
            alert("정보 수정에 실패했습니다.")
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
.btn-update {
  margin: 20px;
}

</style>


