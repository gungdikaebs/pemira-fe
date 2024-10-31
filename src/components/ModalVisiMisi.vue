<script setup>
import { defineProps } from 'vue'

// Define props to accept the selected product data
const props = defineProps({
    product: Object, // This will hold the selected product details passed from VoteView.vue
})
</script>

<template>
    <!-- Modal HTML structure -->
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="productModalLabel">
                        Visi dan Misi {{ product?.title || '' }}
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" v-if="product">
                    <h4 class="text-center">Visi</h4>
                    <p>{{ product.description || 'No description available' }}</p>
                    <h4 class="text-center">Misi</h4>
                    <p>Masukkan misi di sini.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
