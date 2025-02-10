import { Middleware } from "@reduxjs/toolkit";

const loggerMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  console.log("🚀 Enviando accción:", action)
  console.log("📦 Estado anterior:", storeAPI.getState())

  const result = next(action)
  
  console.log("✅ Nuevo estado:", storeAPI.getState())

  return result
}

export default loggerMiddleware