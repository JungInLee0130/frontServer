<template>
  <section id="contact" class="contact">
    <div class="container" data-aos="fade-up">
      <div style="height: 120px"></div>
      <div class="section-header">
        <p>{{ review.title }}</p>
      </div>
      <div style="float: right">{{ review.hit }} hit</div>

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
            <div v-html="renderContentsWithImage(reviewDay.contents)"></div>
          </div>
          <!-- End Info Item -->
        </div>
      </div>
    </div>
  </section>
  <!-- End About Section -->
</template>

<script>
import { apiInstance } from "@/api/lib/index.js";

const http = apiInstance();
export default {
  data() {
    return {
      review: null,
      startDay: "",
    };
  },

  methods: {
    getDetail() {
      const id = this.$route.params.rid;
      http.get("/review/all/" + id).then(({ data }) => {
        console.log(data.response);
        this.review = data.response;
        this.startDay = data.response.dailyList[0].reviewDate;
      });

    },

    renderContentsWithImage(contents) {
      return contents;
    },
  },
  created() {
    this.getDetail();
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
</style>
