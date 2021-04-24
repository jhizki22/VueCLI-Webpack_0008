<!-- @format -->
  
<template>
<v-main class="list">
<h3 class="text-h3 font-weight-medium mb-5 merah"> Menu </h3>
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
    <v-btn color="success" dark @click="daftarmenu">
        Daftar Menu
    </v-btn>
      <v-spacer></v-spacer>
    <v-btn color="primary" dark @click="dialog = true">
        Tambah
    </v-btn>
        </v-card-title>
            <v-data-table :headers="headers" :items="menus" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn
                        small
                        class="ma-2"
                        dark
                        @click="uploadHandler(item)"
                    >
                        Add Photo
                        <v-icon
                        dark
                        right
                        >
                        mdi-camera
                        </v-icon>
                    </v-btn>
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
                        @click="deleteHandler(item.id_menu,item.nama_menu)"
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
            <span class="headline">{{ formTitle }} Menu</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-select
                  label="Kategori"
                  :items="kategoris"
                  item-text="nama_kategori"
                  item-value="nama_kategori"  
                  required
                  :rules="kategoriRules"
                  prepend-icon="mdi-label"
                  v-model="form.nama_kategori"
                ></v-select>

                <v-select
                  :items="bahans"
                  label="Bahan"
                  item-text="nama_bahan"
                  item-value="nama_bahan"
                  required
                  :rules="bahanRules"
                  prepend-icon="mdi-food-variant"
                  v-model="form.nama_bahan"
                ></v-select>

                <v-text-field
                    v-model="form.nama_menu"
                    label="Nama Menu"
                    required
                    :rules="menuRules"
                    prepend-icon="mdi-food"
                ></v-text-field>

                <v-textarea
                    v-model="form.deskripsi_menu"
                    label="Deskripsi Menu"
                    required
                    :rules="deskripsiRules"
                    prepend-icon="mdi-ballot"
                ></v-textarea>

                <v-text-field
                    v-model="form.unit_menu"
                    label="Unit Menu"
                    required
                    :rules="unitRules"
                    prepend-icon="mdi-bowl"
                ></v-text-field>

                <v-text-field
                    v-model="form.harga_menu"
                    label="Harga Menu"
                    required
                    :rules="hargaRules"
                    prepend-icon="mdi-cash"
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
            <span class="headline">Hapus menu</span>
        </v-card-title>
        <v-card-text>
            Anda yakin ingin menghapus menu dengan nama {{ namaMenu }} ?
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark @click="cancel">
                Cancel
            </v-btn>
            <v-btn color="red darken-1" dark @click="deleteData"> 
                Delete
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>

<v-dialog v-model="dialogUpload" persistent max-width="600px">
    <v-card>
        <v-card-title>
            <span class="headline">Upload Photo Menu {{namaMenu}} !</span>
        </v-card-title>
        <img :src="'http://127.0.0.1:8000/' + imagePath" width="300" height="200" />
        <v-spacer></v-spacer>
        <input type="file" accept="image" @change="imageChanged">
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark @click="cancel">
                Cancel
            </v-btn>
            <v-btn color="blue darken-1" dark @click="uploadPhoto">
                Upload Photo
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
            valid: false,
            dialog: false,
            dialogConfirm: false,
            dialogUpload: false,
            headers: [
                { text: "ID Menu",
                align: "start",
                sortable: true,
                value: "id_menu" },
                { text: "Kategori", value: "nama_kategori" },
                { text: "Bahan", value: "nama_bahan" },
                { text: "Menu", value: "nama_menu" },
                { text: "Deskripsi", value: "deskripsi_menu" },
                { text: "Unit", value: "unit_menu" },
                { text: "Harga", value: "harga_menu" },
                { text: "Actions", value: "actions" },
            ],
            menu: new FormData,
            menus: [],
            bahans: [],
            kategoris: [],
            form: {
                nama_kategori: null,
                nama_bahan: null,
                nama_menu: null,
                deskripsi_menu: null,
                unit_menu: null,
                harga_menu: null
            },
            kategoriRules: [
                (v) => !!v || 'Kategori tidak boleh kosong',
            ],
            bahanRules: [
                (v) => !!v || 'Bahan tidak boleh kosong ',
            ],
            menuRules: [
                (v) => !!v || 'Nama Menu tidak boleh kosong ',
            ],
            deskripsiRules: [
                (v) => !!v || 'Deskripsi Menu tidak boleh kosong ',
            ],
            unitRules: [
                (v) => !!v || 'Unit Menu tidak boleh kosong ',
            ],
            hargaRules: [
                (v) => !!v || 'Harga Menu tidak boleh kosong ',
                (v) => !v || /[0-9]$/.test(v) || 'Harga Menu harus berupa angka',
            ],
            deleteId: '',
            editId: '',
            uploadId:'',
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
        daftarmenu: function()
        {
            this.$router.push({
                name: 'View Menu'
            })
        },
        //read data menu
        readData() {
            var url = this.$api + '/menu'
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.menus = response.data.data
            })
        },
        readDataBahan() {
            var url = this.$api + '/bahan'
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.bahans = response.data.data
            })
        },
        readDataKategori() {
            var url = this.$api + '/kategori'
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.kategoris = response.data.data
            })
        },
        //simpan data menu
        save() {
            this.menu.append('nama_kategori', this.form.nama_kategori);
            this.menu.append('nama_bahan', this.form.nama_bahan);
            this.menu.append('deskripsi_menu', this.form.deskripsi_menu);
            this.menu.append('nama_menu', this.form.nama_menu);
            this.menu.append('unit_menu', this.form.unit_menu);
            this.menu.append('harga_menu', this.form.harga_menu);

            var url = this.$api + '/menu/'
            this.load = true
            this.$http.post(url, this.menu, {
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
                this.color="red"
                this.snackbar=true;
                this.load = false;
            })
        },
        //ubah data menu
        update() {
            let newData = {
                nama_kategori: this.form.nama_kategori,
                nama_bahan: this.form.nama_bahan,
                deskripsi_menu: this.form.deskripsi_menu,
                nama_menu: this.form.nama_menu,
                unit_menu: this.form.unit_menu,
                harga_menu: this.form.harga_menu
            }
            
            var url = this.$api + '/menu/' + this.editId;
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
                this.color="red"
                this.snackbar=true;
                this.load = false;
            }) 
        },
        //hapus data menu
        deleteData() {
            //menghapus data
            var url = this.$api + '/menu/' + this.deleteId;
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
            this.editId = item.id_menu;
            this.form.nama_kategori = item.nama_kategori;
            this.form.nama_bahan = item.nama_bahan;
            this.form.deskripsi_menu = item.deskripsi_menu;
            this.form.nama_menu = item.nama_menu;
            this.form.unit_menu = item.unit_menu;
            this.form.harga_menu = item.harga_menu;
            this.dialog = true;
        },
        deleteHandler(id_menu,nama_menu){
            this.deleteId = id_menu;
            this.namaMenu = nama_menu;
            this.dialogConfirm = true;
        },
        uploadHandler(item){
            this.uploadId = item.id_menu;
            this.namaMenu = item.nama_menu;
            this.imagePath = item.path;
            this.dialogUpload = true;
        },
        close() {
            this.dialog = false;
            this.dialogConfirm = false;
            this.dialogUpload = false;
            this.inputType = 'Tambah';
        },
        cancel() {
            this.resetForm();
            this.readData();
            this.dialog = false;
            this.dialogConfirm = false;
            this.dialogUpload = false;
            this.inputType = 'Tambah';
        },
        resetForm() {
            this.form = {
                nama_kategori: null,
                nama_bahan: null,
                nama_menu: null,
                deskripsi_menu: null,
                unit_menu: null,
                harga_menu: null
            };
        },
        imageChanged(e){
                console.log(e.target.files[0])

                var fileReader = new FileReader()

                fileReader.readAsDataURL(e.target.files[0])

                fileReader.onload = (e) => {
                    this.path = e.target.result
                };
        },
        uploadPhoto() {
            let pathData = {
                path : this.path
            }
            var url = this.$api + '/menu/img/' + this.uploadId + '/' + this.namaMenu;
            this.load = true
            this.$http.put(url, pathData, {
                headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message=response.data.message;
                localStorage.setItem('path', response.data.path);
                this.color="green"
                this.snackbar=true;
                this.readData();
                this.load = true;
                this.close();
            }).catch(error => {
                this.error_message=error.response.data.message;
                this.color="red"
                this.snackbar=true;
                this.load = false;
            }) 
        },
    },
    computed: {
        formTitle() {
            return this.inputType 
        },
    },
    mounted() {
        this.readData();
        this.readDataBahan();
        this.readDataKategori();
    },
};
</script>