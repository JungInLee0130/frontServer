<template>
  <section id="chefs" class="chefs section-bg">
    <div class="container" data-aos="fade-up">
      <div class="section-header">
        <p>Fancy <span> Trip</span> Review</p>
      </div>

      <div class="row gy-4">
        <div
          class="col-lg-4 col-md-6 d-flex align-items-stretch"
          data-aos="fade-up"
          data-aos-delay="100"
          v-for="(review, i) in reviews"
          :key="i"
        >
          <router-link :to="`/review/detail/${review.review_id}`" class="chef-member">
            <div class="member-img">
              <img :src="getImageSource(i)" class="img-fluid" alt="" />
              <div class="social">
                <a href=""><i class="bi bi-twitter"></i></a>
                <a href=""><i class="bi bi-facebook"></i></a>
                <a href=""><i class="bi bi-instagram"></i></a>
                <a href=""><i class="bi bi-linkedin"></i></a>
              </div>
            </div>
            <div class="member-info">
              <h4>{{ review.title }}</h4>
              <span></span>
              <p>{{ review.start_date }} - {{ review.end_date }}</p>
            </div>
          </router-link>
        </div>
        <!-- End Chefs Member -->
      </div>
      <div class="php-email-form p-3 p-md-4">
        <div class="text-center">
          <button class="buttonCustom" @click="movePage">Regist</button>
        </div>
      </div>
    </div>
  </section>
  <!-- End Chefs Section -->
</template>

<script>
<<<<<<< HEAD
import { apiInstance } from "@/api/lib/index.js";
const http = apiInstance();
=======
import { apiInstance } from '@/api/lib/index';

const http = apiInstance();

>>>>>>> 48cc44ec22fb5e0a4ed67e1e368f5609492e6209
export default {
  data() {
    return {
      reviews: [],
    };
  },
  methods: {
    movePage() {
      this.$router.push("/review/plans");
    },
    getReview() {
      http.get("/review").then(({ data }) => {
        this.reviews = data.response;
      });
    },
    getImageSource(index) {
      let nI = (index % 19) + 1;
      return require(`@/assets/img/tripReview/trip_${nI}.png`);
    },
  },
  created() {
    this.getReview();
  },
};
</script>

<style></style>
