<!-- @format -->
  
<template>
<v-main>

<v-data-iterator
      :items="mejas"
      item-key="nomor_meja"
      hide-default-footer
      sort-by="nomor_meja"
    >
    <template v-slot:default="{ items}" >
        <v-row>
            <v-col
                v-for="item in items"
                :key="item.nomor_meja"
                cols="12"
                sm="6"
                md="4"
                lg="3"
            >
        
        <v-card  
            width="100%" 
            dark
            style="text-align: center; margin:2%;"
            :style="{backgroundColor: randomColor(item.nomor_meja,item.status_meja)}">

                <v-card-text>
                    <div class="display-1 text--primary">
                        {{item.nomor_meja}}
                    </div>
                </v-card-text>
        </v-card>
          </v-col>
        </v-row>
        <v-alert
            dense
            type="success"
        >
        Tersedia
        </v-alert>
        <v-alert
            dense
            type="error"
        >
        Tidak Tersedia
        </v-alert>
      </template>
    </v-data-iterator>


</v-main>
</template>
<script>
export default {
    name: "List",
    data() {
        return {
            inputType: 'Tambah',
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            search: null,
            colorCache: {},
            headers: [
                { text: "Nomor meja",
                align: "start",
                sortable: true,
                value: "nomor_meja" },
                { text: "Status Meja", value: "status_meja" },
                { text: "Actions", value: "actions" },
            ],
            meja: new FormData,
            mejas: [],
        };
    },
    methods: {
        //read data meja
        readData() {
            var url = this.$api + '/meja'
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.mejas = response.data.data
            })
        },
        randomColor(nomor_meja,status_meja) {
            const r = () => 249;
            const g = () => 84;
            const a = () => 76;
            const b = () => 176;
            const c = () => 80;
            if(status_meja === "Tersedia"){
                return this.colorCache[nomor_meja] || (this.colorCache[nomor_meja] = `rgb(${a()}, ${b()}, ${c()})`);
                //return (this.colorCache[nomor_meja] = `rgb(0,255,0)`);
            }
            else{
                return this.colorCache[nomor_meja] || (this.colorCache[nomor_meja] = `rgb(${r()}, ${g()}, ${g()})`);
                //return (this.colorCache[nomor_meja] = `rgb(255,0,0)`);
            }
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