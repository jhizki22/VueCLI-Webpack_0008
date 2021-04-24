<!-- @format -->
  
<template>
<v-main class="list">
<h3 class="text-h3 font-weight-medium mb-5 merah"> Customer </h3>
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
            <v-data-table :headers="headers" :items="customers" :search="search">
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
                        @click="deleteHandler(item.id_customer,item.nama_customer)"
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
            <span class="headline">{{ formTitle }} Customer</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-text-field
                    v-model="form.nama_customer"
                    label="Nama Customer"
                    required
                    :rules="namaRules"
                    prepend-icon="mdi-account-circle"
                ></v-text-field>

                <v-text-field
                    v-model="form.email_customer"
                    label="Email Customer"
                    required
                    :rules="emailRules"
                    prepend-icon="mdi-email"
                ></v-text-field>

                <v-text-field
                    v-model="form.telepon_customer"
                    label="Telepon Customer"
                    required
                    :rules="teleponRules"
                    prepend-icon="mdi-cellphone"
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
            <span class="headline">Hapus Customer</span>
        </v-card-title>
        <v-card-text>
            Anda yakin ingin menghapus Customer dengan nama {{ namaCustomer }} ?
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
                { text: "ID Customer",
                align: "start",
                sortable: true,
                value: "id_customer" },
                { text: "Nama Customer", value: "nama_customer" },
                { text: "Email Customer", value: "email_customer" },
                { text: "Telepon Customer", value: "telepon_customer" },
                { text: "Actions", value: "actions" },
            ],
            customer: new FormData,
            customers: [],
            form: {
                nama_customer: null,
                email_customer: null,
                telepon_customer: null
            },
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
        //read data customer
        readData() {
            var url = this.$api + '/customer'
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.customers = response.data.data
            })
        },
        //simpan data customer
        save() {
            this.customer.append('nama_customer', this.form.nama_customer);
            this.customer.append('email_customer', this.form.email_customer);
            this.customer.append('telepon_customer', this.form.telepon_customer);

            var url = this.$api + '/customer/'
            this.load = true
            this.$http.post(url, this.customer, {
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
                this.error_message="E-Mail ini sudah terdaftar dalam sistem, silahkan gunakan E-Mail lain";
                this.color="red"
                this.snackbar=true;
                this.load = false;
            })
        },
        //ubah data customer
        update() {
            let newData = {
                nama_customer: this.form.nama_customer,
                email_customer: this.form.email_customer,
                telepon_customer: this.form.telepon_customer
            }
            var url = this.$api + '/customer/' + this.editId;
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
                this.error_message="E-Mail ini sudah terdaftar dalam sistem, silahkan gunakan E-Mail lain";
                this.color="red"
                this.snackbar=true;
                this.load = false;
            }) 
        },
        //hapus data customer
        deleteData() {
            //menghapus data
            var url = this.$api + '/customer/' + this.deleteId;
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
            this.editId = item.id_customer;
            this.form.nama_customer = item.nama_customer;
            this.form.email_customer = item.email_customer
            this.form.telepon_customer = item.telepon_customer
            this.dialog = true;
        },
        deleteHandler(id_customer,nama_customer){
            this.deleteId = id_customer;
            this.namaCustomer = nama_customer;
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
                nama_customer: null,
                email_customer: null,
                telepon_customer: null
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