<template>
  <section id="menu" class="menu">
    <div class="container" data-aos="fade-up">
      <div class="section-header">
        <p>Check Your <span>Itinerary</span></p>
      </div>

      <ul
        class="nav nav-tabs d-flex justify-content-center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <!-- End tab nav item -->

        <!-- End tab nav item -->
      </ul>

      <div class="tab-content" data-aos="fade-up" data-aos-delay="300">
        <div class="tab-pane fade active show" id="menu-starters">
          <div class="tab-header text-center">
            <h3>My Plans</h3>
          </div>

          <div class="row gy-5">
            <div class="col-lg-4 menu-item" v-for="(plan, i) in plans" :key="i">
              <template v-if="plan.isReviewExist === 0">
                <router-link :to="`/review/myplan/${plan.plan_id}`" class="glightbox">
                  <img :src="getImageSource(i)" class="menu-img img-fluid" alt="" />
                </router-link>
              </template>
              <template v-else>
                <img :src="getImageSource(i)" class="menu-img img-fluid grayed-out" alt="" />
              </template>
              <p class="ingredients">
                {{ formatDate(plan.start_date) }} - {{ formatDate(plan.end_date) }}
              </p>
              <p class="price">{{ plan.title }}</p>
            </div>
            <!-- Menu Item -->
          </div>
        </div>
        <!-- End Starter Menu Content -->
      </div>
    </div>
  </section>
  <!-- End Menu Section -->
</template>

<script>
import http from "@/api/http.js";
export default {
  data() {
    return {
      plans: [],
    };
  },
  methods: {
    getList() {
      http.get("/review/xx").then(({ data }) => {
        this.plans = data.response;
      });
    },
    getImageSource(index) {
      let nI = (index % 6) + 1;
      return require(`@/assets/img/tripReview/trip_${nI}.png`);
    },
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped>
.grayed-out {
  filter: grayscale(100%);
}
</style>
