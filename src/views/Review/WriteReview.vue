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
            placeholder="Write your review..."
          ></textarea>
        </div>
      </div>
      <button class="buttonCustom" @click="sendPost">Submit</button>
    </div>

    <div>
      <textarea
        ref="contentArea"
        v-model="content"
        @mouseup="handleMouseUp"
        placeholder="게시글 내용을 입력하세요"
      ></textarea>
      <input type="file" @change="handleFileUpload" accept="image/*" />
      <div
        v-if="showImagePreview"
        class="image-preview"
        :style="{ top: previewTop + 'px', left: previewLeft + 'px' }"
      >
        <img :src="imagePreviewUrl" alt="이미지 미리보기" />
      </div>
    </div>
  </section>
  <!-- End About Section -->
</template>

<script>
import http from "@/api/http.js";
import axios from "axios";
export default {
  data() {
    return {
      travelPlans: [],
      board: [],
      rtitle: "",

      content: "",
      imageFile: null,
      showImagePreview: false,
      imagePreviewUrl: "",
      previewTop: 0,
      previewLeft: 0,
    };
  },
  methods: {
    sendPost() {
      const memberid = "admin";
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
      console.log(sendJson);
      http.post("/review", sendJson).then(() => this.$router.push("/review"));
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
    },
    handleMouseUp(event) {
      if (this.imageFile) {
        this.showImagePreview = true;
        this.previewTop = event.clientY + window.scrollY;
        this.previewLeft = event.clientX;

        const formData = new FormData();
        formData.append("image", this.imageFile);

        axios
          .post("http://localhost:8080/uploadImage", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            // 이미지 업로드 성공 시 이미지 URL을 저장하고 게시글 내에 삽입
            const imageUrl = response.data;
            const contentArea = this.$refs.contentArea;
            const cursorPosition = contentArea.selectionStart;

            this.content =
              this.content.slice(0, cursorPosition) +
              `<img src="${imageUrl}" alt="이미지">` +
              this.content.slice(cursorPosition);

            // 이미지 파일과 관련된 데이터 초기화
            this.imageFile = null;
            this.showImagePreview = false;
          })
          .catch((error) => {
            // 이미지 업로드 실패 시 수행할 작업
            console.error(error);
          });
      }
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
