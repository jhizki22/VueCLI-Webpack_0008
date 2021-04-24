<!-- @format -->
<template>
    <div class="dashboard">
        <v-navigation-drawer v-model="drawer" src="https://wallpapertag.com/wallpaper/full/8/0/7/121002-red-background-hd-1920x1200-for-android-40.jpg" dark class="fullheight" width="256" app>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title"> ATMA </v-list-item-title>
                <v-list-item-subtitle> KOREAN BARBEQUE </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
            <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                tag="router-link"
                :to="item.to"
            >
                <v-list-item-content>
                    <v-icon class="white--text">{{ item.icon }}</v-icon>
                </v-list-item-content>
                <v-list-item-content>
                    <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        </v-navigation-drawer>
        <v-app-bar app fixed height="75px" src="https://wallpapertag.com/wallpaper/full/8/0/7/121002-red-background-hd-1920x1200-for-android-40.jpg" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <VSpacer />
            <v-toolbar-items>
                <v-btn text @click="logout"><v-icon>mdi-power</v-icon></v-btn>
            </v-toolbar-items>
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
                { title: "Dashboard", to: "/dashboardw" , icon: 'mdi-table'},
                { title: "Meja", to: "/viewmejaw" , icon: 'mdi-cube'},
                { title: "Menu", to: "/viewmenuw" , icon: 'mdi-hamburger'},
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
                localStorage.setItem('nama', '');
                localStorage.setItem('email', '');
                    this.$router.push({
                        name: 'login'
                })
            }
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