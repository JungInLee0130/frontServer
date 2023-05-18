<template>
  <section id="hero" class="hero d-flex align-items-center section-bg">
    <div class="container">
      <div class="row justify-content-between gy-5">
        <div
          class="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
          <h2 data-aos="fade-up">Enjoy Your Trip<br /></h2>
          <div class="main-desc">
            <p data-aos="fade-up" data-aos-delay="100">
              Which city do you want to go? <br>
              Make a plan using this Page!
            </p>
          </div>
          <div class="d-flex" data-aos="fade-up" data-aos-delay="200">
            <a href="#book-a-table" class="btn-book-a-table">Reviews</a>
          </div>
        </div>
        <div class="col-lg-5 order-1 order-lg-2 text-center text-lg-start">
          <img src="@/assets/img/slider1.jpg" class="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="300" />
        </div>
      </div>
    </div>
  </section>
  <!-- End Hero Section -->
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
</style>