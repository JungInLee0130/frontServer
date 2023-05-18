<template>
  <section id="events" class="events">
    <div class="container-fluid" data-aos="fade-up">
      <div class="section-header">
        <h2>Events</h2>
        <p>Share <span>Your Moments</span> In Our Restaurant</p>
      </div>
    </div>
  </section>
</template>

<script>
import http from "@/api/http.js";
export default {
  data() {
    return {
      review: null,
    };
  },
  methods: {
    getDetail() {
      const id = this.$route.params.rid;
      http.get("/review/all/" + id).then(({ data }) => {
        console.log(data);
        this.review = data.response;
      });
    },
  },
  created() {
    this.getDetail();
  },
};
</script>

<style></style>
