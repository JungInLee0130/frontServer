<template>
  <div class="main-wrapper">
  <section id="hero" class="hero d-flex align-items-center section-bg">
    <div class="container">
      <div class="row justify-content-between gy-5">
        <div
          class="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start"
        >
          <h2 data-aos="fade-up">Enjoy Your Trip<br /></h2>
          <div class="main-desc">
            <p data-aos="fade-up" data-aos-delay="100">
              Which city do you want to go? <br />
              Make a plan using this Page!
            </p>
          </div>
          <div class="d-flex" data-aos="fade-up" data-aos-delay="200">
            <a href="#book-a-table" class="btn-book-a-table">Reviews</a>
          </div>
        </div>
        <div class="col-lg-5 order-1 order-lg-2 text-center text-lg-start">
          <img
            src="@/assets/img/slider1.jpg"
            class="img-fluid"
            alt=""
            data-aos="zoom-out"
            data-aos-delay="300"
          />
        </div>
      </div>
    </div>
  </section>
  <!-- End Hero Section -->
  <div class="main-plan">
    <h2 style="text-align:center">Plan</h2>
    <img src="../assets/img/main/plan/plan_map.png" alt="kakaomap">
    <h4 style="margin-top:20px">you can select places you want to go.</h4>
    <div class="main-plan-timeline">
      <img src="../assets/img/main/plan/plan_day1.png" alt="day1">
      <img src="../assets/img/main/plan/plan_day2.png" alt="day2">
      <img src="../assets/img/main/plan/plan_day3.png" alt="day3">
      <h4 style="margin-top:20px">you can see TimeLines you planned.</h4>
    </div>
  </div>
</div>
</template>

<script>
export default {};
</script>
<style scope>
#hero {
  height: 75vh;
}

.main-desc {
  font-size: 25px;
}

.main-plan{
  height: 1300px;
  margin-top: 70px;
  text-align: center;
}
.main-plan-timeline{
  margin-top:50px;
}
</style>
