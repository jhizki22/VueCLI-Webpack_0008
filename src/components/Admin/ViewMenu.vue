<!-- @format -->
  
<template>
<v-main>

<v-data-iterator
    :items="menus"
    item-key="nama_menu"
    hide-default-footer
>
    <template v-slot:default="{ items}">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.nama_menu"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card 
                class="mx-auto"
                max-width="344"
            >
            <img :src="'http://127.0.0.1:8000/' + item.path" width="250" height="200" />
                
                <v-card-title class="justify-center">
                    {{item.nama_menu}}
                </v-card-title>


                <v-card-text>
                    <div class="text--primary">
                        Rp.{{item.harga_menu}}
                    </div>
                </v-card-text>

                <v-card-actions>
                    <v-btn
                        color="red lighten-2"
                        text
                        @click="showHandler(item)"
                    >
                        Details
                    </v-btn>
                    <v-spacer></v-spacer>

                    <v-btn
                        icon
                        @click="show = !show"
                    >
                        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                    <div v-show="show">
                        <v-divider></v-divider>

                        <v-card-text>
                        {{item.deskripsi_menu}}
                        </v-card-text>
                    </div>
                    </v-expand-transition>
              </v-card>
          </v-col>
        </v-row>
      </template>
</v-data-iterator>

<v-dialog v-model="dialog" persistent max-width="350px">
    <v-card>
        <br>
        <img :src="'http://127.0.0.1:8000/' + path" width="300" height="200" />

        <v-card-title class="justify-center">
            {{nama_menu}}
        </v-card-title>
        <v-card-text>
            <strong>
            Kategori : {{nama_kategori}} <br>
            Bahan : {{nama_bahan}} <br>
            Harga : {{harga_menu}} <br>
            Unit : {{unit_menu}} <br>
            Deskripsi Menu : {{deskripsi_menu}}
            </strong>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark @click="dialog= false">
                Close
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>

<v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
    {{error_message}}
</v-snackbar>

</v-main>
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
    name: "List",
    data() {
        return {
            dialogWarning:false,
            menus: [],
            show: false,
            dialog: false,
        };
    },
    methods: {
        readData() {
            var url = this.$api + '/menu'
            this.$http.get(url).then(response => {
                this.menus = response.data.data
            })
        },
        close() {
            this.dialogWarning = false;
        },
        showHandler(item){
            this.path = item.path;
            this.nama_kategori = item.nama_kategori;
            this.nama_bahan = item.nama_bahan;
            this.deskripsi_menu = item.deskripsi_menu;
            this.nama_menu = item.nama_menu;
            this.unit_menu = item.unit_menu;
            this.harga_menu = item.harga_menu;
            this.dialog = true;
        },
    },
    computed: {
        formTitle() {
            return this.inputType 
        },
    },
    mounted() {
        this.readData();
    },
};
</script>