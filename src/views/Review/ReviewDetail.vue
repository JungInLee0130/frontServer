<template>
  <section id="contact" class="contact">
    <div class="container" data-aos="fade-up">
      <div style="height: 120px"></div>
      <div class="section-header">
        <p>{{ review.title }}</p>
      </div>
      <div style="float: right">
        <div @click="toggleHeart">
          <i :class="heartClass"></i>
          <div>likes {{ review.likeCount }}</div>
        </div>
        <div>{{ review.hit }} hit</div>
      </div>

      <div class="row gy-4">
        <div v-for="(reviewDay, i) in review.dailyList" :key="i">
          <div class="col-md-6">
            <div class="info-item d-flex align-items-center">
              <div class="flex-shrink-0">Day {{ i + 1 }}</div>
              <div>
                <p>
                  {{ reviewDay.attractionName.join(" -> ") }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div style="width: 600px" v-html="renderContentsWithImage(reviewDay.contents)"></div>
          </div>
          <!-- End Info Item -->
        </div>
      </div>

      <div v-if="isOwner">
        <button class="buttonCustom" @click="deleteReview">Delete</button>
        <button class="buttonCustom" @click="modifyReview">Modify</button>
      </div>
    </div>
  </section>
  <!-- End About Section -->
</template>

<script>
import {mapActions} from "vuex";

const reviewStore = "reviewStore";
//import http from "@/api/http.js";
export default {
  data() {
    return {
      review: null,
      startDay: "",
      isOwner: false,
      isFilled: false,
    };
  },

  methods: {
<<<<<<< HEAD
    toggleHeart() {
      const reviewId = this.$route.params.rid;
      const memberId = this.$store.state.memberStore.userInfo.memberId;
      const likeJson = {
        member_id: memberId,
        review_id: reviewId,
      };
      if (this.isFilled) {
        this.review.likeCount--;
        this.isFilled = false;
        http.put("/review/like", likeJson).then(() => {
          console.log("del success");
        });
      } else {
        this.review.likeCount++;
        this.isFilled = true;
        http.post("/review/like", likeJson).then(() => {
          console.log("post success");
        });
      }
    },
    updateHit() {
      const id = this.$route.params.rid;
      http.get("/review/hit/" + id).then(() => {});
    },
    modifyReview() {
      const id = this.$route.params.rid;
      this.$router.push("/review/modify/" + id);
    },
    deleteReview() {
      const id = this.$route.params.rid;
      http.delete("/review/all/" + id).then(() => {
        this.$router.push("/review");
      });
    },
    getDetail() {
      const id = this.$route.params.rid;
      http.get("/review/all/" + id).then(({ data }) => {
        this.review = data.response;
        this.startDay = data.response.dailyList[0].reviewDate;
        if (data.response.member_id === this.$store.state.memberStore.userInfo.memberId) {
          this.isOwner = true;
        }
        if (this.review.isLikeExist === 1) {
          this.isFilled = true;
        }
      });
=======
    ...mapActions(reviewStore, ["getReviewAll"]),
    async getDetail() {
      const id = this.$route.params.rid;

      await this.getReviewAll(id);
      // 기존
      // http.get("/review/all/" + id).then(({ data }) => {
      //   console.log(data.response);
      //   this.review = data.response;
      //   this.startDay = data.response.dailyList[0].reviewDate;
      // });

      // jwt 추가
      
>>>>>>> c18bacf0705da21cf351415c79f87dade46fb9d9
    },

    renderContentsWithImage(contents) {
      return contents;
    },
  },
  computed: {
    heartClass() {
      return this.isFilled ? "bi-heart-fill" : "bi-heart";
    },
  },
  created() {
    this.getDetail();
  },
  mounted() {
    this.updateHit();
  },
};
</script>

<style scoped>
.pCustom {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  max-width: 100%;
  margin-bottom: 0; /* 줄 바꿈 없이 한 줄에 표시하기 위한 스타일 */
}
.spanCustom {
  display: inline-block;
  margin-right: 5px; /* 아이콘과 문자열 간격을 조정하기 위한 스타일 */
}
.bi-heart-fill {
  color: crimson;
}
.bi-heart {
  color: crimson;
}
</style>
