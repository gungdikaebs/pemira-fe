import { defineStore } from 'pinia'
import { PublicClientApplication } from '@azure/msal-browser'
import { apiFetch } from '@/utils/apiFetch'
import { msalInstance } from '@/utils/auth'
import { SignJWT } from 'jose' // Import SignJWT from jose for signing
import router from '@/router'

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}

const userData = parseJwt(localStorage.getItem('token'))

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: { ...userData, token: localStorage.getItem('token') },
    returnUrl: null
  }),
  actions: {
    initializeMsal() {
      this.msalInstance = new PublicClientApplication({
        auth: {
          clientId: this.clientId,
          authority: this.authority,
          redirectUri: window.location.origin
        }
      })
    },
    async loginWithPopup() {
      try {
        await msalInstance.initialize()
        const loginResponse = await msalInstance.loginPopup({
          scopes: ['openid', 'profile', 'email']
        })

        const idToken = loginResponse.idToken
        console.log('ID Token:', idToken)
        console.log('ACCESS TOKEN:', loginResponse.accessToken)
        console.log('CODE:', loginResponse.code)

        if (idToken) {
          const response = await apiFetch.post('/api/v1/auth/microsoft', {}, { idToken })
          console.log('Response:', response)

          if (response.data) {
            this.user = response.data

            const payload = {
              id: response.data.user.id,
              email: response.data.user.email,
              name: response.data.user.name,
              studentIdNumber: response.data.user.studentIdNumber
            }

            // Signing the JWT using `jose` library
            const secret = new TextEncoder().encode(import.meta.env.VITE_API_SECRET) // Encode secret as Uint8Array
            const token = await new SignJWT(payload)
              .setProtectedHeader({ alg: 'HS256' })
              .setExpirationTime('1s')
              .sign(secret)

            console.log('Generated JWT Token:', token)
            localStorage.setItem('token', token)
            router.push(this.returnUrl || '/vote')
          } else {
            console.error('JWT token not found in response')
          }
        }
      } catch (error) {
        console.error('Error during login:', error)
      }
    },
    logout() {
      this.user = null
      localStorage.removeItem('token')
      router.push('/')
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    getUser() {
      return { ...userData, token: localStorage.getItem('token') }
    }
  }
})
