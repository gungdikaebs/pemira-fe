import { PublicClientApplication } from '@azure/msal-browser'
import { apiFetch } from './apiFetch'

const cloudInstance = import.meta.env.VITE_PUBLIC_CLOUD_INSTANCE
const clientId = import.meta.env.VITE_PUBLIC_CLIENT_ID
const authority = `${cloudInstance}?client_id=${clientId}&response_type=code`

const msalConfig = {
  auth: {
    clientId,
    authority,
    redirectUri: window.location.origin
  }
}

export const msalInstance = new PublicClientApplication(msalConfig)

// Function to handle login with popup
export const loginWithPopup = async () => {
  try {
    const loginResponse = await msalInstance.loginPopup({
      scopes: ['openid', 'profile', 'email']
    })

    // Get the ID token
    const idToken = loginResponse.idToken
    console.log('ID Token:', idToken)
    console.log('ACCESS TOKEN', loginResponse.accessToken)
    console.log('CODE', loginResponse.code)

    if (idToken) {
      // TODO - verify id token by hitting backend API
      const response = await apiFetch.post('/api/v1/auth/microsoft', {}, { idToken })
      console.log('Response:', response)
      // TODO - handle response from backend and create JWT Token

      // Redirect to home page
    }
  } catch (error) {
    console.error('Error during login:', error)
  }
}
