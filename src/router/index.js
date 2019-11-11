import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect:"/goods",
    component: Home
  },
  {
    path:"/evaluate",
    name:"evaluate",
    component:()=>import("../views/Evaluate.vue")
  },
  {
    path:"/goods",
    name:"goods",
    component:()=>import("../views/Goods.vue")
  },
  {
    path:"/merchant",
    name:"merchant",
    component:()=>import("../views/Merchant.vue")
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
 
  base: process.env.BASE_URL,
  routes
})

export default router
