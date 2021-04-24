<!-- @format -->
  

<template>
   <v-app id="inspire">
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                      <v-form ref="form" v-model="valid" >
                     <v-toolbar dark color="error">
                        <v-toolbar-title class="text-center">Login</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                           <v-text-field
                              prepend-icon='mdi-email'
                              name="E-Mail"
                              label="E-Mail"
                              type="text"
                              v-model="email" :rules="emailRules"
                              required
                           ></v-text-field>
                           <v-text-field
                              prepend-icon='mdi-lock'
                              name="password"
                              label="Password"
                              v-model="password" type="password"
                              :rules="passwordRules" counter required
                           ></v-text-field>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn 
                            @click="submit" 
                            :class=" { 'red darken-5 white--text' : valid, disabled: !valid }"
                        >
                            Login
                        </v-btn>
                        <v-spacer></v-spacer>
                     </v-card-actions>
                     </v-form>
                  </v-card>
                <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
                        {{error_message}}
                </v-snackbar>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>


<style>
    @import url("https://fonts.googleapis.com/css?family=Jolly%20Lodger");
    .grey--text {
        font-family: "Jolly Lodger";
    }
    .posisinya {
        position: absolute;
        top: -50px;
        left: 2px;
        right: 0px;
    }
    .primaryColor{
        color: #651515;
    }
</style>

<script>
export default {
    name: "Login",
    data() {
        return {
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            valid: false,
            password: '',
            passwordRules: [
                (v) => !!v || 'Password tidak boleh kosong',
            ],
            email: '',
            emailRules: [
                (v) => !!v || 'E-mail tidak boleh kosong ',
                (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Format E-Mail harus sesuai',
            ],
        };
    },
    methods: {
        submit() {
        if (this.$refs.form.validate()) { //cek apakah data yang akan dikirim sudah valid
            this.load = true;
            this.$http.post(this.$api + '/login', {
                email: this.email,
                password: this.password,
            }).then(response => {
                //menyimpan auth token
                if(response.data.user.kodeaktif_karyawan == "Tidak Aktif"){
                    this.error_message="User is Already Deactivated, You Can Not Log In";
                    this.color="red"
                    this.snackbar=true;
                    localStorage.removeItem('token')
                    this.load = false;
                }
                else{
                    localStorage.setItem('id', response.data.user.id); //menyimpan id user yang sedang login
                    localStorage.setItem('token', response.data.access_token);
                    localStorage.setItem('email', response.data.user.email);
                    localStorage.setItem('nama', response.data.user.nama_karyawan);
                    localStorage.setItem('jabatan', response.data.user.nama_jabatan);
                    this.error_message=response.data.message; 
                    this.color="green"
                    this.snackbar=true;
                    this.load = false;
                    this.clear();
                    if(response.data.user.nama_jabatan === "Operational Manager"){
                        this.$router.push({ name: 'Dashboard OM' });
                    }
                    else if(response.data.user.nama_jabatan === "Owner"){
                        this.$router.push({ name: 'Dashboard Owner' });
                    }
                    else if(response.data.user.nama_jabatan === "Chef"){
                        this.$router.push({ name: 'Dashboard Chef' });
                    }
                    else if(response.data.user.nama_jabatan === "Waiter"){
                        this.$router.push({ name: 'Dashboard Waiter' });
                    }
                    else if(response.data.user.nama_jabatan === "Cashier"){
                        this.$router.push({ name: 'Dashboard Cashier' });
                    }
                }
            }).catch(error => {
                this.error_message=error.response.data.message;
                this.color="red"
                this.snackbar=true;
                localStorage.removeItem('token')
                this.load = false;
            })
        }
        },
        clear() {
            this.$refs.form.reset() //Clear form login
        }
    },
};
</script>