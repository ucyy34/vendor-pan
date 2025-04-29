import Medusa from "@medusajs/js-sdk"

export const backendUrl = __BACKEND_URL__ ?? "/"

const token = window.localStorage.getItem("medusa_auth_token") || ""

export const sdk = new Medusa({
  baseUrl: backendUrl,
})

// useful when you want to call the BE from the console and try things out quickly
if (typeof window !== "undefined") {
  ;(window as any).__sdk = sdk
}

export const importProductsQuery = async (file: File) => {
  const formData = new FormData()
  formData.append("file", file)

  return await fetch(`${backendUrl}/vendor/products/import`, {
    method: "POST",
    body: formData,
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch(() => null)
}

export const uploadFilesQuery = async (files: any[]) => {
  const formData = new FormData()

  for (const { file } of files) {
    formData.append("files", file)
  }

  return await fetch(`${backendUrl}/vendor/uploads`, {
    method: "POST",
    body: formData,
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch(() => null)
}

export const fetchQuery = async (
  url: string,
  {
    method,
    body,
    query,
    headers,
  }: {
    method: "GET" | "POST" | "DELETE"
    body?: object
    query?: Record<string, string | number>
    headers?: { [key: string]: string }
  }
) => {
  const bearer = (await window.localStorage.getItem("medusa_auth_token")) || ""
  const params = Object.entries(query || {}).reduce(
    (acc, [key, value], index) => {
      if (value && value !== undefined) {
        const queryLength = Object.values(query || {}).filter(
          (i) => i && i !== undefined
        ).length
        acc += `${key}=${value}${index + 1 <= queryLength ? "&" : ""}`
      }
      return acc
    },
    ""
  )
  const response = await fetch(`${backendUrl}${url}${params && `?${params}`}`, {
    method: method,
    headers: {
      authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Nieznany błąd serwera")
  }

  return response.json()
}
