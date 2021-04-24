<!-- @format -->
<template>
    <div class="dashboard" >
        <v-navigation-drawer v-model="drawer" src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" dark class="fullheight" width="256" app>

        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="headline"> ATMA </v-list-item-title>
                <v-list-item-subtitle class="title"> Korean Barbeque </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
            <v-list>
                <v-list-item-title style="font-weight-medium" @click="dashboard"> 
                    <v-icon left>
                        mdi-face
                    </v-icon>
                    Dashboard
                </v-list-item-title>
                <br>
                <v-list-item-title style="font-weight: medium" @click="karyawan"> 
                    <v-icon left>
                        mdi-account-multiple
                    </v-icon>
                    Karyawan
                </v-list-item-title>
                <br>
                <v-list-item-title style="font-weight-medium" @click="bahan"> 
                    <v-icon left>
                        mdi-silverware
                    </v-icon>
                    Bahan
                </v-list-item-title>
                <br>
                <v-list-item-title style="font-weight-medium" @click="meja"> 
                    <v-icon left>
                        mdi-table
                    </v-icon>
                    Meja
                </v-list-item-title>
                <br>
                <v-list-item-title style="font-weight-medium" @click="customer"> 
                    <v-icon left>
                        mdi-table
                    </v-icon>
                    Customer
                </v-list-item-title>
                <br>
                <v-list-item-title style="font-weight-medium" @click="menu"> 
                    <v-icon left>
                        mdi-close
                    </v-icon>
                    Menu
                </v-list-item-title>
                <br>
                <v-list-item-title style="font-weight-medium" @click="logout"> 
                    <v-icon left>
                        mdi-logout
                    </v-icon>
                    Logout
                </v-list-item-title>
                <br>
            </v-list>
        </v-list>
        </v-navigation-drawer>
        <v-app-bar app fixed height="75px">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <VSpacer />
            <v-text class="title">Admin</v-text>
        </v-app-bar>
        <div class="fullheight pa-5">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return {
            drawer: true,
            items: [
                { title: "Dashboard", to: "/dashboard" , icon:"mdi-table"},
                { title: "Employee", to: "/employees" },
                { title: "Transaction", to: "/carts" },
                { title: "Favourite", to: "/favourites" },
                { title: "Logout", to: "/logout" },
            ],
        };
    },
    methods:
    {
        logout: function()
        {
            if(confirm("Logout ?"))
            {
                localStorage.setItem('id', '');
                localStorage.setItem('token', '');
                    this.$router.push({
                        name: 'login'
                })
            }
        },
        karyawan: function()
        {
            this.$router.push({
                name: 'Karyawan'
            })
        },
        bahan: function()
        {
            this.$router.push({
                name: 'Bahan'
            })
        },
        meja: function()
        {
            this.$router.push({
                name: 'Meja'
            })
        },
        customer: function()
        {
            this.$router.push({
                name: 'Customers'
            })
        },
        menu: function()
        {
            this.$router.push({
                name: 'Menu'
            })
        },
        dashboard: function()
        {
            this.$router.push({
                name: 'Dashboard'
            })
        },
    }
};
</script>

<style scoped>
.fullheight {
    min-height: 100vh !important;
}
.router {
    text-decoration: none; 
    color: black;
}
</style> 