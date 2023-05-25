<template>
  <section id="about" class="about">
    <div class="container" data-aos="fade-up">
      <div class="section-header">
        <p>Share your <span>Experience</span></p>
      </div>

      <div class="php-email-form p-3 p-md-4">
        <div class="form-group">
          <input type="text" class="form-control" v-model="rtitle" placeholder="Subject" required />
        </div>
      </div>

      <div class="plan-review">
        <div class="plan-item" v-for="(day, index) in travelPlans.list" :key="index">
          <h3 class="plan-date">{{ day[0].plan_date }}</h3>
          <textarea
            class="plan-review-text"
            v-model="board[index]"
            @input="updateBoard(index, $event.target.value)"
            @click="updateBoard(index, $event.target.value)"
            placeholder="Write your review..."
            style="width: 100%; height: 300px; resize: none"
          ></textarea>
        </div>
      </div>
      <input type="file" @change="handleFileUpload" accept="image/*" />
      <button class="buttonCustom" @click="sendPost">Submit</button>
    </div>
  </section>
  <!-- End About Section -->
</template>

<script>
import http from "@/api/lib/axios.js";
import axios from "axios";
export default {
  data() {
    return {
      travelPlans: [],
      board: [],
      rtitle: "",
      focusedIndex: null, // 포커스된 요소의 인덱스

      imageFile: null,
      imgUrl: "",
    };
  },
  methods: {
    concatString() {
      if (this.focusedIndex !== null) {
        const textarea = document.querySelectorAll(".plan-review-text")[this.focusedIndex];
        const startPosition = textarea.selectionStart;
        const endPosition = textarea.selectionEnd;
        const currentValue = this.board[this.focusedIndex];
        const newValue =
          currentValue.substring(0, startPosition) +
          this.imgUrl +
          currentValue.substring(endPosition);
        this.$set(this.board, this.focusedIndex, newValue);
        textarea.selectionStart = startPosition + this.imgUrl.length; // 3은 "123"의 길이입니다.
        textarea.selectionEnd = startPosition + this.imgUrl.length;
        textarea.focus();
      }
    },
    updateBoard(index, value) {
      this.board[index] = value;
      this.focusedIndex = index;
    },
    sendPost() {
      const memberid = this.$store.state.memberStore.userInfo.memberId;
      const planid = this.travelPlans.plan_id;
      const title = this.rtitle;
      const start_date = this.travelPlans.start_date;

      const sendJson = {
        member_id: memberid,
        plan_id: planid,
        title: title,
        start_date: start_date,
        list: this.board,
      };
      http
        .post("/review", sendJson)
        .then(() => this.$router.push("/review"))
        .catch(({ response }) => {
          alert(response.data.error.message);
        });
    },
    getList() {
      const id = this.$route.params.id;
      http.get("/review/myplan/" + id).then(({ data }) => {
        this.travelPlans = data.response;
        this.board = new Array(data.response.list.length);
      });
    },
    handleFileUpload(event) {
      this.imageFile = event.target.files[0];
      const formData = new FormData();
      formData.append("image", this.imageFile);

      axios
        .post("http://localhost:8080/uploadImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.imgUrl = `<img src="${response.data}" style="width: 600px; height:auto;" alt="image">`;
          this.concatString();

          // 이미지 파일과 관련된 데이터 초기화
          this.imageFile = null;
          this.imgUrl = null;
        })
        .catch(({ data }) => {});
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped>
.image-preview {
  position: fixed;
  z-index: 999;
}
</style>
