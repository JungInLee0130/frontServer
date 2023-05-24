<template>
  <section id="contact" class="contact">
    <div class="container" data-aos="fade-up">
      <div style="height: 120px"></div>
      <div class="section-header">
        <p>{{ myTitle }}</p>
      </div>
      <div style="float: right">
        <div @click="toggleHeart">
          <i :class="heartClass"></i>
          <div>likes {{ myLikeCount }}</div>
        </div>
        <div>{{ myHit }} hit</div>
      </div>

      <div class="row gy-4">
        <div v-for="(reviewDay, i) in review.dailyList" :key="i">
          <div class="col-md-6">
            <div class="info-item d-flex align-items-center">
              <div style="padding-right: 20px; text-emphasis: 10px" class="flex-shrink-0">
                <strong>Day {{ i + 1 }}</strong>
              </div>
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
      <div style="height: 30px"></div>
      <div style="float: right" v-if="isOwner">
        <button class="buttonCustom" @click="deleteReview">Delete</button>
        <button class="buttonCustom" @click="modifyReview">Modify</button>
      </div>

      <div style="height: 60px"></div>

      <!-- 댓글 -->
      <table class="table">
        <tbody>
          <tr v-for="(comment, j) in comments" :key="j">
            <td style="width: 100px">{{ comment.member_id }}</td>
            <td>
              {{ comment.contents }}
            </td>
            <td
              v-if="comment.member_id === $store.state.memberStore.userInfo.memberId"
              class="button-wrapper"
            >
              <button @click="deleteComment(j)">X</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="form-group">
        <textarea
          class="form-control"
          rows="5"
          placeholder="Comments..."
          v-model="commentsContents"
        ></textarea>
      </div>
      <div style="height: 10px"></div>
      <button class="buttonCustom" style="float: right" @click="postComments">Comment</button>
      <!-- 댓글 끝-->
    </div>
  </section>
  <!-- End About Section -->
</template>

<script>
import http from "@/api/lib/axios.js";
export default {
  data() {
    return {
      myTitle: "",
      review: null,
      startDay: "",
      isOwner: false,
      isFilled: false,
      myLikeCount: null,
      myHit: null,
      comments: null,
      commentsContents: "",
    };
  },

  methods: {
    deleteComment(j) {
      const commentId = this.comments[j].comment_id;
      http.delete("/review/comments/" + commentId).then(() => {
        this.getComments();
      });
    },
    postComments() {
      const memberId = this.$store.state.memberStore.userInfo.memberId;
      const reviewId = this.$route.params.rid;
      const commentsJson = {
        member_id: memberId,
        review_id: reviewId,
        contents: this.commentsContents,
      };
      http.post("/review/comments", commentsJson).then(() => {
        this.getComments();
        this.commentsContents = "";
      });
    },
    toggleHeart() {
      const reviewId = this.$route.params.rid;
      const memberId = this.$store.state.memberStore.userInfo.memberId;
      const likeJson = {
        member_id: memberId,
        review_id: reviewId,
      };
      if (this.isFilled) {
        this.myLikeCount--;
        this.isFilled = false;
        http.put("/review/like", likeJson).then(() => {});
      } else {
        this.myLikeCount++;
        this.isFilled = true;
        http.post("/review/like", likeJson).then(() => {});
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
        console.log(data.response);
        this.startDay = data.response.dailyList[0].reviewDate;
        this.myTitle = data.response.title;
        this.myLikeCount = data.response.likeCount;
        this.myHit = data.response.hit;
        if (data.response.member_id === this.$store.state.memberStore.userInfo.memberId) {
          this.isOwner = true;
        }
        if (this.review.isLikeExist === 1) {
          this.isFilled = true;
        }
      });
    },
    getComments() {
      const id = this.$route.params.rid;
      http.get("/review/comments/" + id).then(({ data }) => {
        this.comments = data.response;
      });
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
    this.getComments();
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
td {
  word-wrap: break-word;
  white-space: normal;
}
table {
  table-layout: fixed;
  width: 100%;
}
.button-wrapper {
  position: relative;
}
.button-wrapper button {
  position: absolute;
  top: 0;
  right: 0;
  background-color: crimson;
}
</style>
