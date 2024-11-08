<script setup>
import { ref } from 'vue'
import { apiFetch } from '@/utils/apiFetch'
import BigCard from '@/components/BigCard.vue'
import SmallCard from '@/components/SmallCard.vue'
import { useAuthStore } from '@/stores/authStore'
import ModalVisiMisi from '@/components/ModalVisiMisi.vue'

const authStore = useAuthStore()
const accessToken = localStorage.getItem('accessToken')

// State to hold the products and the currently selected product for the modal
const candidates = ref([])
const newCandidates = ref({
  BEM: [],
  DPM: [],
  'HIMA SI': [],
  'HIMA SK': [],
  'HIMA TI': [],
  'HIMA BD': [],
  HIMAS: []
})
const studentCouncils = ref([])

Promise.all([
  apiFetch
    .get('/api/admin/v1/candidates', { Authorization: `Bearer ${accessToken}` })
    .then((res) => {
      candidates.value = res.data
    }),
  apiFetch
    .get('/api/admin/v1/student-councils', { Authorization: `Bearer ${accessToken}` })
    .then((res) => {
      studentCouncils.value = res.data
    })
]).then(() => {
  studentCouncils.value.forEach((council) => {
    newCandidates.value[council.type] = candidates.value.filter(
      (candidate) => candidate.studentCouncilId === council.id
    )
  })
})

// check what card is clicked and set the data to be passed to the modal
const dataModal = ref({})
const modalClick = (data) => {
  dataModal.value = data
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
        <BigCard
          v-for="candidate in newCandidates.BEM"
          :key="candidate"
          :data="candidate"
          @modalClick="modalClick(candidate)"
        ></BigCard>
      </div>
      <div class="row py-5" id="balma">
        <div class="col-12 py-3">
          <h3 class="heading-2 main-color text-center">CALON LEGISLATIF DPM PM</h3>
        </div>
        <SmallCard
          v-for="candidate in newCandidates.DPM"
          :key="candidate"
          :data="candidate"
          @modalClick="modalClick(candidate)"
        ></SmallCard>
      </div>
    </div>
  </section>

  <div class="card fixed-bottom shadow">
    <div class="card-body text-center">
      <p>
        Tekan tombol di bawah ini jika sudah melakukan voting, anda masih bisa merubah pilihan
        sebelum menekan tombol ini
      </p>
      <h1>
        <a href="" @click="authStore.logout">P LOGOUT</a>
      </h1>
      <button
        type="submit"
        class="btn btn-success w-auto"
        data-bs-toggle="modal"
        data-bs-target="#summaryModal"
      >
        Gunakan hak suara saya!
      </button>
    </div>
  </div>

  <ModalVisiMisi :data="dataModal" />
</template>
