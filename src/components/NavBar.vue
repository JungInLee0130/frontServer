<template>
  <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="container d-flex align-items-center justify-content-between">
      <router-link to="/">
        <!-- Uncomment the line below if you also wish to use an image logo -->
        <!-- <img src="assets/img/logo.png" alt=""> -->
        <h1>EnjoyTrips<span>.</span></h1>
      </router-link>

      <nav id="navbar" class="navbar">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/plan">Plan</router-link></li>
          <li><router-link to="/review">Review</router-link></li>
          <li><a href="#gallery">Gallery</a></li>
          <li class="dropdown">
            <a href="#"><span>Drop Down</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
            <ul>
              <li><a href="#">Drop Down 1</a></li>
              <li class="dropdown">
                <a href="#"><span>Deep Drop Down</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
                <ul>
                  <li><a href="#">Deep Drop Down 1</a></li>
                  <li><a href="#">Deep Drop Down 2</a></li>
                  <li><a href="#">Deep Drop Down 3</a></li>
                  <li><a href="#">Deep Drop Down 4</a></li>
                  <li><a href="#">Deep Drop Down 5</a></li>
                </ul>
              </li>
              <li><a href="#">Drop Down 2</a></li>
              <li><a href="#">Drop Down 3</a></li>
              <li><a href="#">Drop Down 4</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      <!-- .navbar -->
      <div>
        <div v-if="role == 'none'">
          <router-link to="/login" class="btn-book-a-table">Sign In</router-link>
          <!-- <router-link to="/join" class="btn-book-a-table">Sign up</router-link> -->
        </div>
        <div v-if="role == 'user'">
          <router-link to="/user/mypage" class="btn-book-a-table">My Page</router-link>
          <router-link to="/logout" class="btn-book-a-table">Log Out</router-link>
        </div>
        <div v-if="role == 'admin'">
          <router-link to="/admin/memberlist" class="btn-book-a-table">Admin</router-link>
          <router-link to="/logout" class="btn-book-a-table">Log Out</router-link>
        </div>
      </div>

      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
    </div>
  </header>
  <!-- End Header -->
</template>

<script>
import EventBus from "@/store/eventBus";
export default {
  name: "NavBar",
  data() {
    return {
      role: "none",
    }
  },
  created(){
    EventBus.$on('fetchRole', (response)=>{
        
        console.log("수신");
    })
  },
  methods: {
    logout() {

    },
    chooseRole() {
      this.role = 'User';
      this.role = 'Admin';
      this.role = 'none';
    },
    fetchRole(){
      console.log("송신");
      EventBus.$emit('fetchRole', this.role);
    }
  }
};
</script>

<style></style>
