import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import PlanView from "../views/Plan/PlanView.vue";
import PlanReview from "../views/Review/PlanReview.vue";
import MyPlanList from "../views/Review/MyPlanList.vue";
import ReviewParent from "../views/Review/ReviewParent.vue";
import WriteReview from "../views/Review/WriteReview.vue";
// 로그인
import LoginView from "../views/Login/LoginView.vue";
// 회원가입
import JoinView from "../views/Join/JoinView.vue";
// 관리자
import AdminView from "../views/Admin/AdminView.vue";
// 사용자
import UserView from "../views/User/UserView.vue";
// 멤버컴포넌트
import NavBar from "../components/NavBar.vue";
import MemberList from "../components/Member/MemberList";
import MemberDetail from "../components/Member/MemberDetail";
import AdminUpdate from "../components/Member/AdminUpdate";
import MyPage from "../components/User/MyPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/plan",
    name: "plan",
    component: PlanView,
  },
  {
    path: "/review",
    name: "review",
    component: ReviewParent,
    redirect: "/review/list",
    children: [
      {
        path: "list",
        name: "planreview",
        component: PlanReview,
      },
      {
        path: "plans",
        name: "myplanlist",
        component: MyPlanList,
      },
      {
        path: "myplan/:id",
        name: "writereview",
        component: WriteReview,
      },
    ],
  },

  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/logout:memberId",
    component: NavBar,
  },
  {
    path: "/join",
    name: "join",
    component: JoinView,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminView,
    redirect: "/admin/memberlist",
    children: [
      {
        path: "memberlist",
        name: "memberlist",
        component: MemberList,
      },
      {
        path: "memberdetail/:memberId",
        name: "memberdetail",
        component: MemberDetail,
      },
      {
        path: "adminupdate/:memberId",
        name: "AdminUpdate",
        component: AdminUpdate,
      },
    ],
  },
  {
    path: '/user',
    name: 'User',
    component: UserView,
    children:[  
      {
        path: 'mypage',
        name: 'mypage',
        component: MyPage,
      },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
