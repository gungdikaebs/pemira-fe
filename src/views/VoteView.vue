<script setup>
import { ref } from 'vue'
import { apiFetch } from '@/utils/apiFetch'
import ModalVisiMisi from '@/components/ModalVisiMisi.vue';
import BigCard from '@/components/BigCard.vue';
import SmallCard from '@/components/SmallCard.vue';
import { useAuthStore } from '@/stores/authStore';
const BaseUrl = import.meta.env.VITE_PUBLIC_BASEURL;


const authStore = useAuthStore()
console.log(authStore.user);

// State to hold the products and the currently selected product for the modal
const candidates = ref([])
const productModal = ref(null) // This will hold the selected product for the modal

// Fetch products on component mount
apiFetch.get(`${BaseUrl}/admin/v1/candidates`).then((res) => {
  candidates.value = res.products
  console.log(candidates.value);
})

// Function to load selected product details into the modal
const modalClick = (product) => {
  apiFetch.get(`https://dummyjson.com/products/${product.id}`).then((res) => {
    productModal.value = res // Set the clicked product details to productModal
  })
}
</script>

<template>
  <nav class="bg-light py-3" id="vote">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <a class="navbar-brand mx-3">
            <img src="" alt="Bootstrap" width="60" height="60" />
            <img src="" alt="Bootstrap" width="60" height="60" />
            <img src="" alt="Bootstrap" width="60" height="60" />
          </a>
        </div>
      </div>
    </div>
  </nav>

  <section id="calon" style="margin-bottom: 200px">
    <div class="container py-5">
      <div class="row" id="bem">
        <div class="col-12 py-3">
          <h3 class="heading-2 main-color text-center">CAPRESMA & CAWAPRESMA BEM PM</h3>
        </div>
        <!-- Loop over the products -->
        <BigCard></BigCard>
        <ModalVisiMisi :product="productModal" />
      </div>
      <div class="row py-5" id="balma">
        <div class="col-12 py-3">
          <h3 class="heading-2 main-color text-center">CALON LEGISLATIF DPM PM</h3>
        </div>
        <SmallCard></SmallCard>
      </div>
    </div>
  </section>

  <div class="card fixed-bottom shadow">
    <div class="card-body text-center">
      <p>Tekan tombol di bawah ini jika sudah melakukan voting, anda masih bisa merubah pilihan sebelum menekan tombol
        ini</p>
      <h1>
        <a href="" @click="authStore.logout">P LOGOUT</a>
      </h1>
      <button type="submit" class="btn btn-success w-auto" data-bs-toggle="modal" data-bs-target="#summaryModal">Gunakan
        hak suara saya!</button>
    </div>
  </div>


</template>
