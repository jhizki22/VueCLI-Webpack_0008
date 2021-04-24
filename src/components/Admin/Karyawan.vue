<!-- @format -->
  
<template>
<v-main class="list">
<h3 class="text-h3 font-weight-medium mb-5 merah"> Karyawan </h3>
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
        Daftar Karyawan Baru
    </v-btn>
        </v-card-title>
            <v-data-table :headers="headers" :items="users" :search="search">
                <template v-slot:[`item.kodeaktif_karyawan`]="{ item }">
                    <div v-if="item.kodeaktif_karyawan==='Aktif'">
                        <v-chip
                        class="ma-2"
                        color="green"
                        text-color="white"
                        >
                            {{item.kodeaktif_karyawan}}
                        </v-chip>
                    </div>
                    <div v-else>
                        <v-chip
                            class="ma-2"
                            color="red"
                            text-color="white"
                        >
                            {{item.kodeaktif_karyawan}}
                        </v-chip>
                    </div>
                </template> 
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn
                        small
                        class="ma-2"
                        color="green"
                        dark
                        @click="editHandler(item)"
                    >
                        <v-icon
                        dark
                        >
                        mdi-pencil
                        </v-icon>
                    </v-btn>
                    <v-btn
                        small
                        class="ma-2"
                        color="red"
                        dark
                        @click="deleteHandler(item.id,item.nama_karyawan)"
                    >
                        <v-icon
                        dark
                        >
                        mdi-cancel
                        </v-icon>
                    </v-btn>
                </template> 
            </v-data-table>
        </v-card>

<v-dialog v-model="dialog" persistent max-width="600px">
    <v-form v-model="valid" ref="form">
    <v-card>
        <v-card-title>
            <span class="headline">Register Employee</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-select
                  label="Jabatan"
                  :items="jabatans"
                  item-text="nama_jabatan"
                  item-value="nama_jabatan"  
                  required
                  prepend-icon="mdi-credit-card"
                  v-model="form.nama_jabatan"
                  :rules="jabatanRules"
                ></v-select>

                <v-text-field
                    v-model="form.nama_karyawan"
                    label="Nama Lengkap"
                    prepend-icon="mdi-account-circle"
                    required
                    :rules="namaRules"
                ></v-text-field>

                <v-select
                  :items="['Laki-Laki', 'Perempuan']"
                  label="Jenis Kelamin"
                  required
                  :rules="genderRules"
                  prepend-icon="mdi-gender-male-female"
                  v-model="form.jeniskelamin_karyawan"
                ></v-select>

                <v-text-field
                    v-model="form.telepon_karyawan"
                    label="Nomor Telepon"
                    required
                    prepend-icon="mdi-phone"
                    :rules="teleponRules"
                ></v-text-field>

                <v-text-field
                    v-model="form.email"
                    label="E-Mail"
                    required
                    prepend-icon="mdi-email"
                    :rules="emailRules"
                ></v-text-field>
                
                <v-menu
                    v-model="menu2"
                    :close-on-content-click="true"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="form.tanggalbergabung_karyawan"
                            label="Tanggal Bergabung"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            required
                            :rules="tanggalRules"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="form.tanggalbergabung_karyawan"
                        @input="menu2 = false"
                    ></v-date-picker>
                </v-menu>

                <v-select
                  :items="['Aktif', 'Tidak Aktif']"
                  label="Status"
                  required
                  prepend-icon="mdi-check-decagram"
                  :rules="statusRules"
                  v-model="form.kodeaktif_karyawan"
                ></v-select>

                <v-text-field
                    v-model="form.password"
                    label="Password"
                    required
                    prepend-icon="mdi-lock"
                    :rules="passwordRules"
                ></v-text-field>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark @click="cancel">
                Cancel
            </v-btn>
            <v-btn 
                @click="save"
                :class=" { 'blue darken-5 white--text' : valid, disabled: !valid }"
            >
                Save
            </v-btn>
        </v-card-actions>
    </v-card>
    </v-form>
</v-dialog>

<v-dialog v-model="dialogEdit" persistent max-width="600px">
    <v-form v-model="valid" ref="form">
    <v-card>
        <v-card-title>
            <span class="headline"> Edit Data Karyawan {{namaKaryawan}}</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-select
                  label="Jabatan"
                  :items="jabatans"
                  item-text="nama_jabatan"
                  item-value="nama_jabatan"  
                  required
                  :rules="jabatanRules"
                  prepend-icon="mdi-credit-card"
                  v-model="form.nama_jabatan"
                ></v-select>

                <v-text-field
                    v-model="form.nama_karyawan"
                    label="Nama Lengkap"
                    required
                    :rules="namaRules"
                    prepend-icon="mdi-account-circle"
                ></v-text-field>

                <v-text-field
                    v-model="form.telepon_karyawan"
                    label="Nomor Telepon"
                    required
                    :rules="teleponRules"
                    prepend-icon="mdi-phone"
                ></v-text-field>

                <v-text-field
                    v-model="form.email"
                    label="E-Mail"
                    :rules="emailRules"
                    prepend-icon="mdi-email"
                    required
                ></v-text-field>

            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark @click="cancel">
                Cancel
            </v-btn>
            <v-btn 
                @click="update"
                :class=" { 'blue darken-5 white--text' : valid, disabled: !valid }"
            >
                Save
            </v-btn>
        </v-card-actions>
    </v-card>
    </v-form>
</v-dialog>

<v-dialog v-model="dialogConfirm" persistent max-width="600px">
    <v-card>
        <v-card-title>
            <span class="headline">Menonaktifkan Karyawan</span>
        </v-card-title>
        <v-card-text>
            Apakah anda yakin ingin menonaktifkan karyawan yang bernama <strong> {{namaKaryawan}} </strong>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark @click="dialogConfirm = false">
                Cancel
            </v-btn>
            <v-btn color="red darken-1" dark @click="deactivate"> 
                Deactivate
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
            valid: false,
            error_message: '',
            color: '',
            search: null,
            dialog: false,
            dialogConfirm: false,
            dialogUpload: false,
            dialogEdit:false,
            headers: [
                { text: "Nama",
                align: "start",
                sortable: true,
                value: "nama_karyawan" },
                { text: "Jabatan", value: "nama_jabatan" },
                { text: "Jenis Kelamin", value: "jeniskelamin_karyawan" },
                { text: "Nomor Telepon", value: "telepon_karyawan" },
                { text: "E-Mail", value: "email" },
                { text: "Tanggal Bergabung", value: "tanggalbergabung_karyawan" },
                { text: "Status", value: "kodeaktif_karyawan" },
                { text: "Actions", value: "actions" },
            ],
            user: new FormData,
            users: [],
            jabatans: [],
            form: {
                nama_karyawan: null,
                nama_jabatan: null,
                jeniskelamin_karyawan: null,
                telepon_karyawan: null,
                email: null,
                tanggalbergabung_karyawan: null,
                kodeaktif_karyawan: null,
                password: null,
            },
            passwordRules: [
                (v) => !!v || 'Password tidak boleh kosong',
            ],
            emailRules: [
                (v) => !!v || 'E-Mail tidak boleh kosong ',
                (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Format E-Mail harus sesuai',
            ],
            namaRules: [
                (v) => !!v || 'Nama Lengkap tidak boleh kosong ',
            ],
            teleponRules: [
                (v) => !!v || 'Nomor Telepon tidak boleh kosong ',
                (v) => !v || /^(\+62|62|0)8[1-9][0-9]{6,11}$/.test(v) || 'Format Nomor Telepon harus sesuai',
            ],
            statusRules: [
                (v) => !!v || 'Status tidak boleh kosong ',
            ],
            genderRules: [
                (v) => !!v || 'Jenis Kelamin tidak boleh kosong ',
            ],
            jabatanRules: [
                (v) => !!v || 'Jabatan tidak boleh kosong ',
            ],
            tanggalRules: [
                (v) => !!v || 'Tanggal Bergabung tidak boleh kosong ',
            ],
            deleteId: '',
            editId: '',
            uploadId:'',
            uploadNamaProduk:'',
        };
    },
    methods: {
        setForm() {
            if (this.inputType === 'Tambah') {
                this.save()
            } else {
                this.update()
            }
        },
        //read data product
        readData() {
            var url = this.$api + '/user'
            this.$http.get(url).then(response => {
                this.users = response.data.data
            })
        },
        readDataJabatan() {
            var url = this.$api + '/jabatan'
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.jabatans = response.data.data
            })
        },
        //simpan data karyawan
        save() {
            if (this.$refs.form.validate()) {
            this.user.append('nama_jabatan', this.form.nama_jabatan);
            this.user.append('nama_karyawan', this.form.nama_karyawan);
            this.user.append('jeniskelamin_karyawan', this.form.jeniskelamin_karyawan);
            this.user.append('telepon_karyawan', this.form.telepon_karyawan);
            this.user.append('email', this.form.email);
            this.user.append('tanggalbergabung_karyawan', this.form.tanggalbergabung_karyawan);
            this.user.append('kodeaktif_karyawan', this.form.kodeaktif_karyawan);
            this.user.append('password', this.form.password);
        
            var url = this.$api + '/register/'
            this.load = true
            this.$http.post(url, this.user, {
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
                this.error_message="Email Sudah Digunakan, Coba Gunakan Email Lain"
                this.color="red"
                this.snackbar=true;
                this.load = false;
            })
            }
        },
        //ubah data produk
        update() {
            if (this.$refs.form.validate()) {
            let newData = {
                nama_jabatan: this.form.nama_jabatan, 
                nama_karyawan: this.form.nama_karyawan, 
                telepon_karyawan: this.form.telepon_karyawan, 
                email: this.form.email
            }
            var url = this.$api + '/user/' + this.editId;
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
            }).catch(error => {
                this.error_message=error.response.data.message;
                this.error_message="Email Sudah Digunakan, Coba Gunakan Email Lain"
                this.color="red"
                this.snackbar=true;
                this.load = false;
            }) 
            }
        },
        //hapus data produk
        deactivate() {
            let newData = {
                kodeaktif_karyawan: 'Tidak Aktif'
            }
            var url = this.$api + '/deactivate/' + this.deleteId;
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
            }).catch(error => {
                this.error_message=error.response.data.message;
                this.color="red"
                this.snackbar=true;
                this.load = false;
                this.close();
            }) 
        },
        editHandler(item){
            this.inputType = 'Ubah';
            this.editId = item.id;
            this.namaKaryawan = item.nama_karyawan;
            this.form.nama_jabatan = item.nama_jabatan;
            this.form.nama_karyawan = item.nama_karyawan;
            this.form.telepon_karyawan = item.telepon_karyawan;
            this.form.email = item.email;
            this.dialogEdit = true;
        },
        deleteHandler(id,nama_karyawan){
            this.deleteId = id;
            this.dialogConfirm = true;
            this.namaKaryawan = nama_karyawan;
        },
        close() {
            this.dialog = false;
            this.dialogConfirm = false;
            this.dialogEdit = false;
            this.inputType = 'Tambah';
        },
        cancel() {
            this.resetForm();
            this.readData();
            this.dialog = false;
            this.dialogEdit = false;
        },
        resetForm() {
            this.form = {
                nama_karyawan: null,
                nama_jabatan: null,
                jeniskelamin_karyawan: null,
                telepon_karyawan: null,
                email: null,
                tanggalbergabung_karyawan: null,
                kodeaktif_karyawan: null,
                password: null,
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
        this.readDataJabatan();
    },
};
</script>