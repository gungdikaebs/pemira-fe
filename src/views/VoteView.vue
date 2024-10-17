<script setup>
import { ref } from 'vue'
import { apiFetch } from '@/utils/apiFetch'
const products = ref()
const productModal = ref({})

apiFetch.get('https://dummyjson.com/products?limit=5').then((res) => {
  products.value = res.products
})

const modalClick = (product) => {
  apiFetch.get(`https://dummyjson.com/products/${product.id}`).then((res) => {
    productModal.value = res
  })
}
</script>

<template>
  <nav class="bg-light py-3" id="vote">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <div class="text-center">
            <a class="navbar-brand mx-3">
              <img src="" alt="Bootstrap" width="60" height="60" />
              <img src="" alt="Bootstrap" width="60" height="60" />
              <img src="" alt="Bootstrap" width="60" height="60" />
            </a>
          </div>
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
        <div class="col-md-6 mt-5" v-for="(product, index) in products" :key="product">
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
                  <!-- Ubah ID yang benar untuk membuka modal -->
                  <button
                    type="button"
                    class="btn w-100 btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#visi1Modal"
                    @click="modalClick(product)"
                  >
                    Visi dan Misi
                  </button>
                  <button class="btn w-100 btn-main btn-vote">Pilih</button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- Modal yang benar dengan ID yang sesuai -->
        <div
          class="modal fade"
          id="visi1Modal"
          tabindex="-1"
          aria-labelledby="visi1ModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="visi1ModalLabel">
                  Visi dan Misi Paslon No Undi 1
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <h4 class="text-center">Visi</h4>
                <p>{{ productModal.description }}</p>
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
      </div>
    </div>
  </section>
</template>
<style>
/* border danger */
.border-danger {
  border: 5px solid #dc3545 !important;
}
</style>
