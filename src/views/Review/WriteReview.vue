<template>
  <section id="about" class="about">
    <div class="container" data-aos="fade-up">
      <div class="section-header">
        <h2>About Us</h2>
        <p>Learn More <span>About Us</span></p>
      </div>

      <div class="plan-review">
        <div class="plan-item" v-for="(plan, index) in travelPlans" :key="index">
          <h3 class="plan-date">{{ formatDate(plan.start_date) }}</h3>
          <textarea
            class="plan-review-text"
            v-model="plan.review"
            placeholder="Write your review..."
          ></textarea>
        </div>
      </div>
    </div>
  </section>
  <!-- End About Section -->
</template>

<script>
import http from "@/api/http.js";
export default {
  data() {
    return {
      travelPlans: [],
    };
  },
  methods: {
    getList() {
      http.get("/review/xx").then(({ data }) => {
        this.travelPlans = data;
      });
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

<style scoped></style>
