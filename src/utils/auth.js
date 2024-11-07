import { PublicClientApplication } from '@azure/msal-browser'
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
