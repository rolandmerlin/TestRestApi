import { createRouter,createWebHistory } from "vue-router"

import PageHome from '../pages/index.vue'
import PageUsers from '../pages/users.vue'

const routes = [
    {
        path:'/',
        component:PageHome,
        title:'Accueil'
    },
    {
        path:'/users',
        component:PageUsers,
        title:'Utilisateurs'
    }
]

const router = createRouter({
    routes,
    history:createWebHistory()
})

export default router