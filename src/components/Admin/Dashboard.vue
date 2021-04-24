<template>
<v-main>
    <h1 class="text-h3 font-weight-medium mb-5 merah">Welcome, {{nama}}</h1>
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
    data() {
        return {
            nama: localStorage.getItem('nama'),
        };
    },
};
</script>