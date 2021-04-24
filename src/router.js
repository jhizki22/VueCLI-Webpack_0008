import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
function importComponent(path) {
    return () => import(`./components/${path}.vue`)
}

Vue.use(VueRouter);
const router = new VueRouter({
    mode: "history",
    routes: [{
            path: "/",
            component: importComponent('Layout/DashboardLayoutOM'),
            children: [
                //Dashboard
                {
                    path: "/dashboard",
                    name: "Dashboard OM",
                    meta: {title: 'Dashboard'},
                    component: importComponent('Admin/Dashboard'),
                },
                // Karyawan
                {
                    path: "/karyawan",
                    name: "Karyawan",
                    meta: {title: 'Karyawan'},
                    component: importComponent('Admin/Karyawan'),
                },
                // Bahan
                {
                    path: "/bahan",
                    name: "Bahan",
                    meta: {title: 'Bahan'},
                    component: importComponent('Admin/Bahan'),
                },
                // Meja
                {
                    path: "/meja",
                    name: "Meja",
                    meta: {title: 'Meja'},
                    component: importComponent('Admin/Meja'),
                },
                // Customer
                {
                    path: "/customers",
                    name: "Customers",
                    meta: {title: 'Customers'},
                    component: importComponent('Admin/Customers'),
                },
                // Menu
                {
                    path: "/menu",
                    name: "Menu",
                    meta: {title: 'Menu'},
                    component: importComponent('Admin/Menu'),
                },
                // ViewMenu
                {
                    path: "/viewmenu",
                    name: "View Menu",
                    meta: {title: 'View Menu'},
                    component: importComponent('Admin/ViewMenu'),
                },
                // View Meja
                {
                    path: "/viewmeja",
                    name: "View Meja",
                    meta: {title: 'View Meja'},
                    component: importComponent('Admin/ViewMeja'),
                },
            ]
        },
        {
            path: "/",
            component: importComponent('Layout/DashboardLayoutCashier'),
            children: [
                //Dashboard
                {
                    path: "/dashboardc",
                    name: "Dashboard Cashier",
                    meta: {title: 'Dashboard'},
                    component: importComponent('Admin/Dashboard'),
                },
                // ViewMenu
                {
                    path: "/viewmenuc",
                    name: "View Menu",
                    meta: {title: 'View Menu'},
                    component: importComponent('Admin/ViewMenu'),
                },
                // View Meja
                {
                    path: "/viewmejac",
                    name: "View Meja",
                    meta: {title: 'View Meja'},
                    component: importComponent('Admin/ViewMeja'),
                },
            ]
        },
        {
            path: "/",
            component: importComponent('Layout/DashboardLayoutWaiter'),
            children: [
                //Dashboard
                {
                    path: "/dashboardw",
                    name: "Dashboard Waiter",
                    meta: {title: 'Dashboard'},
                    component: importComponent('Admin/Dashboard'),
                },
                // ViewMenu
                {
                    path: "/viewmenuw",
                    name: "View Menu",
                    meta: {title: 'View Menu'},
                    component: importComponent('Admin/ViewMenu'),
                },
                // View Meja
                {
                    path: "/viewmejaw",
                    name: "View Meja",
                    meta: {title: 'View Meja'},
                    component: importComponent('Admin/ViewMeja'),
                },
            ]
        },
        {
            path: "/",
            component: importComponent('Layout/DashboardLayoutOwner'),
            children: [
                //Dashboard
                {
                    path: "/dashboardo",
                    name: "Dashboard Owner",
                    meta: {title: 'Dashboard'},
                    component: importComponent('Admin/Dashboard'),
                },
                // Karyawan
                {
                    path: "/karyawano",
                    name: "Karyawan",
                    meta: {title: 'Karyawan'},
                    component: importComponent('Admin/Karyawan'),
                },
            ]
        },
        {
            path: "/",
            component: importComponent('Layout/DashboardLayoutChef'),
            children: [
                //Dashboard
                {
                    path: "/dashboardch",
                    name: "Dashboard Chef",
                    meta: {title: 'Dashboard'},
                    component: importComponent('Admin/Dashboard'),
                },
                // Bahan
                {
                    path: "/bahanch",
                    name: "Bahan",
                    meta: {title: 'Bahan'},
                    component: importComponent('Admin/Bahan'),
                },
                // ViewMenu
                {
                    path: "/viewmenuch",
                    name: "View Menu",
                    meta: {title: 'View Menu'},
                    component: importComponent('Admin/ViewMenu'),
                },
                // View Meja
                {
                    path: "/viewmejach",
                    name: "View Meja",
                    meta: {title: 'View Meja'},
                    component: importComponent('Admin/ViewMeja'),
                },
            ]
        },
        //Login
        {
            path: "/login",
            name: "login",
            meta: {title: 'Login'},
            component: importComponent('Login'),
        },
        {
            path: "*",
            redirect: '/login'
        },
    ],
});

//Mengset judul
router.beforeEach((to, from, next) => {
    document.title = to.meta.title

    if (to.name != 'login' && localStorage.getItem('token') == '') {
        next({ path: '/login'})
    }
    next()
});

export default router;