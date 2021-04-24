<!-- @format -->
<template>
    <div class="dashboard">
        <!--<v-navigation-drawer v-model="drawer" src="https://i.pinimg.com/originals/4f/6d/05/4f6d052bb1b26150115888ea06d4c106.jpg" dark class="fullheight" width="256" app>-->
        
        <v-navigation-drawer v-model="drawer" src="https://wallpapertag.com/wallpaper/full/8/0/7/121002-red-background-hd-1920x1200-for-android-40.jpg" dark class="fullheight" width="256" app>
        <v-list-item>
            <img width="50px" height="50px" src="../../assets/akb-white.png">
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
            <v-text class="font-weight-medium">{{jabatan}}</v-text>
            <v-toolbar-items>
                <v-btn text @click="logout"><v-icon>mdi-logout</v-icon></v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <div class="fullheight pa-5">
            <router-view></router-view>
        </div>
        <v-footer dark padless>
            <v-col
            class="text-center"
            cols="12"
            >
            {{ new Date().getFullYear() }} — <strong>AKB</strong>
            </v-col>
        </v-footer>
    </div>
</template>
<script>
export default {
    name: "Dashboard",
    data() {
        return {
            jabatan: localStorage.getItem('jabatan'),
            drawer: true,
            items: [
                { title: "Dashboard", to: "/dashboard" , icon: 'mdi-table'},
                { title: "Karyawan", to: "/karyawan" , icon: 'mdi-account-multiple'},
                { title: "Meja", to: "/meja" , icon: 'mdi-cube'},
                { title: "Menu", to: "/menu" , icon: 'mdi-food'},
                { title: "Bahan", to: "/bahan" , icon: 'mdi-food-variant'},
                { title: "Customer", to: "/customers" , icon: "mdi-emoticon-excited"},
            ],
        };
    },
    methods:
    {
        logout: function()
        {
            if(confirm("Anda yakin ingin logout dari sistem ?"))
            {
                localStorage.setItem('id', '');
                localStorage.setItem('token', '');
                localStorage.setItem('nama', '');
                localStorage.setItem('email', '');
                localStorage.setItem('jabatan', '');
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