<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  data: Object
})

const emit = defineEmits(['modalClick'])
</script>

<template>
  <div class="col-md-6 mt-5">
    <form action="">
      <input type="hidden" />
      <input type="hidden" />
      <div class="card border-danger" style="min-height: 400px">
        <div class="label">
          <h3>#{{ index + 1 }}</h3>
        </div>
        <img width="" src="/src/assets/logo.svg" class="img-fluid card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title text-left">{{ data.name }}</h5>
          <div class="text-center">
            <!-- When button is clicked, open modal and set the selected product data -->
            <button
              type="button"
              class="btn w-100 btn-light"
              data-bs-toggle="modal"
              data-bs-target="#modalVisiMisi"
              @click="$emit('modalClick', data)"
            >
              Visi dan Misi
            </button>
            <button class="btn w-100 btn-main btn-vote">Pilih</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
