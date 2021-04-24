<!-- @format -->
  
<template>
<v-main class="list">
<h3 class="text-h3 font-weight-medium mb-5 merah"> Bahan </h3>
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
    <v-btn color="primary" dark @click="dialog = true">
        Tambah
    </v-btn>
        </v-card-title>
            <v-data-table :headers="headers" :items="bahans" :search="search">
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
                        @click="deleteHandler(item.id_bahan,item.nama_bahan)"
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
            <span class="headline">{{ formTitle }} Bahan</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-text-field
                    v-model="form.nama_bahan"
                    label="Nama Bahan"
                    required
                    :rules="bahanRules"
                    prepend-icon="mdi-food-variant"
                ></v-text-field>
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
            <span class="headline">Hapus Bahan</span>
        </v-card-title>
        <v-card-text>
            Anda yakin ingin menghapus Bahan {{ namaBahan }} ?
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
            color: '',
            search: null,
            valid:false,
            dialog: false,
            dialogConfirm: false,
            headers: [
                { text: "ID Bahan",
                align: "start",
                sortable: true,
                value: "id_bahan" },
                { text: "Nama Bahan", value: "nama_bahan" },
                { text: "Actions", value: "actions" },
            ],
            bahan: new FormData,
            bahans: [],
            form: {
                nama_bahan: null
            },
            bahanRules: [
                (v) => !!v || 'Nama Bahan tidak boleh kosong ',
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
        //read data bahan
        readData() {
            var url = this.$api + '/bahan'
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.bahans = response.data.data
            })
        },
        //simpan data bahan
        save() {
            this.bahan.append('nama_bahan', this.form.nama_bahan);

            var url = this.$api + '/bahan/'
            this.load = true
            this.$http.post(url, this.bahan, {
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
                this.error_message="Nama Bahan sudah ada";
                this.color="red"
                this.snackbar=true;
                this.load = false;
            })
        },
        //ubah data bahan
        update() {
            let newData = {
                nama_bahan: this.form.nama_bahan
            }
            var url = this.$api + '/bahan/' + this.editId;
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
                this.error_message="Nama Bahan sudah ada";
                this.color="red"
                this.snackbar=true;
                this.load = false;
            }) 
        },
        //hapus data bahan
        deleteData() {
            //menghapus data
            var url = this.$api + '/bahan/' + this.deleteId;
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
            this.editId = item.id_bahan;
            this.form.nama_bahan = item.nama_bahan;
            this.dialog = true;
        },
        deleteHandler(id_bahan,nama_bahan){
            this.deleteId = id_bahan;
            this.namaBahan = nama_bahan;
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
                nama_bahan: null,
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