import { Middleware } from "@reduxjs/toolkit";
import logger from '../services/logging.ts'

const loggerMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  logger.info(`🚀 Enviando accción: ${JSON.stringify(action)}`)
  logger.info(`📦 Estado anterior: ${JSON.stringify(storeAPI.getState())}`)

  const result = next(action)
  
  logger.info(`✅ Nuevo estado: ${JSON.stringify(storeAPI.getState())}`)

  return result
}

export default loggerMiddleware