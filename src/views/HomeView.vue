<script setup>
import { loginWithPopup } from '@/utils/auth';
import { msalInstance } from '@/utils/auth';
import { onMounted } from 'vue';

onMounted(async () => {
  try {
    await msalInstance.initialize();
  } catch (error) {
    console.error('MSAL initialization error:', error);
  }
});

</script>

<template>
  <main>
    <section id="hero">
      <div class="container py-5">
        <div class="row">
          <div class="col-12">
            <div class="text-center">
              <img src="../assets/icons/LogoPemira.png" alt="" class="img-fluid" width="161px" height="159px" />
              <h1 class="text-shadow main-color font-weight-bold">
                PEMIRA <br />
                ITB STIKOM BALI
              </h1>

              <div class="alert alert-warning col-12 col-md-6 offset-0 offset-md-3" role="alert">
                Untuk melakukan voting, silahkan login terlebih dahulu dengan akun Microsoft anda.
                <br>
                <button @click="loginWithPopup" class="btn btn-main">LOGIN AKUN MICROSOFT</button>
                <br>
                <p style="font-size: 12px">gunakan akun microsoft yang terdaftar di STIKOM BALI
                  <br>
                  (nim@stikom-bali.ac.id)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
