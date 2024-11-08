<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  data: Object
})

const emit = defineEmits(['modalClick'])
</script>

<template>
  <!-- Perulangan Data -->
  <div class="col-6 col-md-3 mt-5">
    <form action="" method="post">
      <input type="hidden" name="id_jenis" value="" />
      <input type="hidden" name="id" value="" />
      <div class="card" style="min-height: 400px">
        <div class="label">
          <h3>#1</h3>
        </div>
        <img
          width=""
          src="../assets/icons/LogoPemira.png"
          class="img-fluid card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title text-left">{{ data.name }}</h5>
          <div class="text-center">
            <button
              type="button"
              class="btn w-100 btn-light"
              data-bs-toggle="modal"
              data-bs-target="#modalVisiMisi"
              @click="$emit('modalClick', data)"
            >
              Visi dan Misi
            </button>
            <button class="btn w-100 btn-main btn-vote">Anda Memilih ini</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
