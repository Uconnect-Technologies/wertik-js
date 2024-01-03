import winston, { LoggerOptions } from "winston"
import { wLogWithSuccess } from "../utils/log"

/**
 * Creates a winston instance
 * @param props see interface LoggerOptions from winston
 * @returns winston instance
 */
export const useLogger = (options?: LoggerOptions) => {
  wLogWithSuccess(`[Wertik-WinstonLogger]`, `Initialized winston logger`)
  return winston.createLogger(options)
}
/**
 * Allows creating multiple logger instances
 * @param fn callback function, useWinstonTransport expects a function and useWinstonTransport runs that function with winston passed so you can return transport instances
 * @returns should return array of winston transport object.
 */
export const useWinstonTransport = (fn = (winstonInstance = winston) => []) => {
  return fn(winston)
}
