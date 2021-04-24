<!-- @format -->
  
<template>
<v-main class="list">
<h3 class="text-h3 font-weight-medium mb-5 merah"> Meja </h3>
<br>
<v-card>
    <v-card-title>
    <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-btn color="success" dark @click="daftarmeja">
        Daftar Meja
    </v-btn>
      <v-spacer></v-spacer>
    <v-btn color="primary" dark @click="dialog = true">
        Tambah
    </v-btn>
        </v-card-title>
            <v-data-table :headers="headers" :items="mejas" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn
                        small
                        class="ma-2"
                        color="green"
                        dark
                        @click="editHandler(item)"
                    >
                        Edit
                        <v-icon
                        dark
                        right
                        >
                        mdi-pencil
                        </v-icon>
                    </v-btn>
                    <v-btn
                        small
                        class="ma-2"
                        color="red"
                        dark
                        @click="deleteHandler(item.nomor_meja)"
                    >
                        Delete
                        <v-icon
                        dark
                        right
                        >
                        mdi-close
                        </v-icon>
                    </v-btn>
                </template> 
            </v-data-table>
        </v-card>

<v-dialog v-model="dialog" persistent max-width="600px">
    <v-form ref="form" v-model="valid" >
    <v-card>
        <v-card-title>
            <span class="headline">{{ formTitle }} Meja</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-text-field
                    v-model="form.nomor_meja"
                    label="Nomor Meja"
                    prepend-icon="mdi-numeric"
                    required
                    :rules="nomorRules"
                ></v-text-field>

                <v-select
                  :items="['Tersedia','Tidak Tersedia']"
                  label="Status Meja"
                  prepend-icon="mdi-ballot-outline"
                  required
                  :rules="statusRules"
                  v-model="form.status_meja"
                ></v-select>

            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark @click="cancel">
                Cancel
            </v-btn>
            <v-btn 
                @click="setForm"
                :class=" { 'blue darken-5 white--text' : valid, disabled: !valid }"
            >
                Save
            </v-btn>
        </v-card-actions>
    </v-card>
    </v-form>
</v-dialog>

<v-dialog v-model="dialogConfirm" persistent max-width="500px">
    <v-card>
        <v-card-title>
            <span class="headline">Hapus Meja</span>
        </v-card-title>
        <v-card-text>
            Anda yakin ingin menghapus Meja Nomor {{ deleteId }}?
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark @click="dialogConfirm = false">
                Cancel
            </v-btn>
            <v-btn color="red darken-1" dark @click="deleteData"> 
                Delete
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
        color: #a40302;
    }
    .merah--text {
        color: #a40302;
        font-weight: 400;
    }
</style>

<script>
export default {
    name: "List",
    data() {
        return {
            inputType: 'Tambah',
            load: false,
            snackbar: false,
            error_message: '',
            valid: false,
            color: '',
            search: null,
            dialog: false,
            dialogConfirm: false,
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
            form: {
                nomor_meja: null,
                status_meja: null
            },
            statusRules: [
                (v) => !!v || 'Status Meja tidak boleh kosong ',
            ],
            nomorRules: [
                (v) => !!v || 'Nomor Meja tidak boleh kosong ',
                (v) => !v || /[0-9]$/.test(v) || 'Nomor Meja harus berupa angka',
            ],
            deleteId: '',
            editId: '',
        };
    },
    methods: {
        setForm() {
            if (this.$refs.form.validate()) {
                if (this.inputType === 'Tambah') {
                    this.save()
                } else {
                    this.update()
                }
            }
        },
        daftarmeja: function()
        {
            this.$router.push({
                name: 'View Meja'
            })
        },
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
        //simpan data meja
        save() {
            this.meja.append('nomor_meja', this.form.nomor_meja);
            this.meja.append('status_meja', this.form.status_meja);

            var url = this.$api + '/meja/'
            this.load = true
            this.$http.post(url, this.meja, {
                headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message=response.data.message;
                this.color="green"
                this.snackbar=true;
                this.load = false;
                this.close();
                this.readData(); //mengambil data
                this.resetForm();
            }).catch(error => {
                this.error_message=error.response.data.message;
                this.error_message="Nomor Meja Ini Sudah Ada";
                this.color="red"
                this.snackbar=true;
                this.load = false;
            })
        },
        //ubah data meja
        update() {
            let newData = {
                nomor_meja: this.form.nomor_meja,
                status_meja: this.form.status_meja
            }
            var url = this.$api + '/meja/' + this.editId;
            this.load = true
            this.$http.put(url, newData, {
                headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message=response.data.message;
                this.color="green"
                this.snackbar=true;
                this.load = false;
                this.close();
                this.readData(); //mengambil data
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message=error.response.data.message;
                this.error_message="Nomor Meja Ini Sudah Ada";
                this.color="red"
                this.snackbar=true;
                this.load = false;
            }) 
        },
        //hapus data meja
        deleteData() {
            //menghapus data
            var url = this.$api + '/meja/' + this.deleteId;
            //data dihapus berdasarkan id
            this.$http.delete(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.error_message=response.data.message;
                this.color="green"
                this.snackbar=true;
                this.load = false;
                this.close();
                this.readData(); //mengambil data
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message=error.response.data.message;
                this.color="red"
                this.snackbar=true;
                this.load = false;
            })
        },
        editHandler(item){
            this.inputType = 'Ubah';
            this.editId = item.nomor_meja;
            this.form.nomor_meja = item.nomor_meja;
            this.form.status_meja = item.status_meja;
            this.dialog = true;
        },
        deleteHandler(nomor_meja){
            this.deleteId = nomor_meja;
            this.dialogConfirm = true;
        },
        close() {
            this.dialog = false;
            this.dialogConfirm = false;
            this.inputType = 'Tambah';
        },
        cancel() {
            this.resetForm();
            this.readData();
            this.dialog = false;
            this.inputType = 'Tambah';
        },
        resetForm() {
            this.form = {
                nomor_meja: null,
                status_meja: null,
            };
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