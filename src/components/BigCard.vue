<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    data: Object,
});
</script>

<template>
    <div class="col-md-6 mt-5" v-for="product in props.data" :key="product">
        <form action="">
            <input type="hidden" />
            <input type="hidden" />
            <div class="card border-danger" style="min-height: 400px">
                <div class="label">
                    <h3>#{{ index + 1 }}</h3>
                </div>
                <img width="" src="/src/assets/logo.svg" class="img-fluid card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title text-left">{{ product.title }}</h5>
                    <div class="text-center">
                        <!-- When button is clicked, open modal and set the selected product data -->
                        <button type="button" class="btn w-100 btn-light" data-bs-toggle="modal"
                            data-bs-target="#productModal" @click="modalClick(product)">
                            Visi dan Misi
                        </button>
                        <button class="btn w-100 btn-main btn-vote">Pilih</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>