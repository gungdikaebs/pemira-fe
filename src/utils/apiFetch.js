export const apiFetch = {
  get: (url, headers) => request(url, 'GET', headers),
  post: (url, headers, body) => request(url, 'POST', headers, body),
  put: (url, headers, body) => request(url, 'PUT', headers, body),
  delete: (url, headers) => request(url, 'DELETE', headers)
}

async function request(url, method, headers = {}, body) {
  if (body) {
    body = JSON.stringify(body)
    headers['Content-Type'] = 'application/json' // Ensure headers include 'Content-Type'
  }

  try {
    const response = await fetch(url, { method, headers, body })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return await response.json() // Return JSON data
    } else {
      return await response.text() // Return plain text data
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error // Re-throw the error for further handling
  }
}
