<!-- @format -->
<template>
    <div class="dashboard">
        <v-app-bar app fixed height="50px" class="red lighten-5">
            <img width="100px" height="100px" src="../../assets/LogoValvolineSide.png">
            <VSpacer />
            <v-toolbar-items>
                <v-btn text color="merah--text" @click="home">Home</v-btn>
                <v-btn text color="merah--text" @click="productCardAfter">Product</v-btn>
                <v-btn text color="merah--text" @click="about">About Us</v-btn>

                <v-menu
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        color="#651515"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        >
                            {{ name }}
                            <v-icon color="white">
                                mdi-chevron-down
                            </v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item-title class="title" @click="profile" dark> 
                            <v-icon>
                                mdi-face
                            </v-icon>
                            Profile
                        </v-list-item-title>
                        
                        <v-divider></v-divider>
                        
                        <v-list-item-title class="title" @click="customerFavourite">
                            <v-icon>
                                mdi-heart
                            </v-icon>
                            Favourite
                        </v-list-item-title>
                        
                        <v-divider></v-divider>
                        
                        <v-list-item-title class="title" @click="customerCart">
                            <v-icon>
                                mdi-cart
                            </v-icon>
                            Cart
                        </v-list-item-title>
                        
                        <v-divider></v-divider>
                        
                        <v-list-item-title class="title" @click="logout">
                            <v-icon>
                                mdi-logout
                            </v-icon>
                            Logout
                        </v-list-item-title>
                        <v-divider></v-divider>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-app-bar>
        <div class="fullheight pa-5 red lighten-5">
            <router-view></router-view>
        </div>
        
        <v-footer
            dark
            padless
        >
            <v-card
            class="flex"
            flat
            tile
            >
            <v-card-text class="red darken-4">
                <v-text class="white--text">Get connected with us on social networks!</v-text>

                <v-spacer></v-spacer>

                <v-btn
                    v-for="icon in icons"
                    :key="icon"
                    class="mx-4"
                    dark
                    icon
                >
                <v-icon size="24px">
                    {{ icon }}
                </v-icon>
                </v-btn>
            </v-card-text>

            <v-card-text class="py-2 white--text text-center">
                {{ new Date().getFullYear() }} — <strong>Valvoline</strong>
            </v-card-text>
            </v-card>
        </v-footer>

    </div>
</template>

<style>
    .merah{
        color: #651515;
    }
    .merah--text {
        color: #651515;
        font-weight: 400;
    }
</style>

<script>
export default {
    name: "Dashboard",
    data() {
        return {
            user: null,
            name: localStorage.getItem('username')
        };
    },
    methods:
    {
        readData() {
            var url = this.$api + '/user/' + localStorage.getItem('id')
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.user = response.data.data
            })
        },
        home: function()
        {
            this.$router.push({
                name: 'home'
            })
        },
        productCardAfter: function()
        {
            this.$router.push({
                name: 'productCardAfter'
            })
        },
        about: function()
        {
            this.$router.push({
                name: 'aboutUsAfter'
            })
        },
        customerCart: function()
        {
            this.$router.push({
                name: 'customerCart'
            })
        },
        profile: function()
        {
            this.$router.push({
                name: 'Profile'
            })
        },
        customerFavourite: function()
        {
            this.$router.push({
                name: 'customerFavourite'
            })
        },
        logout: function()
        {
            if(confirm("Logout ?"))
            {
                localStorage.setItem('id', '');
                localStorage.setItem('token', '');
                    this.$router.push({
                        name: 'index'
                })
            }
        },
    },
    mounted() {
      this.readData();
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